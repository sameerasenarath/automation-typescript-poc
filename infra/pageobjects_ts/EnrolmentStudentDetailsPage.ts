import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentSelectProgramPage from './EnrolmentSelectProgramPage';

export default class EnrolmentStudentDetailsPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;
    private studentNameInput: Locator;
    private studentLastInput: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='CreateStudentContainer.Button.next']");
        this.studentNameInput = this.page.locator("//input[@name='firstName']");
        this.studentLastInput = this.page.locator("//input[@name='lastName']");
    }
    async fillStudentDetails(firstName: string, lastName: string) {
        await this.webActions.typeOnElement(this.studentNameInput, firstName);
        await this.webActions.typeOnElement(this.studentLastInput, lastName);
    }

    async clickNextButton(): Promise<EnrolmentSelectProgramPage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getEnrolmentSelectProgramPage();
    }

}