const {expect} = require('@playwright/test');
export async function copyButtonClick(page, n) {
    const copy = await page.getByTestId('resume-actions__copy').nth(n);
    await expect(copy).toBeVisible();
    await copy.click();
}