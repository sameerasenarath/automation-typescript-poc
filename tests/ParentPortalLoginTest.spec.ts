import { test, expect, BrowserContext, Page } from '@playwright/test';
import { POManager } from '../infra/pageobjects_ts/POManager';
import { LoginPage } from '../infra/pageobjects_ts/LoginPage'; // Ensure correct path
const loginTestData = JSON.parse(JSON.stringify(require("../resources/testData/parentLoginTestData.json")));

let webContext: BrowserContext;
let page: Page;
let poManager: POManager;

test.beforeAll(async ({ browser }) => {
    webContext = await browser.newContext({
        storageState: './resources/sessionCookies/sessionInfo.json',
        recordVideo: { dir: 'report_data/videos/' }
    });
});

test.afterAll(async ({ }, testInfo) => {
    const videoPath = await page.video()?.path();
    if (videoPath) {
        await testInfo.attach('Login Test Video', {
            path: videoPath,
            contentType: 'video/webm',
        });
    }
});

for (const { email, password } of loginTestData) {
    test(`parentPortalLoginTest - ${email}`, async ({ }) => {
        page = await webContext.newPage();

        await test.step("Step 1 - Launch portal and login", async () => {
            poManager = new POManager(page);
            const loginPage: LoginPage = poManager.getLoginPage();

            const viewportSize = await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight }));
            await page.setViewportSize(viewportSize);

            await loginPage.navigateToLoginPage();
            await loginPage.performLoginWithValidCredentials(email, password);

            await test.info().attach('Login Attempt', {
                body: `Tried logging in with email: ${email}`,
                contentType: 'text/plain',
            });
        });

        /*await test.step("Step 2 - Verify user is logged in successfully", async () => {
            // Modify based on actual post-login behavior
            const dashboardVisible = await page.locator("a[data-tracking-id='DashboardContainer.Button.switchToStudentPortal']").isVisible();
            console.log(`Login success for ${email}: ${dashboardVisible}`);
            expect(dashboardVisible).toBeTruthy();
        });*/
    });
}
