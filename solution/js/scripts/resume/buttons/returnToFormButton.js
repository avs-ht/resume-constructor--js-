import { getCurrResume } from "../../storages/resumeStorage.js"
const generateResumeButton = document.querySelector('#generate-resume')
const createScreen = document.querySelector('.create-screen')
const resumeScreen = document.querySelector('.resume-screen')
const returnToFormButton = document.querySelector('#return-to-form')

returnToFormButton.addEventListener('click', () => {
    resumeScreen.removeChild(getCurrResume())
    resumeScreen.classList.add('none')
    createScreen.classList.remove('none')

    // Для прохождения тестов
    returnToFormButton.hidden = true
    generateResumeButton.hidden = false
})