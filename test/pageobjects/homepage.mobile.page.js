/**
 * MobileHomepage module
 * @module MobileHomepage
 * @requires module:MobilePage
 */

const { localeHomepage } = require("../helpers/localization");
const MobilePage = require("../pageobjects/mobile.page");

/**
 * Page object for Mobile version of Homepage
 * @class
 * @memberof MobileHomepage
 * @extends MobilePage
 */
class MobileHomepage extends MobilePage {
  /**
   * @constructor
   */
  constructor() {
    super();
    /** localization settings for Homepage page object */
    this.locale = localeHomepage;
  }
}

module.exports = new MobileHomepage();
