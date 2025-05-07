import { Locator, Page } from '@playwright/test';

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

    async click(locator: Locator) {
        await locator.click();
    }

    async type(selector: string, text: string) {
        await this.page.locator(selector).fill(text);
    }

    async getText(selector: string): Promise<string> {
        return await this.page.locator(selector).innerText();
    }

    async waitForSelector(locator: Locator) {
        await locator.waitFor({ state: 'visible', timeout: 15000 });
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

    async isElementVisible(locator: Locator): Promise<boolean> {
        try {
          await locator.waitFor({ state: 'visible', timeout: 15000 });
          return await locator.isVisible();
        } catch {
          return false;
        }
      }
}
