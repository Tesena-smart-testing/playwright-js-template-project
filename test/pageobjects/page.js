/**
 * Page module.
 * Exports default 'Page' class, which is never instantiated itself,
 * but always extended byt other Page Object classes.
 * @module Page
 */

const Playwright = require("playwright");

/**
 * Export of class Page as default to be extended by other
 * Page object classes.
 * @exports
 * @memberof Page
 */
module.exports.default = class Page {
  // eslint does not like this
  // however, these are valid class fields as specified
  // by here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
  // you need to use babel-eslint plugin and modify .eslintrc.js accordingly
  // see: https://github.com/babel/babel-eslint

  /** playwright browser instance */
  browser;
  /** playwright browser context */
  context;
  /** playwright context page */
  page;
  /** browsers supporter by playwright */
  browsers = ["chromium", "firefox", "webkit"];
  /** GTM url of Tesena site */
  gtmUrl = "https://www.googletagmanager.com/gtm.js?id=GTM-KDG2FB9";
  /** {object} information about cookie consent bar */
  cookieConsentBar = {
    loc: {
      bar: '//div[@class="cookie-bar-wrapper"]',
      acceptBttn:
        '//div[@class="cookie-bar-wrapper"]//button[contains(@class, "btn-confirm")]',
    },
  };

  /**
   * Launches browser of given type as Playwright instance.
   * @method
   * @async
   * @param {string} browser supported browser type, e.g. "chromium", "firefox", "webkit"
   */
  async launchBrowser(browser) {
    this.browser = await Playwright[browser].launch({
      headless: true,
    });
  }

  /**
   * Starts new context in already running browser instance.
   * @method
   * @async
   */
  async startNewContext() {
    this.context = await this.browser.newContext();
  }

  /**
   * Opens new page in already existing browser context.
   * @method
   * @async
   */
  async openNewPage() {
    this.page = await this.context.newPage();
  }

  /**
   * Launches Playwrights for given browser, starts new Context,
   * opens new page and then loads website in that page
   * @method
   * @async
   * @param {string} url url to open in page
   * @param {string} browser supported browser type, e.g. "chromium", "firefox", "webkit"
   */
  async openPage(url, browser) {
    await this.launchBrowser(browser);
    await this.startNewContext();
    await this.openNewPage();
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * close Playwright browser object instance
   * @method
   * @async
   */
  async closeBrowser() {
    await this.browser.close();
  }

  /**
   * Close browser context. All pages in this context will be closed.
   * Default context cannot be closed.
   * @method
   * @async
   */
  async closeContext() {
    await this.context.close();
  }

  /**
   * Checks, if element is visible on the page by
   * "abusing" elementHandle.scrollIntoViewIfNeeded() method
   * @method
   * @async
   * @param {object} elementHandle elementHandle
   * @returns {boolean} false, if is not visible, else true
   */
  async isVisible_(elementHandle) {
    try {
      await elementHandle.scrollIntoViewIfNeeded();
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * Checks, whether element specified style color is present in the element style attribute value
   * @param {object} element elementHandle object returned from page
   * @param {string} color color code to check, if present in the element style attribute value
   * @returns {boolean} true, if color code is present, else false
   */
  async verifyElementStyleColor(element, color) {
    const attr = await element.getAttribute("style");
    return attr.includes(color) ? true : false;
  }

  /**
   * Get dataLayer array object from page context. Basically runs javascript code in the browser
   * and result (if any) is passed back to node runtime.
   * @method
   * @async
   * @returns {Array} datalayer - an array of objects, each object is a tracking event
   */
  async getDatalayer() {
    return this.page.evaluate(() => {
      return window.dataLayer;
    });
  }
};
