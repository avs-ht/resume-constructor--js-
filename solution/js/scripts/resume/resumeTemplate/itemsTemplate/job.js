import { compareByDates } from "../helpers/date.js"
import { dataItem } from '../helpers/dateItems.js'

const jobItemTemplate = job => dataItem('experience', job)

export const jobsTemplate = (jobs) => {
    let items = jobs.filter(job => job[0] !== "" || job[2] === "")
    
    if (items.length === 0) return ''
    
    items.sort((item1, item2) => compareByDates(item1, item2)) 

    items = items.map(job => jobItemTemplate(job))
    return `
    <div test-id="resume-main-section">
        <div class="card-container" >
            <h2>Опыт работы</h2>
            <ul class="resume-experience" test-id="resume-main-section">
                ${items.join('')}
            </ul>   
        </div>   
    </div>

`
}
