import { setCopiedResume } from "../../storage/copiedResume.js"

const cancelButton = document.getElementById('copy-modal__cancel')
const copyModal = document.querySelector('.copy-modal')
const copyModalButton = document.querySelector('#copy-modal__copy')
cancelButton.addEventListener('click', () => {
    copyModal.close()
    const inputs = [...copyModal.getElementsByTagName('input')]
    for (const input of inputs) {
        input.checked = false
    }
    setCopiedResume(-1)
    
    copyModalButton.hidden = true
    cancelButton.hidden = true
})