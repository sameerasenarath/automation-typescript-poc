import { GradeSelectorPortalMap , GradeSelectorPortal, GradeSelectorPortalDetails } from "../eukaObjectsFactory/GradeSelectorPortal";
import { PaymentPlans } from "../eukaObjectsFactory/PaymentPlans";
import { EukaPremiumServices } from "../eukaObjectsFactory/EukaPremiumServices";
import { LocaleSlug } from "../eukaObjectsFactory/LocaleSlugDetails";
import { EukaDetails } from "../config/EukaDetails"; 
import { RandomGenerator } from "../utils/RandomGenerator"; 
//test
export class Parent {
  parentID: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPassword: string;
  checkoutGrade?: GradeSelectorPortal;
  checkoutPremiumService?: EukaPremiumServices;
  locale?: LocaleSlug;
  checkoutPaymentPlan?: PaymentPlans;

  constructor();
  constructor(firstName: string, lastName: string, email: string);
  constructor(firstName: string, lastName: string, email: string, password: string);
  constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal);
  constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, checkoutPaymentPlan: PaymentPlans);
  constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, checkoutPaymentPlan: PaymentPlans, checkoutPremiumService: EukaPremiumServices);
  constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, checkoutPremiumService: EukaPremiumServices);
  constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, locale: LocaleSlug);
  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    arg4?: GradeSelectorPortal | string,
    arg5?: PaymentPlans | EukaPremiumServices | LocaleSlug,
    arg6?: EukaPremiumServices
  ) {
    this.parentID = "";
    this.parentFirstName = firstName ?? RandomGenerator.getParentFirstName();
    this.parentLastName = lastName ?? RandomGenerator.getParentLastName();
    this.parentEmail = email ?? RandomGenerator.generateRandomParentEmail();
    this.parentPassword = typeof arg4 === "string" ? arg4 : EukaDetails.config.genericPassword;

    if (typeof arg4 !== "string") {
      this.checkoutGrade = arg4;
    }

    if (arg5 !== undefined) {
      if (Object.values(PaymentPlans).includes(arg5 as PaymentPlans)) {
        this.checkoutPaymentPlan = arg5 as PaymentPlans;
      } else if (Object.values(EukaPremiumServices).includes(arg5 as EukaPremiumServices)) {
        this.checkoutPremiumService = arg5 as EukaPremiumServices;
      } else {
        this.locale = arg5 as LocaleSlug;
        this.checkoutPremiumService = undefined;
      }
    }

    if (arg6 !== undefined) {
      this.checkoutPremiumService = arg6;
    }
  }

  get gradeDetails(): GradeSelectorPortalDetails | undefined {
    if (this.checkoutGrade) {
      return GradeSelectorPortalMap[this.checkoutGrade as keyof typeof GradeSelectorPortalMap];
    }
    return undefined;
  }
}