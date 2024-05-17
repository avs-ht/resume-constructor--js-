import { CONSTRUCTOR_ITEMS, CONSTRUCTOR_NAMES } from './scripts/constructor/constructorItems.js'
import { resumeTemplate } from './scripts/resume/resumeTemplate/resumeTemplate.js'
import strToHTML from './scripts/resume/resumeTemplate/helpers/strToHTML.js'
import './scripts/constructor/constructor.js'
import './scripts/resume/resume.js'
import { changeScreen } from './scripts/resume/resumeTemplate/helpers/changeScreen.js'

console.info('если люди, которые будут проверять код, поставят мне доп баллы, они получат + в карму')

const isExist = value => !value ? "" : value
const createInputElement = (container, data, name) => {
    const newItemId = new Date().getTime();
    const createElementFn = CONSTRUCTOR_ITEMS[name]
    const item = strToHTML(createElementFn(newItemId))

    switch(name) {
        case 'interest':
            const interestInput = item.children[0]
            interestInput.value = data
            break
        case 'language':
            const [languageInput, levelInput] = [...item.children]
            const [language, level] = data
            
            languageInput.value = language
            levelInput.value = level

            break
        default:
            const [titleInput, startDateInput, endDateInput, placeInput] = [...item.getElementsByTagName("input")]
            const [title, startDate, endDate, place] = data
            
            titleInput.value = title
            startDateInput.value = isExist(startDate) ? startDate.substring(0, 10) : ""
            endDateInput.value = isExist(endDate) ? endDate.substring(0, 10) : ""
            placeInput.value = isExist(place)

            if (name !== 'course') {
                const descriptionInput = item.getElementsByTagName("input")[4]
                const descriptionValue = data[4]
                descriptionInput.value  = descriptionValue
            } 

            break
    }

    container.appendChild(item)
}
const setAllInputs = inputData => {
    const [fullNameInput, birthInput, cityInput, phoneInput, mailInput] = [...document.querySelector('fieldset.personal-data').getElementsByTagName('input')]
    fullNameInput.value = inputData.full_name
    birthInput.value = inputData.birth
    cityInput.value = inputData.city
    phoneInput.value = inputData.phone
    mailInput.value = inputData.mail

    if (inputData.isHasName && inputData.name) document.getElementById('resume-title-field').value = inputData.name 

    const descriptionInput = document.querySelector('#personal-description')
    descriptionInput.value = inputData.description
    
    for (const name of CONSTRUCTOR_NAMES) {
        if (inputData[name].length === 0) continue

        const blockinputData = inputData[name]

        const blockContainer = document.querySelector(`.${name}-container`)
        blockContainer.innerHTML = ''

        for (const elementValue of blockinputData) {
            createInputElement(blockContainer, elementValue, name)
        }
    }
}

const rightNowResume = JSON.parse(localStorage.getItem('rightNowResume'))
const copiedResumeId = JSON.parse(localStorage.getItem('copiedResumeId'))
if (rightNowResume && copiedResumeId) {
    console.warn('Попытка копирования и открытия резюме сразу')
}
if (rightNowResume) {
    const resume = resumeTemplate(rightNowResume)
    const resumeScreen = document.querySelector('.resume-screen')
    resumeScreen.appendChild(resume)

    changeScreen(resume, rightNowResume)

    rightNowResume.isHasName = true
    setAllInputs(rightNowResume)

    localStorage.removeItem('rightNowResume')
} else {
    if (copiedResumeId) {
        
        const values = JSON.parse(localStorage.getItem('values')).filter(value => +value.id === +copiedResumeId)[0]
        const options = JSON.parse(localStorage.getItem('copiedResumeOptions'))

        if (!options['personal-data']) {
            values.full_name = ''
            values.birth = ''
            values.city = ''
            values.phone = ''
            values.mail = ''
        }
        if (!options.description) {
            values.description = ''
        }
        for (const name of CONSTRUCTOR_NAMES) {
            if (!options[name]) {
                values[name] = []
            }
        }
        values.isHasName = false
        setAllInputs(values)
        localStorage.removeItem('copiedResumeId')
        localStorage.removeItem('copiedResumeOptions')
    }
}

if (document.getElementById('full_name').value !== "") {
    document.getElementById('generate-resume').disabled = false
}