//Array contains Pokemon data to display in application
//Each object represents one Pokemon with respective properties
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

//Loop lists each Pokemon in array by assigning name and height keys
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '<br>')
}

//Conditionals within loop evaluate height of each Pokemon

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5 && pokemonList[i].name === 'Slowbro') {
        console.log(pokemonList[i].name + '- Wow, this is a big Pokemon!');
    } else if (pokemonList[i].height > 0.5 && pokemonList[i].height < 1.5) {
        console.log(pokemonList[i].name + '- This is an average size Pokemon.');
    } else {
        console.log(pokemonList[i].name + '- This is a small Pokemon.');
    }
}
