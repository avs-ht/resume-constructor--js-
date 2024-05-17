const {expect} = require('@playwright/test');

const personalKeys = {
    'full_name': 0,
    'birth': 1,
    'city': 2,
    'phone': 3,
    'email': 4
}
export async function setInputs(page, key, value, n = -1) {
    // NaN - delete
    // -1 - add
    // other - edit n element
    if (isNaN(n)) {
        const deleteButton = await page.getByTestId(`remove-${key}`) 
        await expect(deleteButton).toBeVisible()
        await deleteButton.click()
        return
    }
    switch(key) {
        case 'interest':
            if (n === -1) {
                const addButton = await page.getByTestId(`add-${key}`) 
                await expect(addButton).toBeVisible()
                await addButton.click()
                const interest = await page.getByTestId(`interest`).last()
                await expect(interest).toBeVisible()
                await interest.fill(value)
            } else {
                const interest = await page.getByTestId(`interest`).nth(n)
                await expect(interest).toBeVisible()
                await interest.fill(value)
            }
            break
        case 'language':
            if (n === -1) {
                const addButton = await page.getByTestId(`add-${key}`) 
                await expect(addButton).toBeVisible()
                await addButton.click()

                const languageName = await page.getByTestId(`language-name`).last()
                await expect(languageName).toBeVisible()
                await languageName.fill(value[0])

                const languageLevel = await page.getByTestId(`language-level`).last()
                await expect(languageLevel).toBeVisible()
                await languageLevel.fill(value[1])
            } else {
                const languageName = await page.getByTestId(`language-name`).nth(n)
                await expect(languageName).toBeVisible()
                await languageName.fill(value[0])

                const languageLevel = await page.getByTestId(`language-level`).nth(n)
                await expect(languageLevel).toBeVisible()
                await languageLevel.fill(value[1])
            }
            break
        case 'job':
        case 'education':
        case 'course':
            if (n === -1) {
                const addButton = await page.getByTestId(`add-${key}`) 
                await expect(addButton).toBeVisible()
                await addButton.click()

                const title = await page.getByTestId(`${key}-title`).last()
                await expect(title).toBeVisible()
                await title.fill(value[0])

                const startDate = await page.getByTestId(`${key}-date-start`).last()
                await expect(startDate).toBeVisible()
                await startDate.fill(value[1])

                const endDate = await page.getByTestId(`${key}-date-end`).last()
                await expect(endDate).toBeVisible()
                await endDate.fill(value[2])

                const place = await page.getByTestId(`${key}-place`).last()
                await expect(place).toBeVisible()
                await place.fill(value[3])
                if (key !== 'course') {
                    const description = await page.getByTestId(`${key}-description`).last()
                    await expect(description).toBeVisible()
                    await description.fill(value[4])
                }
            } else {
                const title = await page.getByTestId(`${key}-title`).nth(n)
                await expect(title).toBeVisible()
                await title.fill(value[0])

                const startDate = await page.getByTestId(`${key}-date-start`).nth(n)
                await expect(startDate).toBeVisible()
                await startDate.fill(value[1])

                const endDate = await page.getByTestId(`${key}-date-end`).nth(n)
                await expect(endDate).toBeVisible()
                await endDate.fill(value[2])

                const place = await page.getByTestId(`${key}-place`).nth(n)
                await expect(place).toBeVisible()
                await place.fill(value[3])
                if (key !== 'course') {
                    const description = await page.getByTestId(`${key}-description`).nth(n)
                    await expect(description).toBeVisible()
                    await description.fill(value[4])
                }
            }
            break
        case 'name':
            const nameInput = await page.getByTestId('resume-title-field').nth(0);
            await expect(nameInput).toBeVisible();
            await nameInput.fill(value);
            break
        case 'description':
            const descInput = await page.getByTestId('personal-description').nth(0);
            await expect(descInput).toBeVisible();
            await descInput.fill(value);
            break
        default:
            // ['full_name', 'birth', 'phone', 'city', 'email']
            const input = await page.getByTestId('personal-info').nth(personalKeys[key]);
            await expect(input).toBeVisible();
            await input.fill(value);
            break
    }
}