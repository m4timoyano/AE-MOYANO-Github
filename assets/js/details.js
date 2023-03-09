import data from './data.js'

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

const card = data.events.find(elemento => elemento._id == id)

console.log(data.events);

const div = document.querySelector("#contenedor")
div.innerHTML = `<img src="${card.image}" class="card-img-top" alt="${card.name}">
<div class="card-body p-4 pb-2 pt-2">
    <h3 class="card-title text-center">${card.name}</h3>
    <p class="card-text"><b>Category: </b>${card.category}</p>
    <p class="card-text"><b>Date: </b>${card.date}</p>
    <p class="card-text"><b>Description: </b>${card.description}</p>
    <p class="card-text"><b>Place: </b>${card.place}</p>
    <p class="card-text" style="display: inline;"><b>Capacity: </b>${card.capacity}</p>
    <p id="cardtextinline" class="card-text ps-4" style="display: inline;"><b>Assistance: </b>${card.assistance}</p>
    <span class="card-footer d-flex justify-content-between p-3 pb-2 mt-3">
        <p style="display: inline;"><b>Price: </b>$ ${card.price}</p>
        <a href="${document.referrer}" class="btn btn-outline-primary">Return</a>
    </span>
</div>
`