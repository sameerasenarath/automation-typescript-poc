import {Locator} from "@playwright/test";

enum GradeSelectorPortal {
    CLEVER_KIDS = "CLEVER_KIDS",
    FOUNDATION = "FOUNDATION",
    GRADE_1 = "GRADE_1",
    GRADE_2 = "GRADE_2",
    GRADE_3 = "GRADE_3",
    GRADE_4 = "GRADE_4",
    GRADE_5 = "GRADE_5",
    GRADE_6 = "GRADE_6",
    GRADE_7 = "GRADE_7",
    GRADE_8 = "GRADE_8",
    GRADE_9 = "GRADE_9",
    GRADE_10 = "GRADE_10",
    GRADE_11_UNIVERSITY_ASSESSED = "GRADE_11_UNIVERSITY_ASSESSED",
    GRADE_11_NON_ASSESSED = "GRADE_11_NON_ASSESSED",
    GRADE_12_UNIVERSITY_ASSESSED = "GRADE_12_UNIVERSITY_ASSESSED",
    GRADE_12_NON_ASSESSED = "GRADE_12_NON_ASSESSED",
}

class GradeSelectorPortalDetails {
    gradeText: string;
    gradeLink: string;
    gradeLevel: string;
    productFamilyGradeID: string;

    constructor(gradeLink: string, gradeLevel: string, gradeText: string, productFamilyGradeID: string) {
        this.gradeText = gradeText;
        this.gradeLink = gradeLink;
        this.gradeLevel = gradeLevel;
        this.productFamilyGradeID = productFamilyGradeID;
    }

    getGradeText(): string {
        return this.gradeText;
    }

    getProductFamilyGradeID(): string {
        return this.productFamilyGradeID;
    }

    getGradeLevel(): string {
        return this.gradeLevel.replace("_", " ");
    }
}

const GradeSelectorPortalMap: { [key in GradeSelectorPortal]: GradeSelectorPortalDetails } = {
    [GradeSelectorPortal.CLEVER_KIDS]: new GradeSelectorPortalDetails(
        "div[data-tracking-id='AgeGroupContainer.Card.Button.selectAge-K']>p",
        "Clever_Kids",
        "3 - 5",
        "16"
    ),
    [GradeSelectorPortal.FOUNDATION]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-F']/p",
        "Euka_Primary",
        "Foundation",
        "15"
    ),
    [GradeSelectorPortal.GRADE_1]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G1']/p",
        "Euka_Primary",
        "Grade 1",
        "14"
    ),
    [GradeSelectorPortal.GRADE_2]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G2']/p",
        "Euka_Primary",
        "Grade 2",
        "13"
    ),
    [GradeSelectorPortal.GRADE_3]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G3']/p",
        "Euka_Primary",
        "Grade 3",
        "12"
    ),
    [GradeSelectorPortal.GRADE_4]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G4']/p",
        "Euka_Primary",
        "Grade 4",
        "11"
    ),
    [GradeSelectorPortal.GRADE_5]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G5']/p",
        "Euka_Primary",
        "Grade 5",
        "10"
    ),
    [GradeSelectorPortal.GRADE_6]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G6']/p",
        "Euka_Primary",
        "Grade 6",
        "9"
    ),
    [GradeSelectorPortal.GRADE_7]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G7']/p",
        "Euka_Secondary",
        "Grade 7",
        "5"
    ),
    [GradeSelectorPortal.GRADE_8]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G8']/p",
        "Euka_Secondary",
        "Grade 8",
        "6"
    ),
    [GradeSelectorPortal.GRADE_9]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G9']/p",
        "Euka_Secondary",
        "Grade 9",
        "7"
    ),
    [GradeSelectorPortal.GRADE_10]: new GradeSelectorPortalDetails(
        "//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G10']/p",
        "Euka_Secondary",
        "Grade 10",
        "21"
    ),
    [GradeSelectorPortal.GRADE_11_UNIVERSITY_ASSESSED]: new GradeSelectorPortalDetails(
        "(//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G11'])[1]",
        "Euka_Senior",
        "Grade 11: Assessed / University Pathway",
        "3"
    ),
    [GradeSelectorPortal.GRADE_11_NON_ASSESSED]: new GradeSelectorPortalDetails(
        "(//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G11'])[2]",
        "Euka_Senior",
        "Grade 11: Assessment-free Pathway",
        "17"
    ),
    [GradeSelectorPortal.GRADE_12_UNIVERSITY_ASSESSED]: new GradeSelectorPortalDetails(
        "(//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G12'])[1]",
        "Euka_Senior",
        "Grade 12: Assessed / University Pathway",
        "4"
    ),
    [GradeSelectorPortal.GRADE_12_NON_ASSESSED]: new GradeSelectorPortalDetails(
        "(//div[@data-tracking-id='AgeGroupContainer.Card.Button.selectAge-G12'])[2]",
        "Euka_Senior",
        "Grade 12: Assessment-free Pathway",
        "18"
    ),
};

export {GradeSelectorPortalMap};
// Example usage:
const selectedGrade = GradeSelectorPortal.GRADE_1;
const gradeDetails = GradeSelectorPortalMap[selectedGrade];
console.log(gradeDetails.getGradeText()); // Output: "Grade 1"
console.log(gradeDetails.getGradeLevel()); // Output: "Euka Primary"
console.log(gradeDetails.getProductFamilyGradeID()); // Output: "14"