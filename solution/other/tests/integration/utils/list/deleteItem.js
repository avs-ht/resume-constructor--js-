import { actionsButtonClick } from "../buttonsClick/actionsButton"
const {expect} = require('@playwright/test');
export async function deleteListItem(page, index) {
    actionsButtonClick(page, index)
    const deleteButton = await page.getByTestId('resume-actions__delete').nth(index);
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
}