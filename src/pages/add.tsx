import React, { useEffect, useState, useRef } from 'react'
import Upload from '../images/upload.svg'
import Footer from '../components/global/Footer'
import { InputChange } from '../utils/Typescript'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/Typescript'
import { useNavigate } from 'react-router-dom'
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Avatar from '../components/global/Avatar'
import musicBarICon from '../images/music-bar-icon.svg'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { createPost } from '../redux/actions/postActions'
import NotFound from '../components/global/NotFound'
import NotLogin from '../components/global/NotLogin'


const UploadPost = () => {
   const { auth } = useSelector((state: RootStore) => state)
   const [listImgCover, setListImgCover] = useState<any[]>([])
   const [coverImg, setCoverImg] = useState<number>(0)
   const videoRef = useRef<HTMLVideoElement>(null)
   const initState: {
      note: string
      role_watch: string
      isComment: boolean
      video: File | string,
      cover_img: File | string,
   } = {
      note: '',
      role_watch: 'Public',
      isComment: true,
      video: '',
      cover_img: '',
   }
   const navigate = useNavigate()
   const dispatch = useDispatch<any>()
   const [postData, setPostData] = useState(initState)
   const listPersonWatchVideo = ['Public', 'Follower', 'Private']
   const [swBtn, setSwBtn] = useState(true)


   const handleChangeInput = (e: InputChange) => {
      const { name, value } = e.target as HTMLInputElement
      setPostData({ ...postData, [name]: value })
   }

   const handleChangeVideo = (e: InputChange) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
         const file = files[0]
         setPostData({ ...postData, video: file })
      }
   }

   useEffect(() => {
      const listCapture: any[] = []
      if(!videoRef.current) return
      const capture = setInterval(() => {
         if (videoRef.current) {
            const canvas = document.createElement("canvas") as HTMLCanvasElement
            canvas.width = 84;
            canvas.height = 150;
            (canvas.getContext('2d') as CanvasRenderingContext2D).drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL();
            listCapture.push(dataURL)
            if(listCapture.length === 8 || Math.floor(videoRef.current.currentTime) === Math.floor(videoRef.current.duration)) {
               setListImgCover(listCapture)
               clearInterval(capture)
            }
         }
      }, 1000)
      return () => {
         clearInterval(capture)
         setListImgCover([])
         setCoverImg(0)
      }
   }, [videoRef.current, postData.video])

   const handlePostVideo = () => {
      const newData = {...postData, isComment: swBtn};
      dispatch(createPost({ ...newData, cover_img: listImgCover[coverImg] }, auth))
   }

   useEffect(() => {
      return () => setPostData(initState)
   }, [])


   const handleChooseCoverImg = (number: number) => {
      setCoverImg(number)
   }

   if (!auth.user) return <NotLogin title='Add videos' img='add' description='Where trends start.' />
   return (
      <>
         <div className='upload_page add'>
            <div className="upload_box container">
               <h4>Upload Video</h4>
               <span>Posts video to your account</span>
               <div className='upload_box_content d-flex mt-3'>
                  {
                     postData.video ?
                     <div className='preview_container'>
                        <div className="upload_preview">
                           <video ref={videoRef} autoPlay loop src={URL.createObjectURL((postData.video) as File)} />
                           <div className="title">
                              <div>Following</div>
                              <div style={{ opacity: 1, color: 'white' }}>For you</div>
                           </div>
                           <div className="info">
                              <div className="username">@{auth.user.name}</div>
                              <div className="caption" >{postData.note}</div>
                              <div className="sound-container">
                                 <AudiotrackIcon />
                                 <div className='sound'>
                                    <div className='sound-text'>
                                       <p>
                                          Original sound
                                          -
                                          <span>&nbsp;</span>
                                          {auth.user.name}
                                          <span>&nbsp;</span>
                                       </p>
                                       <p>
                                          Original sound
                                          -
                                          <span>&nbsp;</span>
                                          {auth.user.name}
                                          <span>&nbsp;</span>
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="avatar-container">
                              <img src={auth.user.avatar} alt="" />
                           </div>
                           <div className="music_icon">
                              <img src={musicBarICon} alt="" />
                           </div>
                           <div className="album-container">
                              <div>
                                 <img src={auth.user.avatar} alt="" />
                              </div>
                           </div>
                           <div className="music_symbol">
                              <div></div>
                              <div></div>
                              <div></div>
                           </div>
                           <div className="upload_preview_frame"></div>
                           <div className='change_video'>
                              <input
                                 type="file"
                                 name="file"
                                 id="file"
                                 className="file_input"
                                 accept="video/*"
                                 title=''
                                 onChange={handleChangeVideo}
                              />
                              <button className='btn btn-info'>
                                 <BorderColorIcon />
                              </button>
                           </div>
                        </div>
                     </div>
                        :
                        <div className="upload_card">
                           <input
                              type="file"
                              name="file"
                              id="file"
                              className="file_input"
                              accept="video/*"
                              title=''
                              onChange={handleChangeVideo}
                           />
                           <div>
                              <img src={Upload} alt="Upload" className='mb-4' />
                              <h6 className='mb-4'>Select video to upload</h6>
                              <p>MP4 or WebM</p>
                              <p>Quanlity 720x1080 or higher</p>
                              <p>Max 10 min</p>
                              <p >Less than 2GB</p>
                              <button className='btn btn-danger w-100 mt-4'>Select file</button>
                           </div>
                        </div>
                  }
                  <div className="upload_form">
                     <div className='form-group'>
                        <label htmlFor="note" className='form-label' style={{ fontWeight: '500' }}>Note</label>
                        <input type="text" className='form-control' name='note' id='note'
                           onChange={handleChangeInput}
                        />
                     </div>
                     <div className='form-group'>
                        <label htmlFor="note" className='form-label' style={{ fontWeight: '500' }}>Cover image</label>
                        <div className={`list_cover_image ${listImgCover.length > 0 ? 'active' : ''}`}>
                           {
                              listImgCover &&
                              listImgCover.length > 0 ?
                              listImgCover.map((item, index) => (
                                 <img src={item} alt="" key={index}
                                    className={coverImg === index ? 'active' : ''}
                                    onClick={() => handleChooseCoverImg(index)}
                                 />
                              ))
                              :
                              postData.video ? 
                              <>
                                 <div className='creating_loading'>
                                 <div></div>
                                 <div></div>
                                 <div></div>
                                 </div>
                                 <p
                                    className='text-center mb-0'
                                    style={{ fontSize: '14px', fontWeight: '400'}}
                                 >Creating cover image</p>
                              </>
                              :
                              <div className='text-center'>
                                 <h4
                                    style={{ fontSize: '16px'}}
                                 >Choose video for create cover image</h4>
                              </div>
                           }
                        </div>
                     </div>
                     <div className='form-group' style={{ width: '50%' }}>
                        <label htmlFor="note" className='form-label' style={{ fontWeight: '500' }}>Who can watch this video</label>
                        <select className='form-control'
                           name='role_watch'
                           id='role_watch'
                           onChange={handleChangeInput}
                        >
                           {
                              listPersonWatchVideo.map((item, index) => (
                                 <option value={item.toLowerCase()} key={index}>{item}</option>
                              ))
                           }
                        </select>
                     </div>
                     <div className='form-group d-flex align-items-center justify-content-between mt-4'>
                        <label htmlFor="note" className='form-label' style={{ fontWeight: '500' }}>Allows users to comment:</label>
                        <div className="switch-button position-relative">
                           <button className='sw-case' onClick={() => setSwBtn(true)}>Enable</button>
                           <button className='sw-case' onClick={() => setSwBtn(false)}>Disable</button>
                           <button className='switch'
                              style={{
                                 transform: swBtn ? 'translateX(0px)' : 'translateX(100px)'
                              }}
                           >.</button>
                        </div>
                     </div>
                     <p style={{ color: '#999', fontSize: '14px' }} className='my-4'>We'll check if your video uses pirated audio. If we detect a violation, you can edit the video before posting.Learn more</p>
                  </div>
               </div>
               <div className='upload_form_footer text-center'>
                  <button className='btn btn-outline border mr-2' style={{ minWidth: '124px', padding: '10px 24px' }}
                     onClick={() => navigate('/')}
                  >Cancel</button>
                  <button className='btn btn-danger border ml-2' style={{ minWidth: '124px', padding: '10px 24px' }}
                     onClick={handlePostVideo}
                  >Post</button>
               </div>
            </div>
         </div>
      </>
   )
}

export default UploadPost