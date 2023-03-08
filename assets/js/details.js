import data from './data.js'

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

const cardGrande = data.find(jugador => jugador.id == id)

const div = document.querySelector("#contenedor")
div.innerHTML = `<div class="col-md-5">
    <img src="${cardGrande.image}" class="img-fluid rounded-start" alt="Museum Tour" style="width: 100%;">
    </div>
<div class="col-md-6">
    <div class="card-body">
    <h5 class="card-title">${cardGrande.name}</h5>
    <p class="card-text">${cardGrande.category}</p>
    <span class="card-footer d-flex justify-content-between ps-4 pe-4">
        <p style="display: inline;">$ ${cardGrande.price}</p>
        <a href="../../index.html" class="btn btn-outline-danger">Home</a>
    </span>
    </div>
</div>
`