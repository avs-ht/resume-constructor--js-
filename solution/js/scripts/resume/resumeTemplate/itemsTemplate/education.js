import { compareByDates } from "../helpers/date.js"
import { dataItem } from '../helpers/dateItems.js'

const educationItemTemplate = education => dataItem('education', education)

export const educationTemplate = (educationData) => {
    let items = educationData.filter(education => education[0] !== "" || education[2] === "")
    
    if (items.length === 0) return ''

    items.sort((item1, item2) => compareByDates(item1, item2)) 

    items = items.map(education => educationItemTemplate(education))

    return `
    <div test-id="resume-main-section">
        <div class="card-container">
            <h2>Образование и квалификация</h2>
            <ul class="resume-education" >
                ${items.join('')}
            </ul>
        </div>
    </div>

`
}
