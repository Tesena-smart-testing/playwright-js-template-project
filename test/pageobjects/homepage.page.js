/**
 * Homepage module.
 * @module Homepage
 * @requires module:page.default
 * @requires module:localization.localeHomepage
 */

const Page = require("./page").default;
const { localeHomepage } = require("../helpers/localization");

/**
 * Class for Homepage
 * @class
 * @memberof Homepage
 * @extends Page
 */
class Homepage extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();

    /** {object} localization values to allow for parametrized multi culture web testing, e.g. /en and /cs
     */
    this.locale = localeHomepage;
    /** {object} information about header background */
    this.headerBigBackgroundBar = {
      loc: '//div[contains(@class, "section-background-cover")]',
      color: "167, 68, 69",
    };
    /** {object} information about contact form */
    this.contactForm = {
      loc: {
        form: '//form[@id="form_1"]',
        inputName: '//form[@id="form_1"]//input[contains(@name,"name")]',
        inputEmail: '//form[@id="form_1"]//input[contains(@name,"email")]',
        inputPhone: '//form[@id="form_1"]//input[contains(@name,"phone")]',
        consentCheckbox:
          '//form[@id="form_1"]//input[contains(@type,"checkbox")]',
        submitButton: '//form[@id="form_1"]//button[contains(@type,"submit")]',
        errorMessage: '//form[@id="form_1"]//div[contains(@class,"error")]',
      },
    };
  }
}

module.exports = new Homepage();
