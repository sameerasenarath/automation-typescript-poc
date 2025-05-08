import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import ParentPortalManageProgramsPage from './ParentPortalManageProgramsPage';

export default class ParentPortalParentDashboardPage {
    private page: Page;
    private webActions: WebActions;
    private manageProgramsSection: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.manageProgramsSection = this.page.locator("//a[@data-tracking-id='Link.managePrograms']/div");
    }  
    
    async clickManagePrograms(): Promise<ParentPortalManageProgramsPage> {
        await this.webActions.click(this.manageProgramsSection);
        return this.poManager.getParentPortalManageProgramsPage();
    }

}