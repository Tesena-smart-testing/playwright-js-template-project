const Homepage = require("../pageobjects/homepage.page");
const MobileHomepage = require("../pageobjects/homepage.mobile.page");
const Helpers = require("../helpers/helpers");
const expect = require("chai").expect;

const cultures = Object.keys(Homepage.locale);

Homepage.browsers.forEach(function (browser) {
  cultures.forEach(function (culture) {
    /**
     * Test suite for Homepage.
     * Parametrized for all supported browsers.
     * Parametrized for defined localizations - /en and /cs.
     * @function MultiLanguageHomepageTests
     * @requires module:Homepage
     */
    describe(`${browser}: ${culture}: Homepage tests`, function () {
      /**
       * before hook - opens the browser, context and page
       * and goes to page.url
       * This hook is run once.
       * @function
       * @memberof HomepageTests
       */
      before(async function () {
        await Homepage.openPage(Homepage.locale[culture].url, browser);
      });

      /**
       * after hook - closes browser.
       * Runs only once.
       * @function
       * @memberof MultiLanguageHomepageTests
       */
      after(async function () {
        await Homepage.closeBrowser();
      });

      /**
       * afterEach hook - saves screenshot, if test fail
       * @function
       * @memberof MultiLanguageHomepageTests
       */
      afterEach(async function () {
        await Helpers.takeScreenshot(this, Homepage, "failed", browser);
      });

      /**
       * Tests correct Page title.
       * @function PageTitleIsCorrect
       * @memberof MultiLanguageHomepageTests
       */
      it(`page title is ${Homepage.locale[culture].pageTitle}`, async function () {
        const title = await Homepage.page.title();
        expect(title).equals(Homepage.locale[culture].pageTitle);
      });

      /**
       * Tests that consent bar is shown for new visitor.
       * @function ConsentBar
       * @memberof MultiLanguageHomepageTests
       */
      it("cookie consent bar is shown", async function () {
        const selectorCheck = await Homepage.page.waitForSelector(
          Homepage.cookieConsentBar.loc.bar,
          {
            state: "visible",
          }
        );
        expect(selectorCheck).is.not.null;
      });

      /**
       * Tests that background color of the big header is as
       * specified by checking against color code in style attr.
       * @function BackgroundHeaderColor
       * @memberof MultiLanguageHomepageTests
       */
      it("header background color is correct", async function () {
        const headerBackgroundElement = await Homepage.page.$(
          Homepage.headerBigBackgroundBar.loc
        );
        expect(
          await Homepage.verifyElementStyleColor(
            headerBackgroundElement,
            Homepage.headerBigBackgroundBar.color
          )
        ).to.be.true;
      });

      /**
       * Tests that hamburger menu for mobile version is not displayed
       * @function HamburgerMenuNotVisible
       * @memberof MultiLanguageHomepageTests
       */
      it("mobile hamburger menu is not visible", async function () {
        const statusCheck = await Homepage.isVisible_(
          MobileHomepage.hamburgerMenu.loc.menu
        );
        expect(statusCheck).to.be.false;
      });
    });
  });
});
