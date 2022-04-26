import VanillaTilt from "vanilla-tilt";

// function httpGet(url) {
//   const xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("GET", url, false);
//   xmlHttp.send(null);
//   return xmlHttp.responseText;
// }

// function fetchRequest(url) {
//   const request = fetch(url);
//   request.then((response) => {
//     jsonAPIContent = response.json();
//   });

//   request.catch((err) => {
//     console.error("ERROR: ", err.menssage);
//   });
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

const pokeNumber = 1126;
const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokeNumber}`;
const main = document.querySelector(".main-container");

for (let i = 0; i < pokeNumber; i++) {
  const div = document.createElement("div");
  div.classList.add("div-container");
  // div.classList.add(`${i}`);
  main.appendChild(div);
}

const divSelector = document.querySelectorAll(".div-container");

for (let i = 0; i < pokeNumber; i++) {
  const img = document.createElement("img");
  img.classList.add("imagen");
  const p = document.createElement("p");
  p.classList.add("parrafo");
  divSelector[i].appendChild(p);
  divSelector[i].appendChild(img);
}

fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else console.log("Error en la peticion");
  })
  .then(data => {
    console.log(data);
    for (let i = 0; i < pokeNumber; i++) {
      const pokemon = data.results[i].url;
      fetch(pokemon)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else console.log("Error en la peticion");
        })
        .then(data => {
          // console.log(data);
          const imgArray = document.querySelectorAll(".imagen");
          const pArray = document.querySelectorAll(".parrafo");
          imgArray[i].src = data.sprites.front_default;
          pArray[i].textContent = data.name;
          VanillaTilt.init(divSelector[i], {
            max: 50,
            speed: 400
          });
        });
    }
  });
