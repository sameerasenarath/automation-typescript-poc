import { test, expect, BrowserContext, chromium, Page } from '@playwright/test';

import { POManager } from '../../infra/pageobjects_ts/POManager';
import generateRandomString from "../../infra/functions/generateRandomString";
import { GradeSelectorPortal, GradeSelectorPortalMap } from "../../infra/eukaObjectsFactory/GradeSelectorPortal";
import { Mail } from "../../infra/functions/Mail";
import { ExtractEmails } from "../../infra/functions/ExtractEmails";
import CheckOutUserStateSelectionPage from "../../infra/pageobjects_ts/CheckOutUserStateSelectionPage";
import GradeSelectionPage from '../../infra/pageobjects_ts/GradeSelectionPage';
import MembershipSelectionPage from '../../infra/pageobjects_ts/MembershipSelectionPage';
import SelectPremiumServicePage from '../../infra/pageobjects_ts/SelectPremiumServicePage';
import PaymentPage from '../../infra/pageobjects_ts/PaymentPage';
import PaymentSuccessPage from '../../infra/pageobjects_ts/PaymentSuccessPage';
import { EukaCountryStates } from '../../infra/eukaObjectsFactory/enum/EukaCountryState';
import { UserCheckoutFlows } from '../../infra/eukaObjectsFactory/enum/UserCheckoutFlows';
import {PaymentPlans} from "../../infra/eukaObjectsFactory/PaymentPlans";
import EnrolmentStudentInfoPage from "../../infra/pageobjects_ts/EnrolmentStudentInfoPage";
import EnrolmentParentDetailsPage from "../../infra/pageobjects_ts/EnrolmentParentDetailsPage";
import EnrolmentCreatePasswordPage from "../../infra/pageobjects_ts/EnrolmentCreatePasswordPage";
import EnrolmentStudentDetailsPage from "../../infra/pageobjects_ts/EnrolmentStudentDetailsPage";
import EnrolmentSelectProgramPage from "../../infra/pageobjects_ts/EnrolmentSelectProgramPage";
import EnrolmentStudentPerformancePage from "../../infra/pageobjects_ts/EnrolmentStudentPerformancePage";
import EnrolmentSuccessPage from "../../infra/pageobjects_ts/EnrolmentSuccessPage";

//Json->string->js object
const data = JSON.parse(JSON.stringify(require("../../resources/testData/newCustomerFullYearCheckOutTestData.json")));
let webContext: BrowserContext;
let poManager: POManager;
let parentEmail: string;
let page: Page;

test.beforeAll(async ({ browser }) => {
    webContext = await browser.newContext({
        storageState: './resources/sessionCookies/sessionInfo.json',
        recordVideo: { dir: 'report_data/videos/' }
    });
})

test.afterAll(async ({ }, testInfo) => {
    // Attach video after test execution
    const videoPath = await page.video()?.path();
    if (videoPath) {
        await testInfo.attach('Test Video', {
            path: videoPath,
            contentType: 'video/webm',
        });
    }
});


