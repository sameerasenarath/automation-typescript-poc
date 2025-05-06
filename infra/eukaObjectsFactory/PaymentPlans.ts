enum PaymentPlans {
    SINGLE_TERM = "SINGLE_TERM",
    FULL_YEAR = "FULL_YEAR",
    INSTALLMENTS = "INSTALLMENTS",
    NONE = "NONE",
}

class PaymentPlanDetails {
    licenseValidityInMonths: number;
    enrolmentText: string;

    constructor(licenseValidityInMonths: number, enrolmentText: string) {
        this.licenseValidityInMonths = licenseValidityInMonths;
        this.enrolmentText = enrolmentText;
    }
}

const PaymentPlansMap: { [key in PaymentPlans]: PaymentPlanDetails } = {
    [PaymentPlans.SINGLE_TERM]: new PaymentPlanDetails(3, "Term Enrolment"),
    [PaymentPlans.FULL_YEAR]: new PaymentPlanDetails(12, "Yearly Enrolment"),
    [PaymentPlans.INSTALLMENTS]: new PaymentPlanDetails(3, "Yearly Enrolment"),
    [PaymentPlans.NONE]: new PaymentPlanDetails(0, ""),
};

// Example usage:
const selectedPlan = PaymentPlans.SINGLE_TERM;
const planDetails = PaymentPlansMap[selectedPlan];
console.log(planDetails.licenseValidityInMonths); // Output: 3
console.log(planDetails.enrolmentText); // Output: "Term Enrolment"