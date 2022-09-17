import React, { useState, useEffect, useRef } from 'react'

import {
   EmailShareButton,
   FacebookShareButton,
   TelegramShareButton,
   TwitterShareButton,
   WhatsappShareButton,
} from "react-share";

import {
   EmailIcon,
   FacebookIcon,
   TelegramIcon,
   TwitterIcon,
   WhatsappIcon,
} from "react-share";
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/Typescript'
import{ GET_DETAIL_POST, MDSR } from '../../redux/types/postType'

interface IProps {
   url: string
}
const ShareModal = ({ url }: IProps) => {
   const { auth, detailPost } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch<any>()
   const divRef = useRef<HTMLDivElement>(null);
   const handleCloseModalShare = () => {
      dispatch({ type: MDSR, payload: false })
      dispatch({ type: GET_DETAIL_POST, payload: { }})
   }

   const handleCloseModalWhenClickOutside = (e: any) => {
      if (e.target === divRef.current) {
         handleCloseModalShare()
      }
   }

   return (
      <div ref={divRef} className={`${window.innerWidth < 768 ? 'overlay_list_comment' : ''}`} onClick={handleCloseModalWhenClickOutside}>
         <div className={`${window.innerWidth < 768 ? 'share_modal_mb' : 'share_modal'}`}>
            {
               window.innerWidth < 768 &&
               <div className="share_header">
                  <h6 className='mb-0'>Share with</h6>
               </div>
            }
            {
               window.innerWidth > 768 ? 
               <>
               <FacebookShareButton url={url}>
                  <FacebookIcon round={true} size={32} />
               </FacebookShareButton>

               <TwitterShareButton url={url}>
                  <TwitterIcon round={true} size={32} />
               </TwitterShareButton>

               <EmailShareButton url={url}>
                  <EmailIcon round={true} size={32} />
               </EmailShareButton>


               <TelegramShareButton url={url}>
                  <TelegramIcon round={true} size={32} />
               </TelegramShareButton>

               <WhatsappShareButton url={url}>
                  <WhatsappIcon round={true} size={32} />
               </WhatsappShareButton>
               </>
               :
                  <div className="share_body">
                     <FacebookShareButton url={url}>
                        <FacebookIcon round={true} size={32} />
                     </FacebookShareButton>

                     <TwitterShareButton url={url}>
                        <TwitterIcon round={true} size={32} />
                     </TwitterShareButton>

                     <EmailShareButton url={url}>
                        <EmailIcon round={true} size={32} />
                     </EmailShareButton>


                     <TelegramShareButton url={url}>
                        <TelegramIcon round={true} size={32} />
                     </TelegramShareButton>

                     <WhatsappShareButton url={url}>
                        <WhatsappIcon round={true} size={32} />
                     </WhatsappShareButton>
                  </div>
            }
            {
               window.innerWidth < 768 &&
               <div className="share_footer">
                  <button className='btn' onClick={handleCloseModalShare}>Cancel</button>
               </div>
            }
         </div>
      </div>
   )
}

export default ShareModal