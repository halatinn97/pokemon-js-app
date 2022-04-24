//Each object represents one Pokemon with respective properties

let pokemonRepository = (function () {

  let pokemonList = [{
        name: 'Pikachu',
        height: 0.4,
        type: ['electric', 'ground', 'steel', 'flying']
    },
    {
        name: 'Charmeleon',
        height: 1.1,
        type: ['ground', 'rock', 'water']
    },
    {
        name: 'Slowbro',
        height: 1.6,
        type: ['electric', 'grass', 'dragon', 'ghost', 'bug']
    }
];


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

 return {
   getAll: getAll,
   add: add
 };


})();

//Displays Pokemon list with properties

pokemonRepository.getAll().forEach(function getAll(pokemonList) {
  document.write(pokemonList.name + '<br>'+ 'Height: ' + pokemonList.height + '<br>' + 'Type: ' + pokemonList.type + '<p>');
});
