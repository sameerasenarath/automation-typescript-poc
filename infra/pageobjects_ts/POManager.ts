import {Page} from '@playwright/test';
import {CheckOutParentDetailsPage} from "./CheckOutParentDetailsPage";
import GradeSelectionPage from "./GradeSelectionPage";
import CheckOutUserStateSelectionPage from "./CheckOutUserStateSelectionPage";
import MembershipSelectionPage from "./MembershipSelectionPage";
import selectPremiumServicePage from "./SelectPremiumServicePage";
import PaymentPage from "./PaymentPage";
import paymentSuccessPage from "./PaymentSuccessPage";
import enrolmentHomePage from "./EnrolmentHomePage";

export class POManager {
    page: Page;
    checkOutParentDetailsPage: CheckOutParentDetailsPage;
    gradeSelectionPage: GradeSelectionPage;
    checkOutUserStateSelectionPage: CheckOutUserStateSelectionPage;
    membershipSelectionPage: MembershipSelectionPage;
    paymentPage: PaymentPage;
    paymentSuccessPage: paymentSuccessPage;
    enrolmentHomePage: enrolmentHomePage;
    selectPremiumServicePage: selectPremiumServicePage;

    constructor(page: Page) {
        this.page = page;
        this.checkOutUserStateSelectionPage = new CheckOutUserStateSelectionPage(this.page, this);
        this.checkOutParentDetailsPage = new CheckOutParentDetailsPage(this.page, this);
        this.gradeSelectionPage = new GradeSelectionPage(this.page, this);
        this.membershipSelectionPage = new MembershipSelectionPage(this.page, this);
        this.paymentPage = new PaymentPage(this.page, this);
        this.paymentSuccessPage = new paymentSuccessPage(this.page, this);
        this.enrolmentHomePage = new enrolmentHomePage(this.page);
        this.selectPremiumServicePage = new selectPremiumServicePage(this.page,this);
    
    }

    getCheckOutParentDetailsPage() {
        return this.checkOutParentDetailsPage;
    }

    getGradeSelectionPage() {
        return this.gradeSelectionPage;
    }

    getCheckOutUserStateSelectionPage() {
        return this.checkOutUserStateSelectionPage;
    }

    getMembershipSelectionPage() {
        return this.membershipSelectionPage;
    }

    getSelectPremiumServicePage() {
        return this.selectPremiumServicePage;
    }

    getPaymentPage() {
        return this.paymentPage;
    }

    getPaymentSuccessPage() {
        return this.paymentSuccessPage;
    }
    getEnrolmentHomePage() {
        return this.enrolmentHomePage;
    }
}

module.exports = {POManager};