import { test, expect } from '@playwright/test';
import { Home } from '../pages/home';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('getting started should contain table of contents', async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  await home.getStarted();
  await expect(home.tocList).toHaveText([
    `How to install Playwright`,
    `What's Installed`,
    `How to run the example test`,
    `How to open the HTML test report`,
    `Write tests using web first assertions, page fixtures and locators`,
    `Run single test, multiple tests, headed mode`,
    `Generate tests with Codegen`,
    `See a trace of your tests`
  ]);
})

test('should show Page Object Model article', async ({ page }) => {
  const home = new Home(page);
  await home.goto();
  await home.pageObjectModel();
  await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
});


test('Fill out contact me page', async ({ page }) => {
  await page.goto('https://shawnmcdearmon.com/');
  await expect(page).toHaveTitle(/Test Solutions/);
  await page.getByRole('link', { name: 'Contact Me' }).click();
  // await page.getByLabel('First').click();
  await page.getByLabel('First').fill('Test');
  // await page.getByLabel('Last').click();
  await page.getByLabel('Last').fill('User');
  // await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('test@test.com');
  await page.getByLabel('Subject').selectOption('Request a quote');
  // await page.getByLabel('Comment or Message').click();
  await page.getByLabel('Comment or Message').fill('This is a test');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Recapcha working too well and can't submit :)
  // await expect(page.getByText('Thanks you for contacting me! I will be in touch shortly. Feel free to add my')).toBeVisible();
});