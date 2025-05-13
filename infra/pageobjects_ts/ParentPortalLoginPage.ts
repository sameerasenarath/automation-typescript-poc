import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import ParentPortalManageProgramsPage from './ParentPortalManageProgramsPage';
import ParentPortalParentDashboardPage from './ParentPortalParentDashboardPage';
const config = require("../../resources/config/MainConfig.json");

export default class ParentPortalLoginPage {
   
    private page: Page;
    private webActions: WebActions;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.emailInput = this.page.locator("//input[@name='username']");
        this.passwordInput = this.page.locator("//input[@name='password']");
        this.loginButton = this.page.locator("//button[@data-tracking-id='LoginContainer.Button.logIn']");
    }  
    async goTo() {
        await this.webActions.goto(config[0].portalUrl);
    }
    async enterEmail(): Promise<ParentPortalLoginPage> {
        await this.webActions.typeOnElement(this.emailInput, "sameera.s+POC_15IK@euka.edu.au");
        return this;
    }
    async enterPassword(): Promise<ParentPortalLoginPage> {
        await this.webActions.typeOnElement(this.passwordInput, "Test@123");
        return this;
    }
    async clickLoginButton(): Promise<ParentPortalParentDashboardPage> {
        await this.webActions.click(this.loginButton);
        return this.poManager.getParentPortalParentDashboardPage();
    }

}