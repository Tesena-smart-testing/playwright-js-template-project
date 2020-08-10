/**
 * Helpers module.
 * Provides methods to be used across the project.
 * @module Helpers
 */

/**
 * Class Helpers.
 * @class
 */
class Helpers {
  /**
   *
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
          mochaInstance.currentTest.title,
          "_",
          Date.now().toString(),
          ".png"
        )
      );
    }
  }
}
module.exports = new Helpers();
