/**
 * Services module.
 * @module Services
 * @requires module:page.default
 * @requires module:localization.localeServices
 */

const Page = require("./page").default;
const { localeServices } = require("../helpers/localization");

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
    /** {object} localization values to allow for parametrized multi
     *  culture web testing, e.g. /en and /cs
     */
    this.locale = localeServices;
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
