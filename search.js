import { API_KEY } from "./config.js"
import pagination from "./pagination.js"

class Search{
    _searchContainer=document.querySelector('.search-container')
    _query=document.querySelector('.query')
    addHandlerClick(handler){
        this._searchContainer.addEventListener('submit',(e)=>{
           e.preventDefault()
           const res=this._query.value
           this._query.value=''
           this.searchQuery(handler,res)
        })
    }
    searchQuery=async function(handler,query){
        try{
            const data=await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}
            &api_key=${API_KEY}`)
            const res=await data.json()
            if(res){
                document.querySelector('.page-title').textContent=`The results for '${query}'` 
            }
            pagination._clear()
             handler(res)
        }catch(err){
            alert(err)
        }
    }   


}
export default new Search()
