import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IUser, INotify } from '../utils/Typescript'
import Avatar from '../components/global/Avatar'
import moment from 'moment'
import FollowBtn from '../components/global/FollowBtn'
import DivLoading from '../components/card/DivLoading'
import { useNavigate } from 'react-router-dom'
import notifyImg from '../images/notify.webp'
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import NotFound from '../components/global/NotFound'
import NotLogin from '../components/global/NotLogin'

const Notifycation = () => {
   const { auth, notify } = useSelector((state: RootStore) => state)
   const [activeStr, setActiveStr] = useState<string>('all')
   const [data, setData] = useState<INotify[]>([])
   const navigate = useNavigate()
   const selectGroup = [
      { id: 1, label: 'All activities', value: 'all' },
      { id: 2, label: 'Likes', value: 'like' },
      { id: 3, label: 'Comments', value: 'comment' },
      { id: 4, label: 'Follows', value: 'follow'},
      { label: 'Messages', value: 'message'},
   ]

   useEffect(() => {
      if (activeStr === 'like' || activeStr === 'comment' || activeStr === 'follow' || activeStr === 'message') {
         const newData = notify.data.filter(item => item.typeNotify === activeStr)
         setData(newData)
      } else {
         setData(notify.data)
      }
      return () => setData([])
   }, [notify.data, activeStr])
   if (!auth.user) return <NotLogin title='All activities' img='notify' description='Messages and notifications will appear here' />
   return (
      <div className='notify_mb'>
         <h4 className="notify_mb-header">Notifycation</h4>
         <div className="notify_select_group mt-2 pd-2">
            {
               selectGroup.map((item, index) => (
                  <div
                     key={item.id} className={`notify_select_group-item ${activeStr === item.value ? 'active' : ''}`}
                     onClick={() => setActiveStr(item.value)}
                  >
                     {item.label}
                  </div>
               ))
            }
         </div>
         <div className="notify_content">
            {
               data.length > 0 ?
                  data.map(item => (
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
                     <button className='btn' style={{ background: '#eee', cursor: 'pointer'}} disabled={true}>
                        <SyncAltIcon />
                              Friend
                           </button>
                           :
                           item.typeNotify === 'message' ?
                              <div style={{ opacity: 0}}>
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
                     <h4 className='text-center' style={{ fontSize: '18px', fontWeight: '500', color: '#555', border: 'none' }}>No notifycation</h4>
                     <img className='w-100 h-100' src={notifyImg} alt="" />
                  </div>
            }
         </div>
      </div>
   )
}

export default Notifycation