import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import { authSuccess } from './redux/actions/authActions';

function App() {
  const dispatch=useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
    const storedUser=sessionStorage.getItem('user');
    if(storedUser){
      dispatch(authSuccess(JSON.parse(storedUser)))
    }
  },[dispatch])

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);
  

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? <Navigate to='/' replace />:null}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isLoggedIn ? <Chat /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
