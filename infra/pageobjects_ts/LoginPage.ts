import { Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';// Adjust path as needed

export class LoginPage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async goTo() {
        await this.webActions.goto("https://rahulshettyacademy.com/client");
        await this.webActions.waitForLoadState('networkidle');
    }

    async validLogin(username: string, password: string) {
        await this.webActions.type('#userEmail', username);
        await this.webActions.type('#userPassword', password);
        await this.webActions.click("[value='Login']");
        await this.webActions.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };

