import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailStatus, setEmailStatus] = useState(false);
  const [profileStatus, setProfileStatus] = useState(false);

  const handleLogout = () => {
    authContext.Logout();
    navigate("/login");
  };

  const handleEmailVerify = () => {
    const payload = {
      requestType: "VERIFY_EMAIL",
      idToken: localStorage.getItem("token"),
    };

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        payload
      )
      .then(() => {
        alert("Email verification request sent successfully.");
      })
      .catch((error) => {
        alert("Error sending email verification:", error);
      });
  };

  useEffect(() => {
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        { idToken: localStorage.getItem("token") }
      )
      .then((res) => {
        const user = res.data.users[0];

        if (user) {
          if (
            user.displayName &&
            user.displayName !== "" &&
            user.photoUrl &&
            user.photoUrl !== ""
          ) {
            setProfileStatus(true);
          }
          if (user.emailVerified && user.emailVerified === true) {
            setEmailStatus(true);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
        {authContext.isLoggedIn && (
          <Link
            to="/home"
            className="text-white mx-2 p-2 rounded bg-blue-950 hover:bg-blue-900"
          >
            Home
          </Link>
        )}
      </div>
      <div className="flex items-center">
        {authContext.isLoggedIn && (
          <>
            {emailStatus ? (
              <span className="text-white mx-2 p-2 rounded bg-blue-900">
                Email Verified ☑️
              </span>
            ) : (
              <button
                className="text-white mx-2 p-2 rounded bg-blue-950 hover-bg-blue-900"
                onClick={handleEmailVerify}
              >
                Verify Email
              </button>
            )}
            {profileStatus ? (
              <Link
                to="/complete-profile"
                className="text-white mx-2 p-2 rounded bg-blue-950 hover-bg-blue-900"
              >
                Profile ☑️
              </Link>
            ) : (
              <Link
                to="/complete-profile"
                className="text-white mx-2 p-2 rounded bg-blue-950 hover-bg-blue-900"
              >
                Complete Profile
              </Link>
            )}
            <button
              className="text-white mx-2 p-2 rounded bg-blue-950 hover-bg-blue-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
