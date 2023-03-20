import { armarCard, crearCategorias, crearCheckbox, searchFiltro, checkFiltro } from './funciones.js';

// Elementos del DOM

const $eventcard = document.getElementById('cardcontainer');
const $check = document.getElementById('check-container');
const $search = document.querySelector('input[placeholder="Search"]');

// Cards 

let data = [];

async function getData() {
    try {
        const apiUrl = "./assets/js/amazing.json";
        const response = await fetch(apiUrl);
        data = await response.json();
        armarCard(data.events, $eventcard);
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
    armarCard(dataFilter, $eventcard)
})

$check.addEventListener('change', ()=>{
    let dataFilter = filtroUnificado(data.events)
    armarCard(dataFilter, $eventcard)
})

filtroUnificado()