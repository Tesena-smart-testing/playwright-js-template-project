const Page = require("./page").default;

/**
 * Class for Services page
 * @class
 * @extends Page
 */
class Services extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.url = "https://www.tesena.com/en/services";
    this.pageTitle = "Services — Tesena";
    this.ctaBttn = { loc: '//a[@class="btn btn-default"]' };
  }

  /**
   * returns Array of element handles of CTA bttns
   * @method
   * @async
   * @returns {Array} element handles of CTA bttns
   */
  async getCtaBttnsElements() {
    return await this.page.$$(this.locCtaBttn);
  }
}
module.exports = new Services();
