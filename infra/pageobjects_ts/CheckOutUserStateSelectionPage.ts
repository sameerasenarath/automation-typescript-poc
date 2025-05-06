import { Locator, Page } from '@playwright/test';
import GradeSelectionPage from './GradeSelectionPage';
import { POManager } from './POManager';
import SelectPremiumServicePage from './SelectPremiumServicePage';

export class CheckOutUserStateSelectionPage {
    private countryGroup: Locator;
    private countryAustraliaButton: Locator;
    private countryInternationalButton: Locator;
    private nextButton: Locator;
    private page: Page;


    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.countryGroup = page.locator("div[data-tracking-id='StateContainer.Button.countryButtonGroup']");
        this.countryAustraliaButton = page.locator("button[data-tracking-id='StateContainer.Button.countryAU']");
        this.countryInternationalButton = page.locator("button[data-tracking-id='StateContainer.Button.countryinternational']");
        this.nextButton = page.locator("button[data-tracking-id='StateContainer.Button.goNextFromStateSelectPage']");
    }

    async selectCountry(countryCode: string): Promise<this> {
        if (countryCode === "AU") {
            await this.countryAustraliaButton.waitFor({ state: 'visible' });
            await this.countryAustraliaButton.click();
        } else {
            await this.countryInternationalButton.waitFor({ state: 'visible' });
            await this.countryInternationalButton.click();
        }
        return this;
    }

    async selectState(stateShortName: string): Promise<this> {
        const stateXpath = `button[data-tracking-id='StateContainer.Button.state${stateShortName}']`;
        const stateButton = this.page.locator(stateXpath);
        await stateButton.click();
        return this;
    }

    // Overload signatures
    async clickNextButton(): Promise<GradeSelectionPage>;
    async clickNextButton(isAddServiceFlow: boolean): Promise<GradeSelectionPage | SelectPremiumServicePage>;

    // Single implementation handling both overloads
    async clickNextButton(isAddServiceFlow: boolean = false): Promise<GradeSelectionPage | SelectPremiumServicePage> {
        await this.nextButton.click();

        if (isAddServiceFlow) {
            return new SelectPremiumServicePage(this.page,this.poManager);
        } else {
            return new GradeSelectionPage(this.page, this.poManager);
        }
    }
}


export default CheckOutUserStateSelectionPage;