const jobOfferDetailPage = require("../pageobjects/jobOfferDetail.page");
const expect = require("chai").expect;
const path = require("path");
const Reporter = require("../helpers/reporter");

jobOfferDetailPage.browsers.forEach(function (browser) {
  // run for all possible clones of the page
  // clone can be: /test-engineer page, /test-analyst page, etc
  jobOfferDetailPage.locale.forEach(function (clones) {
    const cultures = Object.keys(clones);
    // run for all cultures of given clone page
    cultures.forEach(function (culture) {
      // run tests only if culture version of the page is published
      if (clones[culture].published) {
        /**
         * Test suite for Job Offers - Job Detail page.
         * This page is essentialy cloned for several open positions, only difference is in
         * data, which are supplied via `jobOfferDetailPage.locale` attribute object.
         * Parametrized for all supported browsers.
         * Parametrized for all published languages.
         * Parametrized for all published page clones.
         * @function JobOfferDetailPageTests
         * @requires module:jobOfferDetailPage
         * @requires module:Helpers
         */
        describe(`${browser}: ${culture}: ${clones[culture].url}: job offer page tests`, function () {
          /**
           * before hook - opens the page
           * This hook runs only once.
           * @function
           * @memberof JobOfferDetailPageTests
           */
          before(async function () {
            await jobOfferDetailPage.openPage(clones[culture].url, browser);
          });

          /**
           * after hook - closes the browser
           * This hook runs only once.
           * @function
           * @memberof JobOfferDetailPageTests
           */
          after(async function () {
            await jobOfferDetailPage.closeBrowser();
          });

          /**
           * afterEach hook - saves full page screenshot if test fails
           * This hook runs after each test
           * @function
           * @memberof JobOfferDetailPageTests
           */
          afterEach(async function () {
            await Reporter.logScreenshotWhenTestStatus(
              "failed",
              this,
              jobOfferDetailPage.page
            );
          });

          /**
           * Tests, that file upload works.
           * @function FileUploadTest
           * @memberof JobOfferDetailPageTests
           */
          it("file uploading works", async function () {
            const checkResult = await jobOfferDetailPage.uploadCV(
              path.join(process.cwd(), "test/resources/test_cv.txt")
            );
            expect(checkResult).to.be.true;
          });
        });
      }
    });
  });
});
