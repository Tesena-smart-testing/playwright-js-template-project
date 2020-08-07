const Playwright = require("playwright");

/**
 * Generic Page class.
 * This class is not ever instantiated, but always extended by other page classes.
 * @class
 */
module.exports.default = class Page {
  // eslint does not like this
  // however, these are valid class fields as specified
  // by here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
  // you need to use babel-eslint plugin and modify .eslintrc.js accordingly
  // see: https://github.com/babel/babel-eslint
  browser;
  context;
  page;
  browsers = ["chromium", "firefox", "webkit"];
  gtmUrl = "https://www.googletagmanager.com/gtm.js?id=GTM-KDG2FB9";

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
   * @returns {boolean} false, if is not visible, else undefined
   */
  async isVisible_(elementHandle) {
    let flag;
    try {
      await elementHandle.scrollIntoViewIfNeeded();
    } catch (error) {
      flag = false;
    }
    return flag;
  }

  /**
   * Returns dataLayer from page context. Basically runs javascript code in the browser
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
