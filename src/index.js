import VanillaTilt from "vanilla-tilt";
/* Programa con XMLrequest */
// function httpGet(url) {
//   const xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("GET", url, false);
//   xmlHttp.send(null);
//   return xmlHttp.responseText;
// }

// const pokeNumber = 20; /* 1126 total */
// const jsonAPIContent = JSON.parse(httpGet(`https://pokeapi.co/api/v2/pokemon/?limit=${pokeNumber}`));

// console.log(jsonAPIContent);
// // console.log(jsonAPIContent.results[0].url);

// // console.log(pokemon.sprites.front_default);

// const main = document.querySelector(".main-container");
// for (let i = 0; i < pokeNumber; i++) {
//   const pokemon = JSON.parse(httpGet(jsonAPIContent.results[i].url));
//   const div = document.createElement("div");
//   div.classList.add("div-container");
//   main.appendChild(div);
//   const divSelector = document.querySelectorAll(".div-container");
//   const img = document.createElement("img");
//   const p = document.createElement("p");
//   p.textContent = jsonAPIContent.results[i].name;
//   img.classList.add("imagen");
//   img.src = pokemon.sprites.front_default;
//   divSelector[i].appendChild(p);
//   divSelector[i].appendChild(img);
//   VanillaTilt.init(divSelector[i], {
//     max: 50,
//     speed: 400
//   });
// }

/* Programa usando el fetch */
function createDivs() {
  for (let i = 0; i < pokeNumber; i++) {
    const div = document.createElement("div");
    div.classList.add("div-container");
    main.appendChild(div);
  }
}

function createContentTags() {
  for (let i = 0; i < pokeNumber; i++) {
    const img = document.createElement("img");
    img.classList.add("imagen");
    const p = document.createElement("p");
    p.classList.add("parrafo");
    divSelector[i].appendChild(p);
    divSelector[i].appendChild(img);
  }
}

function createPokemon(data, index) {
  const imgArray = document.querySelectorAll(".imagen");
  const pArray = document.querySelectorAll(".parrafo");
  imgArray[index].src = data.sprites.front_default;
  pArray[index].textContent = data.name;
}

const pokeNumber = 151;
const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokeNumber}`;
const main = document.querySelector(".main-container");

createDivs();

const divSelector = document.querySelectorAll(".div-container");

createContentTags();

fetch(url) // Para obtener las URLs de los datos de cada pokemon
  .then(response => {
    if (response.ok) {
      return response.json();
    } else console.log("Error en la peticion");
  })
  .then(data => {
    for (let i = 0; i < pokeNumber; i++) {
      const pokemon = data.results[i].url;
      fetch(pokemon) // Para obtener los datos de cada pokemon atraves de su URL
        .then(response => {
          if (response.ok) {
            return response.json();
          } else console.log("Error en la peticion");
        })
        .then(data => {
          createPokemon(data, i);
          VanillaTilt.init(document.querySelectorAll(".div-container"));
        });
    }
  });
