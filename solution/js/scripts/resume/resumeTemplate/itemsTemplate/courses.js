import { compareByDates } from "../helpers/date.js"
import { dataItem } from "../helpers/dateItems.js"

const courseItemTemplate = course => dataItem('course', course, false)

export const coursesTemplate = (courses) => {
    let items = courses
    .filter(course => course[0] !== "" || course[2] === "")
    
    if (items.length === 0) return ''

    items.sort((item1, item2) => compareByDates(item1, item2)) 
    
    items = items.map(course => courseItemTemplate(course))

    return `
    <div test-id="resume-main-section">
        <div class="card-container" test-id="resume-main-section">
            <h2>Курсы</h2>
            <ul class="resume-course">
                ${items.join('')}
            </ul>
        </div>
    </div>
`
}
