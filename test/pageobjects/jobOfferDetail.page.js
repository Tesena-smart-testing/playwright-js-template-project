/**
 * Job offer detail module
 * @module JobOfferDetail
 * @requires module:Page.default
 * @requires module:Localization.localeJobOfferDetail
 */

const Page = require("./page").default;
const { localeJobOfferDetail } = require("../helpers/localization");

/**
 * Job Offer Detail Page Object
 * @class
 * @memberof JobOfferDetail
 * @extends Page
 */
class JobOfferDetail extends Page {
  /**
   * @constructor
   */
  constructor() {
    super();
    /** {object} localization for this Page Object */
    this.locale = localeJobOfferDetail;
    /** {object} information about file input element  */
    this.fileInput = { loc: { _: '//form//input[contains(@type, "file")]' } };
    /** {object} information about uploaded file notification element */
    this.uploadedFile = { loc: { _: '//div[contains(@id, "theFileName")]' } };
  }

  /**
   * Uploads file.
   * @method
   * @async
   * @param {string} filepath filepath to the file to be uploaded
   * @returns {boolean} true: if notification element is visible, else returns false
   */
  async uploadCV(filepath) {
    await this.page.setInputFiles(this.fileInput.loc._, filepath);
    if (await this.isVisible_(await this.page.$(this.uploadedFile.loc._))) {
      return true;
    }
    return false;
  }
}
module.exports = new JobOfferDetail();
