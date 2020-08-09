# playwright-playground

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: eslint:recommended](https://img.shields.io/badge/linter-eslint:recommended-blue)](https://github.com/eslint/eslint)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- Documentation

  - [Page Objects](docs/pageobjects.md)

## About <a name = "about"></a>

Project to experiment with [Microsoft Playwright](https://github.com/microsoft/playwright) framework, and writing browser automated tests in [Node.js](https://nodejs.org/en/) environment in general.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

- [Node.js](https://nodejs.org/en/)

### Installing

How to get a development/ testing running.

Clone the repo:

```
git clone https://github.com/Tesena-smart-testing/playwright-js-template-project.git
```

Be in the root of the project and install and update all dependecies:

```
npm install
npm update
```

## Test development - core rules

- do not push to the master - I will revert it, no questions asked
- until CI pipeline with linting and formatting is setup, use on your development local:

  - [eslint](https://github.com/eslint/eslint) - to check, catch and remove errors, bugs. Has plugin in VScode
  - [prettier](https://github.com/prettier/prettier) - to keep code formatting consistent. Has plugin in VScode.

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
