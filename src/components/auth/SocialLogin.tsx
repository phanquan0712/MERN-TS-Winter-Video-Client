import React from 'react'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { useDispatch } from 'react-redux';
import { googleLogin, facebookLogin } from '../../redux/actions/authActions';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';



const SocialLogin = () => {
   const dispatch = useDispatch<any>()

   const onSuccessGG = (googleUser: GoogleLoginResponse) => {
      const id_token = googleUser.getAuthResponse().id_token
      dispatch(googleLogin(id_token))
   }


   const onSuccessFB = (response: FacebookLoginAuthResponse) => {
      const { accessToken, userID } = response.authResponse;
      dispatch(facebookLogin(accessToken, userID))
   }


   return (
      <div>
         <GoogleLogin
            client_id='897618673697-5nthl8vhrq8m2622ne6qt459a2ou5hvo.apps.googleusercontent.com'
            cookiepolicy='single_host_origin'
            onSuccess={onSuccessGG}
         />
         <div className='my-3'></div>
         <FacebookLogin
            appId="1400497563753220"
            onSuccess={onSuccessFB}
         />
      </div>
   )
}

export default SocialLogin