import { Locator, Page } from '@playwright/test';
import GradeSelectionPage from './GradeSelectionPage';
import { POManager } from './POManager';
import SelectPremiumServicePage from './SelectPremiumServicePage';
import { WebActions } from '../functions/WebActions'; 

export class CheckOutUserStateSelectionPage {
    private page: Page;
    private webActions: WebActions;


    constructor(page: Page, private poManager: POManager) {
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

    // Overload signatures
    async clickNextButton(): Promise<GradeSelectionPage>;
    async clickNextButton(isAddServiceFlow: boolean): Promise<GradeSelectionPage | SelectPremiumServicePage>;

    // Single implementation handling both overloads
    async clickNextButton(isAddServiceFlow: boolean = false): Promise<GradeSelectionPage | SelectPremiumServicePage> {
        await this.webActions.click("button[data-tracking-id='StateContainer.Button.goNextFromStateSelectPage']");

        if (isAddServiceFlow) {
            return new SelectPremiumServicePage(this.page,this.poManager);
        } else {
            return new GradeSelectionPage(this.page, this.poManager);
        }
    }
}

export default CheckOutUserStateSelectionPage;

