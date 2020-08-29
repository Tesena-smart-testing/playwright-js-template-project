const MobileHomepage = require("../pageobjects/homepage.mobile.page");
const devicesToTest = require("../helpers/devices");
const expect = require("chai").expect;
const Reporter = require("../helpers/reporter");

const cultures = Object.keys(MobileHomepage.locale);
const devicesNames = Object.keys(devicesToTest);

// due to the implementation details, as explained by Playwright dev
// here https://github.com/microsoft/playwright/issues/2787#issuecomment-652462169
// firefox can be used only, if we pick a mobile device emulation, which has existing
// firefox installation for given mobile OS (and probably its version, not shure about this, tho)
["chromium", "webkit"].forEach(function (browser) {
  cultures.forEach(function (culture) {
    // test are run only if culture version of given page object is published
    if (MobileHomepage.locale[culture].published) {
      devicesNames.forEach(function (device) {
        /**
         * Test suite for mobile version of Homepage.
         * Parametrized for chromium and webkit.
         * Parametrized for published languages.
         * @see https://github.com/microsoft/playwright/issues/2787#issuecomment-652462169 - why not Firefox
         * @function MobileHomepageTests
         * @requires module:devicesToTest
         */
        describe(`${browser}: ${culture}: ${device}: mobile homepage tests`, function () {
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
            await MobileHomepage.page.goto(MobileHomepage.locale[culture].url);
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
           * afterEach hook - saves screenshot, if test fail
           * @function
           * @memberof MobileHomepageTests
           */
          afterEach(async function () {
            await Reporter.logScreenshotWhenTestStatus(
              "failed",
              this,
              MobileHomepage.page
            );
          });

          /**
           * Tests that page title of the mobile version of the homepage is correct
           * @function pageTitleIsCorrect
           * @memberof MobileHomepageTests
           */
          it(`page title is ${MobileHomepage.locale[culture].pageTitle}`, async function () {
            const title = await MobileHomepage.page.title();
            expect(title).equals(MobileHomepage.locale[culture].pageTitle);
          });

          /**
           * Tests that hamburger menu on mobile version of page is visible
           * @function hamburgerMenuIsVisible
           * @memberof MobileHomepageTests
           */
          it("hamburger menu is visible", async function () {
            const statusCheck = MobileHomepage.isVisible_(
              MobileHomepage.hamburgerMenu.loc.menu
            );
            expect(statusCheck).not.to.be.false;
          });
        });
      });
    }
  });
});
