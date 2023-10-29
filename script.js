import { API_KEY,API_LINK,IMG_PATH } from "./config.js"
import  pagination from "./pagination.js"
import search from "./search.js"

const modalContainer=document.querySelector('.modal')
const modalContent=document.querySelector('.modal-content')
const closeModal=document.querySelector('.close-button')
const sectionContainer=document.querySelector('#section')

closeModal.addEventListener('click',()=>{
    modalContainer.style.display='none'
    document.querySelector('body').style.overflow='visible'
    modalContent.innerHTML=''
})

const renderModal=function(movie){
    modalContainer.style.display='block'
    document.querySelector('body').style.overflow='hidden'
    const html=`<img class="img" src="${IMG_PATH+movie.backdrop_path}" >
    <h1>${movie.title}</h1>
    <span class="movie-description">Movie description:</span>
    <p class="description">${movie.overview}
    </p>
    <span class="release-date">Release date:</span>
    <p class="date">${movie.release_date}</p>
    <span class="popularity">Popularity:</span>
    <p class="popularity-number">${movie.popularity}</p>
    <span class="rate">Rate:</span>
    <p class="rate-number">${movie.vote_average} (${movie.vote_count})</p>`
    modalContent.insertAdjacentHTML('afterbegin',html)
}

const getData=async function(page){
    try{
    const data=await fetch(`${API_LINK}${page}`)
    const res=await data.json()
    pagination.renderBtns(res.total_pages,page)
    renderData(res) 
    }catch(err){
        alert(err)
    }
}
const renderData=function(data){
    sectionContainer.innerHTML=''
    const movies=data.results
    movies.forEach(movie=>{
        generateMarkup(movie)
        const card=document.querySelector('.card')
         card.addEventListener('click',(e)=>{
            renderModal(movie)
         })
         
    })
    
}
const generateMarkup=function(movie){
    let imgSrc
    if(!movie.backdrop_path){
        imgSrc=`img_err.jpg`
    }else{
        imgSrc=IMG_PATH+movie.backdrop_path
    }
    const html=`<div class="row">
    <div class="column">
       <div class="card">
            <center><img src="${imgSrc}"
             class="thumbnail"></center>
            <h3>${movie.title}</h3>
        </div>
    </div>
</div>`
sectionContainer.insertAdjacentHTML('afterbegin',html)
}

const init=function(){
    getData(1)
    pagination.addHandlerClick(getData)
    search.addHandlerClick(renderData)
}
init()



