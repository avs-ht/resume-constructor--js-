const {expect} = require('@playwright/test');

export async function createResume(page, data) {
  await page.goto('/');
  const nameInput = await page.getByTestId('personal-info').nth(0);
  await expect(nameInput).toBeVisible();
  await nameInput.fill(data.fullName);

  // личные данные
  if (data.birth) {
    const birthInput = await page.getByTestId('personal-info').nth(1);
    await expect(birthInput).toBeVisible();
    await birthInput.fill(data.birth);
  }
  if (data.city) {
    const cityInput = await page.getByTestId('personal-info').nth(2);
    await expect(cityInput).toBeVisible();
    await cityInput.fill(data.city);
  }
  if (data.phone) {
    const phoneInput = await page.getByTestId('personal-info').nth(3);
    await expect(phoneInput).toBeVisible();
    await phoneInput.fill(data.phone);
  }
  if (data.email) {
    const emailInput = await page.getByTestId('personal-info').nth(4);
    await expect(emailInput).toBeVisible();
    await emailInput.fill(data.email);
  }
  if (data.name) {
    const nameInput = await page.getByTestId('resume-title-field').nth(0);
    await expect(nameInput).toBeVisible();
    await nameInput.fill(data.name);
  }

  for (const name of ['interest','language','job','education','course']) {
    if (!data[name]) continue
    if (data[name].length !== 0) {
      const addButton = await page.getByTestId(`add-${name}`);
        for (let i = 0; i < data[name].length; i++) {
            const dataItem = data[name][i]
            switch(name) {
                case 'interest':
                    const input = await page.getByTestId('interest').nth(i);
                    await expect(input).toBeVisible();
                    await input.fill(dataItem);
                    break
                case 'language':
                    const lname = await page.getByTestId('language-name').nth(i);
                    await expect(lname).toBeVisible();
                    await lname.fill(dataItem[0]);

                    const level = await page.getByTestId('language-level').nth(i);
                    await expect(level).toBeVisible();
                    await level.fill(dataItem[1]);

                    break
                default:
                    const title = await page.getByTestId(`${name}-title`).nth(i);
                    await expect(title).toBeVisible();
                    await title.fill(dataItem[0]);
                    
                    const start = await page.getByTestId(`${name}-date-start`).nth(i);
                    await expect(start).toBeVisible();
                    await start.fill(dataItem[1]);

                    const end = await page.getByTestId(`${name}-date-end`).nth(i);
                    await expect(end).toBeVisible();
                    await end.fill(dataItem[2]);

                    const place = await page.getByTestId(`${name}-place`).nth(i);
                    await expect(place).toBeVisible();
                    await place.fill(dataItem[3]);

                    if (name !== 'course') {
                      const desc = await page.getByTestId(`${name}-description`).nth(i);
                      await expect(desc).toBeVisible();
                      await desc.fill(dataItem[4]);
                    }
            } 
            await addButton.click();
        }
    }
  }

  if (data.description) {
    const descriptionInput = await page.getByTestId('personal-description').nth(0);
    await expect(descriptionInput).toBeVisible();
    await descriptionInput.fill(data.description);
  }

  const generateResumeButton = await page.getByTestId('generate-resume');
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled();
  await generateResumeButton.click();
  await expect(generateResumeButton).toBeHidden();
  const saveButton = await page.getByTestId('save-button');
  await expect(saveButton).toBeVisible();
  await saveButton.click();
}
