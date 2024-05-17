const {expect} = require('@playwright/test');
export async function generateButtonClick(page) {
    const generateResumeButton = await page.getByTestId('generate-resume')
    await expect(generateResumeButton).toBeVisible();
    await generateResumeButton.click()
}