import { expect, Page } from "@playwright/test";
import { DefaultPage } from "./defaultPage.js";

export class HomePage extends DefaultPage {
  locators = {
    header: () => this.page.getByTestId("header_top-bar"),
    headerNavigation: () => this.page.getByTestId("header_navigation-container"),
    headerSearchBar: () => this.page.getByTestId("header_search-bar-container"),
    carousel: () => this.page.getByTestId("base-carousel_slide-container"),
    searchField: () => this.page.getByTestId("search-input_text-field"),
    searchResultsFlag: (locationName: string) =>
      this.locators
        .headerSearchBar()
        .locator(`a[href="/${locationName.toLowerCase()}-esim"]`)
        .filter({ visible: true }),
  };

  constructor(page: Page) {
    super(page, "/");
  }

  async goTo() {
    await super.goTo();
  }

  /**
   * Assertions
   * */

  async assertPage() {
    await expect(this.locators.header()).toBeVisible();
    await expect(this.locators.headerNavigation()).toBeVisible();
    await expect(this.locators.headerSearchBar()).toBeVisible();
    await expect(this.locators.carousel()).toBeVisible();
  }

  /**
   * Actions
   * */

  async searchForESim(location: string) {
    await this.locators.searchField().focus();
    await this.locators.searchField().fill(location);
    await expect(this.locators.searchResultsFlag(location)).toBeVisible({ timeout: 10000 });
  }

  async selectESimFromSearchResults(location: string) {
    await this.locators.searchResultsFlag(location).click();
  }
}
