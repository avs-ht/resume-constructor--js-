const dateOptions = {
    year: 'numeric',
    month: 'long',
    timezone: 'UTC'
}

export const transformDateForCard = date => {
    return new Date(date).toLocaleDateString('ru-RU', dateOptions);
}

export const transformDateForBirth = date => {
    if (typeof date !== "string") return

    let [year, month, day] = date.split('-').map(el => +el)
    if (day < 10) {
        day = `0${day}`
    }
    
    if (month < 10) {
        month = `0${month}`
            
    }
    return `${day}.${month}.${year}`
}

export function compareByDates(item1, item2) {
    const firstData1 = item1[1]
    const firstData2 = item2[1]

    // Проверка на отсутствие дат
    if (!firstData1 && !firstData2) {
        return 0 
    }

    if (!firstData1) {
        return 1
    } 
    if (!firstData2) {
        return -1
    }

    // Сраванение начальных дат
    // Меньший тот чья дата больше
    // Больший тот чья дата меньше
    const time1 = new Date(firstData1).getTime()
    const time2 = new Date(firstData2).getTime()

    if (time1 === time2) {
        return 0
    }

    if (time1 < time2) {
        return 1
    }
    if (time1 > time2) {
        return -1
    }




    return 0
}