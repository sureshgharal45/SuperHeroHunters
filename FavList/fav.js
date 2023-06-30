let listOfHeroInDom = document.getElementById("heroList");

//taking list of heros out from localstorage
let listOfHeros = JSON.parse(localStorage.getItem("favHeros"));

function addHerosToDOM(hero) {
  let li = document.createElement("li");
  li.setAttribute("id", `${hero.id}`);
  li.innerHTML = `
    <img src="${
      hero.thumbnail.path + "." + hero.thumbnail.extension
    }" id = "poster"  >
    <h2 id="heroTitle"  data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="delete" data-id="${hero.id}"> delete </button>
    `;
  listOfHeroInDom.append(li);
}

//rendering the hero list present in favList array through API call by passing id
async function renderHeroList() {
  listOfHeroInDom.innerHTML = "";

  for (let i = 0; i < listOfHeros.length; i++) {
    id = listOfHeros[i];
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${id}?apikey=4a0de140540f73b7ebc8b9816b51defd&hash=ef2adfa67e8de20cc93d4d4c9be0b04f&ts=1`
    );
    heroDetails = (await response.json()).data.results[0];
    // console.log("heroDetails", heroDetails);
    addHerosToDOM(heroDetails);
  }
}

//handling key and click events
function handleKeyAndClick(e) {
  if (e.target.id === "details") {
    let heroId = e.target.dataset.id;
    localStorage.setItem("heroId", JSON.stringify(heroId));

    window.open("../Details/details.html");
  }

  if (e.target.id === "delete") {
    let heroId = e.target.dataset.id;
    const newFav = listOfHeros.filter(function (id) {
      return heroId !== id;
    });
    listOfHeros = [...newFav];
    //updating the favList array present in the localStorage
    localStorage.setItem("favHeros", JSON.stringify(newFav));

    let ele = document.getElementById(heroId);
    ele.style.display = "none";
  }
}

//event listners
document.addEventListener("click", handleKeyAndClick);
renderHeroList();
