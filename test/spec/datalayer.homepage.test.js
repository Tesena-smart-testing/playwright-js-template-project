const Homepage = require("../pageobjects/homepage.page");
const Helpers = require("../helpers/helpers");
const expect = require("chai").expect;

Homepage.browsers.forEach(function (browser) {
  /**
   * Test suite for dataLayer tests on Homepage.
   * Parametrized for all supported browsers.
   * @function DatalayerHomepageTests
   * @requires module:Homepage
   */
  describe(`${browser}: Datalayer tests`, function () {
    /**
     * before hook - opens homepage.
     * This hooks runs only once.
     * @function
     * @memberof DatalayerHomepageTests
     */
    before(async function () {
      await Homepage.openPage(Homepage.url, browser);
    });

    /**
     * afterEach hook - saves screenshot, if test fail
     * @function
     * @memberof DatalayerHomepageTests
     */
    afterEach(async function () {
      await Helpers.takeScreenshot(this, Homepage, "failed", browser);
    });

    /**
     * after hook - closes browser.
     * This hook runs only once.
     * @function
     * @memberof DatalayerHomepageTests
     */
    after(async function () {
      await Homepage.closeBrowser();
    });

    /**
     * Tests that dataLayer array object is present
     * in the browser.window context and is not empty
     * @function NonEmptyDatalayerIsPresent
     * @memberof DatalayerHomepageTests
     */
    it("datalayer is there and not empty", async function () {
      const datalayer = await Homepage.getDatalayer();
      expect(datalayer).to.be.an("array");
      expect(datalayer).not.to.be.empty;
    });
  });
});
