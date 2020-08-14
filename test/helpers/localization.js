/**
 * Localized data for different culture versions of Page Objects of the tested website.
 * @module Localization
 */

/**
 * Localization for Homepage Page Object
 * @constant
 * @memberof Localization
 */
const localeHomepage = {
  en: {
    published: true,
    url: "https://www.tesena.com/en",
    pageTitle: "Home — Tesena",
  },
  cs: {
    published: true,
    url: "https://www.tesena.com/cs",
    pageTitle: "Home",
  },
};

/**
 * Localization for Services Page Object
 * @constant
 * @memberof Localization
 */
const localeServices = {
  en: {
    published: true,
    url: "https://www.tesena.com/en/services",
    pageTitle: "Services — Tesena",
  },
  cs: {
    published: true,
    url: "https://www.tesena.com/sluzby",
    pageTitle: "Služby — Tesena",
  },
};

/**
 * localization for JobOfferDetail PageObject
 * Contains localizations for 'clones' of the same page, e.g. /senior-test-engineer,
 * /test-engineer, etc. Those are same pages, just with different data
 * @type {Array}
 * @constant
 * @memberof Localization
 */
const localeJobOfferDetail = [
  {
    en: {
      published: true,
      url: "https://www.tesena.com/en/test-engineer",
    },
    cs: {
      published: true,
      url: "https://www.tesena.com/test-engineer",
    },
  },
  {
    en: {
      published: true,
      url: "https://www.tesena.com/en/senior-test-engineer",
    },
    cs: {
      published: true,
      url: "https://www.tesena.com/senior-test-engineer",
    },
  },
];

module.exports = { localeHomepage, localeServices, localeJobOfferDetail };
