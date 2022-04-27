//Each object represents one Pokemon with respective properties

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

// Return all Pokemons

function getAll (){
  return pokemonList;
}


//Buttons to evoke Pokemon names

function addListItem(pokemon) {
 let pokemonListUl = document.querySelector('.pokemon-list');
 let listItem = document.createElement('li');
 let button = document.createElement('button');
 button.innerText = pokemon.name;
 button.classList.add('pokemon-button');
 listItem.appendChild(button);
 pokemonListUl.appendChild(listItem);
 button.addEventListener('click', function (){
   showDetails(pokemon);
 });
}


// Fetches data from API & adds each Pokemon to pokemonList with add function
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function(json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

// Loads detailed data for given Pokemon
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

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function() {
    console.log(item);
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
