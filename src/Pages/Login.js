import React, { useState , useRef} from 'react';
import passkey from '../Components/passkey.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmessage, seterrmessage] = useState('');
  const [loading,setloading] = useState(false);
  const [inputtype, setinputype]=useState('password')
  const [inputbool, setinputbool] = useState(false)
  const [buttonref, setbuttonref] = useState("SHOW")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the server for login and OTP generation
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Sending email and password as JSON
      });

      const data = await response.json();

      if (response.ok && data.success) {
        seterrmessage('');


        setloading(true);
        // Send email to OTP generation endpoint
        await fetch('http://localhost:5000/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // Sending email to backend for OTP generation
        });
        
        navigate('/otpgen'); // Redirect to OTP generation page
      } else {
        seterrmessage('*Invalid username or password!');
      }
    } catch (error) {
      alert('Error during login');
    }
  };

  const handleshowbutton = ()=>{
    setinputbool(!inputbool)
    if(inputbool)
    {
      setinputype("text")
      setbuttonref("HIDE")
    }
    else{
      setinputype("password")
      setbuttonref("SHOW")
    }
  }

  

  return (
    <div>
      <div className="greenline"></div>
      <div className="login-cont">
        <div className="containerloginmain">
          <h1 className="ul-txt">User login</h1>
          <form id="loginForm" onSubmit={handleLogin}>
            <i className="fa-solid fa-at iconat"></i>
            <input
              className="un-input"
              type="email"
              id="email"
              name="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <img className="search-icon-new" src={passkey} alt="search-icon" />
            <input
              className="pass-input"
              type={inputtype}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='button' className='showbutton' onClick={handleshowbutton} useRef={buttonref}>{buttonref}</button>
            <br />
            <button type="submit" className="login-butt">
              Login
            </button>
            <Link to="/Signup" className="acc-create">
              Create a new account?
            </Link>
            <p className='errormessage' >{errmessage}</p>
            
            {loading && (
        <div className="modalboxloading">
          <div className='loader' ></div>
        </div>
        )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
