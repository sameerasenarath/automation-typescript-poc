import { Locator, Page, expect } from '@playwright/test';
import { WebActions } from '../functions/WebActions';
import { POManager } from './POManager'; // Adjust path if needed
const config = require("../../utils/config/MainConfig.json");

export class DashboardPage {
    private switchToStudentPortalLink: Locator;
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);

        this.switchToStudentPortalLink = page.locator("a[data-tracking-id='DashboardContainer.Button.switchToStudentPortal']");
    }

    async navigateToDashboard() {
        await this.webActions.goto(config[0].dashboardUrl); // Ensure this key exists in config
        await this.webActions.waitForLoadState('networkidle');
    }

    async clickSwitchToStudentPortal() {
        await this.webActions.click(this.switchToStudentPortalLink);
        await this.webActions.waitForLoadState('networkidle');
    }

    async isSwitchToStudentPortalLinkVisible(): Promise<boolean> {
        return await this.switchToStudentPortalLink.isVisible();
    }
}

module.exports = { DashboardPage };
