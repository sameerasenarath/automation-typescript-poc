import { Locator, Page } from '@playwright/test';

export class GradeSelectionPage {
    private nextButton: Locator;
    private page: Page;

    constructor(page: Page) {
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

    async clickNextButton(){
        await this.nextButton.click();
    }
}

export default GradeSelectionPage;