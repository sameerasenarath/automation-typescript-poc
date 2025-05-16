import { expect, Page } from '@playwright/test';
import { test } from '../../../resources/test-fixtures';
import { MainConfig } from '../../../infra/config/MainConfig';
import { EukaDetails } from '../../../infra/config/EukaDetails';
import { DateUtils } from '../../../infra/utils/DateUtils'; 
import { POManager } from '../../../infra/pageobjects_ts/POManager';
import { Parent } from "../../../infra/eukaObjectsFactory/Parent";
import { RandomGenerator } from "../../../infra/utils/RandomGenerator"
import { ReportLogger } from "../../../infra/utils/ReportLogger"
import generateRandomString from '../../../infra/functions/generateRandomString';
import CheckOutUserStateSelectionPage from '../../../infra/pageobjects_ts/CheckOutUserStateSelectionPage';
import GradeSelectionPage from '../../../infra/pageobjects_ts/GradeSelectionPage';
import EukaCountryState, { EukaCountryStates } from '../../../infra/eukaObjectsFactory/enum/EukaCountryState';
import { GradeSelectorPortal, GradeSelectorPortalMap } from '../../../infra/eukaObjectsFactory/GradeSelectorPortal';
import MembershipSelectionPage from '../../../infra/pageobjects_ts/MembershipSelectionPage';
import SelectPremiumServicePage from '../../../infra/pageobjects_ts/SelectPremiumServicePage';
import PaymentPage from '../../../infra/pageobjects_ts/PaymentPage';
import PaymentSuccessPage from '../../../infra/pageobjects_ts/PaymentSuccessPage';
import { UserCheckoutFlows } from '../../../infra/eukaObjectsFactory/enum/UserCheckoutFlows';
import { ExtractEmails } from '../../../infra/functions/ExtractEmails';
import EnrolmentParentDetailsPage from '../../../infra/pageobjects_ts/EnrolmentParentDetailsPage';
import EnrolmentCreatePasswordPage from '../../../infra/pageobjects_ts/EnrolmentCreatePasswordPage';
import EnrolmentStudentDetailsPage from '../../../infra/pageobjects_ts/EnrolmentStudentDetailsPage';
import EnrolmentSelectProgramPage from '../../../infra/pageobjects_ts/EnrolmentSelectProgramPage';
import EnrolmentStudentInfoPage from '../../../infra/pageobjects_ts/EnrolmentStudentInfoPage';
import EnrolmentStudentPerformancePage from '../../../infra/pageobjects_ts/EnrolmentStudentPerformancePage';
import { PaymentPlans } from '../../../infra/eukaObjectsFactory/PaymentPlans';
import EnrolmentSuccessPage from '../../../infra/pageobjects_ts/EnrolmentSuccessPage';
import ParentPortalParentDashboardPage from '../../../infra/pageobjects_ts/ParentPortalParentDashboardPage';
import ParentPortalManageProgramsPage from '../../../infra/pageobjects_ts/ParentPortalManageProgramsPage';
import ParentPortalStudentDetailsPage from '../../../infra/pageobjects_ts/ParentPortalStudentDetailsPage';
import { EukaPremiumServices } from '../../../infra/eukaObjectsFactory/EukaPremiumServices';

const data = JSON.parse(JSON.stringify(require("../../../resources/testData/newCustomerFullYearCheckOutTestData.json")));

let page: Page;
let poManager: POManager;
let parentEmail: string;
const date: string = DateUtils.getTodayDateAsString();
MainConfig.init();
EukaDetails.init();

