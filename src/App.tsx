import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageRender from './pageRender';
import Header from './components/header/Header';
import Alert from './components/alert/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { IParams, RootStore } from './utils/Typescript'
import { refreshToken } from './redux/actions/authActions';
import { gapi } from "gapi-script";
import Home from './pages/home';
import { getSuggestionUser, getSuggestionUserWhenNoLogin } from './redux/actions/userActions';
import { getHomePost, getPostFollowing } from './redux/actions/postActions';
import { useParams, useLocation } from 'react-router-dom'
import AuthModal from './components/auth/AuthModal';
import io from 'socket.io-client';
import SocketClient from './SocketClient';
import { SOCKET } from './redux/types/socketType';
import FooterContainer from './components/home/FooterContainer';
import { getNotifies } from './redux/actions/notifyAction';
import { getConversations } from './redux/actions/messageAction';
import { API_URL } from './utils/config';

function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });


  const { page, slug }: IParams = useParams()
  const { alert, auth, authModal } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (!auth.access_token) return
    dispatch(getConversations(auth))
  }, [auth, dispatch])


  useEffect(() => {
    dispatch(refreshToken());
    const socket = io(API_URL)
    dispatch({ type: SOCKET, payload: socket })
    return () => {socket.close()}
  }, [dispatch])

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getNotifies(auth.access_token))
    }
  }, [auth.access_token, dispatch])

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getSuggestionUser(auth.access_token))
    } else {
      dispatch(getSuggestionUserWhenNoLogin())
    }
  }, [auth.access_token, dispatch])

  useEffect(() => {
    dispatch(getHomePost())
  }, [dispatch])

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getPostFollowing(auth.access_token))
    }
  }, [auth.access_token, dispatch])

  return (
    <div className="App">
      <div style={{ display: 'none' }}>
        {
          alert.error &&
          toast.error(alert.error)
        }
        {
          alert.success &&
          toast.success(alert.success)
        }
        {auth.access_token && <SocketClient />}
      </div>
      <Router>
        {
          window.innerWidth > 768 &&
          <div style={{ marginBottom: '60px' }}>
            <Header />
          </div>
        }
        <AuthModal active={authModal ? 'active' : ''} />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />
        </Routes>
        {
          window.innerWidth < 768 &&
          <FooterContainer />
        }
      </Router>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='dark'
        pauseOnHover
      />
      */ }
    </div>
  );
}

export default App;
