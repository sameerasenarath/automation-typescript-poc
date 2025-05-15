import { PaymentPlans, PaymentPlansMap } from '../eukaObjectsFactory/PaymentPlans';

export class DateUtils {
  private static dateFormat1 = new Intl.DateTimeFormat('en-US', {
    month: '2-digit', year: '2-digit'
  });

  private static formatDate(date: Date, format: string): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const shortYear = year % 100;
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    switch (format) {
      case 'HH:mm:ss':
        return `${hours}:${minutes}:${seconds}`;
      case 'ddMMyyyy':
        return `${day}${month}${year}`;
      case 'ddMMyy_HHmmss':
        return `${day}${month}${shortYear}_${hours}${minutes}${seconds}`;
      case 'dd-MM-yyyy':
        return `${day}-${month}-${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      default:
        return date.toDateString();
    }
  }

  public static currentTimeStamp1PlusOneMonth(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const [month, year] = [date.getMonth() + 1, date.getFullYear().toString().slice(-2)];
    return `${month.toString().padStart(2, '0')}/${year}`;
  }

  public static currentTimeStamp2(): string {
    return this.formatDate(new Date(), 'HH:mm:ss');
  }

  public static currentDateStamp(): string {
    return this.formatDate(new Date(), 'ddMMyyyy');
  }

  public static currentTimeStamp4(): string {
    return this.formatDate(new Date(), 'ddMMyy_HHmmss');
  }

  static getLicenseEndDate(paymentPlan: PaymentPlans, numOfDays = 2): string {
    const monthsToAdd = PaymentPlansMap[paymentPlan].licenseValidityInMonths;
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + monthsToAdd);
    futureDate.setDate(futureDate.getDate() + numOfDays);

    return new Intl.DateTimeFormat('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(futureDate); // e.g., "13 May 2025"
  }

  public static getTodayDateAsString(): string {
    return this.formatDate(new Date(), 'dd-MM-yyyy');
  }

  public static getTodayDateAsStringInTextFormat(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }

  public static getCurrentUnixEpochTime(): number {
    return Math.floor(Date.now() / 1000);
  }

  public static getFutureDateFromToday(days: number, isSequenceFormat = false): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.formatDate(date, isSequenceFormat ? 'yyyy-MM-dd' : 'dd-MM-yyyy');
  }

  public static getPastDateFromToday(days: number, isSequenceFormat = false): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return this.formatDate(date, isSequenceFormat ? 'yyyy-MM-dd' : 'dd-MM-yyyy');
  }

  public static getDateWithMonthWord(dateInString: string): string {
    const [day, month, year] = dateInString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  public static getDateFormatWithShortMonthWord(dateInString: string): string {
    const [day, month, year] = dateInString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  public static getDateFormatWithMonthWord(dateInString: string): string {
    const [day, month, year] = dateInString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
  }
}
