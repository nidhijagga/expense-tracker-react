import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        const { idToken } = response.data;
        dispatch(login({ token: idToken, email: email }));
        alert("Successfully Signed Up");
        navigate('/home');
      })
      .catch((error) => {
        console.log(error)
        alert(error?.response?.data?.error?.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center font-semibold text-blue-900">Sign Up</h2>
        <form>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm password"
              ref={confirmPasswordRef}
            />
          </div>
          <button onClick={handleSignUp} className="w-full py-2 px-4 bg-blue-950 text-white rounded hover-bg-blue-800">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
