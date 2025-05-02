import * as data2 from "./details.js";
export const click = () => {
  let navBtn = document.querySelector(".icon");
  let fallenToggleElements = document.querySelector(".fallen-toggle-elements");
  let icon = document.querySelector(".icon");

  navBtn.addEventListener("click", function () {
    if (fallenToggleElements.classList.contains("d-none")) {
      fallenToggleElements.classList.remove("d-none");
    } else {
      fallenToggleElements.classList.add("d-none");
    }
  });
  document.querySelector(".row").addEventListener("click", function (e) {
    fallenToggleElements.classList.add("d-none");
  });
  document.querySelector(".back-gr").addEventListener("click", function (e) {
    fallenToggleElements.classList.add("d-none");
    console.log(e.target);
  });
};

document.querySelectorAll(".arrOfcats")[0].addEventListener("click", (e) => {
  document.querySelectorAll(".arrOfcats .active").forEach((el) => {
    el.classList.remove("active");
    console.log(e.target);
  });
  e.target.classList.add("active");
  displayCards(e.target.innerHTML.toLowerCase());
});
document.querySelectorAll(".arrOfcats")[1].addEventListener("click", (e) => {
  document.querySelectorAll(".arrOfcats .active").forEach((el) => {
    el.classList.remove("active");
    console.log(e.target);
  });
  e.target.classList.add("active");
  displayCards(e.target.innerHTML.toLowerCase());
});
let gameID;
export const displayCards = async function (x = "mmorpg") {
  const loadingElement = document.querySelector(".loader");
  loadingElement.classList.remove("d-none");
  document.body.classList.add("overflow-y-hidden");
  const startTime = Date.now();
  try {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "eeac20b898mshff77ef6e02eb205p116a92jsnc4cc5edd1045",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${x}`,
      options
    );
    const response = await api.json();
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(2000 - elapsedTime, 0);
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
    let container = document.getElementById("demo");

    var cartouna = ``;
    for (let i = 0; i < response.length; i++) {
      cartouna += `<div class="col-md-4  card p-0" id='${response[i].id}'>
            <div class="image d-flex flex-column h-100 flex-column justify-content-between">
              <img src="${response[i].thumbnail}" class="w-100" alt="" />
              <div class="game-name d-flex flex-row justify-content-between p-3">
                <span class="">${response[i].title}</span>
                <span class="">Free</span>
              </div>
              <div class="game-desc">
               ${response[i].short_description}
              </div>
              <div class="d-flex flex-row justify-content-between card-end text-white">
                <span class="" >${response[i].genre}</span>
                <span class="">${response[i].platform}</span>
              </div>
            </div>
        </div>
      `;
    }
    container.innerHTML = cartouna;
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        let gameID = e.currentTarget.id;
        data2.displayDetails(gameID);
        let landing = document.querySelector(".landing");
        landing.classList.add("d-none");
        let gameDetails = document.querySelector(".game-details");
        gameDetails.classList.remove("d-none");
      });
    });
  } catch (error) {
    console.error("error", erorr);
  } finally {
    loadingElement.classList.add("d-none");
    document.body.classList.remove("overflow-y-hidden");
  }
};
