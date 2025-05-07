import { Page } from '@playwright/test';
import { test } from '../../../utils/test-fixtures';
import { POManager } from '../../../infra/pageobjects_ts/POManager';
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

const data = JSON.parse(JSON.stringify(require("../../../utils/testData/newCustomerFullYearCheckOutTestData.json")));

let page: Page;
let poManager: POManager;

let parentEmail: string;


test(`dataPreparationForNotification`, async ({ page }) => {
  poManager = new POManager(page);
  let checkOutUserStateSelectionPage: CheckOutUserStateSelectionPage;
  let gradeSelectionPage: GradeSelectionPage;
  let membershipSelectionPage: MembershipSelectionPage;
  let selectPremiumServicePage: SelectPremiumServicePage;
  let paymentPage: PaymentPage;
  let paymentSuccessPage: PaymentSuccessPage;

  await test.step("Step 1 - Fill Parent details and Navigate to country and state selection page", async () => {
    const checkOutParentDetailsPage = poManager.getCheckOutParentDetailsPage();
    await checkOutParentDetailsPage.goTo();
    await checkOutParentDetailsPage.fillParentFirstName(data[0].parentFirstName);
    parentEmail = data[0].parentEmail.replace('%s', generateRandomString(4));
    await checkOutParentDetailsPage.fillParentEmail(parentEmail);
    await checkOutParentDetailsPage.selectNewsletterSubscription();
    checkOutUserStateSelectionPage = await checkOutParentDetailsPage.clickNextButton();
  });


  await test.step("Step 2 - Select country and state and navigate to Grade selection page", async () => {
    await checkOutUserStateSelectionPage.selectCountry("AU");
    await checkOutUserStateSelectionPage.selectState(EukaCountryStates.NSW.stateShortName);
    gradeSelectionPage = await checkOutUserStateSelectionPage.clickNextButton();
  })

  await test.step("Step 3 - Select grade and navigate to subject info page", async () => {
    const gradeMap = GradeSelectorPortalMap(page); // Pass the Playwright Page instance
    await gradeSelectionPage.selectGrade(gradeMap[GradeSelectorPortal.GRADE_1]);
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
      const paymentSuccessPage = await paymentPage.paymentWithCreditCard(
        UserCheckoutFlows.CHECKOUT_AS_NEW_PARENT,
        false
      );
      })

});
