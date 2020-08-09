const Homepage = require("../pageobjects/homepage.page");
const expect = require("chai").expect;

Homepage.browsers.forEach(function (browser) {
  describe(`${browser}: Homepage tests`, function () {
    before(async function () {
      await Homepage.openPage(Homepage.url, browser);
    });

    after(async function () {
      await Homepage.closeBrowser();
    });

    it(`page title is ${Homepage.pageTitle}`, async function () {
      const title = await Homepage.page.title();
      expect(title).equals(Homepage.pageTitle);
    });

    it("cookie consent bar is shown", async function () {
      const selectorCheck = await Homepage.page.waitForSelector(
        Homepage.cookieConsentBar.loc,
        { state: "visible" }
      );
      expect(selectorCheck).is.not.null;
    });

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
  });
});
