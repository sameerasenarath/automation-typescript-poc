import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentSelectProgramPage from './EnrolmentSelectProgramPage';
import EnrolmentStudentPerformancePage from './EnrolmentStudentPerformancePage';

export default class EnrolmentStudentInfoPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;
    private termSelectDropDown: Locator;
    private termOptionsNewUsers: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='EnrolmentInfoContainer.Button.next']");
        this.termSelectDropDown = this.page.locator("//div[@data-tracking-id='EnrolmentInfoContainer.FormField.selectStartingTermField']/div");
        this.termOptionsNewUsers = this.page.locator("//div[@id='react-select-4-listbox']/div/div");
    
    }
    async selectTerm(term: string) {
        await this.webActions.clickOptionByVisibleText(this.termSelectDropDown, this.termOptionsNewUsers,term);
    }   
    
    async clickNextButton(): Promise<EnrolmentStudentPerformancePage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getEnrolmentStudentPerformancePage();
    }

}