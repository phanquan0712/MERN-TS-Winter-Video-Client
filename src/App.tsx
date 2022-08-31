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
import { getSuggestionUser } from './redux/actions/userActions';
import { getHomePost, getPostFollowing } from './redux/actions/postActions';
import { useParams } from 'react-router-dom'
import AuthModal from './components/auth/AuthModal';


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
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getSuggestionUser(auth.access_token))
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
      </div>
      <Router>
        <div style={{ marginBottom: '60px' }}>
          <Header />
        </div>
        <AuthModal active={authModal ? 'active' : ''}  />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />
        </Routes>
      </Router>
      <ToastContainer
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
    </div>
  );
}

export default App;
