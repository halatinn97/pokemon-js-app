let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Return all Pokemons

  function getAll() {
    return pokemonList;
  }

  //Add new Pokemon to list

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
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

    pokeButton.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Fetches data from API & adds each Pokemon to pokemonList with add function

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name[0].toUpperCase() + item.name.slice(1),
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Loads detailed data for given Pokemon

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.abilities = details.abilities.map((ability) => ability.ability.name);
        item.baseExperience = details.base_experience;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Function to show modal

  function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    let titleElement = document.createElement('h1');
    titleElement.innerText =
      'Name: ' + pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let typeElement = document.createElement('p');
    typeElement.innerText = 'Types: ' + pokemon.types.map(el => el.type.name);

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities.join(', ');

    let baseExperienceElement = document.createElement('p');
    baseExperienceElement.innerText = 'Base Experience: ' + pokemon.baseExperience;


    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    //Append all content to modal

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
    modalBody.append(baseExperienceElement);
    modalBody.append(imageElement);

    //Reset modal content when modal is hidden

    $('.modal').on('hidden.bs.modal', function () {
      $('.modal-body').html('') && $('.modal-title').html('');
    });
  }

  //Search bar function
  function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search-bar');
    filter = input.value.toUpperCase();
    ul = document.querySelector('.list-group');
    li = ul.getElementsByTagName('li');

    // If the search bar is empty, display all Pokemon
    if (input.value.length === 0) {
      for (i = 0; i < li.length; i++) {
        li[i].style.display = 'block';
      }
    } else {

      // Find / hide results
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('button')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
      }
    }
  }

  // Add an event listener to the search bar input element
  document.getElementById('search-bar').addEventListener('input', searchFunction);



  //Returns all necessary functions

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    searchFunction: searchFunction
  };
})();



//Displays Pokemon list with properties

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
