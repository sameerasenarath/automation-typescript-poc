import { Locator, Page } from '@playwright/test';
import GradeSelectionPage from './GradeSelectionPage';
import { POManager } from './POManager';
import SelectPremiumServicePage from './SelectPremiumServicePage';
import { WebActions } from '../functions/WebActions';

export class CheckOutUserStateSelectionPage {
    private page: Page;
    private webActions: WebActions;
    private countrySelector!: Locator;
    private stateSelector!: Locator;
    private nextButton!: Locator;


    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async selectCountry(countryCode: string): Promise<this> {
        this.countrySelector =
            countryCode === 'AU'
                ? this.page.locator("button[data-tracking-id='StateContainer.Button.countryAU']")
                : this.page.locator("button[data-tracking-id='StateContainer.Button.countryinternational']");

        await this.countrySelector.waitFor({ state: 'visible' });
        await this.webActions.click(this.countrySelector);
        return this;
    }

    async selectState(stateShortName: string): Promise<this> {
        const stateSelector = this.page.locator(`button[data-tracking-id='StateContainer.Button.state${stateShortName}']`);
        await this.webActions.click(stateSelector);
        return this;
    }

    // Overload signatures
    async clickNextButton(): Promise<GradeSelectionPage>;
    async clickNextButton(isAddServiceFlow: boolean): Promise<GradeSelectionPage | SelectPremiumServicePage>;

    // Single implementation handling both overloads
    async clickNextButton(isAddServiceFlow: boolean = false): Promise<GradeSelectionPage | SelectPremiumServicePage> {
        this.nextButton = this.page.locator("button[data-tracking-id='StateContainer.Button.goNextFromStateSelectPage']");
        await this.webActions.click(this.nextButton);

        if (isAddServiceFlow) {
            return new SelectPremiumServicePage(this.page, this.poManager);
        } else {
            return new GradeSelectionPage(this.page, this.poManager);
        }
    }
}

export default CheckOutUserStateSelectionPage;

