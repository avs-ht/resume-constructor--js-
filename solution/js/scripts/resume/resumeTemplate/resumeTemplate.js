import { interestsTemplate } from './itemsTemplate/interests.js'
import { languagesTemplate } from './itemsTemplate/languages.js'
import { jobsTemplate } from './itemsTemplate/job.js'
import { educationTemplate } from './itemsTemplate/education.js'
import { coursesTemplate } from './itemsTemplate/courses.js'
import { transformDateForBirth } from './helpers/date.js'

export function resumeTemplate(data) {
    const template = `
        <div test-id="resume-main-content" class="resume">
        <div class="resume-screen__left-side" test-id="resume-main-article">
        <img class="photo" src="./images/photo.jpg" alt="Ваня">
        
        <div test-id="resume-main-section">
        <h2>Личные данные</h2>
        <ul class="personal-info">
            <li class="personal-info__item name">
                <h3>ФИО</h3>
                <p>${data.full_name}</p>
            </li>
            ${!data.birth ? "" :
            `
            <li class="personal-info__item date">
            <h3>Дата рождения</h3>
            <p>${transformDateForBirth(data.birth)}</p>
            </li>
            `    
            }
            ${!data.city ? "" :
            `
            <li class="personal-info__item city">
            <h3>Город</h3>
            <p>${data.city}</p>
            </li>
            `    
            }
            ${!data.phone ? "" :
            `
            <li class="personal-info__item phone">
                <h3>Номер телефона</h3>
                <p>${data.phone}</p>
            </li>
            `    
            }
            ${!data.mail ? "" :
            `
            <li class="personal-info__item mail">
                <h3>Email</h3>
                <p>${data.mail}</p>
            </li>
            `    
            }
        </ul>
        </div>

        ${interestsTemplate(data.interest)}

        ${languagesTemplate(data.language)}



        </div>
        <div class="resume-screen__right-side" test-id="resume-main-article"> 
        <div test-id="resume-main-section">
            <h1 class="resume-screen__title">${!data.name ? data.full_name : data.name}</h1>
            ${data.description === "" ? "" : `
            <p class="resume-screen__desc">
                ${data.description}
            </p>
            `}
        </div>

        ${jobsTemplate(data.job)}
  
        ${educationTemplate(data.education)}
        
        ${coursesTemplate(data.course)} 
        
        </div>
    </div>
    `  
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(template, 'text/html');
    return htmlDoc.body.children[0]
}