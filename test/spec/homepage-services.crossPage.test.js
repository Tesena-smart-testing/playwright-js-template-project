const Page = require("../pageobjects/homepage.page");
const Services = require("../pageobjects/services.page");
const expect = require("chai").expect;
const Reporter = require("../helpers/reporter");

const cultures = Object.keys(Page.locale);

Page.browsers.forEach(function (browser) {
  cultures.forEach(function (culture) {
    // run tests only if culture version of the page is published
    if (Page.locale[culture].published) {
      /**
       * Test suite for Homepage -> Service cross page tests.
       * Parametrized for all supported browsers.
       * Parametrized for published languages.
       * @function CrossPageTests
       * @requires module:Page
       * @requires module:Services
       */
      describe(`${browser}: ${culture} cross-page tests`, function () {
        /**
         * before hook - opens Homepage, accepts cookies and opens Services
         * in the same window/tab of the browser.
         * This hook runs only once.
         * @function
         * @memberof CrossPageTests
         */
        before(async function () {
          await Page.openPage(Page.locale[culture].url, browser);
          await Page.page.click(Page.cookieConsentBar.loc.acceptBttn);
          // consent cookie needs to be saved
          await Page.page.waitForTimeout(3000);
          await Page.page.goto(Services.locale[culture].url);
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
         * afterEach hook - saves screenshot, if test fail
         * @function
         * @memberof CrossPageTests
         */
        afterEach(async function () {
          await Reporter.logScreenshotWhenTestStatus(
            "failed",
            this,
            Page.page
          );
        });

        /**
         * Tests that cookie consent bar will not be displayed
         * @function ConsentBarNotDisplayed
         * @memberof CrossPageTests
         */
        it(`cookie consent bar is not displayed`, async function () {
          const checkResult = await Services.isVisible_(
            Services.cookieConsentBar.loc.bar
          );
          expect(checkResult).to.be.false;
        });
      });
    }
  });
});
