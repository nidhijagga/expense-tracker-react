import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/authContext';

function Header() {
  const authContext = useContext(AuthContext);

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">Expense Tracker</div>
      <div>
        {authContext.isLoggedIn && ( // Conditionally render the links if isLoggedIn is true
          <>
            <Link to="/complete-profile" className="text-white mx-2 p-2 rounded bg-blue-950 hover:bg-blue-900">Complete Profile</Link>
            <Link to="/logout" className="text-white mx-2 p-2 rounded bg-blue-950 hover:bg-blue-900">Logout</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
