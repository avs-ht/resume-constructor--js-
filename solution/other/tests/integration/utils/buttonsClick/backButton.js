const {expect} = require('@playwright/test');
export async function backButtonClick(page) {
    const backButton = await page.getByTestId('back-button');
    await expect(backButton).toBeVisible();
    await backButton.click()
}