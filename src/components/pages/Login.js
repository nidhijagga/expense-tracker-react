import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center font-semibold">Login</h2>
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
          <button onClick={handleLogin} className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Log In
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
