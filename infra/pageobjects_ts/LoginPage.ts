import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';// Adjust path as needed

export class LoginPage {
    private page: Page;
    private webActions: WebActions;
    private loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.loginButton = this.page.locator("[value='Login']");
    }

    async goTo() {
        await this.webActions.goto("https://rahulshettyacademy.com/client");
        await this.webActions.waitForLoadState('networkidle');
    }

    async validLogin(username: string, password: string) {
        await this.webActions.type('#userEmail', username);
        await this.webActions.type('#userPassword', password);
        await this.webActions.click(this.loginButton);
        await this.webActions.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };

