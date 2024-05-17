
import { getSRStorage, pushSRStoarge, deleteFromSRS } from "../storage/selectedResumes.js"

import {setCopiedResume} from '../storage/copiedResume.js'
const deleteSelectedResumesButton = document.querySelector('#delete-resumes')

export const openClickHandler = (id) => {
    const values = JSON.parse(localStorage.getItem('values'))
    const value = values.filter(value => +value.id === id)[0]
    localStorage.setItem('rightNowResume', JSON.stringify(value))
    localStorage.setItem('editMode', id)
    window.location.href = '/'
}

export const removeClickHandler = (resumeItem, id) => {
    const values = JSON.parse(localStorage.getItem('values'))
    const value = values.filter(value => +value.id === id)[0]
    
    values.splice(values.indexOf(value), 1)

    localStorage.setItem('values', JSON.stringify([...values]))
    resumeItem.remove()

    if (getSRStorage().hasOwnProperty(id)) deleteFromSRS(id)
}

export const checkboxHandler = (e, resumeItem, id) => {
    const isChecked = e.target.checked
    if (!isChecked) {
        deleteFromSRS(id)
    }  else {
        pushSRStoarge(id, resumeItem)
    }

    if (Object.keys(getSRStorage()).length === 0) {
        deleteSelectedResumesButton.hidden = true
        deleteSelectedResumesButton.classList.add('none')
    } else {
        deleteSelectedResumesButton.hidden = false
        deleteSelectedResumesButton.classList.remove('none')
    }
}

const copyModalButton = document.querySelector('#copy-modal__copy')
const cancelButton = document.querySelector('#copy-modal__cancel')
export const copyClickHandler = (id) => {
    const copyModal = document.querySelector('.copy-modal')
    copyModal.showModal()
    copyModalButton.hidden = false
    cancelButton.hidden = false
    setCopiedResume(id)
}