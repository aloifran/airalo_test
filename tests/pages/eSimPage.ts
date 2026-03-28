import { expect, Page } from "@playwright/test";
import { DefaultPage } from "./defaultPage.js";

export class ESimPage extends DefaultPage {
  private location: string;
  locators = {
    storeLocation: () => this.page.getByTestId("store-location_container"),
    storeHeading: () => this.page.getByTestId("store-location_location-heading"),
    storeLocationBreadcrumbs: () => this.page.getByTestId("store-location_breadcrumb-container"),
    storeLocationOperators: () => this.page.getByTestId("store-location_operators-container"),
    storeLocationOperatorDetails: () =>
      this.page.getByTestId("store-location_operator-details-container"),
    storeLocationOperatorPackages: () => this.page.getByTestId("store-location_packages-container"),
    unlimitedPackageOption: () => this.page.getByTestId("segmented-control_tab-unlimited"),
    unlimitedPackagePlans: () => this.page.getByTestId("package-grouped-packages_outer-container"),
    unlimitedPackageForDays: (days: number) =>
      this.page.getByRole("button", { name: `Select Unlimited - ${days} days for` }),
    packagePriceForDays: (days: number) =>
      this.locators.unlimitedPackageForDays(days).getByTestId("price_amount"),
    packagePriceBuyNow: () => this.page.getByRole("dialog").getByTestId("price_amount"),
  };

  constructor(page: Page, location: string) {
    // dynamic url ending in `-esim`
    super(page, `/${location}-esim`);
    this.location = location;
  }

  async goTo() {
    await super.goTo();
  }

  /**
   * Assertions
   * */

  async assertPage() {
    await expect(this.locators.storeLocation()).toBeVisible();
    await expect(this.locators.storeHeading()).toBeVisible();
    await expect(this.locators.storeHeading()).toHaveText(`${this.location} eSIMs`, {
      ignoreCase: true,
    });
    await expect(this.locators.storeLocationBreadcrumbs()).toBeVisible();
    await expect(this.locators.storeLocationOperators()).toBeVisible();
    await expect(this.locators.storeLocationOperatorDetails()).toBeVisible();
    await expect(this.locators.storeLocationOperatorPackages()).toBeVisible();
  }

  async assertPackagePriceForDays(days: number) {
    const buttonText = await this.locators.unlimitedPackageForDays(days).textContent();
    // extract price from button text with regex
    const price = buttonText?.match(/\d+\.\d{2}/)?.[0];
    await expect(this.locators.packagePriceForDays(days)).toContainText(price!);
    await expect(this.locators.packagePriceBuyNow()).toContainText(price!);
  }

  /**
   * Actions
   * */

  async selectUnlimitedPackageForDays(days: number) {
    await this.locators.unlimitedPackageOption().click();
    await expect(this.locators.unlimitedPackagePlans()).toBeVisible();
    await this.locators.unlimitedPackageForDays(days).click();
  }
}
