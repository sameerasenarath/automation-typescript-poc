import { request, APIRequestContext } from '@playwright/test';
import {Mail} from "./Mail";
import {RegEx} from "./RegEx";

export class ExtractEmails {
    private static readonly BASE_URL = "https://mailtrap.io/api/v1/";
    private static readonly ACCOUNT_ID = "your_account_id";  // Replace with actual account ID
    private static readonly API_TOKEN = "your_api_token";    // Replace with actual API token
    private requestContext!: APIRequestContext; // "!" tells TypeScript it will be initialized

    constructor() {
        this.initRequestContext();
    }

    private async initRequestContext() {
        this.requestContext = await request.newContext();
    }
    // Method to extract enrolment URL from email content

    public static async extractEnrolmentUrl(parentEmail: string): Promise<string | null> {
        const enrolmentUrlRegEx = '<a [^>]*href\s*=\s*"([^"]*enrolment[^"]*)';

        try {
            const mailBody = await Mail.getSpecificEmailFromMailTrap(
                parentEmail,
                "Welcome to Euka. Let's begin enrolment",
                "portal",
                300,
                30,
            )

            //console.log("MailBODY ::: >>> "+mailBody);

            if(mailBody != null){
                return RegEx.extractDataByRegEx(mailBody,enrolmentUrlRegEx);
            }
            return null; // Return null if no match found
        } catch (error) {
            throw new Error(`Failed to extract enrolment URL: ${error}.message`);
        }
    }
}
