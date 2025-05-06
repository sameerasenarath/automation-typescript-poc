enum MailTrapInboxes {
    DEV = "DEV Wordpress Apps (LMS + ECOM)",
    STAGING = "Staging Wordpress Apps (LMS + ECOM)",
    DEV_PORTAL = "Dev Portal App",
    STAGING_PORTAL = "Staging Portal App"
}

class EukaUrl {
    static isDevEcomEnv(): boolean {
        // Implement logic to check if the environment is Dev Ecom
        return false;
    }
    static isStagingEnv(): boolean {
        // Implement logic to check if the environment is Staging
        return false;
    }
    static isPortalDev(): boolean {
        // Implement logic to check if the environment is Portal Dev
        return false;
    }
    static isPortalStaging(): boolean {
        // Implement logic to check if the environment is Portal Staging
        return false;
    }
}

function getMailTrapInbox(inboxType: string): MailTrapInboxes | null {
    return MailTrapInboxes.STAGING_PORTAL;
}

export { MailTrapInboxes, getMailTrapInbox };
