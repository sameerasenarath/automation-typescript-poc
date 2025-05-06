enum EukaPremiumServices {
    GOVERNMENT_REGISTRATION_REPORTING = "GOVERNMENT_REGISTRATION_REPORTING",
    GOVERNMENT_REGISTRATION = "GOVERNMENT_REGISTRATION",
    GOVERNMENT_REPORTING = "GOVERNMENT_REPORTING",
    NONE_SELECTED = "NONE_SELECTED",
    NOT_APPLICABLE = "NOT_APPLICABLE",
}

class EukaPremiumServicesDetails {
    premiumServiceTextInPortal: string;
    premiumServiceTextEnrolmentSuccess: string;
    premiumServiceShortName: string;

    constructor(
        premiumServiceTextInPortal: string,
        premiumServiceTextEnrolmentSuccess: string,
        premiumServiceShortName: string
    ) {
        this.premiumServiceTextInPortal = premiumServiceTextInPortal;
        this.premiumServiceTextEnrolmentSuccess = premiumServiceTextEnrolmentSuccess;
        this.premiumServiceShortName = premiumServiceShortName;
    }
}

const EukaPremiumServicesMap: { [key in EukaPremiumServices]: EukaPremiumServicesDetails } = {
    [EukaPremiumServices.GOVERNMENT_REGISTRATION_REPORTING]: new EukaPremiumServicesDetails(
        "Government Reporting and Government Registration Services",
        "Government Registration and Reporting - Bundle",
        ""
    ),
    [EukaPremiumServices.GOVERNMENT_REGISTRATION]: new EukaPremiumServicesDetails(
        "Government Registration Service",
        "Government Registration Service",
        "registration"
    ),
    [EukaPremiumServices.GOVERNMENT_REPORTING]: new EukaPremiumServicesDetails(
        "Government Reporting Service",
        "Government Report Creator",
        "report"
    ),
    [EukaPremiumServices.NONE_SELECTED]: new EukaPremiumServicesDetails(
        "None selected",
        "None selected",
        ""
    ),
    [EukaPremiumServices.NOT_APPLICABLE]: new EukaPremiumServicesDetails(
        "Not applicable",
        "Not applicable",
        ""
    ),
};

// Example usage:
const selectedService = EukaPremiumServices.GOVERNMENT_REGISTRATION;
const serviceDetails = EukaPremiumServicesMap[selectedService];
console.log(serviceDetails.premiumServiceTextInPortal); // Output: "Government Registration Service"
console.log(serviceDetails.premiumServiceTextEnrolmentSuccess); // Output: "Government Registration Service"
console.log(serviceDetails.premiumServiceShortName); // Output: "registration"