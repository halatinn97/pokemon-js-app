
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


// Return all Pokemons

function getAll (){
  return pokemonList;
}

//Add new Pokemon to list

function add (pokemon) {
  if (typeof pokemon === 'object' &&
  "name" in pokemon &&
  "detailsUrl" in pokemon
  ){
    pokemonList.push(pokemon);
  } else {
    alert('Please select a Pokémon.');
  }
}

//Buttons to evoke Pokemon names

function addListItem(pokemon) {
 let pokemonListUl = document.querySelector('.list-group');

 let listItem = document.createElement('li');
 listItem.classList.add('list-group-item');

 let pokeButton = document.createElement('button');
 pokeButton.innerText = pokemon.name;
 pokeButton.classList.add('btn-secondary');
 pokeButton.setAttribute('data-toggle', 'modal');
 pokeButton.setAttribute('data-target', '#modalContainer');

 listItem.appendChild(pokeButton);
 pokemonListUl.appendChild(listItem);

 pokeButton.addEventListener('click', function (){
   showDetails(pokemon);
 });
}



function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    showModal(pokemon);
  });
}

//Fetches data from API & adds each Pokemon to pokemonList with add function

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function(json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name[0].toUpperCase() + item.name.slice(1),
        detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}


//Loads detailed data for given Pokemon

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}


//Function to show modal

function showModal(pokemon) {

  let modalHeader = document.querySelector('.modal-header');
  let modalTitle = document.querySelector('.modal-title');
  let modalBody = document.querySelector('.modal-body');

  let titleElement = document.createElement('h1');
  titleElement.innerText = 'Name: ' + pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  let heightElement = document.createElement('p');
  heightElement.innerText = 'Height: ' + pokemon.height;

  let typeElement = document.createElement('p');
  typeElement.innerText = 'Types: ' + pokemon.types.map(el => el.type.name);

  let imageElement = document.createElement('img')
  imageElement.src = pokemon.imageUrl;


//Append all content to modal

  modalTitle.append(titleElement);
  modalBody.append(heightElement);
  modalBody.append(typeElement);
  modalBody.append(imageElement);

//Reset modal content when modal is hidden

$(".modal").on("hidden.bs.modal", function(){
    $(".modal-body").html("") && $(".modal-title").html("");
});
}


//Returns all necessary functions

 return {
   getAll: getAll,
   add: add,
   addListItem: addListItem,
   loadList: loadList,
   loadDetails: loadDetails,
   showDetails: showDetails
 };


})();

//Displays Pokemon list with properties

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
});
