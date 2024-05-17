const {expect} = require('@playwright/test');
export async function copyModalButtonClick(page) {
    const copy = await page.getByTestId('copy-modal__copy').nth(0);
    await expect(copy).toBeVisible();
    await copy.click();
}