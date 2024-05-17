import {CONSTRUCTOR_ITEMS, CONSTRUCTOR_NAMES} from './constructorItems.js'
const parser = new DOMParser();


for (const name of CONSTRUCTOR_NAMES) {
    const itemsContainer = document.querySelector(`.${name}-container`)

    const addButton = document.querySelector(`#add-${name}`)
    const constructor = CONSTRUCTOR_ITEMS[name]

    const removeButton = document.querySelector(`#remove-${name}`)
    
    addButton.addEventListener('click', () => {
        const id = new Date().getTime()
        const newItem = constructor(id)
        const bodyWithNewItem = parser.parseFromString(newItem, 'text/html')
        const htmlItem = bodyWithNewItem.body.children[0]

        itemsContainer.appendChild(htmlItem)
    })
    removeButton.addEventListener('click', () => {
        const children = [...itemsContainer.children]
        if (children.length === 0) return
        itemsContainer.removeChild(children[children.length-1])
    })
}




