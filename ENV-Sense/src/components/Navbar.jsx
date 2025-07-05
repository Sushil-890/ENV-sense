import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ isLoggedIn, username, handleLogout }) {
  const navigate = useNavigate();
  const [showProfileBox, setShowProfileBox] = useState(false);

  return (
    <nav className="env-navbar flex justify-between items-center bg-white shadow p-4">
      <div className="env-navbar-logo text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        ENV-sense 🌦️
      </div>
      <button onClick={() => navigate('/naturesnap')}>NatureSnap 📸</button>

      <div className="env-navbar-links flex items-center gap-4">
        <button onClick={() => navigate('/')} className="env-nav-btn">Home</button>

        <button onClick={() => navigate('/about')} className="env-nav-btn">About</button>
        <button onClick={() => navigate('/help')} className="env-nav-btn">Help</button>

        {isLoggedIn ? (
          <div className="env-profile-container relative">
            <button onClick={() => setShowProfileBox(!showProfileBox)} className="env-profile-btn">
              👤 Profile
            </button>

            {showProfileBox && (
              <div className="env-profile-box absolute right-0 top-10 bg-white border rounded shadow p-3">
                <ul>
                  <li className="env-username">Hello, <strong>{username}</strong></li>
                  <li className="mt-2">
                    <button onClick={handleLogout} className="env-logout-btn text-red-500 hover:underline">
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="env-login-btn text-blue-500 hover:underline">🔐 Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
