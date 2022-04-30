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
  loadDetails(pokemon).then(function() {
    showModal(pokemon);
  });
}

// Fetches data from API & adds each Pokemon to pokemonList with add function

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

let modalContainer = document.querySelector('#modal-container');

//Event listener to show modal on click
document.querySelector('#show-modal').addEventListener('click', () => {
  showModal(pokemon);
})


//Event listener exit for click out, X, ESC

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal()
  }
});


//Function to show modal

function showModal(pokemon) {
  modalContainer.innerHTML='';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  //create close button element to hide modal

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add = 'modal-close';
  closeButtonElement.innerText = 'X';
  closeButtonElement.addEventListener('click', hideModal);

  //create title and content element for modal -insert poke info later
  let titleElement = document.createElement('h1');
  titleElement.innerText = 'Name: ' + pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  let heightElement = document.createElement('p');
  heightElement.innerText = 'Height: ' + pokemon.height;

  let typeElement = document.createElement('p');
  typeElement.innerText = 'Types: ' + pokemon.types.map(el => el.type.name);

  let imageElement = document.createElement('img')
  imageElement.src = pokemon.imageUrl;




  //append all content to modal:
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(heightElement);
  modal.appendChild(typeElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);


  //adding class is-visible
  modalContainer.classList.add('is-visible');
}


  //Function to hide modal

  function hideModal() {
    modalContainer.classList.remove('is-visible');
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
