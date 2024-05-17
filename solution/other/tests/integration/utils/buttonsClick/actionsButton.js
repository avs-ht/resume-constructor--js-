const {expect} = require('@playwright/test');
export async function actionsButtonClick(page, n) {
    const actions = await page.getByTestId('resume-actions').nth(n);
    await expect(actions).toBeVisible();
    await actions.click();
}