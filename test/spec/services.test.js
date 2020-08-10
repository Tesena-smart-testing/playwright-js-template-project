const Services = require("../pageobjects/services.page");
const expect = require("chai").expect;

Services.browsers.forEach(function (browser) {
  /**
   * Test suite for Service page.
   * Parametrized for all supported browsers.
   * @function ServicesPageTests
   * @requires module:Services
   */
  describe(`${browser}: Services page tests`, function () {
    /**
     * before hook - opens Services page.
     * This hook runs only once.
     * @function
     * @memberof ServicesPageTests
     */
    before(async function () {
      await Services.openPage(Services.url, browser);
    });

    /**
     * after hook - closes browser.
     * This hook runs only once.
     * @function
     * @memberof ServicesPageTests
     */
    after(async function () {
      await Services.closeBrowser();
    });

    /**
     * Tests that Page title is correct.
     * @function PageTitleIsCorrect
     * @memberof ServicesPageTests
     */
    it(`page title is ${Services.pageTitle}`, async function () {
      const title = await Services.page.title();
      expect(title).equals(Services.pageTitle);
    });

    /**
     * Tests that CTA buttons are visible.
     * @function CTAButtonsVisible
     * @memberof ServicesPageTests
     */
    it("CTA buttons are visible", async function () {
      let flags = [];
      const elementHandles = await Services.getCtaBttnsElements();
      elementHandles.forEach(async function (elemHandle) {
        flags.push(await Services.isVisible_(elemHandle));
      });
      expect(flags).not.contains(false);
    });
  });
});
