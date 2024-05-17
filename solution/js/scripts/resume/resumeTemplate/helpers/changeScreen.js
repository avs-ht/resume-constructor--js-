import { setCurrResume, setResume } from "../../../storages/resumeStorage.js"

const createScreen = document.querySelector('.create-screen')
const resumeScreen = document.querySelector('.resume-screen')
const returnToFormButton = document.querySelector('#return-to-form')
const generateResumeButton = document.querySelector('#generate-resume')

// newResume - ссылка на html резюме, dataresume - данные, чтоб при сохранении их сохранить
export const changeScreen = (newResume, dataResume) => {
    setCurrResume(newResume)
    setResume(dataResume)
    
    createScreen.classList.add('none')
    resumeScreen.classList.remove('none')

    returnToFormButton.hidden = false
    generateResumeButton.hidden = true
}