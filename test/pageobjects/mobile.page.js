/**
 * Mobile Page module.
 * Exports 'MobilePage' class, which should be never used itself,
 * but always extended by other mobile Poge Object classes.
 * @module MobilePage
 */

const Page = require("../pageobjects/page").default;

/**
 * MobilePage generic class, which extends default Page class.
 * This class should never be used itsef, but always extended by concrete
 * Page Object classes.
 * @class
 * @memberof MobilePage
 */
class MobilePage extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();
    /** {object} information about hamburger menu element */
    this.hamburgerMenu = {
      loc: {
        menu: '//button[@id="nav-toggle"]',
      },
    };
  }
}
module.exports = MobilePage;
