import { Locator, Page } from '@playwright/test';
import { WebActions } from '../functions/WebActions'; 
import { POManager } from './POManager';
import EnrolmentStudentDetailsPage from './EnrolmentStudentDetailsPage';
import { GradeSelectorPortal, GradeSelectorPortalMap } from '../eukaObjectsFactory/GradeSelectorPortal';
import EnrolmentManageElectivesPage from './EnrolmentManageElectivesPage';
import EnrolmentStudentInfoPage  from './EnrolmentStudentInfoPage';
import EnrolmentStudentPerformancePage from './EnrolmentStudentPerformancePage';
import EnrolmentSeniorGradeSubjectSelectionPage from './EnrolmentSeniorGradeSubjectSelectionPage';
import { PaymentPlans } from '../eukaObjectsFactory/PaymentPlans';

export default class EnrolmentSelectProgramPage {
    private page: Page;
    private webActions: WebActions;
    private nextButton: Locator;

    constructor(page: Page, private poManager: POManager) {
        this.page = page;
        this.webActions = new WebActions(page);
        this.nextButton = this.page.locator("//button[@data-tracking-id='SelectProgramContainer.Button.next']");
    }

    async clickNextButton(
        gradeSelector: GradeSelectorPortal,
        paymentPlan: PaymentPlans
      ): Promise<
        | EnrolmentManageElectivesPage
        | EnrolmentStudentInfoPage
        | EnrolmentStudentPerformancePage
        | EnrolmentSeniorGradeSubjectSelectionPage
      > {
        await this.page.waitForTimeout(5000); // Equivalent to Thread.sleep(5000)
        await this.webActions.click(this.nextButton);
    
        if (
          gradeSelector === GradeSelectorPortal.GRADE_9 ||
          gradeSelector === GradeSelectorPortal.GRADE_10
        ) {
          return this.poManager.getEnrolmentManageElectivesPage();
        }
    
        if (
          gradeSelector === GradeSelectorPortal.GRADE_6 ||
          gradeSelector === GradeSelectorPortal.CLEVER_KIDS
        ) {
          if (paymentPlan === PaymentPlans.SINGLE_TERM) {
            return this.poManager.getEnrolmentStudentInfoPage();
          } else {
            return this.poManager.getEnrolmentStudentPerformancePage();
          }
        }
    
        const gradeDetails = GradeSelectorPortalMap(this.page)[gradeSelector];
        if (gradeDetails.getGradeLevel() === 'Euka Senior') {
          return this.poManager.getEnrolmentSeniorGradeSubjectSelectionPage();
        }
    
        return this.poManager.getEnrolmentStudentInfoPage();
      }  
}