const {expect} = require('@playwright/test');
export async function saveButtonClick(page)  {
    const saveButton = await page.getByTestId('save-button');
    await expect(saveButton).toBeVisible();
    await saveButton.click();
}