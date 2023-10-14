import React, { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '.././store/authContext';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        const { idToken } = response.data;
        authContext.Login(idToken, email);
        authContext.isLoggedIn = true;
        alert("Successfully Logged In");
        navigate('/complete-profile');
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center font-semibold text-blue-900">Log In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your password"
              ref={passwordRef}
            />
          </div>
          <button onClick={handleLogin} className="w-full py-2 px-4 bg-blue-950 text-white rounded hover:bg-blue-800">
            Log In
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
          <br />
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
