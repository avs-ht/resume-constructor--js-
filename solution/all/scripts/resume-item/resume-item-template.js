export const resumeItemTemplate = (name, full_name) => {
    return `
    <li test-id="resume-item" class="resume-list__item">
        <h2 test-id="resume-title">${name === "" ? full_name : name}</h2>
        <button test-id="resume-actions" title="Действия" type="button" class="resume-actions">Действия</button>
        <div class="actions">
            <button class="open-resume" test-id="resume-actions__open">Открыть</button>
            <button class="remove-resume" test-id="resume-actions__delete">Удалить</button>
            <button class="copy-resume" test-id="resume-actions__copy">Копировать</button>
        </div>
        <input type="checkbox" test-id="resume-checkbox" class='delete-checkbox'>
    </li>
`
}