import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import ParentPortalParentDashboardPage from './ParentPortalParentDashboardPage';

export default class EnrolmentSuccessPage {
    private page: Page;
    private webActions: WebActions;
    private goToParentPortalButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.goToParentPortalButton = this.page.locator("//button[contains(text(),'Go to Parent Portal')]");
    
    }  
    
    async clickGoToParentPortal(): Promise<ParentPortalParentDashboardPage> {
        await this.webActions.click(this.goToParentPortalButton);
        return this.poManager.getParentPortalParentDashboardPage();
    }

}