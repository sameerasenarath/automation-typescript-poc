import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import { PaymentPlans } from '../eukaObjectsFactory/PaymentPlans';

export default class ParentPortalStudentDetailsPage {
    private page: Page;
    private webActions: WebActions;
    private manageLink: Locator;
    private cancelProgramRenewalButton: Locator;
    private cancelAutoRenewalInstalmentPlanWarningMessage: Locator;
    private selectReasonDropdown: Locator;
    private cancelProgramRenewalPopup: Locator;
    private cancelProgramReasons: Locator;
    private cancelProgramConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.manageLink = this.page.locator("(//button[@data-tracking-id='Button.manageMenuBtn'])[1]");
        this.cancelProgramRenewalButton = this.page.locator("//div[@data-tracking-id='MenuItem.manageMenuItem-Cancel program renewal']");
        this.cancelAutoRenewalInstalmentPlanWarningMessage = this.page.locator("//div[@data-testid='pending-installments-alert']");
        this.selectReasonDropdown = this.page.locator("//div[@data-tracking-id='FormField.cancellationReasonField']/div");
        this.cancelProgramRenewalPopup = this.page.locator("//div[contains(text(),'Cancel auto-renewal of Euka')]");    
        this.cancelProgramReasons = this.page.locator("//div[@id='react-select-2-listbox']/div/div");
        this.cancelProgramConfirmButton = this.page.locator("//button[@data-tracking-id='Button.cancel']");
    
    
    }  
    
    async waitUntilReady() {
      await this.page.locator("//img[contains(@alt,'Student-avatar image')]").waitFor({ state: 'visible', timeout: 15000 });
    }
    
    async clickOnManageLink(): Promise<ParentPortalStudentDetailsPage> {
        await this.webActions.click(this.manageLink);
        return this;
      }
    
      async clickCancelProgramRenewal(): Promise<ParentPortalStudentDetailsPage> {
        await this.webActions.click(this.cancelProgramRenewalButton);
        return this;
      }
    
      async cancelProgramRenewal(paymentPlan?: PaymentPlans): Promise<ParentPortalStudentDetailsPage> {
        await this.webActions.waitForElementVisibility(this.cancelProgramRenewalPopup, 30000);
    
        if (paymentPlan) {
          if (paymentPlan === PaymentPlans.INSTALLMENTS) {
            await this.webActions.isElementVisible(this.cancelAutoRenewalInstalmentPlanWarningMessage);
          } else {
            throw new Error("Warning message is visible when it should not be.");
          }
        }
    
        await this.webActions.clickRandomFromDropDown(
          this.selectReasonDropdown,
          this.cancelProgramReasons
        );
        await this.webActions.click(this.cancelProgramConfirmButton);
        await this.webActions.waitForElementInvisibility(this.cancelProgramRenewalPopup, 30000);
        return this;
      }

}