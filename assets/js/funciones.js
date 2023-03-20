const fragment = document.createDocumentFragment();

export const pastCards = (eventsarray, container) => {
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

export const armarCard = (eventsarray, container) => {
    container.innerHTML = ""
    if(eventsarray.length < 1) {
        let div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `<div class="card h-100">
            <img src="./assets/img/notfound.jpg" class="card-img-top h-50"
            alt="...">
            <div class="card-body">
                <h5 class="card-title">Not Found</h5>
            </div>
        </div>`
        fragment.appendChild(div);
    } else {
        eventsarray.forEach(card => {
            let div = document.createElement('div')
            div.className = 'col'
            div.innerHTML = `<div class="card h-100">
                <img src="${card.image}" class="card-img-top h-50"
                alt="...">
                <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.category}</p>
                    <span class="card-footer d-flex justify-content-between ps-4 pe-4">
                        <p style="display: inline;">$ ${card.price}</p>
                        <a href="./pages/details.html?id=${card._id}" class="btn btn-outline-danger">Details</a>
                    </span>
                </div>
            </div>`
            fragment.appendChild(div);
        })
    }
    container.appendChild(fragment);
}

export const crearCategorias = (array) => {
    let categorias = array.map(categoria => categoria.category)

    categorias = categorias.reduce((acumulador, elemento) => {
        if(!acumulador.includes(elemento)){
            acumulador.push(elemento);
        }
        return acumulador
    }, [])
    return categorias
}

export const crearCheckbox = (array, container) => {
    array.forEach( categoria => {
        let div = document.createElement('div')
        div.className = `${categoria.toLowerCase()}`
        div.innerHTML = `
        <input type="checkbox" class="btn-check" id="${categoria.toLowerCase()}" autocomplete="off">
        <label class="btn btn-outline-primary text-center" style="height: 50px; width: 75px; font-size: 0.8rem; box-shadow: 1px 1px 5px rgba(47, 45, 46, 0.701);" for="${categoria.toLowerCase()}">${categoria}</label>
        `
        container.appendChild(div)
    })
}

export const searchFiltro = (array, value) => {
    let filteredArray = array.filter(element => element.name.toLowerCase().includes(value.toLowerCase().trim()))
    return filteredArray
}

export const checkFiltro = (array) => {
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let categories = Array.from(checked).map(el => el.id.toLowerCase());
    let filteredArray = array.filter(element => categories.some(category => element.category.toLowerCase().includes(category)));
    return filteredArray
}