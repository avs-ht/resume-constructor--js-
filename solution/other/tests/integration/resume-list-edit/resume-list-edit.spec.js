const {test, expect} = require('@playwright/test');
const {createResume} = require('../utils/create-full-resume');
const {checkGeneratedPage} = require('../utils/check-generated-resume');
const { setInputs } = require('../utils/set-inputs');
const { openButtonClick } = require('../utils/buttonsClick/openButton');
const { backButtonClick } = require('../utils/buttonsClick/backButton');
const { generateButtonClick } = require('../utils/buttonsClick/generateButton');
const { actionsButtonClick } = require('../utils/buttonsClick/actionsButton');
const { saveButtonClick } = require('../utils/buttonsClick/saveButton');

const data = {
    name: 'C++ разработчик',
    fullName: 'Сазонов Роман Митрофанович',
    birth: '1970-02-01',
    phone: '+79182340030',
    city: 'Чебоксары',
    email: 'gounnofrufroipreu-4600@yopmail.com',
    description: '',
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

const newData = {
  name: 'Не C++ разработчик',
  fullName: 'Сазонов Роман Митрофанович',
  birth: '2000-02-01',
  phone: '+700000000',
  city: 'Москва',
  email: 'gqqq@yopmail.com',
  interest: ['Хокей', 'Новости'],
  language: [['Русский', 'A1'], ['Английский', 'A2']],
  job: [
    ['Создатель сервера', '2024-01-01', '', 'Майнкрафт Сервер FoxMine', 'Был порядочным админом'],
  ],
  education: [
    ['медицинский', '', '', '', 'это все мираж'],
    ['космонавт', '2030-01-05', '', 'космос', 'это уже реальность']
  ],
  course: [
    ['Плэйлист Гоши Python за 1 час', '', '', 'Не помогло'],
    ['Вебинары от Тинькофф', '', '', 'Prod']
  ],
}

test.beforeEach(async ({page}) => {
  await page.goto('/all');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await createResume(page, data);

  await page.goto('/all');
});

test('1. Проверка сохранения', async ({page}) => {
  const title = await page.getByTestId('resume-title').nth(0);
  await expect(title).toBeVisible();
  await expect(title).toHaveText(data.name);
});

test('2. Открытие сохранившегося резюме', async ({page}) => {
  await actionsButtonClick(page, 0)

  await openButtonClick(page, 0)

  await checkGeneratedPage(page, data)
});

test('3. Редактирование имени', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'full_name', newData.fullName)
  

  await generateButtonClick(page)

  const newGeneratedData = {...data, fullName: newData.fullName}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('4. Редактирование даты рождения', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'birth', newData.birth)
  

  await generateButtonClick(page)

  const newGeneratedData = {...data, birth: newData.birth}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('5. Редактирование города', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'city', newData.city)

  await generateButtonClick(page)

  const newGeneratedData = {...data, city: newData.city}


  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)
});

test('6. Редактирование email', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'email', newData.email)
  

  await generateButtonClick(page)

  const newGeneratedData = {...data, email: newData.email}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('7. Редактирование Личных данных', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'full_name', newData.fullName)
  await setInputs(page, 'birth', newData.birth)
  await setInputs(page, 'city', newData.city)
  await setInputs(page, 'phone', newData.phone)
  await setInputs(page, 'email', newData.email)

  await generateButtonClick(page)

  const newGeneratedData = {
    ...data, 
    fullName: newData.fullName,
    birth: newData.birth,
    city: newData.city,
    phone: newData.phone,
    email: newData.email
  }

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('8. Удаление интереса', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'interest', NaN, NaN)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, interest: data.interest.slice(0, data.interest.length-1)}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('9. Добавление интереса', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'interest', newData.interest[0])
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, interest: [...data.interest, newData.interest[0]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('10. Изменение интереса', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'interest', newData.interest[1], 1)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, interest: [data.interest[0], newData.interest[1], data.interest[2]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('11. Редактирование интересов', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'interest', NaN, NaN)
  await setInputs(page, 'interest', NaN, NaN)
  await setInputs(page, 'interest', newData.interest[1])
  await setInputs(page, 'interest', newData.interest[0], 0)
  

  await generateButtonClick(page)

  const newGeneratedData = {...data, interest: newData.interest}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('12. Удаление языка', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'language', NaN, NaN)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, language: data.language.slice(0, data.language.length-1)}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('13. Добавление языка', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'language', newData.language[1])
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, language: [...data.language, newData.language[1]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('14. Изменение названия языка', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'language', [newData.language[1][0], data.language[0][1]], 0)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, language: [[newData.language[1][0], data.language[0][1]], data.language[1]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('15. Изменение уровня языка', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'language', [data.language[0][0], newData.language[0][1]], 0)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, language: [[data.language[0][0], newData.language[0][1]], data.language[1]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('16. Редактирование языков', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'language', NaN, NaN)
  await setInputs(page, 'language', NaN, NaN)
  await setInputs(page, 'language', newData.language[1])
  await setInputs(page, 'language', newData.language[0])
  await setInputs(page, 'language', NaN, NaN)
  await setInputs(page, 'language', [newData.language[1][0], data.language[0][1]], 0)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, language: [[newData.language[1][0], data.language[0][1]]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('17. Удаление работы', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'job', NaN, NaN)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, job: data.job.slice(0, data.job.length-1)}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('18. Добавление работы', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'job', newData.job[0])
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, job: [newData.job[0], ...data.job]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('19. Редактирование работы', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'job', newData.job[0], 1)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, job: [data.job[0], newData.job[0]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('20. Редактирование образования', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'education', NaN, NaN)
  await setInputs(page, 'education', NaN, NaN)
  await setInputs(page, 'education', newData.education[1])
  await setInputs(page, 'education', [...newData.education[1].slice(0, 4), newData.education[0][4]], 0)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, education:  [[...newData.education[1].slice(0, 4), newData.education[0][4]]]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('21. Редактирование курсов', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  await setInputs(page, 'course', newData.course[1])
  await setInputs(page, 'course', NaN, NaN)
  await setInputs(page, 'course', newData.course[0])
  await setInputs(page, 'course', newData.course[1])
  await setInputs(page, 'course', [...data.course[0].slice(0, 2), '', '', data.course[0][4]], 0)
  await setInputs(page, 'course', [...data.course[1].slice(0, 2), '', '', data.course[1][4]], 1)
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, course:  [
    [...data.course[0].slice(0, 2), '', '', data.course[0][4]],
    [...data.course[1].slice(0, 2), '', '', data.course[1][4]],
    newData.course[0],
    newData.course[1]
  ]}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});

test('22. Редактирование описания', async ({page}) => {
  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)
  await backButtonClick(page)

  setInputs(page, 'description', 'Новое описание')
  
  await generateButtonClick(page)

  const newGeneratedData = {...data, description: 'Новое описание'}

  await saveButtonClick(page)

  await actionsButtonClick(page, 0)
  await openButtonClick(page, 0)

  await checkGeneratedPage(page, newGeneratedData)

});
