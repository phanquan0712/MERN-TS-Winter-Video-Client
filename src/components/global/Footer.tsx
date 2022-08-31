import React from 'react'
import Logo from '../../images/logo.png'

const Footer = () => {
   return (
      <div className='footer row'>
         <div className="footer_box container row">
            <div className="col-md-2 footer_logo">
               <h2>Winter</h2>
            </div>
            <div className="col-md-2">
               <strong>Company</strong>
               <ul>
                  <li><a href="#">Introduce</a></li>
                  <li><a href="#">Winter Browse</a></li>
                  <li><a href="#">News</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Career</a></li>
                  <li><a href="#">ByteDance</a></li>
               </ul>
            </div>
            <div className="col-md-2">
               <strong>Program</strong>
               <ul>
                  <li><a href="#">Winter for Good</a></li>
                  <li><a href="#">Advertisement</a></li>
                  <li><a href="#">Developers</a></li>
                  <li><a href="#">Winter Rewards</a></li>
               </ul>
            </div>
            <div className="col-md-2">
               <strong>Support</strong>
               <ul>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Safety Center</a></li>
                  <li><a href="#">Creator Portal</a></li>
                  <li><a href="#">Community Guide</a></li>
                  <li><a href="#">transparent</a></li>
                  <li><a href="#">Accessibility</a></li>
               </ul>
            </div>
            <div className="col-md-2">
               <strong>Juridical</strong>
               <ul>
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Winter . LAW ENFORCEMENT PRINCIPLES</a></li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Footer