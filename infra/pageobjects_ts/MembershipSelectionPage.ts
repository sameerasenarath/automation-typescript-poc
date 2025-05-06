import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import SelectPremiumServicePage from './SelectPremiumServicePage';

export class MembershipSelectionPage {
    private nextButton: Locator;
    private page: Page;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.nextButton = page.locator("button[data-tracking-id='MembershipContainer.Button.goNextFromPlanSelectPage']");
    }

    async clickNextButton(): Promise<SelectPremiumServicePage> {
        // Wait until the next button is clickable
        await this.nextButton.waitFor({state: 'visible'});
        await this.nextButton.click();
        return this.poManager.getSelectPremiumServicePage();
    }
}

export default MembershipSelectionPage;