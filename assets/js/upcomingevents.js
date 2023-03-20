import { crearCategorias, crearCheckbox, searchFiltro, checkFiltro } from './funciones.js';

// Elementos del DOM

const $eventcard = document.getElementById('cardcontainer');
const $check = document.getElementById('check-container');
const $search = document.querySelector('input[placeholder="Search"]');

// Variables globales

let data = [];
const fragment = document.createDocumentFragment();

/* Cards */

const upcomingCards = (eventsarray, container) => {
    container.innerHTML = ""
    const currentDate = data.currentDate
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
        if (currentDate < card.date) {
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

async function getData() {
    try {
        const apiUrl = "../assets/js/amazing.json";
        const response = await fetch(apiUrl);
        data = await response.json();
        upcomingCards(data.events, $eventcard);
        let checkCategorias = crearCategorias(data.events)
        crearCheckbox(checkCategorias, $check)
    } catch (error) {
        console.log(error);
    }
}
getData();

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
    upcomingCards(dataFilter, $eventcard)
})

$check.addEventListener('change', ()=>{
    let dataFilter = filtroUnificado(data.events)
    upcomingCards(dataFilter, $eventcard)
})

filtroUnificado()