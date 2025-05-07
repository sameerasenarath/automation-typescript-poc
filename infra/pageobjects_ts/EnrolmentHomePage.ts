import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import  EnrolmentParentDetailsPage from './EnrolmentParentDetailsPage';
import { POManager } from './POManager';

export default class EnrolmentHomePage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;
    private getStartedButton: Locator;  

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("button[data-tracking-id='UserInfoContainer.Button.goNext']");
        this.getStartedButton = this.page.locator("//a[@data-tracking-id='InitiateEnrolmentContainer.Link.getStartedLink']/span");
    }

    async goTo(url: string | null) {
        if (typeof url === 'string') {
            await this.webActions.goto(url);
            await this.webActions.waitForLoadState('networkidle');
        }
    }

    async clickGetStartedButton(): Promise<EnrolmentParentDetailsPage> {
        await this.webActions.click(this.getStartedButton);
        return  this.poManager.getEnrolmentParentDetailsPage();
    }

    async clickNextButton() {
        await this.webActions.click(this.nextButton);
    }
}
