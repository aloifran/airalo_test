import { Locator, Page } from "@playwright/test";

type PageLocatorBuilder = (...args: unknown[]) => Locator;
type PageLocator = Record<string, PageLocatorBuilder>;

export abstract class DefaultPage {
  page: Page;
  url: string;
  abstract locators: PageLocator;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async goTo() {
    await this.page.goto(this.url);
  }
}
