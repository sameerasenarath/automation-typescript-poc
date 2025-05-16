import { allure } from 'allure-playwright';
import { expect } from '@playwright/test';

export class ReportLogger {
  /**
   * Logs a message to console and Allure
   */
  static log(message: string) {
    console.log(message); // Terminal log

    try {
      allure.step(message, async () => {}); // Allure step (non-blocking)
    } catch (e) {
      console.warn('Allure log failed:', e);
    }

    // Playwright HTML Reporter logs through expect().toBeTruthy() or custom step
    // This is how we inject something visible in the HTML report
    expect.soft(true, message).toBeTruthy();
  }

  /**
   * Wraps a named step (for both Allure and Playwright HTML)
   */
  static async step(stepName: string, stepFn: () => Promise<void>) {
    console.log(`STEP: ${stepName}`);

    // Run step in both Allure and Playwright HTML reporters
    await allure.step(stepName, async () => {
      await stepFn();
    });
  }

  // logs and returns the same value
static logAndReturn<T>(label: string, value: T): T {
    this.log(`${label}: ${value}`);
    return value;
  }
}