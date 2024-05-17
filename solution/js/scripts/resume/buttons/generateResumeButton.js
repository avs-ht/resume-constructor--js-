import { CONSTRUCTOR_NAMES } from "../../constructor/constructorItems.js"

import { changeScreen } from "../resumeTemplate/helpers/changeScreen.js"
import { resumeTemplate } from "../resumeTemplate/resumeTemplate.js"

const generateResumeButton = document.querySelector('#generate-resume')

const resumeScreen = document.querySelector('.resume-screen')
const fullNameInput = document.querySelector('#full_name')

fullNameInput.addEventListener('input', (e) => {
    if (e.target.value === "") {
        generateResumeButton.disabled = true
        return
    }
    generateResumeButton.disabled = false
})

function collectData() {
    const data = {}
    const personalData = [...document.querySelector('fieldset.personal-data').getElementsByTagName('input')].map(input => input.value)
    data.full_name = personalData[0]
    data.birth = personalData[1]
    data.city = personalData[2]
    data.phone = personalData[3]
    data.mail = personalData[4]
    data.name = document.querySelector('#resume-title-field').value
    data.description = document.querySelector('#personal-description').value

    for (const name of CONSTRUCTOR_NAMES) {
        const blockName = document.querySelector(`.${name}-container`)
        const elements = blockName.getElementsByTagName('li')
    
        const dataValue = []
        data[name] = dataValue

        for (const element of elements) {
            const inputs = element.getElementsByTagName('input')
            switch(name) {
                case 'interest':
                    const interest = inputs[0].value
                    dataValue.push(interest)   
                    break      
                case 'language':
                    const language = inputs[0].value
                    const level = inputs[1].value
                    dataValue.push([language, level]) 
                    break
                default:
                    const elementName = inputs[0].value 
                    const startDate = inputs[1].valueAsDate
                    const endDate = inputs[2].valueAsDate 
                    const place = inputs[3].value 
                    if (name === 'course') {
                        dataValue.push([elementName, startDate, endDate, place]) 
                        break
                    }
                    const description = inputs[4].value 
                    dataValue.push([elementName, startDate, endDate, place, description]) 
                    break
            }
        }
    }

    return data
}

function generateResume() {
    const dataResume = collectData()
    const newResume = resumeTemplate(dataResume)

    resumeScreen.appendChild(newResume)

    return [dataResume, newResume]
}

generateResumeButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (fullNameInput.value === "") {
        fullNameInput.setCustomValidity('Введите правильное ФИО')
        fullNameInput.reportValidity();
        return
    }

    const [dataResume, newResume] = generateResume()
    changeScreen(newResume, dataResume)
})