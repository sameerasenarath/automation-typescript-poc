import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import MembershipSelectionPage from './MembershipSelectionPage';
import { WebActions } from '../functions/WebActions';
import { GradeSelectorPortal, GradeSelectorPortalMap, GradeSelectorPortalDetails } from "../eukaObjectsFactory/GradeSelectorPortal";

export class GradeSelectionPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;


    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = page.locator("button[data-tracking-id='AgeGroupContainer.Button.goNextFromProductFamilySelectPage']");

    }

    async selectGrade(gradeDetails: GradeSelectorPortalDetails) {
        const gradeLocator = gradeDetails.getGradeLink();
    
        while (!(await this.nextButton.isEnabled())) {
            await gradeLocator.waitFor({ state: 'visible' });
            await gradeLocator.click();
        }
    
        return this;
    }

    async clickNextButton(): Promise<MembershipSelectionPage> {
        await this.webActions.click(this.nextButton);
        return this.poManager.getMembershipSelectionPage();
    }
}

export default GradeSelectionPage;
