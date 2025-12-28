import React, { useState } from 'react';
import passkey from '../Components/passkey.png';
import emailimg from '../Components/Email.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const item = { username, email, password };

    try {
      const response = await fetch('http://localhost:5000/submit', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        alert('User added successfully');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        alert('Error adding user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding user');
    }
  };

  return (
    <div>
      <div className="greenline"></div>       
      <div className="login-cont-s">
        <div className="containersignupmain">
          <h1 className="ul-txt-s">Create Account</h1>
          <form id="loginForm-s" onSubmit={HandleSubmit}>
            <i className="fa-solid fa-at iconat-s"></i>
            
            <input
              className="un-input-s"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <img className="email-icon-s" src={emailimg} alt='email-icon' />
            
            <input
              className="email-s"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <img className="search-icon-new-s" src={passkey} alt='search-icon' />
            
            <input
              className="pass-input-s"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            
            <button type="submit" className="signup-butt-s">Sign up</button>
            <Link to="/" className='acc-create'>
              Already have one?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;