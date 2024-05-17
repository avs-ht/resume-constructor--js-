const selectedResumesStorage = {}

// SR - selected resumes
export function pushSRStoarge(id, item) {
    selectedResumesStorage[id] = item
}

export function deleteFromSRS(id) {
    delete selectedResumesStorage[id]
}

export function getSRStorage() {
    return selectedResumesStorage
}