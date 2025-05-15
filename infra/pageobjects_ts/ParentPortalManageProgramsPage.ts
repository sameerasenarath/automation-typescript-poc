import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';
import { POManager } from './POManager';
import ParentPortalStudentDetailsPage from './ParentPortalStudentDetailsPage';

export default class ParentPortalManageProgramsPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='EnrolmentInfoContainer.Button.next']");

    }

    async clickOnStudentSection(studentFirstName: string): Promise<ParentPortalStudentDetailsPage> {
        const studentNameLocator = this.page.locator(`//p[contains(text(),"${studentFirstName}")]/ancestor::div[@role="group"]//span[@data-tracking-id="ManageProgramsContainer.Button.ChevronRightButton"]/*[name()="svg"]`);
        await Promise.all([
            await this.page.waitForLoadState('networkidle'),
            await studentNameLocator.waitFor({ state: 'visible', timeout: 60000 }),
            await this.webActions.click(studentNameLocator),
            await this.page.waitForLoadState('networkidle')
        ]);
        return this.poManager.getParentPortalStudentDetailsPage();
    }

}