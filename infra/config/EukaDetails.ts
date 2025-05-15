import * as fs from 'fs';
import * as path from 'path';

interface EukaDetailsConfig {
  genericPassword: string;
  parentUserName: string;
  devStudentEukaId: string;
  stgStudentEukaId: string;
  prodStudentEukaId: string;
  mailTrapAccountID: string;
  mailTrapApiToken: string;
  parentFirstName: string;
  parentLastName: string;
  successPaymentCardOne: string;
  successPaymentCardTwo: string;
  testCouponCode: string;
  prodCouponCode: string;
  eukaEmailForAuth: string;
  authEmailPassword: string;
  mathleticsUserName: string;
  mathleticsPassword: string;
  novaAdminEmail: string;
  novaAdminPassword: string;
  lpUserName: string;
  lpPassword: string;
  testPartialCoupon: string;
  prodPremiumServiceCoupon: string;
  registrationPrefix: string;
  cancelAutoRenewalPrefix: string;
  markingPortalPrefix: string;
  novaMarkerEmail: string;
  novaMarkerPassword: string;
}

export class EukaDetails {
  static config: EukaDetailsConfig;

  static init(): void {
    const configPath = path.join(__dirname, '../../resources/config/EukaDetails.json');

    if (!fs.existsSync(configPath)) {
      console.error(`EukaDetails file not found at ${configPath}`);
      return;
    }

    const fileContents = fs.readFileSync(configPath, 'utf-8');
    const parsedConfig = JSON.parse(fileContents) as EukaDetailsConfig;

    // Override with environment variables if available
    for (const key of Object.keys(parsedConfig)) {
      const envValue = process.env[key];
      if (envValue !== undefined) {
        (parsedConfig as any)[key] = envValue;
      }
    }

    EukaDetails.config = parsedConfig;
  }
}
