import { APIResponse } from 'playwright';
import { request, APIRequestContext } from '@playwright/test';

export class MailTrap /*extends AbstractApi*/ {
    private static readonly BASE_URL: string = "https://mailtrap.io/api/accounts/";
    private static readonly API_TOKEN: string = "f94c6bcdd1788405b526f0bdf79a40d1";
    private static readonly ACCOUNT_ID: string = "1636847";
    private requestContext!: APIRequestContext;

    private apiResponse: APIResponse | undefined;

    constructor() {
        this.initRequestContext();
    }
    private async initRequestContext() {
        this.requestContext = await request.newContext();
    }

    public async getInboxId(inboxName: string): Promise<string> {
        // Ensure request context is initialized
        if (!this.requestContext) {
            await this.initRequestContext();
        }
        const requestUrl = `${MailTrap.BASE_URL}${MailTrap.ACCOUNT_ID}/inboxes`;

        // Sending GET request with headers
        const response = await this.requestContext.get(requestUrl, {
            headers: {
                "Api-Token": MailTrap.API_TOKEN,
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to fetch inboxes: ${response.status()} - ${await response.text()}`);
        }

        // Parsing JSON response
        const jsonArray = await response.json();
        for (const inbox of jsonArray) {
            if (inbox.name === inboxName) {
                console.log("Inbox ID : "+inbox.id)
                return inbox.id;
            }
        }

        throw new Error(`Inbox with name "${inboxName}" not found.`);
    }


    public async getEmailMessages(inboxID: string, toEmail: string, emailTitle: string): Promise<string | null> {
        // Ensure request context is initialized
        if (!this.requestContext) {
            await this.initRequestContext();
        }

        const requestUrl = `${MailTrap.BASE_URL}${MailTrap.ACCOUNT_ID}/inboxes/${inboxID}/messages`;

        // Sending GET request with headers
        const response = await this.requestContext.get(requestUrl, {
            headers: {
                "Api-Token": MailTrap.API_TOKEN,
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to fetch emails: ${response.status()} - ${await response.text()}`);
        }

        // Parsing JSON response
        const jsonArray = await response.json();
        for (const email of jsonArray) {
            const to_email: string = email.to_email;
            const emailSubject: string = email.subject;
            if (to_email === toEmail && emailSubject.includes(emailTitle)) {
                return email.id;
            }
        }

        return null; // Return null if no matching email is found
    }

 /*   public async deleteMessages(inboxID: string, emailID: string): Promise<void> {
        const requestUrl: string = MailTrap.BASE_URL + MailTrap.ACCOUNT_ID + "/inboxes/" + inboxID + "/messages/" + emailID;

        const headers: Map<string, string> = new Map();
        headers.set("Api-Token", MailTrap.API_TOKEN);

        const apiRequestBuilder: ApiRequestBuilder = new ApiRequestBuilder()
            .description("Delete emails from Mail Trap by inbox")
            .requestType(RequestType.DELETE)
            .url(requestUrl)
            .headers(headers)
            .expectedResponseCode(200);

        this.apiResponse = await this.sendRequest(apiRequestBuilder);
    }*/

    public async getEmailAsHtml(inboxID: string, emailID: string | null): Promise<string> {
        // Ensure request context is initialized
        if (!this.requestContext) {
            await this.initRequestContext();
        }

        const requestUrl = `${MailTrap.BASE_URL}${MailTrap.ACCOUNT_ID}/inboxes/${inboxID}/messages/${emailID}/body.html`;

        // Sending GET request with headers
        const response = await this.requestContext.get(requestUrl, {
            headers: {
                "Api-Token": MailTrap.API_TOKEN,
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to fetch email body: ${response.status()} - ${await response.text()}`);
        }
        // Print the response text (HTML content)
        //console.log('Email HTML Content:', await response.text());

        return await response.text();
    }
}