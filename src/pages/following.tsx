import React from 'react'
import LeftSide from '../components/home/leftSide'
import RightSide from '../components/home/rightSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/Typescript'

const Home = () => {
   const { followingPost } = useSelector((state: RootStore) => state)
   return (
      <div className='home d-flex container row mx-auto'>
         <div className="col-md-4">
            <LeftSide />
         </div>
         <div className="col-md-8">
            <RightSide posts={followingPost.posts} total={followingPost.total} />
         </div>
      </div>
   )
}

export default Home