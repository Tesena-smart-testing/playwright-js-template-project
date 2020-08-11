/**
 * MobileHomepage module
 * @module MobileHomepage
 * @requires module:page.default
 */

const Page = require("./page").default;

/**
 * Page object for Mobile version of Homepage
 * @class
 * @memberof MobileHomepage
 * @extends Page
 */
class MobileHomepage extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();
    /** this page url */
    this.url = "https://www.tesena.com/en";
    /** this page title */
    this.pageTitle = "Home — Tesena";
  }
}

module.exports = new MobileHomepage();
