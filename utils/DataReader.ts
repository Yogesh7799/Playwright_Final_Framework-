import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import { parse } from 'csv-parse/sync';

export type DataRow = Record<string, string>;

export class DataReader {
  static readExcel(filePath: string, sheetName?: string): DataRow[] {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Excel file not found: ${absolutePath}`);
    }

    const workbook = XLSX.readFile(absolutePath);
    const sheet = sheetName ?? workbook.SheetNames[0];

    if (!sheet || !workbook.Sheets[sheet]) {
      throw new Error(`Sheet "${sheet}" not found in ${absolutePath}`);
    }

    return XLSX.utils.sheet_to_json<DataRow>(workbook.Sheets[sheet], {
      defval: '',
      raw: false,
    });
  }

  static readCsv(filePath: string): DataRow[] {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`CSV file not found: ${absolutePath}`);
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');

    return parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as DataRow[];
  }

  static readJson<T = unknown>(filePath: string): T {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`JSON file not found: ${absolutePath}`);
    }

    try {
      return JSON.parse(fs.readFileSync(absolutePath, 'utf-8')) as T;
    } catch (error) {
      throw new Error(`Invalid JSON in ${absolutePath}: ${(error as Error).message}`);
    }
  }

  static read(filePath: string, sheetName?: string): DataRow[] {
    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.csv') {
      return DataReader.readCsv(filePath);
    }

    if (extension === '.xlsx' || extension === '.xls') {
      return DataReader.readExcel(filePath, sheetName);
    }

    if (extension === '.json') {
      const data = DataReader.readJson<DataRow | DataRow[]>(filePath);
      return Array.isArray(data) ? data : [data];
    }

    throw new Error(`Unsupported file type: ${extension || filePath}`);
  }
}