test(`dataPreparationForNotification`, async ({ page }) => {
  poManager = new POManager(page);
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
  let parentPortalParentDashboardPage: ParentPortalParentDashboardPage;
  let parentPortalManageProgramsPage: ParentPortalManageProgramsPage;
  let parentPortalStudentDetailsPage: ParentPortalStudentDetailsPage;

  const parentEmail = `${MainConfig.config.gmailUsername}${EukaDetails.config.markingPortalPrefix}${date}${MainConfig.config.gmailDomain}`;
  const parent = new Parent(
    RandomGenerator.getParentFirstName(),
    RandomGenerator.getParentLastName(),
    parentEmail,
    GradeSelectorPortal.GRADE_11_UNIVERSITY_ASSESSED,
    PaymentPlans.FULL_YEAR,
    EukaPremiumServices.GOVERNMENT_REGISTRATION
  );

  await test.step("Step 1 - Fill Parent details and Navigate to country and state selection page", async () => {
    const checkOutParentDetailsPage = poManager.getCheckOutParentDetailsPage();
    await checkOutParentDetailsPage.navigateToCheckoutPage();
    await checkOutParentDetailsPage.fillParentFirstName(parent.parentFirstName);
    await checkOutParentDetailsPage.fillParentEmail(ReportLogger.logAndReturn("Generated parent email", parent.parentEmail));
    await checkOutParentDetailsPage.selectNewsletterSubscription();
    checkOutUserStateSelectionPage = await checkOutParentDetailsPage.clickNextButton();
  });


  await test.step("Step 2 - Select country and state and navigate to Grade selection page", async () => {
    await checkOutUserStateSelectionPage.selectCountry("AU");
    await checkOutUserStateSelectionPage.selectState(EukaCountryStates.NSW.stateShortName);
    gradeSelectionPage = await checkOutUserStateSelectionPage.clickNextButton();
  })

  await test.step("Step 3 - Select grade and navigate to subject info page", async () => {
    await gradeSelectionPage.selectGrade(parent.gradeDetails!);
    membershipSelectionPage = await gradeSelectionPage.clickNextButton();

  })

  await test.step("Step 4 - Select payment plan and navigate to premium services selection page", async () => {
    selectPremiumServicePage = await membershipSelectionPage.clickNextButton();
  })

  await test.step("Step 5 - Select registration premium services and navigate to payment page", async () => {
    await selectPremiumServicePage.selectRegistrationAddon();
    paymentPage = await selectPremiumServicePage.clickNextButton();
  });

  await test.step("Step 6 - Fill Payment details and make the payment", async () => {
    paymentSuccessPage = await paymentPage.paymentWithCreditCard(
      UserCheckoutFlows.CHECKOUT_AS_NEW_PARENT,
      false
    );
    const parentEmailVisible = await paymentSuccessPage.isParentEmailVisible(parentEmail, page);
    console.log("Is Parent Email Visible in payemt success Page: ", parentEmailVisible);
    expect.soft(parentEmailVisible).toBeTruthy();
  })

  await test.step("Step 7 - Fetch the enrolment link and navigate to enrolment page", async () => {
    const URL = await ExtractEmails.extractEnrolmentUrl(parentEmail)
    console.log("URL ::: >>> " + URL);
    const enrolmentHomePage = poManager.getEnrolmentHomePage();
    await enrolmentHomePage.goTo(URL)
    enrolmentParentDetailsPage = await enrolmentHomePage.clickGetStartedButton();
  })

  await test.step("Step 8 - Fill parent details and goto set password page", async () => {
    await enrolmentParentDetailsPage.enterParentDetails("AutomationTEST", "Parent");
    await enrolmentParentDetailsPage.selectReason()
    await enrolmentParentDetailsPage.selectFindEukaReason()
    enrolmentCreatePasswordPage = await enrolmentParentDetailsPage.clickNextButton();
  })

  await test.step("Step 9 - Create password and goto student enrolment page", async () => {
    await enrolmentCreatePasswordPage.enterPassword("Test@123");
    enrolmentStudentDetailsPage = await enrolmentCreatePasswordPage.clickSetPasswordButton();
  })

  await test.step("Step 10 - Fill Student details and select enrolled program", async () => {
    await enrolmentStudentDetailsPage.fillStudentDetails("AutomationTEST", "Student");
    enrolmentSelectProgramPage = await enrolmentStudentDetailsPage.clickNextButton();
    enrolmentStudentInfoPage = await enrolmentSelectProgramPage.clickNextButton(
      GradeSelectorPortal.GRADE_5,
      PaymentPlans.FULL_YEAR
    ) as EnrolmentStudentInfoPage;
  })

  await test.step("Step 11 - Select starting term and mark performance indicators", async () => {
    await enrolmentStudentInfoPage.selectTerm("Term 2");
    enrolmentStudentPerformancePage = await enrolmentStudentInfoPage.clickNextButton();
    enrolmentSuccessPage = await enrolmentStudentPerformancePage.clickNextButton();
  })

  await test.step("Step 12 - Verify student and grades in the success page and navigate to parent portal", async () => {
    parentPortalParentDashboardPage = await enrolmentSuccessPage.clickGoToParentPortal();
  })


  await test.step("Step 13 - Go to manage programs page", async () => {
    parentPortalManageProgramsPage = await parentPortalParentDashboardPage.clickManagePrograms();
  })

  await test.step("Step 14 - Go to student details page", async () => {
    parentPortalStudentDetailsPage = await parentPortalManageProgramsPage.clickOnStudentSection("AutomationTEST");
  })

  await test.step("Step 15 - Cancel the program auto-renewal", async () => {
    await parentPortalStudentDetailsPage.clickOnManageLink();
    await parentPortalStudentDetailsPage.clickCancelProgramRenewal();
    await parentPortalStudentDetailsPage.cancelProgramRenewal();
    await parentPortalStudentDetailsPage.waitUntilReady();
  })
});
