const Page = require("../pageobjects/homepage.page");
const Services = require("../pageobjects/services.page");
const expect = require("chai").expect;

Page.browsers.forEach(function (browser) {
  /**
   * Test suite for Homepage -> Service cross page tests.
   * Parametrized for all supported browsers.
   * @function CrossPageTests
   * @requires module:Page
   * @requires module:Services
   */
  describe(`${browser}: cross-page tests`, function () {
    /**
     * before hook - opens Homepage, accepts cookies and opens Services
     * in the same window/tab of the browser.
     * This hook runs only once.
     * @function
     * @memberof CrossPageTests
     */
    before(async function () {
      await Page.openPage(Page.url, browser);
      await Page.page.click(Page.cookieConsentBar.loc.acceptBttn);
      await Page.page.goto(Services.url);
      await Page.page.waitForLoadState("networkidle");
    });

    /**
     * after hook - closes the browser.
     * This hook runs only once.
     * @function
     * @memberof CrossPageTests
     */
    after(async function () {
      await Page.closeBrowser();
    });

    /**
     * Tests that cookie consent bar will not be displayed
     * @function ConsentBarNotDisplayed
     * @memberof CrossPageTests
     */
    it(`cookie consent bar is not displayed`, async function () {
      const checkResult = Services.isVisible_(
        Services.cookieConsentBar.loc.bar
      );
      expect(checkResult).not.to.be.false;
    });
  });
});
