/**
 * Helpers module.
 * Provides methods to be used across the project.
 * @module Helpers
 */

const argv = require("yargs").argv;

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

  checkBrowsers() {
    const b = process.env.CLIENT;
    console.log(b);

    if (Array.isArray(b)) {
      return b;
    }

    if (typeof b === "string") {
      return [b];
    }

    return ["chromium", "firefox", "webkit"];
  }
}
module.exports = new Helpers();
