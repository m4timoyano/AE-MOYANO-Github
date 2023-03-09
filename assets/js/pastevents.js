import data from './data.js'

const $eventcard = document.getElementById('cardcontainer');
const $check = document.getElementById('check-container');
const $search = document.querySelector('input[placeholder="Search"]');
const fragment = document.createDocumentFragment();
const currentDate = data.currentDate

const pastCards = (eventsarray, container) => {
    container.innerHTML = ""
    if(eventsarray.length < 1) {
        let div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `<div class="card h-100">
            <img src="../assets/img/notfound.jpg" class="card-img-top h-50"
            alt="...">
            <div class="card-body">
                <h5 class="card-title">Not Found</h5>
            </div>
        </div>`
        fragment.appendChild(div);
    } else {
        eventsarray.forEach(card => {
        if (currentDate > card.date) {
            let div = document.createElement("div")
            div.className = "col"
            div.innerHTML += `<div class="card h-100">
                <img src="${card.image}" class="card-img-top h-50"
                alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.category}</p>
                    <span class="card-footer d-flex justify-content-between ps-4 pe-4">
                    <p style="display: inline;">$ ${card.price}</p>
                    <a href="../../pages/details.html?id=${card._id}" class="btn btn-outline-danger">Details</a>
                    </span>
                </div>
            </div>`
            fragment.appendChild(div);
        }})
    }
    container.appendChild(fragment);
}

pastCards(data.events, $eventcard);

/* Checkboxs */

const crearCategorias = (array) => {
    let categorias = array.map(categoria => categoria.category)

    categorias = categorias.reduce((acumulador, elemento) => {
        if(!acumulador.includes(elemento)){
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categorias
}
let checkCategorias = crearCategorias(data.events)

const crearCheckbox = (array, container) => {
    array.forEach( categoria => {
        let div = document.createElement('div')
        div.className = `${categoria.toLowerCase()}`
        div.innerHTML = `
        <input type="checkbox" class="btn-check" id="${categoria.toLowerCase()}" autocomplete="off">
        <label class="btn btn-outline-primary text-center" style="height: 50px; width: 75px; font-size: 0.8rem;" for="${categoria.toLowerCase()}">${categoria}</label>
        `
        container.appendChild(div)
    })
}
crearCheckbox(checkCategorias, $check)

const searchFiltro = (array, value) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filteredArray
}

const checkFiltro = (array) => {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let categories = Array.from(checked).map(el => el.id.toLowerCase());
    let filteredArray = array.filter(element => categories.some(category => element.category.toLowerCase().includes(category)));
    return filteredArray
}

const filtroUnificado = (array) => {
    let filteredArray = searchFiltro(array, $search.value)
    let checkedCategories = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedCategories.length > 0) {
        filteredArray = checkFiltro(filteredArray)
    }
    return filteredArray
}

$search.addEventListener('input', (e) => {
    let dataFilter = filtroUnificado(data.events)
    pastCards(dataFilter, $eventcard)
})

$check.addEventListener('change', ()=>{
    let dataFilter = filtroUnificado(data.events)
    pastCards(dataFilter, $eventcard)
})

filtroUnificado()