import {FrameLocator, Locator, Page} from '@playwright/test';
import { GradeSelectorPortalMap } from '../eukaObjectsFactory/GradeSelectorPortal'; // Assuming GradeSelectorPortal is defined elsewhere
//import { LocaleSlug, EukaCountryState, UserCheckoutFlows } from './config'; // Assuming these are defined elsewhere
//import { PaymentSuccessPage } from './PaymentSuccessPage'; // Assuming these pages are defined elsewhere
// import { ParentPortalParentDashboardPage } from './ParentPortalParentDashboardPage';
// import { ParentPortalManageProgramsPage } from './ParentPortalManageProgramsPage';
// import { CheckoutAddPremiumServiceSuccessPage } from './CheckoutAddPremiumServiceSuccessPage';
// import { SubjectSelectionSuccessPage } from './SubjectSelectionSuccessPage';
// import { ParentPortalStudentDetailsPage } from './ParentPortalStudentDetailsPage';

export class PaymentPage {
    private page: Page;

    // Locators
    private paymentPageHeader: Locator;
    private totalCostElement: Locator;
    private ccIframe: FrameLocator;
    private ccInput: Locator;
    private ccExpiryIframe: FrameLocator;
    private ccExpiryInput: Locator;
    private ccCVCIframe: FrameLocator;
    private ccCVCInput: Locator;
    private agreementCheckBox: Locator;
    private payButton: Locator;
    private couponCodeEnableLink: Locator;
    private couponCodeInput: Locator;
    private applyCouponCodeButton: Locator;
    private ccHolderNameInput: Locator;
    private countrySelectionDropdown: Locator;
    private addressLine1Input: Locator;
    private addressLine2Input: Locator;
    private cityInput: Locator;
    private stateSelectionDropdown: Locator;
    private postalCodeInput: Locator;
    private countryCodeSelectionDropdown: Locator;
    private phoneNumberInput: Locator;
    private existingPaymentElement: Locator;
    private discountedAmountElement: Locator;
    private instalmentWarningMessageElement: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators using CSS selectors
        this.paymentPageHeader = page.locator('div[data-tracking-id="PaymentDetailsContainer.Button.goBackFromPaymentPage"] + p');
        this.totalCostElement = page.locator('p[data-tracking-id="PaymentDetailsContainer.Text.totalAmount"]');
        this.ccIframe = page.frameLocator('iframe[name="cb-component-number-0"]');
        this.ccInput = this.ccIframe.locator('input[id="cardnumber"]');
        this.ccExpiryIframe = page.frameLocator('iframe[name="cb-component-expiry-1"]');
        this.ccExpiryInput = this.ccExpiryIframe.locator('input[id="exp-date"]');
        this.ccCVCIframe = page.frameLocator('iframe[name="cb-component-cvv-2"]');
        this.ccCVCInput = this.ccCVCIframe.locator('input[id="cvc"]');
        this.agreementCheckBox = page.locator('label[data-tracking-id="CardDetailsContainer.Checkbox.checkTermsAndConditions"]>span:first-of-type');
        this.payButton = page.locator('button[data-tracking-id="CardDetailsContainer.Button.pay"]');
        this.couponCodeEnableLink = page.locator('p:has-text("coupon code")');
        this.couponCodeInput = page.locator('input[data-tracking-id="PaymentDetailsContainer.FormField.Input.inputCouponCode"]');
        this.applyCouponCodeButton = page.locator('button[data-tracking-id="PaymentDetailsContainer.Button.applyCouponCode"]');
        this.ccHolderNameInput = page.locator('input[data-tracking-id="CardDetailsContainer.FormField.Input.inputCardName"]');
        this.countrySelectionDropdown = page.locator('div[data-tracking-id="BillingAddressContainer.FormField.inputCountry"]>div');
        this.addressLine1Input = page.locator('input[data-tracking-id="BillingAddressContainer.FormField.Input.inputAddressLine1"]');
        this.addressLine2Input = page.locator('input[data-tracking-id="BillingAddressContainer.FormField.Input.inputAddressLine2"]');
        this.cityInput = page.locator('input[data-tracking-id="BillingAddressContainer.FormField.Input.inputCity"]');
        this.stateSelectionDropdown = page.locator('div[data-tracking-id="BillingAddressContainer.FormField.inputState"]>div');
        this.postalCodeInput = page.locator('input[data-tracking-id="BillingAddressContainer.FormField.Input.inputPostalCode"]');
        this.countryCodeSelectionDropdown = page.locator('div[data-tracking-id="BillingAddressContainer.FormField.inputPhoneNumber"]>div>div');
        this.phoneNumberInput = page.locator('input[data-tracking-id="BillingAddressContainer.FormField.Input.inputPhoneNumber"]');
        this.existingPaymentElement = page.locator('div[data-tracking-id="CardDetailsContainer.paymentCaptureContainer"] form div:first-child div:first-child');
        this.discountedAmountElement = page.locator('div[data-tracking-id="PaymentDetailsContainer.Edit.changeCouponCode"] + p');
        this.instalmentWarningMessageElement = page.locator('div[data-status="warning"] div:has-text("Important information about your instalment plan")');
    }

    // Methods
    /*async getTotalCost(gradeSelectorPortal: GradeSelectorPortalMap, locale?: LocaleSlug): Promise<number> {
        await this.totalCostElement.waitFor({ state: 'visible' });
        const totalCostText = await this.totalCostElement.textContent();
        let totalCost: number;

        if (gradeSelectorPortal.gradeLevel === "Clever_Kids") {
            totalCost = parseFloat(totalCostText!.match(/\d{2}/)![0]);
        } else if (gradeSelectorPortal.gradeLevel === "Euka_Senior" || locale === LocaleSlug.VIETNAM_EN || locale === LocaleSlug.VIETNAM_VI) {
            const extractedCost = totalCostText!.match(/\d{1},\d{3}/)![0].replace(",", "");
            totalCost = parseFloat(extractedCost);
        } else {
            const extractedCost = totalCostText!.match(/\d+\.?\d*!/)![0].replace(",", "");
            totalCost = parseFloat(extractedCost);
        }

        console.log(`Extracted Total cost: ${totalCost}`);
        return totalCost;
    }*/

    async enterCCNumber(ccNumber: string): Promise<this> {
        await this.ccInput.fill(ccNumber);
        return this;
    }

    async enterCCExpiry(ccExpiryDate: string): Promise<this> {
        await this.ccExpiryInput.fill(ccExpiryDate);
        return this;
    }

    async enterCCCVC(ccCVC: string): Promise<this> {
        await this.ccCVCInput.fill(ccCVC);
        return this;
    }

    async enterCCHolderName(cardHolderName: string): Promise<this> {
        await this.ccHolderNameInput.fill(cardHolderName);
        return this;
    }

    async checkTerms(): Promise<this> {
        await this.agreementCheckBox.check();
        return this;
    }

    async enterCouponCode(couponCode: string): Promise<this> {
        await this.couponCodeInput.fill(couponCode);
        return this;
    }

    async clickCouponEnterLink(): Promise<this> {
        await this.couponCodeEnableLink.click();
        return this;
    }

    async clickApplyButton(): Promise<this> {
        await this.applyCouponCodeButton.click();
        return this;
    }

    async selectCountry(): Promise<this> {
        const searchedCountry = `div[data-tracking-id="Select.Option.AU"]`;
        await this.countrySelectionDropdown.click();
        await this.countrySelectionDropdown.type("Australia");
        await this.page.locator(searchedCountry).waitFor({ state: 'visible' });
        await this.page.locator(searchedCountry).click();
        return this;
    }

    async enterAddressLine1(addressLine1: string): Promise<this> {
        await this.addressLine1Input.fill(addressLine1);
        return this;
    }

    async enterAddressLine2(addressLine2: string): Promise<this> {
        await this.addressLine2Input.fill(addressLine2);
        return this;
    }

    async enterCity(city: string): Promise<this> {
        await this.cityInput.fill(city);
        return this;
    }

    async selectState(): Promise<this> {
        const searchedState = `div[data-tracking-id="Select.Option.${"New South Wales"}"]`;
        await this.stateSelectionDropdown.click();
        await this.stateSelectionDropdown.type("New South Wales");
        await this.page.locator(searchedState).waitFor({ state: 'visible' });
        await this.page.locator(searchedState).click();
        return this;
    }

    async enterPostalCode(postalCode: string): Promise<this> {
        await this.postalCodeInput.fill(postalCode);
        return this;
    }

    async selectCountryCode(): Promise<this> {
        const searchedCountryCode = `div[data-tracking-id="Select.Option.AU"]`;
        await this.countryCodeSelectionDropdown.click();
        await this.countryCodeSelectionDropdown.type("AU");
        await this.page.locator(searchedCountryCode).waitFor({ state: 'visible' });
        await this.page.locator(searchedCountryCode).click();
        return this;
    }

    async enterPhoneNumber(phoneNumber: string): Promise<this> {
        await this.phoneNumberInput.fill(phoneNumber);
        return this;
    }

    async clickPayButton(): Promise<any> {
        await this.page.waitForTimeout(2000); // Wait for 2 seconds to apply the coupon
        await this.payButton.click();
        await this.payButton.waitFor({ state: 'hidden', timeout: 90000 });
    }

    async selectExistingCard(): Promise<this> {
        await this.existingPaymentElement.click();
        return this;
    }

    async getDiscountedAmount(): Promise<number> {
        const discountAmountText = await this.discountedAmountElement.textContent();
        return parseFloat(discountAmountText!.match(/\d+\.?\d*/)![0]);
    }

    async isInstalmentWarningMessageShown(): Promise<boolean> {
        return await this.instalmentWarningMessageElement.isVisible();
    }

    async isMainProgramAmountCorrectInTheWarningMessage(paymentPlanInstalmentAmount: number, paymentPlanYearlyAmount: number): Promise<boolean> {
        const mainProgramText = `div[data-status="warning"] b:has-text("For your program, you commit to paying the annual amount of $${paymentPlanYearlyAmount} in 4 equal instalments of $${paymentPlanInstalmentAmount}")`;
        return await this.page.locator(mainProgramText).isVisible();
    }

    async isPremiumServiceAmountCorrectInTheWarningMessage(serviceInstalmentAmount: number, serviceYearlyAmount: number): Promise<boolean> {
        const instalmentText = `div[data-status="warning"] b:has-text("For your premium services, you commit to paying the annual amount of $${serviceYearlyAmount} in 4 equal instalments of $${serviceInstalmentAmount}")`;
        return await this.page.locator(instalmentText).isVisible();
    }

    async isInstalmentPlanPaymentButtonTextCorrect(instalmentCost: number): Promise<boolean> {
        const payButtonText = await this.payButton.textContent();
        const payButtonAmount = parseFloat(payButtonText!.match(/\d+\.?\d*/)![0]);
        return instalmentCost === payButtonAmount;
    }
}
export default PaymentPage;