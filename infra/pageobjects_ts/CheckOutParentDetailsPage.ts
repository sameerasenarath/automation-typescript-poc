import { Locator, Page } from '@playwright/test';
import { CheckOutUserStateSelectionPage } from './CheckOutUserStateSelectionPage';
import { POManager } from './POManager';
import { WebActions } from '../functions/WebActions';

const config = require("../../resources/config/MainConfig.json");

export class CheckOutParentDetailsPage {
    private readonly parentFirstNameInput: Locator;
    private readonly parentEmailInput: Locator;
    private readonly newsletterSubscriptionInput: Locator;
    private readonly nextButton: Locator;
    private readonly localeSelector: Locator;
    private readonly changeLanguageDropdown: Locator;
    private readonly confirmLocaleButton: Locator;
    private readonly localeSelectorText: Locator;
    private readonly changeLanguageDropdownText: Locator;
    private page: Page;
    private webActions: WebActions;
    private languageOptionSelector?: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);

        this.parentFirstNameInput = page.locator("input[id='firstName']");
        this.parentEmailInput = page.locator("input[id='email']");
        this.newsletterSubscriptionInput = page.locator("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
        this.nextButton = page.locator("button[data-tracking-id='UserInfoContainer.Button.goNext']");
        this.localeSelector = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
        this.changeLanguageDropdown = page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
        this.confirmLocaleButton = page.locator("button[data-tracking-id='LocationSelectDrawer.Button.confirm']");
        this.localeSelectorText = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
        this.changeLanguageDropdownText = page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
    }
    
    async goTo(): Promise<void> {
        await this.webActions.goto(config[0].portalCheckoutUrl);
    }

    async fillParentFirstName(firstName: string): Promise<void> {
        await this.webActions.typeOnElement(this.parentFirstNameInput, firstName);
    }

    async fillParentEmail(email: string): Promise<void> {
        await this.webActions.typeOnElement(this.parentEmailInput, email);
    }

    async selectNewsletterSubscription(): Promise<void> {
        await this.webActions.click(this.newsletterSubscriptionInput);
    }

    async clickNextButton(): Promise<CheckOutUserStateSelectionPage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getCheckOutUserStateSelectionPage();
    }

    async clickOnLocaleSelector(): Promise<void> {
        await this.webActions.click(this.localeSelector);
    }

    async changeLanguage(locale: string): Promise<void> {
        this.languageOptionSelector = this.page.locator(`//div[@data-tracking-id='Select.Option.${locale}']`);
        await this.webActions.click(this.changeLanguageDropdownText);
        await this.webActions.click(this.languageOptionSelector);
    }

    async clickConfirmLocaleButton(): Promise<void> {
        await this.webActions.click(this.confirmLocaleButton);
    }
}

module.exports = { CheckOutParentDetailsPage };