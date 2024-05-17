import { resumeItem } from "./scripts/resume-item/resume-item.js";
import './scripts/buttons/addResumeButton.js'
import './scripts/buttons/deleteResumesButton.js'
import './scripts/copy-modal/copy-modal.js'

const resumeList = document.querySelector('.resumes-list')
const dataResumes = JSON.parse(localStorage.getItem('values'))

if (dataResumes) {
    dataResumes.sort((a, b) => +b.id - +a.id)
    dataResumes.map(dataResume => resumeItem(dataResume))
    .forEach(resumeItem => resumeList.appendChild(resumeItem))
} 

console.info('дай бог побольше баллов на тестах и на апелляции')