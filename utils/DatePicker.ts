import { Locator, Page } from '@playwright/test';
import { DateTime } from 'luxon';

export interface CalendarConfig {
  nextMonth: Locator;
  previousMonth: Locator;
  monthLabel: Locator;
  dayCell: (day: number) => Locator;
  monthFormat?: string;
  maxMonthsToNavigate?: number;
}

export class DatePicker {
  constructor(private readonly page: Page) {}

  async selectByTyping(input: Locator, date: Date | string, format = 'MM/dd/yyyy'): Promise<void> {
    await input.click();
    await input.fill(DatePicker.toFormat(date, format));
    await input.press('Enter');
  }

  async selectNative(input: Locator, date: Date | string): Promise<void> {
    await input.fill(DatePicker.toFormat(date, 'yyyy-MM-dd'));
  }

  async selectFromCalendar(config: CalendarConfig, date: Date | string): Promise<void> {
    const target = DatePicker.toDateTime(date);
    const monthFormat = config.monthFormat ?? 'MMMM yyyy';
    const maxMonths = config.maxMonthsToNavigate ?? 24;

    for (let step = 0; step < maxMonths; step++) {
      const label = (await config.monthLabel.innerText()).trim();
      const visible = DateTime.fromFormat(label, monthFormat);

      if (!visible.isValid) {
        throw new Error(`Could not parse month label "${label}" with format "${monthFormat}"`);
      }

      if (visible.year === target.year && visible.month === target.month) {
        const dayCell = config.dayCell(target.day);
        await dayCell.waitFor({ state: 'visible' });
        await dayCell.click();
        return;
      }

      await (visible < target ? config.nextMonth : config.previousMonth).click();
    }

    throw new Error(
      `Could not reach ${target.toISODate()} within ${maxMonths} months (last label: "${(await config.monthLabel.innerText()).trim()}")`,
    );
  }

  static toDateTime(date: Date | string): DateTime {
    const value = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);

    if (!value.isValid) {
      throw new Error(`Invalid date: ${String(date)}`);
    }

    return value;
  }

  static toFormat(date: Date | string, format: string): string {
    return DatePicker.toDateTime(date).toFormat(format);
  }
}
