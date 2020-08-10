const MobileHomepage = require("../pageobjects/mobile.homepage.page");
const devicesToTest = require("../helpers/devices");
const expect = require("chai").expect;

const devicesNames = Object.keys(devicesToTest);

// due to the implementation details, as explained by Playwright dev
// here https://github.com/microsoft/playwright/issues/2787#issuecomment-652462169
// firefox can be used only, if we pick a mobile device emulation, which has existing
// firefox installation for given mobile OS (and probably its version, not shure about this, tho)
["chromium", "webkit"].forEach(function (browser) {
  devicesNames.forEach(function (device) {
    /**
     * Test suite for mobile version of Homepage.
     * Parametrized for chromium and webkit.
     * @see https://github.com/microsoft/playwright/issues/2787#issuecomment-652462169 - why not Firefox
     * @function MobileHomepageTests
     * @requires module:devicesToTest
     */
    describe(`${browser}: mobile homepage tests`, function () {
      /**
       * before hook - ensures start browser with context of
       * mobile device we are emulating
       * @function
       * @memberof MobileHomepageTests
       */
      before(async function () {
        await MobileHomepage.launchBrowser(browser);
        MobileHomepage.context = await MobileHomepage.browser.newContext({
          ...devicesToTest[device],
        });
        await MobileHomepage.openNewPage();
        await MobileHomepage.page.goto(MobileHomepage.url);
        await MobileHomepage.page.waitForLoadState("networkidle");
      });

      /**
       * after hook - closes browser
       * @function
       * @memberof MobileHomepageTests
       */
      after(async function () {
        await MobileHomepage.closeBrowser();
      });

      /**
       * Tests that page title of the mobile version of the homepage is correct
       * @function pageTitleIsCorrect
       * @memberof MobileHomepageTests
       */
      it(`${device}: page title is ${MobileHomepage.pageTitle}`, async function () {
        const title = await MobileHomepage.page.title();
        expect(title).equals(MobileHomepage.pageTitle);
      });
    });
  });
});
