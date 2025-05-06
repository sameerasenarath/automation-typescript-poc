import { Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';// Adjust the path if needed

export class MembershipSelectionPage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async clickNextButton() {
        const nextButtonSelector = "button[data-tracking-id='MembershipContainer.Button.goNextFromPlanSelectPage']";
        await this.webActions.waitForSelector(nextButtonSelector);
        await this.webActions.click(nextButtonSelector);
    }
}

export default MembershipSelectionPage;