test(`generalDataPreparationTest`, async ({ }) => {
    page = await webContext.newPage();
    let checkOutUserStateSelectionPage: CheckOutUserStateSelectionPage;
    let gradeSelectionPage: GradeSelectionPage;
    let membershipSelectionPage: MembershipSelectionPage;
    let selectPremiumServicePage: SelectPremiumServicePage;
    let paymentPage: PaymentPage;
    let paymentSuccessPage: PaymentSuccessPage;
    let enrolmentParentDetailsPage: EnrolmentParentDetailsPage;
    let enrolmentCreatePasswordPage: EnrolmentCreatePasswordPage;
    let enrolmentStudentDetailsPage: EnrolmentStudentDetailsPage;
    let enrolmentSelectProgramPage: EnrolmentSelectProgramPage;
    let enrolmentStudentInfoPage: EnrolmentStudentInfoPage;
    let enrolmentStudentPerformancePage: EnrolmentStudentPerformancePage;
    let enrolmentSuccessPage: EnrolmentSuccessPage;

    await test.step("Step 1 - Run Tests in Full screen Mode", async () => {
        const viewportSize = await page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight }));
        await page.setViewportSize(viewportSize);
        poManager = new POManager(page);
        // Attach a custom message to the report
        await test.info().attach('Welcome To Main Screen Header', {
            body: 'Welcome To Main Screen',
            contentType: 'text/plain',
        });
    })

    await test.step("Step 2 - Fill Parent details and Navigate to country and state selection page", async () => {
        const checkOutParentDetailsPage = poManager.getCheckOutParentDetailsPage();
        await checkOutParentDetailsPage.goTo();
        await checkOutParentDetailsPage.fillParentFirstName(data[0].parentFirstName);
        parentEmail = data[0].parentEmail.replace('%s', generateRandomString(4));
        console.log("URL ::: >>> " + parentEmail);
        await checkOutParentDetailsPage.fillParentEmail(parentEmail);
        await checkOutParentDetailsPage.selectNewsletterSubscription();
        checkOutUserStateSelectionPage = await checkOutParentDetailsPage.clickNextButton();
    });



    await test.step("Step 3 - Select country and state and navigate to Grade selection page", async () => {
        await checkOutUserStateSelectionPage.selectCountry("AU");
        await checkOutUserStateSelectionPage.selectState(EukaCountryStates.NSW.stateShortName);
        gradeSelectionPage = await checkOutUserStateSelectionPage.clickNextButton();
    })

    await test.step("Step 4 - Select Grade and navigate to membership selection page", async () => {
        const gradeMap = GradeSelectorPortalMap(page); // Pass the Playwright Page instance
        await gradeSelectionPage.selectGrade(gradeMap[GradeSelectorPortal.GRADE_1]);
        membershipSelectionPage = await gradeSelectionPage.clickNextButton();

    })

    await test.step("Step 5 - Select payment plan and navigate to premium service selection page", async () => {
        await membershipSelectionPage.selectFullYearProgram();
        selectPremiumServicePage = await membershipSelectionPage.clickNextButton();
    })

    await test.step("Step 6 - Select premium services and navigate to payment page", async () => {
        paymentPage = await selectPremiumServicePage.clickNextButton();
    });
    await test.step("Step 7 - Fill payment details and navigate to review page", async () => {
        paymentSuccessPage = await paymentPage.paymentWithCreditCard(
            UserCheckoutFlows.CHECKOUT_AS_NEW_PARENT,
            false
        );
    })

    await test.step("Step 8 - Verify payment success page", async () => {
        const parentEmailVisible = await paymentSuccessPage.isParentEmailVisible(parentEmail, page);
        console.log("Is Parent Email Visible in payemt success Page: ", parentEmailVisible);
        await expect(parentEmailVisible).toBeTruthy();
    })

    await test.step("Step 9 - Fetch the enrolment link and navigate to enrolment page", async () => {
        const URL = await ExtractEmails.extractEnrolmentUrl(parentEmail)

        //console.log("MailBODY ::: >>> "+mailBody);
        console.log("URL ::: >>> " + URL);
        const enrolmentHomePage = poManager.getEnrolmentHomePage();
        await enrolmentHomePage.goTo(URL)
        enrolmentParentDetailsPage = await enrolmentHomePage.clickGetStartedButton();
    })

    await test.step("Step 10 - Fill parent details and goto set password page", async () => {
        await enrolmentParentDetailsPage.enterParentDetails("AutomationTEST","Parent");
        await enrolmentParentDetailsPage.selectReason()
        await enrolmentParentDetailsPage.selectFindEukaReason()
        enrolmentCreatePasswordPage = await enrolmentParentDetailsPage.clickNextButton();
    })

    await test.step("Step 11 - Create password and goto student enrolment page", async () => {
        await enrolmentCreatePasswordPage.enterPassword("Test@123");
        enrolmentStudentDetailsPage = await enrolmentCreatePasswordPage.clickSetPasswordButton();
    })

    await test.step("Step 12 - Fill Student details and select enrolled program", async () => {
        await enrolmentStudentDetailsPage.fillStudentDetails("AutomationTEST", "Student");
        enrolmentSelectProgramPage = await enrolmentStudentDetailsPage.clickNextButton();
        enrolmentStudentInfoPage = await enrolmentSelectProgramPage.clickNextButton(
            GradeSelectorPortal.GRADE_5,
            PaymentPlans.FULL_YEAR
        ) as EnrolmentStudentInfoPage;
    })

    await test.step("Step 13 - Select starting term and mark performance indicators", async () => {
        await enrolmentStudentInfoPage.selectTerm("Term 2");
        enrolmentStudentPerformancePage = await enrolmentStudentInfoPage.clickNextButton();
        enrolmentSuccessPage = await enrolmentStudentPerformancePage.clickNextButton();
    })

});

