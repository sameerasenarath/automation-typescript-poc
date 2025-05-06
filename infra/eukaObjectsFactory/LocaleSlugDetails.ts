enum LocaleSlug {
    AUSTRALIA = "AUSTRALIA",
    VIETNAM_EN = "VIETNAM_EN",
    VIETNAM_VI = "VIETNAM_VI",
}

class LocaleSlugDetails {
    countryCode: string;
    countryName: string;
    language: string;
    paymentSuccessURL: string;

    constructor(countryCode: string, countryName: string, language: string, paymentSuccessURL: string) {
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.language = language;
        this.paymentSuccessURL = paymentSuccessURL;
    }
}

const LocaleSlugMap: { [key in LocaleSlug]: LocaleSlugDetails } = {
    [LocaleSlug.AUSTRALIA]: new LocaleSlugDetails("AU", "Australia", "English", ""),
    [LocaleSlug.VIETNAM_EN]: new LocaleSlugDetails("VN", "Vietnam", "English", "payment-success-vn-en"),
    [LocaleSlug.VIETNAM_VI]: new LocaleSlugDetails("VN", "Vietnam", "Vietnamese / Tiếng Việt", "payment-success-vn-vi"),
};

// Function to convert a string to LocaleSlug
function fromStringToSlug(inputStr: string): LocaleSlug | null {
    for (const localeSlug of Object.values(LocaleSlug)) {
        if (inputStr.toUpperCase() === localeSlug) {
            return localeSlug;
        }
    }
    return null;
}

// Example usage
const inputStr = "AUSTRALIA";
const localeSlug = fromStringToSlug(inputStr);

if (localeSlug) {
    const localeDetails = LocaleSlugMap[localeSlug];
    console.log("Country Code:", localeDetails.countryCode); // Output: "AU"
    console.log("Country Name:", localeDetails.countryName); // Output: "Australia"
    console.log("Language:", localeDetails.language); // Output: "English"
    console.log("Payment Success URL:", localeDetails.paymentSuccessURL); // Output: ""
} else {
    console.log("Invalid LocaleSlug");
}