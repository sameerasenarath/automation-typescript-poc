import { google, Auth } from 'googleapis';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

interface EmailHeader {
    name?: string | null;
    value?: string | null;
}

interface EmailMessage {
    id: string;
    subject: string;
    from: string;
    date: string;
    snippet: string;
}

// File paths
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

// Helper function to safely get header values
function getHeaderValue(headers: EmailHeader[] = [], name: string): string {
    const header = headers.find(h => h?.name?.toLowerCase() === name.toLowerCase());
    return header?.value?.trim() || '(Not available)';
}

// Load or create OAuth2 client
async function authorize(): Promise<Auth.OAuth2Client> {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    try {
        if (fs.existsSync(TOKEN_PATH)) {
            const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
            oAuth2Client.setCredentials(tokens);
            return oAuth2Client;
        }
    } catch (err) {
        console.log('Invalid token file, getting new token...');
    }

    return getNewToken(oAuth2Client);
}

async function getNewToken(oAuth2Client: Auth.OAuth2Client): Promise<Auth.OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.readonly'],
        prompt: 'consent'
    });

    console.log('Authorize this app by visiting:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const code = await new Promise<string>((resolve) => {
        rl.question('Enter the authorization code: ', (code) => {
            rl.close();
            resolve(code);
        });
    });

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));

    return oAuth2Client;
}

async function fetchEmails(): Promise<void> {
    try {
        const auth = await authorize();
        const gmail = google.gmail({ version: 'v1', auth });

        const listResponse = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 10,
            labelIds: ['INBOX']
        });

        if (!listResponse.data.messages?.length) {
            console.log('No messages found.');
            return;
        }

        const emailPromises = listResponse.data.messages
            .filter(message => message.id)
            .map(async (message) => {
                const msgResponse = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id!,
                    format: 'full'
                });

                const headers: EmailHeader[] = msgResponse.data.payload?.headers || [];
                const snippet = msgResponse.data.snippet || '(No preview available)';

                return {
                    id: message.id!,
                    subject: getHeaderValue(headers, 'Subject'),
                    from: getHeaderValue(headers, 'From'),
                    date: getHeaderValue(headers, 'Date'),
                    snippet: snippet.substring(0, Math.min(snippet.length, 100)) +
                        (snippet.length > 100 ? '...' : '')
                };
            });

        const emails = await Promise.all(emailPromises);

        console.log('\nRecent Emails:');
        emails.forEach((email, index) => {
            console.log(`\n${index + 1}. ${email.subject}`);
            console.log(`   From: ${email.from}`);
            console.log(`   Date: ${email.date}`);
            console.log(`   Preview: ${email.snippet}`);
        });

    } catch (error) {
        console.error('Error fetching emails:', error instanceof Error ? error.message : error);
        if (fs.existsSync(TOKEN_PATH)) {
            fs.unlinkSync(TOKEN_PATH);
            console.log('Deleted invalid token. Please run again to re-authenticate.');
        }
    }
}

fetchEmails();