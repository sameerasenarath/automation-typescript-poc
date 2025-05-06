import {test, expect, BrowserContext, chromium, Page} from '@playwright/test';
import {customTest} from '../utils_ts/test-base';

import {POManager} from '../pageobjects_ts/POManager';
import generateRandomString from "../functions/generateRandomString";
import {GradeSelectorPortalMap} from "../eukaObjectsFactory/GradeSelectorPortal";
import {Mail} from "../functions/Mail";
import {ExtractEmails} from "../functions/ExtractEmails";

//Json->string->js object
const data = JSON.parse(JSON.stringify(require("../utils/newCustomerFullYearCheckOutTestData.json")));
let webContext: BrowserContext;
let poManager: POManager;
let parentEmail: string;
let page : Page;

test.beforeAll(async ({browser}) => {
    webContext = await browser.newContext({
        storageState: './utils/sessionInfo.json',
        recordVideo: { dir: 'videos/' }
    });
})

test.afterAll(async ({}, testInfo) => {
    // Attach video after test execution
    const videoPath = await page.video()?.path();
    if (videoPath) {
        await testInfo.attach('Test Video', {
            path: videoPath,
            contentType: 'video/webm',
        });
    }
});


test(`newUserCheckoutFlowTest`, async ({}) => {
    page = await webContext.newPage();
    let checkOutUserStateSelectionPage = poManager.getCheckOutUserStateSelectionPage();

    await test.step("Run Tests in Full screen Mode", async () => {
        const viewportSize = await page.evaluate(() => ({width: window.innerWidth, height: window.innerHeight}));
        await page.setViewportSize(viewportSize);
        poManager = new POManager(page);
        // Attach a custom message to the report
        await test.info().attach('Welcome To Main Screen Header', {
            body: 'Welcome To Main Screen',
            contentType: 'text/plain',
        });
    })

    await test.step("Fill Parent details and Navigate to country and state selection page", async () => {
        const checkOutParentDetailsPage = poManager.getCheckOutParentDetailsPage();
        await checkOutParentDetailsPage.goTo();
        await checkOutParentDetailsPage.fillParentFirstName(data[0].parentFirstName);
        parentEmail = data[0].parentEmail.replace('%s', generateRandomString(4));
        await checkOutParentDetailsPage.fillParentEmail(parentEmail);
        await checkOutParentDetailsPage.selectNewsletterSubscription();
        checkOutUserStateSelectionPage = await checkOutParentDetailsPage.clickNextButton();
    });

    

    await test.step("Select country and state and navigate to Grade selection page", async () => {
        //const checkOutUserStateSelectionPage = poManager.getCheckOutUserStateSelectionPage()
        await checkOutUserStateSelectionPage.selectCountry("AU");
        await checkOutUserStateSelectionPage.selectState("NSW");
        await checkOutUserStateSelectionPage.clickNextButton();

    })

    await test.step("Select Grade and navigate to membership selection page", async () => {
        const gradeSelectionPage = poManager.getGradeSelectionPage();
        await gradeSelectionPage.selectGrade(GradeSelectorPortalMap.GRADE_1, page);
        await gradeSelectionPage.clickNextButton();

    })

    await test.step("Select payment plan and navigate to premium service selection page", async () => {
        const membershipSelectionPage = poManager.getMembershipSelectionPage();
        await membershipSelectionPage.clickNextButton();
    })

    await test.step("Select premium services and navigate to payment page", async () => {
        const premiumServiceSelectionPage = poManager.getSelectPremiumServicePage();
        await premiumServiceSelectionPage.clickNextButton();
    });
    await test.step("Fill payment details and navigate to review page", async () => {
        const paymentPage = poManager.getPaymentPage();
        await paymentPage.enterCCNumber("4111 1111 1111 1111")
        await paymentPage.enterCCExpiry("01/29")
        await paymentPage.enterCCCVC("456")
        await paymentPage.enterCCHolderName("Test user")
        await paymentPage.selectCountry()
        await paymentPage.enterAddressLine1("Test Address line 1/11")
        await paymentPage.enterAddressLine2("Test Address line 2#34")
        await paymentPage.enterCity("Sydney")
        await paymentPage.selectState()
        await paymentPage.enterPostalCode("8347")
        await paymentPage.selectCountryCode()
        await paymentPage.enterPhoneNumber("0707070707")
        await paymentPage.checkTerms()
        await paymentPage.clickPayButton()
    })

    await test.step("Verify payment success page", async () => {
        const paymentSuccessPage = poManager.getPaymentSuccessPage();
        const parentEmailVisible = await paymentSuccessPage.isParentEmailVisible(parentEmail, page);
        console.log("Is Parent Email Visible in payemt success Page: ", parentEmailVisible);
        await expect(parentEmailVisible).toBeTruthy();
        })

        await test.step("Fetch the enrolment link and navigate to enrolment page", async () => {
            const URL = await ExtractEmails.extractEnrolmentUrl(parentEmail)

            //console.log("MailBODY ::: >>> "+mailBody);
            console.log("URL ::: >>> "+URL);
            const enrolmentHomePage = poManager.getEnrolmentHomePage();
            await enrolmentHomePage.goTo(URL)

        })


});

