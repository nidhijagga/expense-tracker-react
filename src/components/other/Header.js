import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout, selectIsLoggedIn } from "../../features/authSlice";
import {
  selectActivePremium,
  getExpensesAsJSON,
} from "../../features/expenseSlice";

const API_KEY = process.env.REACT_APP_API_KEY;

function Header() {
  const navigate = useNavigate();
  const [emailStatus, setEmailStatus] = useState(false);
  const [profileStatus, setProfileStatus] = useState(false);
  const [activePremiumEnabled, setActivePremiumEnabled] = useState(false); // State for toggling activePremium

  // Use the selectIsLoggedIn selector to determine if the user is logged in
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  // Use the selectActivePremium selector to determine if activePremium is true
  const activePremium = useSelector(selectActivePremium);
  const handleLogout = () => {
    // Use the logout action to clear the token
    dispatch(logout());
    navigate("/login");
  };

  function JSONToCSV(data) {
    const header = Object.keys(data[0]).join(",");
    // console.log(header);
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => JSON.stringify(value))
        .join(",")
    );
    return header + "\n" + rows.join("\n");
  }
  const expenses = useSelector(getExpensesAsJSON);
  const handleDownload = () => {
    if (expenses) {
      // Convert expenses to CSV format
      const csvData =
        "data:text/csv;charset=utf-8," +
        JSONToCSV(expenses.payload.expenses.expenses);

      console.log(csvData);

      // Create a link and initiate the download
      const encodedUri = encodeURI(csvData);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "expenses.csv");
      document.body.appendChild(link); // Required for Firefox
      link.click();
    } else {
      console.error("Expenses data is empty or undefined.");
    }
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
    if (!isLoggedIn) {
      return;
    }
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
  }, [isLoggedIn]);

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
        {isLoggedIn && (
          <Link
            to="/home"
            className="text-white mx-2 p-2 rounded bg-blue-950 hover:bg-blue-900"
          >
            Home
          </Link>
        )}
      </div>
      <div className="flex items-center">
        {isLoggedIn && (
          <>
            {activePremium && (
              <>
                {activePremiumEnabled && (
                  <button
                    className={`text-white mx-2 p-2 rounded ${
                      activePremiumEnabled
                        ? "bg-blue-950 hover:bg-blue-900"
                        : "bg-blue-800 hover:bg-blue-800" // Adjust styling as needed
                    }`}
                    onClick={() => {
                      handleDownload();
                    }}
                  >
                    Download
                  </button>
                )}
                <button
                  className={`text-white mx-2 p-2 rounded bg-blue-950 hover:bg-blue-800`}
                  onClick={() => {
                    // Toggle the state for activePremiumEnabled
                    setActivePremiumEnabled(!activePremiumEnabled);
                  }}
                >
                  {activePremiumEnabled ? "Disable Premium" : "Active Premium"}
                </button>
              </>
            )}
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
