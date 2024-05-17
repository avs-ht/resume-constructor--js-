const interestItemTemplate = text => {
    return `
        <li class="resume-interests__item">
            <h3>${text}</h3>
        </li>
    `
}
export const interestsTemplate = (interests) => {
    const items = interests
    .filter(interestValue => interestValue !== "") 
    .map(interest => interestItemTemplate(interest))

    if (items.length === 0) return ''
    
    return `
    <div test-id="resume-main-section">
    <h2>Интересы</h2>
    <ul class="resume-interests">
        ${items.join('')}
    </ul>
    </div>

    `
}
