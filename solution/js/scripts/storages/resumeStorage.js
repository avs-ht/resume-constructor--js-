const resumeStorage = {}

const initRStorage = () => {
    resumeStorage.currGeneratedResumeRef = ""
    resumeStorage.addedResume = "";
}
// Curr Resume
// Для HTML удаления при возвращении
export function setCurrResume(item) {
    resumeStorage.currGeneratedResumeRef = item
}
export function getCurrResume() {
    return resumeStorage["currGeneratedResumeRef"]
}

// Added Resume
// Для передачи данных
export function setResume(data) {
    resumeStorage.addedResume = data
}

export function getResume() {
    return resumeStorage.addedResume
}

initRStorage()