import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentSuccessPage from './EnrolmentSuccessPage';

export default class EnrolmentStudentPerformancePage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='StudentPerformanceContainer.Button.next']");
    
    }

    async clickNextButton(): Promise<EnrolmentSuccessPage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getEnrolmentSuccessPage();
    }

}