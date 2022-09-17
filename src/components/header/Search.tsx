import React, { useState, useEffect, useRef } from 'react'
import { searchPost } from '../../redux/actions/postActions'
import { searchUser } from '../../redux/actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { FormSubmit, InputChange, RootStore } from '../../utils/Typescript'
import loadImg from '../../images/loading.gif'
import Avatar from '../global/Avatar'
import { useNavigate } from 'react-router-dom'
import { SEARCH_USER } from '../../redux/types/profileUser'

const Search = () => {
   const [search, setSearch] = useState<string>('')
   const { auth, searchData } = useSelector((state: RootStore) => state)
   const [onDisplay, setOnDisplay] = useState<boolean>(false)
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const inputRef = useRef<HTMLInputElement>(null)
   const divRef = useRef<HTMLDivElement>(null)
   useEffect(() => {
      if(!search) return;
      else {
         dispatch(searchPost(search))
         dispatch(searchUser(search, auth.access_token))
      }
   }, [search, dispatch])

   useEffect(() => {
      if(divRef.current) {
         const handleClickOutside = (e: MouseEvent) => {
            if(divRef.current?.contains(e.target as Node)) return;
            setOnDisplay(false)
         }
         document.addEventListener('mousedown', handleClickOutside)
         return () => document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [divRef.current])

   const handleNavigate = (id: string) => {
      setSearch('')
      setOnDisplay(false)
      dispatch({ type: SEARCH_USER, payload: [] })
      return navigate(`/profile/${id}`)
   }

   const handleSeeAll = () => {
      setOnDisplay(false)
      dispatch({ type: SEARCH_USER, payload: [] })
      return navigate(`/search?q=${search}`)
   }


   return (
      <div className='search_form'>
         <div className='input_search' >
            <input type="text" name='search'  ref={inputRef} 
            onFocus={() => setOnDisplay(true)}
            id='search' placeholder='Find accounts and videos'
               value={search} onChange={(e) => setSearch(e.target.value)} />
            {
               searchData.load ?
               <img src={loadImg} alt='loading' className='loading close_icon' />
               :
               search &&
               <div className="close_icon" onClick={() => setSearch('')}>
                  <span>
                     &times;
                  </span>
               </div>
            }
         </div>
         <div className='submit_search'>
            <span className='material-icons'>search</span>
         </div>
         {
            onDisplay && 
            searchData.users.filter(item => item._id !== auth.user?._id) && (searchData.users.filter(item => item._id !== auth.user?._id).length > 0) &&
            <div className='search_response'
            ref={divRef}
            >
               <h6 className='search_response_header'>Accounts</h6>
               <div className='search_response_body'>
                  {
                     (searchData.users.filter(item => item._id !== auth.user?._id)).map(item => (
                        <div className='search_response_body-item' 
                        key={item._id} onClick={() => handleNavigate(item._id as string)}>
                           <Avatar src={item.avatar} size='betweenMediumAndBig' />
                           <div className='search_response_body-item-info'>
                              <h6 className='mb-0'>{item.name}</h6>
                              <p className='mb-0'>{item.winterId}</p>
                           </div>
                        </div>
                     ))
                  }
                  <div className='see_more_data search_response_body-item' onClick={handleSeeAll}>
                     See all results for "{search}"
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default Search