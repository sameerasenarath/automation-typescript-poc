import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import SelectPremiumServicePage from './SelectPremiumServicePage';
import { WebActions } from '../functions/WebActions';// Adjust the path if needed

export class MembershipSelectionPage {
    private page: Page;
    private webActions: WebActions;
    private nextButtonSelector: Locator;
    private fullYeatProgram: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButtonSelector= page.locator("//button[@data-tracking-id='MembershipContainer.Button.goNextFromPlanSelectPage']");
        this.fullYeatProgram = page.locator("//div[@data-tracking-id='MembershipContainer.Card.selectPlan-yearly']/div[1]");
    }

    async selectFullYearProgram() {
        await this.webActions.waitForSelector(this.fullYeatProgram);
        await this.webActions.click(this.fullYeatProgram);
        return this;
    }

    async clickNextButton(): Promise<SelectPremiumServicePage> {
    
        await this.webActions.waitForSelector(this.nextButtonSelector);
        await this.webActions.click(this.nextButtonSelector);
        return this.poManager.getSelectPremiumServicePage();
    }
}

export default MembershipSelectionPage;
