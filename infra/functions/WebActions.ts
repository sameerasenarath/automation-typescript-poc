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

    async type(target: string | Locator, text: string): Promise<void> {
        if (typeof target === 'string') {
            await this.page.locator(target).fill(text);
        } else {
            await target.fill(text);
        }
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

      async typeOnElement(locator: Locator, textToType: string): Promise<void> {
        await this.typeOnElementWithOption(locator, textToType, false);
      }
    
      async typeOnElementWithOption(locator: Locator, textToType: string, typeSequentially: boolean): Promise<void> {
        await this.page.waitForLoadState('load', { timeout: 30000 });
    
        if (typeSequentially) {
          await locator.waitFor({ state: 'visible' });
          await locator.pressSequentially(textToType);
        } else {
          await locator.fill(textToType);
        }
      }

      async clickRandomFromDropDown(dropdownLocator: Locator, optionsLocator: Locator): Promise<void> {
        await dropdownLocator.click();
    
        const count = await optionsLocator.count();
        const randomIndex = Math.floor(Math.random() * count);
    
        console.log(`Selecting ${randomIndex}th item from dropdown`);
    
        await optionsLocator.nth(randomIndex).click();
      }

      async clickOptionByVisibleText(dropDownLocator: Locator, availableOptions: Locator, textToSelect: string): Promise<void> {
        await dropDownLocator.click();
      
        const optionCount = await availableOptions.count();
      
        for (let i = 0; i < optionCount; i++) {
          const option = availableOptions.nth(i);
          const text = await option.textContent();
      
          if (text?.trim() === textToSelect) {
            await option.click();
            break;
          }
        }
      }

      async waitForElementVisibility(elementLocator: Locator, timeout: number): Promise<void> {
        await elementLocator.waitFor({ state: 'visible', timeout });
      }

      async waitForElementInvisibility(elementLocator: Locator, timeout: number = 15000): Promise<void> {
        await elementLocator.waitFor({
          state: 'hidden',
          timeout: timeout,
        });
      }
}
