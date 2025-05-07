import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentSelectProgramPage from './EnrolmentSelectProgramPage';

export default class EnrolmentManageElectivesPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='AccountSetupContainer.Button.next']");
    
    }

    async clickNextButton(): Promise<EnrolmentSelectProgramPage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getEnrolmentSelectProgramPage();
    }

}