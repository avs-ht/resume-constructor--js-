
import { openClickHandler, removeClickHandler, checkboxHandler, copyClickHandler } from "./handlers.js"
import { resumeItemTemplate } from './resume-item-template.js'

export const resumeItem = data => {
    const id = +data.id
    const resumeItem = document.createElement(`li`)
    resumeItem.className = 'resume-list__item'
    resumeItem.innerHTML = resumeItemTemplate(data.name, data.full_name)

    const actionButtons = resumeItem.querySelector('.resume-actions')
    const actions = resumeItem.querySelector('.actions')
    actionButtons.addEventListener('click', () => actions.classList.toggle('opened'))

    const openButton = resumeItem.querySelector('.open-resume')
    openButton.addEventListener('click', () => openClickHandler(id))

    const removeButton = resumeItem.querySelector('.remove-resume') 
    removeButton.addEventListener('click',  () => removeClickHandler(resumeItem, id))

    const checkbox = resumeItem.querySelector('.delete-checkbox') 
    checkbox.addEventListener('change',  (e) => checkboxHandler(e, resumeItem, id))

    const copyButton = resumeItem.querySelector('.copy-resume')
    copyButton.addEventListener('click', () => copyClickHandler(id))

    return resumeItem
}
