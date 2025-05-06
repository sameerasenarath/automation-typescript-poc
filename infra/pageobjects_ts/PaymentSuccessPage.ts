import { Page } from '@playwright/test';
import {WebActions} from "../functions/WebActions";

// Adjust the import path as needed

export class PaymentSuccessPage {
    // CSS selector for the header text
    private static readonly headerText = '#thank-you h4:nth-of-type(1)';
    private page: Page;
    private webActions: WebActions;

    constructor(page: Page) {
        this.page = page;
        this.webActions = new WebActions(page);
    }

    // Check if the parent email is visible
    public async isParentEmailVisible(parentEmail: string, page:Page): Promise<boolean> {
        const parentEmailElement = '#thank-you p';
        await page.locator(parentEmailElement).scrollIntoViewIfNeeded();
        await page.waitForSelector(parentEmailElement);
        const emailText = await page.locator(parentEmailElement).textContent();
        return emailText?.includes(parentEmail) ?? false;
        
    }
}
export default PaymentSuccessPage;