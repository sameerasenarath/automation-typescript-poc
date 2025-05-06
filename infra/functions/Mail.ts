import { MailTrap } from './MailTrap';
import { MailTrapInboxes , getMailTrapInbox } from './MailTrapInboxes';

export class Mail  {
    public static async getSpecificEmailFromMailTrap(recipientEmail: string, emailTitle: string, inboxType: string, maximumTimeoutSeconds: number, intervalBetweenExecutions: number): Promise<string> {
        const mailTrap: MailTrap = new MailTrap();
        const inboxID: string = await mailTrap.getInboxId(MailTrapInboxes.STAGING_PORTAL);
        const emailID: string | null = await Mail.getSpecificEmailIDFromMailTrap(recipientEmail, emailTitle, inboxType, maximumTimeoutSeconds, intervalBetweenExecutions);
        return mailTrap.getEmailAsHtml(inboxID, emailID);
        //return inboxID;
    }

   public static async getSpecificEmailIDFromMailTrap(recipientEmail: string, emailTitle: string, inboxType: string, maximumTimeoutSeconds: number, intervalBetweenExecutions: number): Promise<string | null> {
        const startTime: number = Date.now();
        const maximalEndTime: number = startTime + (maximumTimeoutSeconds * 1000);
        const mailTrap: MailTrap = new MailTrap();

        const inboxID: string = await mailTrap.getInboxId(MailTrapInboxes.STAGING_PORTAL);
        let emailID: string | null = await mailTrap.getEmailMessages(inboxID, recipientEmail, emailTitle);

        while (emailID === null && Date.now() < maximalEndTime) {
            await new Promise(resolve => setTimeout(resolve, intervalBetweenExecutions * 1000));
            emailID = await mailTrap.getEmailMessages(inboxID, recipientEmail, emailTitle);
        }
        return emailID;
    }

    /*  public static async deleteSpecificEmailFromMailTrap(inboxType: string, emailID: string): Promise<void> {
         const mailTrap: MailTrap = new MailTrap();
         const inboxID: string = await mailTrap.getInboxId(MailTrapInboxes.STAGING_PORTAL);
         await mailTrap.deleteMessages(inboxID, emailID);
     }*/
}