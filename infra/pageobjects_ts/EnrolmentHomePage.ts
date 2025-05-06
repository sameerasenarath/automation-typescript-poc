import { Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions';  // Adjust path as necessary

export default class EnrolmentHomePage {
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    async goTo(url: string | null) {
        if (typeof url === 'string') {
            await this.webActions.goto(url);
            await this.webActions.waitForLoadState('networkidle');
        }
    }

    async clickNextButton() {
        await this.webActions.click("button[data-tracking-id='UserInfoContainer.Button.goNext']");
    }
}
