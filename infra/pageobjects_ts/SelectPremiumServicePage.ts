import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import PaymentPage from './PaymentPage';
import { WebActions } from '../functions/WebActions';

export class SelectPremiumServicePage {
    private nextButton: Locator;
    private registrationAddonLink: Locator;
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = page.locator("button[data-tracking-id='PremiumServiceContainer.Button.goNextFromAddonSelectPage']");
        this.registrationAddonLink = page.locator("//div[@data-tracking-id='PremiumServiceContainer.Card.selectAddon-Government Registration Service']");
    }

    async selectRegistrationAddon(): Promise<this> {
        await this.webActions.isElementVisible(this.registrationAddonLink);
        await this.registrationAddonLink.click();
        return this;
    }

    async clickNextButton(): Promise<PaymentPage> {
        await this.nextButton.waitFor({state: 'visible'});
        await this.nextButton.click();
        return this.poManager.getPaymentPage();
    }
}

export default SelectPremiumServicePage;