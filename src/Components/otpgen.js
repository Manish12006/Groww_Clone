import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpGen = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleValidateOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),  // Sending only the OTP for validation
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('OTP is correct!');
        navigate('/home')
        // Perform actions on successful validation
        // Example: navigate('/success');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP validation:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="greenline"></div>       
      <div className="login-cont-o">
        <div className="containersignupmain">
          <h1 className="ul-txt-o">OTP Validation</h1>
          <form id="loginForm-o" onSubmit={handleValidateOtp}>
            <i className="fa-solid fa-at iconat-o"></i>
            <input
              className="un-input-o"
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <br />
            <br />
            <button type="submit" className="signup-butt-o">Validate OTP</button>
            <p className='messageerrnew' >{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpGen;
