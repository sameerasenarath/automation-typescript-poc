import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import MembershipSelectionPage from './MembershipSelectionPage';
import { WebActions } from '../functions/WebActions';// Adjust path as needed

export class GradeSelectionPage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async selectGrade(gradeSelectorPortal: { gradeLink: string }) {
        const gradeLocator = this.page.locator(gradeSelectorPortal.gradeLink);
        const nextButton = this.page.locator("button[data-tracking-id='AgeGroupContainer.Button.goNextFromProductFamilySelectPage']");

        while (!(await nextButton.isEnabled())) {
            await gradeLocator.waitFor({ state: 'visible' });
            await this.webActions.click(gradeSelectorPortal.gradeLink);
        }

        return this;
    }

    async clickNextButton(): Promise<MembershipSelectionPage> {
        await this.webActions.click("button[data-tracking-id='AgeGroupContainer.Button.goNextFromProductFamilySelectPage']");
        return this.poManager.getMembershipSelectionPage();
    }
}

export default GradeSelectionPage;
