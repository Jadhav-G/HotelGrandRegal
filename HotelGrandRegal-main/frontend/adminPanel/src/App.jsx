import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
const apiURL = import.meta.env.VITE_SERVER_URL;


import fetchData from '../utils/fetcher.js';

import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Content from './pages/content/Content.jsx';
import Feedback from './pages/feedback/Feedback.jsx';
import Enquiry from './pages/enquiry/Enquiry.jsx';
import Booking from './pages/booking/Booking.jsx';

function handleForgot(e) {
  e.preventDefault();
  fetchData("generateLink", 'GET');
  alert("Password Reset Link Is Send At Your Registered Email Address\n This Link Will Expire within 10 minutes");
}

const UpdatePasswordHandler = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const PasswordInput = () => {
    const [pwd, setPwd] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='credsBox'>
        <label htmlFor="pwd">Enter Password</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            required
            value={pwd}
            type={showPassword ? 'text' : 'password'}
            placeholder='password'
            id='pwd'
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            style={{ padding: '4px 8px', cursor: 'pointer' }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
    );
  };


  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    let ack = await fetchData('changePwd', "POST", { newPass: newPassword, secret: token });
    if (ack.status) alert("Password Changed Successfully\nYou Will Be Logged Off all the devices\nPlease Relogin with new Password");
    else alert(ack.reason);
    navigate('/login');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => handleSubmit(e, navigate)}>
        <h2 className="title">Reset Your Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button">
          Update Password
        </button>
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

function App() {
  console.log("I am here in app.jsc handeling");
  const LoginForm = () => {
    const [username, setUn] = useState('');
    const [pwd, setPwd] = useState('');
    const [isToRemember, setIsToRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();
      fetch(apiURL + 'adminLogin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          pwd: pwd,
          isToRemember: isToRemember
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            navigate('/');
          } else {
            alert("Invalid Credinials");
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }

    return (
      <form className='loginForm' onSubmit={handleLogin}>
        <h2>Authenticate</h2>
        <hr />

        <div className='credsBox'>
          <label htmlFor="username">Enter Username</label>
          <input
            required
            value={username}
            type="text"
            placeholder='username'
            id='username'
            onChange={(e) => setUn(e.target.value)}
          />
        </div>

        <div className='credsBox'>
          <label htmlFor="pwd">Enter Password</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              required
              value={pwd}
              type={showPassword ? 'text' : 'password'}
              placeholder='password'
              id='pwd'
              onChange={(e) => setPwd(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: "absolute",
                padding: '4px 8px',
                cursor: 'pointer',
                background: '#eeeeee00',
                border: '0px',
                right: "10px",
                zIndex:'2'
              }}
            >
              <i
                className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                style={{ marginLeft: '10px', cursor: 'pointer', zIndex:'1' }}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              ></i>
            </button>
          </div>
        </div>

        <div className='extraHolder'>
          <div className='rememberMeBox'>
            <input
              checked={isToRemember}
              type="checkbox"
              id="remember"
              onChange={() => setIsToRemember(prev => !prev)}
            />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="" className='forgotPwd' onClick={handleForgot}>Forgot Password?</a>
        </div>

        <button className='loginBtn' type="submit">Login</button>
      </form>
    );
  }
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <div id="mainContentDiv">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/content" element={<Content />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/reset/:token" element={<UpdatePasswordHandler />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
