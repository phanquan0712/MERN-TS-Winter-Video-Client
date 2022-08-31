import React, { useState } from 'react'

const Search = () => {
   const [search, setSearch] = useState<string>('')
   const [load, setLoad] = useState<boolean>(false)
   return (
      <form className='search_form'>
         <div className='input_search'>
            <input type="text" name='search' id='search' placeholder='Find accounts and videos'
               value={search} onChange={(e) => setSearch(e.target.value)} />
            {
               load &&
               <div className="close_icon">
                  <span>
                     &times;
                  </span>
               </div>
            }
         </div>
         <div className='submit_search'>
            <span className='material-icons'>search</span>
         </div>
      </form>
   )
}

export default Search