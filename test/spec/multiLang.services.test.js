const Services = require("../pageobjects/services.page");
const Helpers = require("../helpers/helpers");
const expect = require("chai").expect;

const cultures = Object.keys(Services.locale);

Services.browsers.forEach(function (browser) {
  cultures.forEach(function (culture) {
    // run tests only if culture version of the page is published
    if (Services.locale[culture].published) {
      /**
       * Test suite for Service page.
       * Parametrized for all supported browsers.
       * Parametrized for defined localizations - /en and /cs.
       * @function ServicesPageTests
       * @requires module:Services
       */
      describe(`${browser}: ${culture}: Services page tests`, function () {
        /**
         * before hook - opens Services page.
         * This hook runs only once.
         * @function
         * @memberof ServicesPageTests
         */
        before(async function () {
          await Services.openPage(Services.locale[culture].url, browser);
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
         * afterEach hook - saves screenshot, if test fail
         * @function
         * @memberof ServicesPageTests
         */
        afterEach(async function () {
          await Helpers.takeScreenshot(this, Services, "failed", browser);
        });

        /**
         * Tests that Page title is correct.
         * @function PageTitleIsCorrect
         * @memberof ServicesPageTests
         */
        it(`page title is ${Services.locale[culture].pageTitle}`, async function () {
          const title = await Services.page.title();
          expect(title).equals(Services.locale[culture].pageTitle);
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
    }
  });
});
