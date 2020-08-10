const Homepage = require("../pageobjects/homepage.page");
const Helpers = require("../helpers/helpers");
const expect = require("chai").expect;

let requests = [];

Homepage.browsers.forEach(function (browser) {
  /**
   * Test suite for network traffict on Homepage.
   * Parametrized for all supported browsers.
   * @function NetworkHomepageTests
   * @requires module:Homepage
   */
  describe(`${browser}: network tests`, function () {
    /**
     * before hook - starts browser and all that stuff.
     * Starts network listener to check, if request to tested
     * url returned with HTTP code 200
     * @function
     * @memberof NetworkHomepageTests
     */
    before(async function () {
      await Homepage.launchBrowser(browser);
      await Homepage.startNewContext();
      await Homepage.openNewPage();

      Homepage.page.on("response", async (response) => {
        let request = await response.request();
        if (
          response.status() === 200 &&
          request.url().includes(Homepage.gtmUrl)
        ) {
          requests.push(request.url());
        }
      });

      await Homepage.page.goto(Homepage.url);
      await Homepage.page.waitForLoadState("networkidle");
    });

    /**
     * after hook - closes browser
     * @function
     * @memberof NetworkHomepageTests
     */
    after(async function () {
      await Homepage.closeBrowser();
    });

    /**
     * afterEach hook - saves screenshot, if test fail
     * @function
     * @memberof NetworkHomepageTests
     */
    afterEach(async function () {
      await Helpers.takeScreenshot(this, Homepage, "failed", browser);
    });

    /**
     * Tests, that Google GTM script, which is responsible for handling the tracking
     * datalayer events and send them to GA was successfully loaded.
     * @function GTMLoadTest
     * @memberof NetworkHomepageTests
     */
    it("GTM script was loaded", async function () {
      expect(requests).contains(Homepage.gtmUrl);
    });
  });
});
