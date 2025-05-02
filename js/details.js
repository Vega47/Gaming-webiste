export const displayDetails = async function (id) {
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
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    let response = await api.json();
    displayData(response);
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(1000 - elapsedTime, 0);
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  } finally {
    loadingElement.classList.add("d-none");
    document.body.classList.remove("overflow-y-hidden");
  }
};
function displayData(response) {
  let gameDetails = document.querySelector(".game-details");
  gameDetails.innerHTML = `      <div class="header d-flex flex-row justify-content-between">
        <h1 class="text-white">Game Details</h1>
        <div class="icon text-white p-3 fs-4" id='close'>
          <i class="fa-solid fa-xmark "></i>
        </div>
      </div>
      <div class="section d-flex flex-row container">
        <div class="img">
          <img src="${response.thumbnail}" class="w-100 my-3" alt="">
        </div>
        <div class="details container text-white">
          <h2 class="fs-1">${response.title}</h2>
          <h3 class="fs-3">Category: <span>${response.genre}</span> </h3>
          <h3 class="fs-3">PlatForm: <span>${response.platform}</span> </h3>
          <h3 class="fs-3">Status: <span>Live</span> </h3>
          <p>${response.description}</p>
          <button ><a href="${response.game_url}" target="_blank">Show More</a></button>
        </div>
      </div>`;
  console.log(document.querySelector(".icon"));
  document.querySelector("#close i").addEventListener("click", function (e) {
    e.stopPropagation();
    gameDetails.classList.add("d-none");
    document.querySelector(".landing").classList.remove("d-none");
  });
}
