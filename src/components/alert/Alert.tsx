import React from 'react'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/Typescript'



const Alert = () => {
   const { alert } = useSelector((state: RootStore) => state)
   return (
      <div>
         {
            alert.loading &&
            <Loading />
         }
      </div>
   )
}

export default Alert