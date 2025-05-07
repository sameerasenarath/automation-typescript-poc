import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';

export default class EnrolmentSuccessPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='EnrolmentInfoContainer.Button.next']");
    
    }  
    
    async clickNextButton(): Promise<void> {
        
    }

}