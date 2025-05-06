import { Locator, Page } from '@playwright/test';
import { CheckOutUserStateSelectionPage } from './CheckOutUserStateSelectionPage';
import { WebActions } from '../functions/WebActions'; // Adjust the path as needed
const config = require("../../utils/config/MainConfig.json");

export class CheckOutParentDetailsPage {
    private parentFirstNameInput: Locator;
    private parentEmailInput: Locator;
    private newsletterSubscriptionInput: Locator;
    private nextButton: Locator;
    private localeSelector: Locator;
    private changeLanguageDropdown: Locator;
    private confirmLocaleButton: Locator;
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);

        this.parentFirstNameInput = page.locator("input[id='firstName']");
        this.parentEmailInput = page.locator("input[id='email']");
        this.newsletterSubscriptionInput = page.locator("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
        this.nextButton = page.locator("button[data-tracking-id='UserInfoContainer.Button.goNext']");
        this.localeSelector = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
        this.changeLanguageDropdown = page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
        this.confirmLocaleButton = page.locator("button[data-tracking-id='LocationSelectDrawer.Button.confirm']");
    }

    async goTo() {
        await this.webActions.goto(config[0].portalCheckoutUrl);
    }

    async fillParentFirstName(firstName: string) {
        await this.webActions.type("input[id='firstName']", firstName);
    }

    async fillParentEmail(email: string) {
        await this.webActions.type("input[id='email']", email);
    }

    async selectNewsletterSubscription() {
        await this.webActions.click("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
    }

    async clickNextButton(): Promise<CheckOutUserStateSelectionPage> {
        await this.webActions.click("button[data-tracking-id='UserInfoContainer.Button.goNext']");
        return new CheckOutUserStateSelectionPage(this.page);
    }

    async clickOnLocaleSelector() {
        await this.webActions.click("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal'] > p:nth-of-type(2)");
    }

    async changeLanguage(locale: string) {
        const languageOptionSelector = `//div[@data-tracking-id='Select.Option.${locale}']`;
        await this.webActions.click("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
        await this.webActions.click(languageOptionSelector);
    }

    async clickConfirmLocaleButton() {
        await this.webActions.click("button[data-tracking-id='LocationSelectDrawer.Button.confirm']");
    }
}


