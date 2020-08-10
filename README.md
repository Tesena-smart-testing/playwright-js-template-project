# playwright-playground

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: eslint:recommended](https://img.shields.io/badge/linter-eslint:recommended-blue)](https://github.com/eslint/eslint)
![Continuous Integration](https://github.com/Tesena-smart-testing/playwright-js-template-project/workflows/Continuous%20Integration/badge.svg)
![PR merge](https://github.com/Tesena-smart-testing/playwright-js-template-project/workflows/PR%20merge/badge.svg)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- Documentation

  - [Page Objects](docs/pageobjects.md)
  - [Tests (specs)](docs/spec.md)
  - [Helpers](docs/helpers.md)

## About <a name = "about"></a>

Project to experiment with [Microsoft Playwright](https://github.com/microsoft/playwright) framework, and writing browser automated tests in [Node.js](https://nodejs.org/en/) environment in general.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

- [Node.js](https://nodejs.org/en/) - javascript runtime - you really need this :)

### Installing

How to get a development/ testing running.

Clone the repo:

```
git clone https://github.com/Tesena-smart-testing/playwright-js-template-project.git
```

Be in the root of the project and install and update all dependecies:

```
npm install
// if update happens, do not commit changes to the master!!!
npm update
```

## Test development

### Core rules

- do not push to the master - **I will revert it, no questions asked**
- CI pipeline with linting and formatting checks for pull requests is set up, but still use on your development local:

  - [eslint](https://github.com/eslint/eslint) - to check, catch and remove errors, bugs. Has plugin in VScode
  - [prettier](https://github.com/prettier/prettier) - to keep code formatting consistent. Has plugin in VScode.

## Documentation

Codebase (test files included) docs are generated via [Documentation.js](https://documentation.js.org/) tool. Check its documentation to figure out how to work with it, or use predefined npm scripts in `package.json`.

## Usage <a name = "usage"></a>

Tests are run using [Mochajs](https://mochajs.org) framework. See documentation for details, but general syntax looks like this:

```
./node_modules/.bin/mocha test/spec/** -t <timeout-in-ms> [...args]
```

If some arguments are always passed, put them into `.mocharc.json` file in the root and run:

```
./node_modules/.bin/mocha test/spec/** --config .mocharc.json
```

To further shorten the work, create npm skripts, e.g `npm test` in package.json file and run:

```
npm test
```

### Reporting

Test results are reported into the console, by default `spec` reporter.

Currently, as Mochajs introduced native support for parallel execution, most third party reporters stopped working properly or at all in this mode.

For example, excellent reporters Mochawesome or Allure were hit by this. 

AFAIK, Mochawesome author is aware of this issue, and [investigates how to fix this](https://github.com/adamgruber/mochawesome/issues/321).

**If you want to use Mochawesome or Allure, do not run test specs in parallel, but sequentially - disable this option in `.mocharc.json`**.

#### Screenshots

Currently there is a method implemented, which saves full page screenshot, if test fail. Since we are reporting only to the console now, we are just storing the screenshots to `./screenshots` directory.

You can see, how that works, since one test from spec `homepage.test.js` is set to fail.
