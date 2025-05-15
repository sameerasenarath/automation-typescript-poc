import { MainConfig } from "../config/MainConfig";
import { DateUtils } from "./DateUtils";

MainConfig.init();

export class RandomGenerator {
  static randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomString(numOfChars: number): string {
    let randomString = "";

    for (let i = 0; i < numOfChars; i++) {
      const randInt = this.randInt(0, 2);

      switch (randInt) {
        case 0:
          randomString += String.fromCharCode(this.randInt(97, 122)); // a-z
          break;
        case 1:
          randomString += String.fromCharCode(this.randInt(65, 90)); // A-Z
          break;
        case 2:
          randomString += this.randInt(0, 9).toString(); // 0-9
          break;
      }
    }

    return randomString;
  }

  static randomStringNoNumbers(numOfChars: number): string {
    let randomString = "";

    for (let i = 0; i < numOfChars; i++) {
      const randInt = this.randInt(0, 1);

      switch (randInt) {
        case 0:
          randomString += String.fromCharCode(this.randInt(97, 122)); // a-z
          break;
        case 1:
          randomString += String.fromCharCode(this.randInt(65, 90)); // A-Z
          break;
      }
    }

    return randomString;
  }

  static generateRandomWords(totalCharacterLimit: number): string {
    let result = "";

    while (result.length < totalCharacterLimit) {
      let wordLength = this.randInt(3, 10);

      if (result.length + wordLength + (result.length > 0 ? 1 : 0) > totalCharacterLimit) {
        wordLength = totalCharacterLimit - result.length;
      }

      let word = "";
      for (let j = 0; j < wordLength; j++) {
        word += String.fromCharCode(97 + this.randInt(0, 25));
      }

      if (result.length > 0 && result.length + 1 <= totalCharacterLimit) {
        result += " ";
      }

      result += word;
    }

    return result.length > totalCharacterLimit ? result.slice(0, totalCharacterLimit) : result;
  }

  static generateStudentUsername(): string {
    return `ES${this.randInt(10000000, 99999999)}`;
  }

  static generateRandomParentEmail(): string {
    return `${MainConfig.config.gmailUsername}+eukatest_${this.randomString(6)}${MainConfig.config.gmailDomain}`.toLowerCase();
  }

  static generateRandomParentEmailWithText(text: string): string {
    return `${MainConfig.config.gmailUsername}+eukatest_${text}_${this.randomString(6)}${MainConfig.config.gmailDomain}`.toLowerCase();
  }

  static generateParentEmail(testID: string): string {
    return `${MainConfig.config.gmailUsername}+eukatest_${testID}_${DateUtils.currentDateStamp()}${MainConfig.config.gmailDomain}`.toLowerCase();
  }

  static getStudentFirstName(): string {
    let randomString = this.randomStringNoNumbers(4);
    while (randomString.length === 0) {
      randomString = this.randomStringNoNumbers(5);
    }
    return "Automation" + randomString;
  }

  static getStudentFirstNameWithText(text: string): string {
    return "Automation" + text;
  }

  static getStudentLastName(): string {
    return "Student";
  }

  static getParentFirstName(): string {
    return "AutomationTEST";
  }

  static getParentLastName(): string {
    return "Parent";
  }
}