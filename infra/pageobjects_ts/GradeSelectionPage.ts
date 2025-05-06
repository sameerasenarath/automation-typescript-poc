import { Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';// Adjust path as needed

export class GradeSelectionPage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
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

    async clickNextButton() {
        await this.webActions.click("button[data-tracking-id='AgeGroupContainer.Button.goNextFromProductFamilySelectPage']");
    }
}

export default GradeSelectionPage;
