import { IMG_PATH } from "./config.js";

const modalContainer = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close-button");

const closeModal = function () {
  modalContainer.style.display = "none";
  document.querySelector("body").style.overflow = "visible";
  modalContent.innerHTML = "";
};

export const renderModal = function (movie) {
  modalContainer.style.display = "block";
  document.querySelector("body").style.overflow = "hidden";
  let imgSrc;
  if (!movie.backdrop_path) {
    imgSrc = `img_err.jpg`;
  } else {
    imgSrc = IMG_PATH + movie.backdrop_path;
  }
  const html = `<img class="img" src="${imgSrc}" >
    <h1>${movie.title}</h1>
    <p class="description">${movie.overview}
    </p>
    <span class="release-date">Release date:</span>
    <p class="date">${movie.release_date}</p>
    <span class="popularity">Popularity:</span>
    <p class="popularity-number">${movie.popularity}</p>
    <span class="rate">Rate:</span>
    <p class="rate-number">${movie.vote_average} (${movie.vote_count})</p>`;
  modalContent.insertAdjacentHTML("afterbegin", html);
};

closeBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
