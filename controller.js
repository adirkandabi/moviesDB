import { API_KEY, API_LINK, IMG_PATH } from "./config.js";
import pagination from "./pagination.js";
import search from "./search.js";
import { renderModal } from "./modal.js";

const sectionContainer = document.querySelector(".section");
const logo = document.querySelector(".logo");
const errMsg = document.querySelector(".error-message");

logo.addEventListener("click", (e) => {
  const pageTitle = document.querySelector(".page-title");
  pageTitle.textContent = "What`s popular today...";
  init();
});
export const disableErrorMessage = function () {
  sectionContainer.style.display = "block";
  pagination._pagiContainer.style.display = "block";
  errMsg.style.display = "none";
};
export const errorHandler = function (message) {
  errMsg.textContent = message;
  errMsg.style.display = "block";
  sectionContainer.style.display = "none";
  pagination._pagiContainer.style.display = "none";
};

const getData = async function (page = 1) {
  try {
    const data = await fetch(`${API_LINK}${page}`);
    const res = await data.json();
    if (sectionContainer.style.display === "none") return;
    pagination.renderBtns(res.total_pages, page);
    renderData(res);
  } catch (err) {
    console.error(err);
    errorHandler("Could not load movies :(");
  }
};
const renderData = function (data) {
  sectionContainer.innerHTML = "";
  const movies = data.results;
  movies.forEach((movie, index) => {
    generateMarkup(movie, index);
    const card = document.querySelector(`#card-${index}`);
    card.addEventListener("click", (e) => {
      renderModal(movie);
    });
  });
};
const generateMarkup = function (movie, index) {
  let imgSrc;
  if (!movie.backdrop_path) {
    imgSrc = `img_err.jpg`;
  } else {
    imgSrc = IMG_PATH + movie.backdrop_path;
  }
  const html = `<div class="row">
    <div class="column">
       <div class="card" id="card-${index}">
            <center><img src="${imgSrc}"
             class="thumbnail"></center>
            <h3>${movie.title}</h3>
        </div>
    </div>
</div>`;
  sectionContainer.insertAdjacentHTML("afterbegin", html);
};

const init = function () {
  disableErrorMessage();
  getData();
  pagination.addHandlerClick(getData);
  search.addHandlerClick(renderData);
};
init();
