 
 class Pagination{
    _pagiContainer
    constructor(){
        this._pagiContainer=document.querySelector('.pagination')
    }
    
    addHandlerClick(handler){
        this._pagiContainer.addEventListener('click',(e)=>{
        const btn=e.target.closest('.btn--inline');
        this._clear()
        const goToPage=(+btn.dataset.page)
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        handler(goToPage)
     })
    }
    _clear(){
        this._pagiContainer.innerHTML=''
    }
    renderBtns(pagesAmount,page){
        this._clear()
        if(page===1 && page<pagesAmount){
            this._generateMarkup('next',page)
        }
    if(page>1 && page===pagesAmount){
        this._generateMarkup('prev',page)
    }
    if(page>1 && page<pagesAmount){
        this._generateMarkup('next',page)
        this._generateMarkup('prev',page)
    }
    }
     _generateMarkup(type,page){
    const html=`<button data-page="${type==='prev'?`${page-1}`:`${page+1}`}"
     class="btn--inline pagination__btn-${type==='prev'?'prev':'next'}">
    &${type==='prev'?'left':'right'}arrow; page
    ${type==='prev'?`${page-1}`:`${page+1}`}
    </button>`
    
    this._pagiContainer.insertAdjacentHTML('afterbegin',html)
    }
 }
   export default new Pagination()

 
 
