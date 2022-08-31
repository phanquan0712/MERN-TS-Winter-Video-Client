import React from 'react'
import { useSelector} from 'react-redux'
import { RootStore } from '../../utils/Typescript'

const InputMessage = () => {
   const { auth } = useSelector((state: RootStore) => state)
   return (
      <form className="input_message">
               <input type="text" placeholder='Add message...' />
   </form>
   )
}

export default InputMessage