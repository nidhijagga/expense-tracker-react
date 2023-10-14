import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
const API_KEY = process.env.REACT_APP_API_KEY;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Construct the request payload
    const payload = {
      requestType: "PASSWORD_RESET",
      email: email,
    };

    // Make the POST request to send the password reset email
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`, // Replace [API_KEY] with your API key
        payload
      )
      .then((res) => {
        // Handle the response, for example, show a success message
        setEmailSent(true);
        console.log(res);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        alert("Error sending password reset email:", error);
      });
  };

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Forgot Password</h2>
        {emailSent ? (
          <p className="text-blue-950 mb-4">Password reset email sent. Check your inbox.</p>
        ) : (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-950 text-white rounded hover:bg-blue-800"
            >
              Reset Password
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Already a user? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
