import { Page } from '@playwright/test';
import { test } from '../../../utils/test-fixtures';
import { POManager } from '../../../infra/pageobjects_ts/POManager';
import generateRandomString from '../../../infra/functions/generateRandomString';
import CheckOutUserStateSelectionPage from '../../../infra/pageobjects_ts/CheckOutUserStateSelectionPage';

const data = JSON.parse(JSON.stringify(require("../../../utils/testData/newCustomerFullYearCheckOutTestData.json")));

let page : Page;
let poManager: POManager;

let parentEmail: string;


test(`dataPreparationForNotification`, async ({page}) => {
  poManager = new POManager(page);
    let checkOutUserStateSelectionPage: CheckOutUserStateSelectionPage;

    await test.step("Step 1 - Fill Parent details and Navigate to country and state selection page", async () => {
        const checkOutParentDetailsPage = poManager.getCheckOutParentDetailsPage();
        await checkOutParentDetailsPage.goTo();
        await checkOutParentDetailsPage.fillParentFirstName(data[0].parentFirstName);
        parentEmail = data[0].parentEmail.replace('%s', generateRandomString(4));
        await checkOutParentDetailsPage.fillParentEmail(parentEmail);
        await checkOutParentDetailsPage.selectNewsletterSubscription();
        checkOutUserStateSelectionPage = await checkOutParentDetailsPage.clickNextButton();
        });
    
  });
