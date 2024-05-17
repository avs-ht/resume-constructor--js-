import { getCopiedResume } from "../../storage/copiedResume.js"

const copyButton = document.getElementById('copy-modal__copy')
const checboxes = document.querySelector('.copy-modal__checkboxes')

copyButton.addEventListener('click', () => {
    localStorage.setItem('copiedResumeId', getCopiedResume())

    const checboxesOptions = Object.fromEntries(
        [...checboxes.children]
        .map(checkbox => [checkbox.className, checkbox.getElementsByTagName('input')[0]])
        .map(input => [input[0], input[1].checked])
        )

    localStorage.setItem('copiedResumeOptions', JSON.stringify(checboxesOptions))
    window.location.href = '/'
})