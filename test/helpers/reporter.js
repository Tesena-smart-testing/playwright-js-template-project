/**
 * ReportPortal reporter module
 * @module Reporter
 * @requires @reportportal/agent-js-mocha/lib/publicReportingAPI
 */

const PublicReportingAPI = require("@reportportal/agent-js-mocha/lib/publicReportingAPI");

class Reporter {
  _createScreenshotObject(screenshotBuffer) {
    return {
      name: "attachment.png",
      type: "image/png",
      content: screenshotBuffer,
    };
  }

  async logScreenshotWhenTestStatus(
    expectedTestStatus,
    mochaInstance,
    pageObject
  ) {
    if (mochaInstance.currentTest.state === expectedTestStatus) {
      const screenshotBuffer = await pageObject
        .screenshot({
          type: "png",
          fullPage: true,
        })
        .then((buffer) => {
          return buffer.toString("base64");
        });

      //   console.log(screenshotBuffer);

      // console.log(
      //   JSON.stringify(this._createScreenshotObject(screenshotBuffer))
      // );

      switch (expectedTestStatus) {
        case "failed":
          PublicReportingAPI.log(
            "ERROR",
            "Test failed, full page screenshot attached.",
            this._createScreenshotObject(screenshotBuffer)
          );
          break;

        case "passed":
          PublicReportingAPI.log(
            "INFO",
            "Test passed, full page screenshot attached.",
            this._createScreenshotObject(screenshotBuffer)
          );
          break;
      }
    }
  }
}
module.exports = new Reporter();
