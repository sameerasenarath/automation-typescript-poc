import { Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; // Adjust path as needed

export class CheckOutUserStateSelectionPage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async selectCountry(countryCode: string): Promise<this> {
        const countrySelector =
            countryCode === 'AU'
                ? "button[data-tracking-id='StateContainer.Button.countryAU']"
                : "button[data-tracking-id='StateContainer.Button.countryinternational']";

        await this.page.locator(countrySelector).waitFor({ state: 'visible' });
        await this.webActions.click(countrySelector);
        return this;
    }

    async selectState(stateShortName: string): Promise<this> {
        const stateSelector = `button[data-tracking-id='StateContainer.Button.state${stateShortName}']`;
        await this.webActions.click(stateSelector);
        return this;
    }

    async clickNextButton() {
        await this.webActions.click("button[data-tracking-id='StateContainer.Button.goNextFromStateSelectPage']");
    }
}

export default CheckOutUserStateSelectionPage;

