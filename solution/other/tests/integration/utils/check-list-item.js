const {expect} = require('@playwright/test');
export async function checkListItem(page, name, index) {
    const title = await page.getByTestId('resume-title').nth(index)
    await expect(title).toBeVisible()
    await expect(title).toHaveText(name)
}