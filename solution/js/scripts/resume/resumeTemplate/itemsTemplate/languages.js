const languageItemTemplate = (language) => `
<li class="resume-languages__item">
    <h3>${language[0]}</h3>
    <span>${language[1]}</span>
</li>
`
export const languagesTemplate = (languages) => {
    const items= languages
    .filter(language => language[0] !== "" && language[1] !== "")
    .map(language => languageItemTemplate(language))

    if (items.length === 0) return ''

    return `        
    <div test-id="resume-main-section">
    <h2>Языки</h2>
    <ul class="resume-languages">
        ${items.join('')}
    </ul>
    </div>

    `
}