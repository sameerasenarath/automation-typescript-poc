import { Locator, Page } from '@playwright/test';

export class SelectPremiumServicePage {
    private nextButton: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = page.locator("button[data-tracking-id='PremiumServiceContainer.Button.goNextFromAddonSelectPage']");
    }

    async clickNextButton(){
        await this.nextButton.waitFor({state: 'visible'});
        await this.nextButton.click();
    }
}

export default SelectPremiumServicePage;