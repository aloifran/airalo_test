import { test } from "@playwright/test";
import { HomePage } from "../../../pages/homePage.js";
import { ESimPage } from "../../../pages/eSimPage.js";

test.describe("Japan Location", async () => {
  test.beforeEach(async ({ page }) => {
    // Set cookie to bypass cookie consent popup
    await page.context().addCookies([
      {
        name: "OptanonAlertBoxClosed",
        value: "",
        url: "https://www.airalo.com",
      },
    ]);
  });

  test("Packages validations", async ({ page }) => {
    const LOCATION = "japan";
    const homePage = new HomePage(page);
    const eSimPage = new ESimPage(page, LOCATION);

    await test.step("Search for location", async () => {
      await homePage.goTo();
      await homePage.assertPage();
      await homePage.searchForESim(LOCATION);
      await homePage.selectESimFromSearchResults(LOCATION);
    });
    await test.step("Validate Unlimited eSIM 7 days package", async () => {
      await eSimPage.assertPage();
      await eSimPage.selectUnlimitedPackageForDays(7);
      await eSimPage.assertPackagePriceForDays(7);
    });
  });
});
