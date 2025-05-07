import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentCreatePasswordPage from './EnrolmentCreatePasswordPage';

export default class EnrolmentParentDetailsPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;
    private parentFirstName: Locator;
    private parentLastName: Locator;
    private reasonDropDown: Locator;  
    private reasonOptionList: Locator;  
    private findEukaDropDown: Locator;  
    private findEukaOptionList: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='AccountSetupContainer.Button.next']");
        this.parentFirstName = this.page.locator("//input[@name='firstName']");
        this.parentLastName = this.page.locator("//input[@name='lastName']");
        this.reasonDropDown = this.page.locator("//div[@data-tracking-id='AccountSetupContainer.FormField.selectReasonField']/div");
        this.reasonOptionList = this.page.locator("//div[@id='react-select-2-listbox']/div/div");
        this.findEukaDropDown = this.page.locator("//div[@data-tracking-id='AccountSetupContainer.FormField.selectReferrralSourceField']/div");
        this.findEukaOptionList = this.page.locator("//div[@id='react-select-3-listbox']/div/div");
    }

    async enterParentDetails(parentFirstName: string, parentLastName: string) {

        await this.webActions.typeOnElement(this.parentFirstName, parentFirstName);
        await this.webActions.typeOnElement(this.parentLastName, parentLastName);
    }  
    
    async selectReason() {
        await this.webActions.clickRandomFromDropDown(this.reasonDropDown, this.reasonOptionList);
    }
    
    async selectFindEukaReason() {
        await this.webActions.clickRandomFromDropDown(this.findEukaDropDown, this.findEukaOptionList);
    }

    async clickNextButton(): Promise<EnrolmentCreatePasswordPage> { 
        await this.webActions.click(this.nextButton);
        return this.poManager.getEnrolmentCreatePasswordPage();
    }

}