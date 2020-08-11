/**
 * Services module.
 * @module Services
 * @requires module:page.default
 */

const Page = require("./page").default;

/**
 * Class for Services page
 * @class
 * @memberof Services
 * @extends Page
 */
class Services extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();
    /** this page url */
    this.url = "https://www.tesena.com/en/services";
    /** this page title */
    this.pageTitle = "Services — Tesena";
    /** {object} information about CTA button elements */
    this.ctaBttn = { loc: '//a[@class="btn btn-default"]' };
  }

  /**
   * returns Array of element handles of CTA bttns
   * @method
   * @async
   * @returns {Array} element handles of CTA bttns
   */
  async getCtaBttnsElements() {
    return await this.page.$$(this.ctaBttn.loc);
  }
}

module.exports = new Services();
