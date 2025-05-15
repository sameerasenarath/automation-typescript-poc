import * as fs from 'fs';
import * as path from 'path';

export enum BrowserType {
  CHROME = 'chrome',
  FIREFOX = 'firefox',
  SAFARI = 'safari'
}

export enum Devices {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet'
}

export enum LocaleSlug {
  AUSTRALIA = 'AUSTRALIA',
  VIETNAM_EN = 'VIETNAM_EN',
  VIETNAM_VI = 'VIETNAM_VI'
}

interface ConfigJSON {
  browserType: BrowserType;
  device: Devices;
  ecomSiteUrl: string;
  lmsUrl: string;
  parentPortalUrl: string;
  portalCheckoutUrl: string;
  headless: boolean;
  locale: LocaleSlug;
  isRunRemotely: boolean;
  gmailUsername: string;
  gmailDomain: string;
  pageNavigationTimeOut: number;
  pageElementVisibleTimeOut: number;
}

export class MainConfig {
  static config: ConfigJSON;

  static init(): void {
    const env = process.env.TEST_ENV ?? '';
    const configPath = env
        ? path.join(process.cwd(), `resources/config/env/MainConfig${env}.json`)
        : path.join(process.cwd(), 'resources/config/MainConfig.json');

    if (!fs.existsSync(configPath)) {
      throw new Error(`MainConfig file not found: ${configPath}`);
    }

    const fileContents = fs.readFileSync(configPath, 'utf-8');
    const parsedConfig = JSON.parse(fileContents);

    // Fallback to environment variable if available
    parsedConfig.browserType = (process.env.BROWSER_TYPE ?? parsedConfig.browserType) as BrowserType;
    parsedConfig.device = (process.env.DEVICE_TYPE ?? parsedConfig.device) as Devices;

    MainConfig.config = parsedConfig;
  }
}