import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';
import { POManager } from './POManager'; // Adjust path as needed
const config = require("../../utils/config/MainConfig.json");

export class LoginPage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);

        this.emailInput = page.locator("input[data-tracking-id='LoginContainer.FormField.Input.usernameInput']");
        this.passwordInput = page.locator("input[data-testid='password']");
        this.loginButton = page.locator("button[data-tracking-id='LoginContainer.Button.logIn']");
    }

    async navigateToLoginPage() {
        await this.webActions.goto(config[0].parentPortalUrl);
        await this.webActions.waitForLoadState('networkidle');
    }

    async performLoginWithValidCredentials(username: string, password: string)   {
        await this.webActions.type(this.emailInput, username);
        await this.webActions.type(this.passwordInput, password);
        await this.webActions.click(this.loginButton);
        await this.webActions.waitForLoadState('networkidle');
        return this.poManager.getDashboardPage();
    }
}

module.exports = { LoginPage };
