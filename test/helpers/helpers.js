/**
 * Helpers module.
 * Provides methods to be used across the project.
 * @module Helpers
 */
const argv = require("yargs")
  .env("npm_config")
  .option("browser", { type: "array" }).argv;
/**
 * Class Helpers.
 * @class
 * @memberof Helpers
 */
class Helpers {
  /**
   * Takes .png screenshot of full page of `pageobject.page` instance and saves it
   * to `process.cwd() + screenshots` directory.
   *
   * Filename is concat of expected test status, browser type, test title and `Date.now()`.
   * @method
   * @async
   * @param {object} mochaInstance instance of the mocha test runner, i.e. `this`
   * @param {object} pageobject instance of the pageobject class, i.e. `Homepage`
   * @param {string} expectedTestStatus `passed` or `failed`
   * @param {string} browser type of browser we are testing, i.e. 'chromium', 'webkit', 'firefox'
   */
  async takeScreenshot(mochaInstance, pageobject, expectedTestStatus, browser) {
    if (mochaInstance.currentTest.state === expectedTestStatus) {
      await pageobject.screenshot(
        `${expectedTestStatus}_`.concat(
          browser,
          "_",
          mochaInstance.currentTest
            .fullTitle()
            .replace(/:/g, "")
            .replace(/\s/g, "_")
            .replace(/\//g, "")
            .replace(/\./g, ""),
          "_",
          Date.now().toString(),
          ".png"
        )
      );
    }
  }

  /**
   * Checks, what browsers to test against custom ENV parameters added in npm script in console.
   * @returns {string} browser name to be tested. Should be "chromium", "firefox", "webkit"
   * @example npm browser=chromium test
   * @see https://stackoverflow.com/a/34958058/14155754
   */
  checkBrowsers() {
    // this is a f**** dirty trick!!!
    // see: https://stackoverflow.com/a/34958058/14155754
    // const b = process.env.npm_config_browser;
    const b = argv.browser;

    if (Array.isArray(b) && b[0] !== "") {
      return b;
    }

    return ["chromium", "firefox", "webkit"];
  }
}
module.exports = new Helpers();
