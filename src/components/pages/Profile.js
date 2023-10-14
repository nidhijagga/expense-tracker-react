import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

function Profile() {
  const displayNameRef = useRef(null);
  const profilePicLinkRef = useRef(null);
  const [name, setName] = useState("UserName");
  const [picUrl, setPicUrl] = useState(
    "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
  );

  const handleUpdate = () => {
    const newDisplayName = displayNameRef.current
      ? displayNameRef.current.value
      : "";
    const newProfilePicLink = profilePicLinkRef.current
      ? profilePicLinkRef.current.value
      : "";

    // Construct the request payload
    const payload = {
      idToken: localStorage.getItem("token"),
      displayName: newDisplayName,
      photoUrl: newProfilePicLink,
      returnSecureToken: true,
    };

    // Make the POST request to update the user's profile
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        payload
      )
      .then((res) => {
        const newDisplayName = res.data.displayName;
        const newPicUrl = res.data.photoUrl;
        if (newDisplayName !== "") {
          setName(newDisplayName);
        }

        if (newPicUrl !== "") {
          setPicUrl(newPicUrl);
        }
        displayNameRef.current.value="";
        profilePicLinkRef.current.value="";
      })
      .catch((error) => {
        // Handle any errors that occur during the update
        console.error("Error updating profile:", error);
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
        console.log(user)

        if (user) {
          if (user.displayName) {
            setName(user.displayName);
          }

          if (user.photoUrl) {
            setPicUrl(user.photoUrl);
          }
        }
      }).catch((error)=>console.log(error));
  }, []);

  return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <div className="bg-blue-200 p-4 rounded-lg" style={{ width: "30%" }}>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-950">
          User Profile
        </h2>
        <div className="text-center mt-4">
          <img
            src={picUrl}
            alt="Profile"
            className="rounded-full w-20 h-20 mx-auto mb-2"
          />
          <p className="text-blue-900 font-medium">{name}</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-blue-900 text-sm font-medium">
              Display Name
            </label>
            <input
              type="text"
              className="w-full p-2 bg-blue-100 text-blue-900 border border-blue-800 rounded"
              ref={displayNameRef}
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-900 text-sm font-medium">
              Profile Picture Link
            </label>
            <input
              type="text"
              className="w-full p-2 bg-blue-100 text-blue-900 border border-blue-800 rounded"
              ref={profilePicLinkRef}
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="w-full py-2 bg-blue-800 text-white rounded hover-bg-blue-950"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
