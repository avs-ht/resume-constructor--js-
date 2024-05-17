const {expect} = require('@playwright/test');
export async function setModalCheckbox(page, index, currState = false) {
    const checkbox = await page.getByTestId('copy-modal__checkbox').nth(index)
    await expect(checkbox).toBeVisible()
   
    if (!currState) {
        await checkbox.check()
    } else {
        await checkbox.uncheck()
    }
    
}