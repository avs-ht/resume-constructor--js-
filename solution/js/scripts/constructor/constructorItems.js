export const CONSTRUCTOR_NAMES = [
    'interest',
    'language',
    'job',
    'education',
    'course'
]

export const CONSTRUCTOR_ITEMS = {
    interest: id => `
        <li class="interest-item">
            <input test-id="interest" type="text" id="interesting-${id}" name="interesting" placeholder="Введите интерес">
        </li>
    `,
    language: id => `
        <li class="language-item">
            <input test-id="language-name" type="text" id="language-name-${id}" name="language-name" placeholder="Введите язык">
            <input test-id="language-level" type="text" id="language-level-${id}" name="language-level" placeholder="Введите уровень языка">
        </li>
    `,
    job: id => `
        <li class="job-item">
            <label for="job-title-${id}">Должность</label>
            <input test-id="job-title" type="text" id="job-title-${id}" name="job-title" placeholder="Введите должность">
            <label for="job-date-start-${id}">Дата начала работы</label>
            <input test-id="job-date-start" type="date" id="job-date-start-${id}" name="job-start-date">
            <label for="job-date-end-${id}">Дата конца работы</label>
            <input test-id="job-date-end" type="date" id="job-date-end-${id}" name="job-start-end">
            <label for="job-place-${id}">Место работы</label>
            <input test-id="job-place" type="text" id="job-place-${id}" name="job-place" placeholder="Введите место работы">
            <label for="job-description-${id}">Описание работы</label>
            <input test-id="job-description" name="job-description" id="job-description-${id}">
        </li>
    `,
    education: id => `
        <li class="education-item">
            <label for="education-title-${id}">Высшее образование</label>
            <input test-id="education-title" type="text" id="education-title-${id}" name="education-title" placeholder="Введите высшее образование">
            <label for="education-date-start-${id}">Дата начала обучения</label>
            <input test-id="education-date-start" type="date" id="education-date-start-${id}" name="education-date-start">
            <label for="education-date-end-${id}">Дата конца обучения</label>
            <input test-id="education-date-end" type="date" id="education-date-end-${id}" name="education-date-end">
            <label for="education-place-${id}">Место обучения</label>
            <input test-id="education-place" type="text" id="education-place-${id}" name="education-place" placeholder="Введите место обучения">
            <label for="education-description-${id}">Описание образования</label>
            <input test-id="education-description" name="education-description" id="education-description-${id}">
        </li>
    `,
    course: id => `
        <li class="course-item">
            <label for="course-title-${id}">Название курса</label>
            <input test-id="course-title" type="text" id="course-title-${id}" name="course-title" placeholder="Введите название курса">
            <label for="course-date-start-${id}">Дата начала обучения</label>
            <input test-id="course-date-start" type="date" id="course-date-start-${id}" name="course-date-start">
            <label for="course-date-end-${id}">Дата конца обучения</label>
            <input test-id="course-date-end" type="date" id="course-date-end-${id}" name="course-date-end">
            <label for="course-place-${id}">Организация</label>
            <input test-id="course-place" type="text" id="course-place-${id}" name="course-place" placeholder="Введите организацию">
        </li>
    `
}

for (const name of CONSTRUCTOR_NAMES) {
    if (CONSTRUCTOR_ITEMS.hasOwnProperty(name)) continue

    console.warn(`Конструктора ${name} нет в CONSTRUCTOR_ITEMS`)
}

for (const item of Object.keys(CONSTRUCTOR_ITEMS)) {
    if (CONSTRUCTOR_NAMES.includes(item)) continue

    console.warn(`Имени ${item} нет в CONSTRUCTOR_NAMES`)
}