let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitFor(1000);
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
    await page.screenshot({ path: "mainpage.png", fullPage: true });
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 1000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toMatch("Get started with Team");
  }, 1000);
});

describe("Tests for features and pricing pages", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/");
  });
  test("Futures page has properly title", async () => {
    const product = await page.$x('//button[contains(text(), "Product")]');
    await product[0].click();
    const allFeatures = await page.$x('//a[contains(text(), "All features")]');
    await allFeatures[0].click();
    await page.waitFor('//h1[contains(text(),"The tools")]');
    const titleForFeatures = await page.title();
    expect(titleForFeatures).toEqual("Features | GitHub · GitHub");
    await page.screenshot({ path: "features.png", fullPage: true });
  }, 6000);
  test("Actions page has properly title", async () => {
    const product = await page.$x('//button[contains(text(), "Product")]');
    await product[0].click();
    const Actions = await page.$x('//div[contains(text(), "Actions")]');
    await Actions[0].click();
    await page.waitFor('//h3[contains(text(), "GitHub Actions")]')    
    const titleForActions = await page.title();
    expect(titleForActions).toEqual("Features • GitHub Actions · GitHub");
    await page.screenshot({ path: "actions.png", fullPage: true });
  }, 3000);
  test("Pricing page", async () => {
    const pricing = await page.$x(
      '//li[contains(@class, "HeaderMenu")]//a[@href="/pricing"]'
    );
    await pricing[0].click();
    await page.waitFor('//h1[contains(text(), "Get the complete")]');
    const titleForActions = await page.title();
    expect(titleForActions).toEqual("Pricing · Plans for every developer · GitHub");
    await page.screenshot({ path: "pricing.png", fullPage: true });
  }, 4000);
});
