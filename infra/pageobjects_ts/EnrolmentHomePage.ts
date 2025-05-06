import {Locator, Page} from '@playwright/test';

export default class EnrolmentHomePage {
    parentFirstNameInput: Locator;
    parentEmailInput: Locator;
    newsletterSubscriptionInput: Locator;
    nextButton: Locator;
    localeSelector: Locator;
    changeLanguageDropdown: Locator;
    confirmLocaleButton: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.parentFirstNameInput = page.locator("input[id='firstName']");
        this.parentEmailInput = page.locator("input[id='email']");
        this.newsletterSubscriptionInput = page.locator("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
        this.nextButton = page.locator("button[data-tracking-id='UserInfoContainer.Button.goNext']");
        this.localeSelector = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
        this.changeLanguageDropdown = page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
        this.confirmLocaleButton = page.locator("button[data-tracking-id='LocationSelectDrawer.Button.confirm']");
    }

    async goTo(url: string | null) {
        if (typeof url === "string") {
            await this.page.goto(url);
        }
        await this.page.waitForLoadState('networkidle');
    }

    async clickNextButton() {
        await this.nextButton.click();
    }
}
