import { CONSTRUCTOR_NAMES } from "../../constructor/constructorItems.js"
import { getResume } from "../../storages/resumeStorage.js"
import { compareByDates } from "../resumeTemplate/helpers/date.js"

const saveButton = document.querySelector('#save-resume')
saveButton.addEventListener('click', () => {
    saveButton.classList.add('none')
    saveButton.hidden = true

    let values = JSON.parse(localStorage.getItem('values'))
    if (!values) values = []

    const dataResume = getResume()
    dataResume.id = new Date().getTime()
    
    const verifiedValues = {...dataResume}
    for (const name of CONSTRUCTOR_NAMES) {
        verifiedValues[name] = dataResume[name].filter(dataObject => {
            switch(name) {
                case 'interest':
                    const interest = dataObject
                    return interest !== ''
                case 'language':
                    const [language, level] = dataObject
                    return language !== "" && level !== ''
                default:
                    const title = dataObject[0]
                    return title !== ''
            }
        })
        if (["course", "education", "job"].includes(name)) {
            verifiedValues[name].sort((item1, item2) => compareByDates(item1, item2))
        }
    }

    const editModId = localStorage.getItem('editMode')
    if (editModId) {
        const replacingResume = values.filter(value => +value.id === +editModId)[0]
        values.splice(values.indexOf(replacingResume), 1)
        
        verifiedValues.id = +editModId
        localStorage.removeItem('editMode')

    }

    localStorage.setItem('values', JSON.stringify([...values, verifiedValues]))
    
    window.location.href = '/all/'
})