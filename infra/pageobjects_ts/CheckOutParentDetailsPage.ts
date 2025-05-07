import { Locator, Page } from '@playwright/test';
import { CheckOutUserStateSelectionPage } from './CheckOutUserStateSelectionPage';
import { POManager } from './POManager';

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
    private NewsletterSubscription: Locator;
    private localeSelectorText: Locator;
    private changeLanguageDropdownText: Locator;
    private languageOptionSelector:Locator | undefined
    private page: Page;
    private webActions: WebActions;

constructor(page:Page, private poManager: POManager)
{
    this.page = page;
    this.webActions = new WebActions(page);
    this.parentFirstNameInput= page.locator("input[id='firstName']");
    this.parentEmailInput = page.locator("input[id='email']");
    this.newsletterSubscriptionInput = page.locator("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
    this.nextButton= page.locator("button[data-tracking-id='UserInfoContainer.Button.goNext']");
    this.localeSelector = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
    this.changeLanguageDropdown= page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
    this.confirmLocaleButton = page.locator("button[data-tracking-id='LocationSelectDrawer.Button.confirm']");
    this.NewsletterSubscription = page.locator("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
    this.localeSelectorText = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
    this.changeLanguageDropdownText= page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
    
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
        await this.webActions.click(this.NewsletterSubscription);
    }

    async clickNextButton(): Promise<CheckOutUserStateSelectionPage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getCheckOutUserStateSelectionPage();
    }

    async clickOnLocaleSelector() {
        await this.webActions.click(this.localeSelector);
    }

    async changeLanguage(locale: string) {
        this.languageOptionSelector = this.page.locator("//div[@data-tracking-id='Select.Option.${locale}']");
       // languageOptionSelector = `//div[@data-tracking-id='Select.Option.${locale}']`;
        await this.webActions.click(this.changeLanguageDropdownText);
        await this.webActions.click(this.languageOptionSelector);
    }

    async clickConfirmLocaleButton() {
        await this.webActions.click(this.confirmLocaleButton);
    }
}
module.exports = {CheckOutParentDetailsPage};
