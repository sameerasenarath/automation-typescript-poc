import { Locator, Page } from '@playwright/test';
import { POManager } from './POManager';
import MembershipSelectionPage from './MembershipSelectionPage';

export class GradeSelectionPage {
    private nextButton: Locator;
    private page: Page;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.nextButton = page.locator("button[data-tracking-id='AgeGroupContainer.Button.goNextFromProductFamilySelectPage']");
    }

    async selectGrade(gradeSelectorPortal: { gradeLink: string },page: Page) {
        // Wait until the next button is clickable
        while (!(await this.nextButton.isEnabled())) {
            await page.locator(gradeSelectorPortal.gradeLink).waitFor({ state: 'visible' });
            await page.locator(gradeSelectorPortal.gradeLink).click();
        }
        return this;
    }

    async clickNextButton(): Promise<MembershipSelectionPage> {
        await this.nextButton.click();
        return this.poManager.getMembershipSelectionPage();
    }
}

export default GradeSelectionPage;