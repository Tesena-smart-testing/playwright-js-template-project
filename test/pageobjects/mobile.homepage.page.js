const Page = require("./page").default;

/**
 * Page object for Mobile version of Homepage
 * @class
 * @extends Page
 */
class MobileHomepage extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.url = "https://www.tesena.com/en";
    this.pageTitle = "Home — Tesena";
  }
}
module.exports = new MobileHomepage();
