import React from 'react'
import LeftSide from '../components/home/leftSide'
import RightSide from '../components/home/rightSide'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/Typescript'

const Home = () => {
   const { homePost } = useSelector((state: RootStore) => state)
   return (
      <div className='home d-flex justify-content-between container mx-auto' style={{ marginTop: '70px' }}>
         <div>
            <LeftSide />
         </div>
         <RightSide posts={homePost.posts} total={homePost.total} />
      </div>
   )
}

export default Home