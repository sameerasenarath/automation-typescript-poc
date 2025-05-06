import config from '../../utils/config/MainConfig.json';

class Parent {
    parentID: string;
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
    parentPassword: string;
    checkoutGrade: GradeSelectorPortal | null;
    checkoutPremiumService: EukaPremiumServices | null;
    locale: LocaleSlug | null;
    checkoutPaymentPlan: PaymentPlans | null;

    // Default constructor
    constructor();
    // Constructor with basic details
    constructor(firstName: string, lastName: string, email: string);
    // Constructor with basic details, checkout grade, and payment plan
    constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, checkoutPaymentPlan: PaymentPlans);
    // Constructor with basic details, checkout grade, payment plan, and premium service
    constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, checkoutPaymentPlan: PaymentPlans, checkoutPremiumService: EukaPremiumServices);
    // Constructor with basic details, checkout grade, and premium service
    //constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, checkoutPremiumService: EukaPremiumServices);
    // Constructor with basic details and password
    //constructor(firstName: string, lastName: string, email: string, password: string);
    // Constructor with basic details and checkout grade
    constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal);
    // Constructor with basic details, checkout grade, and locale
    //constructor(firstName: string, lastName: string, email: string, checkoutGrade: GradeSelectorPortal, locale: LocaleSlug);*/

    // Main constructor implementation
    constructor(
        firstName?: string,
        lastName?: string,
        email?: string,
        checkoutGrade?: GradeSelectorPortal,
        checkoutPaymentPlan?: PaymentPlans,
        checkoutPremiumService?: EukaPremiumServices,
        locale?: LocaleSlug,
        password?: string
    ) {
        this.parentID = "";
        this.parentFirstName = firstName || "AutomationTEST";
        this.parentLastName = lastName || "Parent";
        this.parentEmail = email || config[0].gmailDomain;
        this.parentPassword = password || "EukaAuto@123";
        this.checkoutGrade = checkoutGrade || null;
        this.checkoutPaymentPlan = checkoutPaymentPlan || null;
        this.checkoutPremiumService = checkoutPremiumService || null;
        this.locale = locale || null;
    }
}