const {test, expect} = require('@playwright/test');
import { actionsButtonClick } from "../utils/buttonsClick/actionsButton";
import { copyButtonClick } from "../utils/buttonsClick/copyButton";
import { copyModalButtonClick } from "../utils/buttonsClick/copyModalButton";
import { checkListItem } from "../utils/check-list-item";
import { createResume } from "../utils/create-full-resume";
import { setModalCheckbox } from "../utils/list/setModalCheckbox";
import { checkGeneratedPage } from "../utils/check-generated-resume";
const { setInputs } = require('../utils/set-inputs');

const data = {
  name: 'C++ разработчик',
  fullName: 'Сазонов Роман Митрофанович',
  birth: '1970-02-01',
  phone: '+79182340030',
  city: 'Чебоксары',
  email: 'gounnofrufroipreu-4600@yopmail.com',
  description: '1',
  interest: ['Футбол', 'Садоводство', 'Шахматы'],
  language: [['Русский', 'Родной'], ['Японский', 'N3']],
  job: [
    ['Майнкрафт админ', '2020-02-01', '2021-02-01', 'Майнкрафт Сервер', 'Банил людей просто так', 1],
    ['Безработный', '2020-02-01', '', 'Дом', 'Классная профессия', 0]
  ],
  education: [
    ['медицинский', '', '2021-02-01', 'универ', 'мама так сказала', 0],
    ['космонавт', '', '', 'космос', 'получил проффесию во сне', 1]
  ],
  course: [
    ['Плэйлист Гоши JS за 1 час', '2022-12-11', '2023-11-12', '', 1],
    ['Q&A по фронтенду', '2024-02-01', '2024-02-01', 'Prod', 0]
  ]
}

test.beforeEach(async ({page}) => {
    await page.goto('/all');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await createResume(page, data)
  
    await page.goto('/all');
});
  
test('1. Пустое копирование', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 0)
  await setModalCheckbox(page, 0, true)
  await copyModalButtonClick(page)

  
  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeDisabled();
  await generateResumeButton.click({force: true});
  await expect(generateResumeButton).toBeVisible();
  await expect(page.getByTestId('back-button')).toBeHidden();
});

test('2. Копирование личных данных', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 0)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    fullName: data.fullName,
    birth: data.birth,
    city: data.city,
    phone: data.phone,
    email: data.email
  })
});

test('3. Копирование описания', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 1)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  await setInputs(page, 'full_name', data.fullName)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    name: data.name,
    fullName: data.fullName,
    description: data.description
  })
});

test('4. Копирование интересов', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 2)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  await setInputs(page, 'full_name', data.fullName)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    name: data.name,
    fullName: data.fullName,
    interest: data.interest
  })
});


test('5. Копирование языков', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 3)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  await setInputs(page, 'full_name', data.fullName)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    name: data.name,
    fullName: data.fullName,
    language: data.language
  })
});

test('6. Копирование работы', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 4)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  await setInputs(page, 'full_name', data.fullName)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    name: data.name,
    fullName: data.fullName,
    job: data.job
  })
});

test('7. Копирование образования', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 5)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  await setInputs(page, 'full_name', data.fullName)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    name: data.name,
    fullName: data.fullName,
    education: data.education
  })
});

test('8. Копирование курсов', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 6)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  await setInputs(page, 'full_name', data.fullName)

  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, {
    name: data.name,
    fullName: data.fullName,
    course: data.course
  })
});

test('9. Копирование всего резюме', async ({page}) => {
  await checkListItem(page, data.name, 0)

  await actionsButtonClick(page, 0)
  await copyButtonClick(page, 0)
  await setModalCheckbox(page, 0)
  await setModalCheckbox(page, 1)
  await setModalCheckbox(page, 2)
  await setModalCheckbox(page, 3)
  await setModalCheckbox(page, 4)
  await setModalCheckbox(page, 5)
  await setModalCheckbox(page, 6)
  await copyModalButtonClick(page)
  
  await setInputs(page, 'name', data.name)
  
  const generateResumeButton = await page.getByTestId('generate-resume')
  await expect(generateResumeButton).toBeVisible();
  await expect(generateResumeButton).toBeEnabled()
  await generateResumeButton.click()

  await checkGeneratedPage(page, data)
});