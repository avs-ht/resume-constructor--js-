const {expect} = require('@playwright/test');
export async function openButtonClick(page, n) {
    const openButton = await page.getByTestId('resume-actions__open').nth(n);
    await expect(openButton).toBeVisible();
    await openButton.click();
}