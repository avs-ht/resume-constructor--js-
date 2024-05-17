const {expect} = require('@playwright/test');
export async function toggleCheckbox(page, index, currState = false) {
    const checkbox = await page.getByTestId('resume-checkbox').nth(index)
    await expect(checkbox).toBeVisible()
   
    if (!currState) {
        await checkbox.check()
    } else {
        await checkbox.uncheck()
    }
    
}