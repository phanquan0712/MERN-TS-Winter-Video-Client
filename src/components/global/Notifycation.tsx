import React, { useState, useEffect } from 'react'
import { INotify, IUser } from '../../utils/Typescript'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import FollowBtn from './FollowBtn'
import Avatar from './Avatar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import notifyImg from '../../images/notify.webp'
import SyncAltIcon from '@mui/icons-material/SyncAlt';


interface IProps {
   data: INotify[]
}

const Notifycation = ({ data }: IProps) => {
   const { auth, notify } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const [activeStr, setActiveStr] = useState<string>('all')
   const [dataNotify, setDataNotify] = useState<INotify[]>([])
   const imageShow = (src: any) => {
      return (
         <img
            src={src}
            alt="Image"
            style={{ width: '50px', height: '50px' }}
         />
      )
   }

   const selectGroup = [
      { label: 'All activities', value: 'all' },
      { label: 'Likes', value: 'like' },
      { label: 'Comments', value: 'comment' },
      { label: 'Follows', value: 'follow' },
      { label: 'Messages', value: 'message' },
   ]

   useEffect(() => {
      if (activeStr === 'like' || activeStr === 'comment' || activeStr === 'follow' || activeStr === 'message') {
         const newData = notify.data.filter(item => item.typeNotify === activeStr)
         setDataNotify(newData)
      } else {
         setDataNotify(notify.data)
      }
      return () => setDataNotify([])
   }, [notify.data, activeStr])

   return (
      <div className='notify'>
         <h4 className='notify_header'>Notifycation</h4>
         <div className="notify_select_group">
            {
               selectGroup.map((item, index) => (
                  <div
                     key={index} className={`notify_select_group-item ${activeStr === item.value ? 'active' : ''}`}
                     onClick={() => setActiveStr(item.value)}
                  >
                     {item.label}
                  </div>
               ))
            }
         </div>
         <div className="notify_content">
            {
               dataNotify.length > 0 ?
                  dataNotify.map(item => (
                     <div key={item._id} className='notify_content-item' onClick={() => navigate(`${item.url}`)}>
                        <Avatar src={item.user?.avatar as string} size='big' />
                        <div style={{ flex: 1 }} className='notify_content-item-name mx-2'>
                           <h6>{item.user?.name}</h6>
                           <div className='bottom_text'>
                              <span>{item.text}</span>. &nbsp;
                              <span>{moment(item.createdAt).fromNow()}</span>
                           </div>
                        </div>
                        {
                           item.typeNotify === 'follow' ?
                              <button className='btn' style={{ background: '#eee', cursor: 'pointer' }} disabled={true}>
                                 <SyncAltIcon />
                                 Friend
                              </button>
                              :
                              item.typeNotify === 'message' ?
                                 <div style={{ opacity: 0 }}>
                                    <img style={{
                                       flex: '0 0 42px',
                                       width: '42px',
                                       height: '56px',
                                       background: '#fff',
                                       border: 0,
                                    }} src={item.image} alt="" />
                                 </div>
                                 :
                                 <img style={{
                                    flex: '0 0 42px',
                                    width: '42px',
                                    height: '56px',
                                    borderRadius: '2px',
                                 }} src={item.image} alt="" />
                        }
                     </div>
                  ))
                  :
                  <div className='mt-3'>
                     <h4 className='text-center' style={{ fontSize: '18px', fontWeight: '500', color: '#555' }}>No notifycation</h4>
                     <img className='w-100 h-100' src={notifyImg} alt="" />
                  </div>
            }
         </div>
      </div>
   )
}

export default Notifycation