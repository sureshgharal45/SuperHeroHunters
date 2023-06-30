let heroId = JSON.parse(localStorage.getItem("heroId"));

let heroDetails = null;
let titleEle = document.getElementById("name");
let imgEle = document.getElementsByTagName("img")[0];
let description = document.getElementById("description");
let comics = document.getElementById("comics");
let series = document.getElementById("series");
let releaseDate = document.getElementById("release-data");
let seriesNumber = document.getElementById("seriesNumber");
let comicNumber = document.getElementById("comicNumber");
async function fetchHeroDetails(id) {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?apikey=4a0de140540f73b7ebc8b9816b51defd&hash=ef2adfa67e8de20cc93d4d4c9be0b04f&ts=1`
  );
  heroDetails = (await response.json()).data.results[0];
  // console.log(heroDetails);
  if (heroDetails.description.length != 0)
    description.innerHTML += `<h3>${heroDetails.description}</h3>`;
  else description.innerHTML += `<h3>Description Not available</h3>`;
  titleEle.innerHTML += `<h3> ${heroDetails.name} </h3>`;
  let date = `${heroDetails.modified}`;
  let parsedDate = "";
  for (i of date) {
    if (("0" <= i && i <= "9") || i == "-") parsedDate += i;
    else break;
  }
  // console.log("date",parsedDate);
  releaseDate.innerHTML += `<h3>${parsedDate}</h3>`;
  imgEle.setAttribute(
    "src",
    `${heroDetails.thumbnail.path}.${heroDetails.thumbnail.extension}`
  );
  seriesNumber.innerHTML += `${heroDetails.series.available}`;
  let seriesNum = 1;
  for (i of heroDetails.series.items) {
    series.innerHTML += `<h3>Series Number ${seriesNum} : ${i.name}</h3>`;
    seriesNum++;
  }
  comicNumber.innerHTML += `${heroDetails.comics.available}`;
  let comicsNum = 1;
  for (i of heroDetails.comics.items) {
    comics.innerHTML += `<h3>Comic Number ${comicsNum}: ${i.name}</h3>`;
    comicsNum++;
  }
}

function heroLoad() {
  fetchHeroDetails(heroId);
}
heroLoad();
