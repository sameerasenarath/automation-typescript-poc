import { Page } from '@playwright/test';

export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load') {
        await this.page.waitForLoadState(state);
    }

    async click(selector: string) {
        await this.page.locator(selector).click();
    }

    async type(selector: string, text: string) {
        await this.page.locator(selector).fill(text);
    }

    async getText(selector: string): Promise<string> {
        return await this.page.locator(selector).innerText();
    }

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isVisible();
    }

    async getAttribute(selector: string, attribute: string): Promise<string | null> {
        return await this.page.locator(selector).getAttribute(attribute);
    }

    async selectOption(selector: string, value: string) {
        await this.page.locator(selector).selectOption(value);
    }

    async hover(selector: string) {
        await this.page.locator(selector).hover();
    }

    async pressKey(selector: string, key: string) {
        await this.page.locator(selector).press(key);
    }

    async waitForTimeout(milliseconds: number) {
        await this.page.waitForTimeout(milliseconds);
    }
}
