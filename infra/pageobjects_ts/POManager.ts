import {Page} from '@playwright/test';
import {CheckOutParentDetailsPage} from "./CheckOutParentDetailsPage";
import GradeSelectionPage from "./GradeSelectionPage";
import CheckOutUserStateSelectionPage from "./CheckOutUserStateSelectionPage";
import MembershipSelectionPage from "./MembershipSelectionPage";
import selectPremiumServicePage from "./SelectPremiumServicePage";
import PaymentPage from "./PaymentPage";
import paymentSuccessPage from "./PaymentSuccessPage";
import enrolmentHomePage from "./EnrolmentHomePage";
import EnrolmentParentDetailsPage from './EnrolmentParentDetailsPage';
import EnrolmentCreatePasswordPage from './EnrolmentCreatePasswordPage';
import EnrolmentStudentDetailsPage from './EnrolmentStudentDetailsPage';
import EnrolmentHomePage from './EnrolmentHomePage';
import EnrolmentSelectProgramPage from './EnrolmentSelectProgramPage';
import EnrolmentManageElectivesPage from './EnrolmentManageElectivesPage';
import EnrolmentStudentInfoPage from './EnrolmentStudentInfoPage';
import EnrolmentStudentPerformancePage from './EnrolmentStudentPerformancePage';
import EnrolmentSeniorGradeSubjectSelectionPage from './EnrolmentSeniorGradeSubjectSelectionPage';
import EnrolmentSuccessPage from './EnrolmentSuccessPage';

export class POManager {
    page: Page;
    checkOutParentDetailsPage: CheckOutParentDetailsPage;
    gradeSelectionPage: GradeSelectionPage;
    checkOutUserStateSelectionPage: CheckOutUserStateSelectionPage;
    membershipSelectionPage: MembershipSelectionPage;
    paymentPage: PaymentPage;
    paymentSuccessPage: paymentSuccessPage;
    enrolmentHomePage: EnrolmentHomePage;
    selectPremiumServicePage: selectPremiumServicePage;
    enrolmentParentDetailsPage: EnrolmentParentDetailsPage;
    enrolementCreatePasswordPage: EnrolmentCreatePasswordPage;
    enrolmentStudentDetailsPage: EnrolmentStudentDetailsPage;
    enrolmentSelectProgramPage: EnrolmentSelectProgramPage;
    enrolmentManageElectivesPage: EnrolmentManageElectivesPage;
    enrolmentStudentInfoPage: EnrolmentStudentInfoPage;
    enrolmentStudentPerformancePage: EnrolmentStudentPerformancePage;
    enrolmentSeniorGradeSubjectSelectionPage: EnrolmentSeniorGradeSubjectSelectionPage;
    enrolmentSuccessPage: EnrolmentSuccessPage;

    constructor(page: Page) {
        this.page = page;
        this.checkOutUserStateSelectionPage = new CheckOutUserStateSelectionPage(this.page, this);
        this.checkOutParentDetailsPage = new CheckOutParentDetailsPage(this.page, this);
        this.gradeSelectionPage = new GradeSelectionPage(this.page, this);
        this.membershipSelectionPage = new MembershipSelectionPage(this.page, this);
        this.paymentPage = new PaymentPage(this.page, this);
        this.paymentSuccessPage = new paymentSuccessPage(this.page, this);
        this.enrolmentHomePage = new EnrolmentHomePage(this.page,this);
        this.selectPremiumServicePage = new selectPremiumServicePage(this.page,this);
        this.enrolmentParentDetailsPage = new EnrolmentParentDetailsPage(this.page, this);
        this.enrolementCreatePasswordPage = new EnrolmentCreatePasswordPage(this.page, this);  
        this.enrolmentStudentDetailsPage = new EnrolmentStudentDetailsPage(this.page, this); 
        this.enrolmentSelectProgramPage = new EnrolmentSelectProgramPage(this.page, this);
        this.enrolmentManageElectivesPage = new EnrolmentManageElectivesPage(this.page, this);
        this.enrolmentStudentInfoPage = new EnrolmentStudentInfoPage(this.page, this);
        this.enrolmentStudentPerformancePage = new EnrolmentStudentPerformancePage(this.page, this);
        this.enrolmentSeniorGradeSubjectSelectionPage = new EnrolmentSeniorGradeSubjectSelectionPage(this.page, this);
        this.enrolmentSuccessPage = new EnrolmentSuccessPage(this.page, this);
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

    getEnrolmentParentDetailsPage() {
        return this.enrolmentParentDetailsPage;
    }

    getEnrolmentCreatePasswordPage() {  
        return this.enrolementCreatePasswordPage;
    }

    getEnrolmentStudentDetailsPage() {
        return this.enrolmentStudentDetailsPage;
    }

    getEnrolmentSelectProgramPage() {
        return this.enrolmentSelectProgramPage;
    }   

    getEnrolmentManageElectivesPage() {
        return this.enrolmentManageElectivesPage;
    }
    getEnrolmentStudentInfoPage() {
        return this.enrolmentStudentInfoPage;
    }               
    getEnrolmentStudentPerformancePage() {
        return this.enrolmentStudentPerformancePage;
    }
    getEnrolmentSeniorGradeSubjectSelectionPage() {
        return this.enrolmentSeniorGradeSubjectSelectionPage;
    }
    getEnrolmentSuccessPage() {
        return this.enrolmentSuccessPage;
    }
}

module.exports = {POManager};