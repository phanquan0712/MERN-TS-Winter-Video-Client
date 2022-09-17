import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IPost, RootStore } from '../../utils/Typescript'
import CardPost from '../card/CardPost'
import DivLoading from '../card/DivLoading'


interface IProps {
   posts: IPost[]
   total: number
   load?: boolean
   setLoad?: (load: boolean) => void
}

const RightSide = ({ posts, total, load, setLoad }: IProps) => {
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const [isMute, setIsMute] = useState<boolean>(true)
   const [valueVolume, setValueVolume] = useState<number>(0)
   const [page, setPage] = useState<number>(1)
   const handleKeyMuteMusic = (e: KeyboardEvent) => {
      if (e.key === 'm') {
         setIsMute(!isMute)
         setValueVolume(100)
      }
   }

   useEffect(() => {
      // addEventListener key 'M' to mute video
      window.addEventListener('keydown', handleKeyMuteMusic)
      return () => {
         window.removeEventListener('keydown', handleKeyMuteMusic)
      }
   }, [ isMute ])

   // const pageEnd = useRef<HTMLButtonElement>(null)
   // useEffect(() => {
   //    const observer = new IntersectionObserver(entries => {
   //       if (entries[0].isIntersecting) {
   //          setPage(prev => prev + 1)
   //       }
   //    }, {
   //       threshold: 1
   //    })
   //    if (pageEnd.current) {
   //       observer.observe(pageEnd.current)
   //    }
   // }, [setPage, pageEnd.current])

   // useEffect(() => {
   //    if(page > 1) {
   //       dispatch(getHomePost(page))
   //    }
   // }, [page, dispatch])

   return (
      <div className='list_post'>
         {
            posts && posts.length > 0 &&
            posts.map((post: IPost) => (
               <CardPost
                  key={post._id} post={post}
                  isMute={isMute} setIsMute={setIsMute}
                  valueVolume={valueVolume} setValueVolume={setValueVolume}
               />
            ))
         }
         {
            load &&
            <DivLoading />
         }
      </div>
   )
}

export default RightSide