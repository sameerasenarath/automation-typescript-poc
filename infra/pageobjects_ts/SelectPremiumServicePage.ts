import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import PaymentPage from './PaymentPage';

export class SelectPremiumServicePage {
    private nextButton: Locator;
    private page: Page;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.nextButton = page.locator("button[data-tracking-id='PremiumServiceContainer.Button.goNextFromAddonSelectPage']");
    }

    async clickNextButton(): Promise<PaymentPage> {
        await this.nextButton.waitFor({state: 'visible'});
        await this.nextButton.click();
        return this.poManager.getPaymentPage();
    }
}

export default SelectPremiumServicePage;