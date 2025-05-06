import {test, expect,Locator,Page} from '@playwright/test';
import { CheckOutUserStateSelectionPage } from './CheckOutUserStateSelectionPage';
import { POManager } from './POManager';


export class CheckOutParentDetailsPage {
    parentFirstNameInput : Locator;
    parentEmailInput :Locator;
    newsletterSubscriptionInput : Locator;
    nextButton : Locator;
    localeSelector :Locator;
    changeLanguageDropdown : Locator;
    confirmLocaleButton : Locator;
    page : Page;

constructor(page:Page, private poManager: POManager)
{
    this.page = page;
    this.parentFirstNameInput= page.locator("input[id='firstName']");
    this.parentEmailInput = page.locator("input[id='email']");
    this.newsletterSubscriptionInput = page.locator("label[data-tracking-id='UserInfoContainer.Checkbox.checkNewsletterSubscription']>span:nth-of-type(1)");
    this.nextButton= page.locator("button[data-tracking-id='UserInfoContainer.Button.goNext']");
    this.localeSelector = page.locator("div[data-tracking-id='NavBar.NavItem.openLocaleSelectionModal']/p[2]");
    this.changeLanguageDropdown= page.locator("(input[data-tracking-id='Select.selectOption']/parent::div)[2]");
    this.confirmLocaleButton = page.locator("button[data-tracking-id='LocationSelectDrawer.Button.confirm']");

}

async goTo()
{
    await this.page.goto("https://portal.rc.euka.edu.au/checkout?selectedCountry=AU");
    //await this.page.waitForLoadState('networkidle');
}

async fillParentFirstName(firstName:string)
{
    await this.parentFirstNameInput.type(firstName);
}

async fillParentEmail(email:string)
{
    await this.parentEmailInput.type(email);
}

async selectNewsletterSubscription()
{
    await this.newsletterSubscriptionInput.click();
}

async clickNextButton(): Promise<CheckOutUserStateSelectionPage> {
    await this.nextButton.click();
    return this.poManager.getCheckOutUserStateSelectionPage();
  }

async clickOnLocaleSelector()
{
    await this.localeSelector.click();
}

async changeLanguage(locale:String)
{
    let languageOption = this.page.locator("//div[@data-tracking-id='Select.Option." + locale + "']")
    await this.changeLanguageDropdown.click();
    await languageOption.click();
}

async clickConfirmLocaleButton()
{
    await this.confirmLocaleButton.click();
}

}
module.exports = {CheckOutParentDetailsPage};