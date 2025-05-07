import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentStudentDetailsPage from './EnrolmentStudentDetailsPage';

export default class EnrolmentCreatePasswordPage {
    private page: Page;
    private webActions: WebActions;
    private setPasswordButton: Locator;
    private passwordInput: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.setPasswordButton = this.page.locator("//button[@data-tracking-id='CreatePasswordContainer.Button.next']");
        this.passwordInput = this.page.locator("//input[@data-tracking-id='CreatePasswordContainer.FormField.Input.passwordInput']");
    }

    async enterPassword(password: string) {
        await this.webActions.typeOnElement(this.passwordInput, password);
    }   

    async clickSetPasswordButton(): Promise<EnrolmentStudentDetailsPage> { 
        await this.webActions.click(this.setPasswordButton);
        return this.poManager.getEnrolmentStudentDetailsPage();
    }   
}