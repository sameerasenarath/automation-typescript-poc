import { test as base, Page, BrowserContext } from '@playwright/test';

type TestFixtures = {
  page: Page;
  webContext: BrowserContext;
};

export const test = base.extend<TestFixtures>({
  webContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: './resources/sessionCookies/sessionInfo.json',
      recordVideo: { dir: 'report_data/videos/' },
    });
    await use(context);
    await context.close();
  },

  page: async ({ webContext }, use) => {
    const page = await webContext.newPage();
    const viewportSize = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    await page.setViewportSize(viewportSize);
    await use(page);
  },
});

export { expect } from '@playwright/test';