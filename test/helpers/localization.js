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

module.exports = { localeHomepage, localeServices };
