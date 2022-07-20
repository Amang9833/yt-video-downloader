const puppeteer = require("puppeteer");

// ------------> for debug Monitor console

const url = "https://yt1s.com/en342"; // --> always fix
let answer;

module.exports = async function scrapeUrl(userUrl) {
  // let yt_url = "https://youtu.be/dXjKh66BR2U";
  let yt_url = userUrl;

  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--disable-extensions"],
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  }); // launch the browser
  const page = await browser.newPage(); // create a new instance
  await page.goto(url, { waitUntil: "domcontentloaded" }); // get into that website

  // pastting url website

  // console.log("1 visited website");

  await page.type("[name=q]", yt_url); // paste url

  // console.log("2 paste the url");

  await page.click("[type=button]");

  // console.log("3 clicked the button");

  //page to convert the yt to downloadeable file
  await page.waitForTimeout(5000);

  await page.click("[id='btn-action']");
  await page.waitForTimeout(2000);

  // console.log("4 witing for final url");

  // console.log("abhi ruuk");
  let finalUrl;

  const getData = async () => {
    return await page.evaluate(async () => {
      finalUrl = document.getElementById("asuccess").href;
      return await finalUrl;
    });
  };

  answer = await getData();
  // console.log("res -> ", answer);

  // console.log("hogya");

  await browser.close();

  return answer;
};
