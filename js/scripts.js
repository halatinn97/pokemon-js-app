//Each object represents one Pokemon with respective properties

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
    Object.keys(pokemonList).some(key => key === 'name') &&
    Object.keys(pokemonList).some(key => key === 'height') &&
    Object.keys(pokemonList).some(key => key === 'type')
    ){
       pokemonList.push(pokemon);
} else {
  alert('Please select a Pokemon.');
}
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

function showDetails(pokemon) {
  console.log(pokemon);
}

//Returns all necessary functions

 return {
   getAll: getAll,
   add: add,
   addListItem: addListItem
 };


})();

//Displays Pokemon list with properties

pokemonRepository.getAll().forEach(function (pokemon) {
pokemonRepository.addListItem(pokemon)
});
