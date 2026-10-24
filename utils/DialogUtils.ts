import {Page} from '@playwright/test';

export class DialogUtils {

    static async acceptDialog(page:Page){


        page.on('dialog',async dialog =>{
            

            console.log('Dialog message:', dialog.message());

            await dialog.accept()
        })
    }



}