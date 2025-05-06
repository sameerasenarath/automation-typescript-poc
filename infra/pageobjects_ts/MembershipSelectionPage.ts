import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import SelectPremiumServicePage from './SelectPremiumServicePage';
import { WebActions } from '../functions/WebActions';// Adjust the path if needed

export class MembershipSelectionPage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async clickNextButton(): Promise<SelectPremiumServicePage> {
        const nextButtonSelector = "button[data-tracking-id='MembershipContainer.Button.goNextFromPlanSelectPage']";
        await this.webActions.waitForSelector(nextButtonSelector);
        await this.webActions.click(nextButtonSelector);
        return this.poManager.getSelectPremiumServicePage();
    }
}

export default MembershipSelectionPage;
