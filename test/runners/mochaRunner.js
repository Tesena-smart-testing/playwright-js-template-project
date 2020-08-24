const Mocha = require("mocha");
const { reportPortalOpts } = require("../helpers/credentials");
const path = require("path");
const fs = require("fs");

// this is programmatic instantiation of Mocha - nothing too weird about it
// https://github.com/reportportal/agent-js-mocha - for reporter specific things
// https://github.com/mochajs/mocha/wiki/Using-Mocha-programmatically - for everthing else
let mochaMain = new Mocha({
  reporter: "@reportportal/agent-js-mocha",
  reporterOptions: reportPortalOpts,
  timeout: 250000,
  parallel: false,
  slow: 30000,
});

// This is basically copy and paste for now
// https:github.com/mochajs/mocha/wiki/Using-Mocha-programmatically
const testDir = path.join(process.cwd(), "test/spec");

// Add each .js file to the mocha instance
fs.readdirSync(testDir)
  .filter(function (file) {
    // Only keep the .js files
    return file.substr(-3) === ".js";
  })
  .forEach(function (file) {
    mochaMain.addFile(path.join(testDir, file));
  });

mochaMain.run();
