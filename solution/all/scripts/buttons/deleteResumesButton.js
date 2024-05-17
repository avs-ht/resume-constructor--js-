import { removeClickHandler } from "../resume-item/handlers.js"
import { getSRStorage } from "../storage/selectedResumes.js"

const deleteSelectedResumesButton = document.querySelector('#delete-resumes')

deleteSelectedResumesButton.addEventListener('click', () => {
    // selected resumes storage - srstorage
    const SRStorage = getSRStorage()
    deleteSelectedResumesButton.hidden = true
    deleteSelectedResumesButton.classList.add('none')

    if (Object.keys(SRStorage).length === 0) {
        console.warn('Кнопка удаления была использована при отстутсвии выбранных элементов')
        return
    }
    
    for (const [id, resumeItem] of Object.entries(SRStorage)) {
        removeClickHandler(resumeItem, +id)
    }
})