import { transformDateForCard } from './date.js'
export const dataItem = (name, data, isHasDescription = true) => {
    return `
    <li class="resume-${name}__item card">
        <div class="card__main">
            <div class="card__upper-part">
                <h3>${data[0]}</h3>
                ${!data[1] || false ? "" : `
                <span><time>${transformDateForCard(data[1])}</time> — <time>${!data[2] ? "наст. время" : transformDateForCard(data[2])}</time></span>
                `}
            </div>
            <div class="card__down-part">
                ${!data[3] ? "" : `<p>${data[3]}</p>`}
            </div>
        </div>
        ${isHasDescription && data[4] ? `<p class="card__additional">${data[4]}</p>`  : ""}
    </li>
    `
}