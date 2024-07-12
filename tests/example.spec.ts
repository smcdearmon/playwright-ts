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
