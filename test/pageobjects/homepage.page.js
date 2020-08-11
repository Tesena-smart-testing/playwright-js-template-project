/**
 * Homepage module.
 * @module Homepage
 * @requires module:page.default
 */

const Page = require("./page").default;

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

    /** {object} locale values to allow for parametrized multi culture web testing, e.g. /en and /cs
     * This could be also stored separately and loaded/required into the POP module.
     */
    this.locale = {
      en: { url: "https://www.tesena.com/en", pageTitle: "Home — Tesena" },
      cs: { url: "https://www.tesena.com/cs", pageTitle: "Home" },
    };

    /** this page url */
    this.url = "https://www.tesena.com/en";
    /** this page title */
    this.pageTitle = "Home — Tesena";
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
