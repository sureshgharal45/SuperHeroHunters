//my apikey = 4a0de140540f73b7ebc8b9816b51defd
//hash value = ef2adfa67e8de20cc93d4d4c9be0b04f

let listOfHeroInDom = document.getElementById("heroList");
let errorMessage = document.getElementById("errorMessage");
let inputBar = document.getElementById("inputBar");

let listOfHeros = [];
let favList = [];
function addHerosToDOM(hero) {
  let li = document.createElement("li");

  li.innerHTML = `
    <img src="${
      hero.thumbnail.path + "." + hero.thumbnail.extension
    }" id = "poster"  >
    <h2 id="heroTitle"  data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="favBtn" data-id="${hero.id}" data-title="${
    hero.name
  }" >Add to Favourites</button>
    `;
  listOfHeroInDom.append(li);
}

//to render the list
function renderHeroList() {
  listOfHeroInDom.innerHTML = "";
  if (listOfHeros.length === 0) {
    errorMessage.innerHTML = `No superhero found with that name`;
    return;
  }
  listOfHeroInDom.innerHTML = "";
  errorMessage.innerHTML = "";
  for (let i = 0; i < listOfHeros.length; i++) {
    addHerosToDOM(listOfHeros[i]);
  }
}

//to search the superhero through API call
async function searchInput(text) {
  if (text.length != 0) {
    let url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${text}&apikey=4a0de140540f73b7ebc8b9816b51defd&hash=ef2adfa67e8de20cc93d4d4c9be0b04f&ts=1`;
    let response = await fetch(url);
    const data1 = await response.json();
    listOfHeros = data1.data.results;
    if (listOfHeros.length === 0) {
      renderHeroList();
    } else {
      renderHeroList();
    }
  }
}

//to add the fav superhero
function addToFav(heroId, heroTitle) {
  for (i of favList) {
    if (i === heroId) {
      errorMessage.innerHTML = "This hero is already in the Fav List";
      //clearing out the message in 4 seconds
      setTimeout(() => {
        errorMessage.innerHTML = "";
      }, 4000);

      return;
    }
  }

  //pushing fav superhero to the fav List array
  favList.push(heroId);
  errorMessage.innerHTML = `${heroTitle} added in the fav List`;
  //clearing out the message in 4 seconds
  setTimeout(() => {
    errorMessage.innerHTML = "";
  }, 4000);
}

function handleInput(input) {
  let text = input.value;

  searchInput(text);
}

//handling key and click events
function handleKeyAndClick(e) {
  if (e.target.id === "inputBar") {
    handleInput(e.target);
  }
  if (e.target.id === "details") {
    let heroId = e.target.dataset.id;
    localStorage.setItem("heroId", JSON.stringify(heroId));

    window.open("./Details/details.html");
  }
  if (e.target.id === "favBtn") {
    addToFav(e.target.dataset.id, e.target.dataset.title);
  }
  if (e.target.id === "favourite") {
    localStorage.setItem("favHeros", JSON.stringify(favList));
    window.open("./FavList/fav.html");
  }
  if (e.target.id === "clear") {
    window.location.reload();
  }
}

//event listeners
document.addEventListener("keyup", handleKeyAndClick);
document.addEventListener("click", handleKeyAndClick);
