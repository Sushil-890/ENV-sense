import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Help from './Pages/Help';
import Login from './Pages/Login';
import Signup from './Pages/Signup';  
import NatureSnap from './components/NatureSnap';        
import { useState, useEffect } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
 
useEffect(() => {
  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  setIsLoggedIn(!!token);
  if (storedUsername) setUsername(storedUsername);
}, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  setUsername('');
};
  return (
    <Router>
      <Navbar 
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
      />
      <div className="min-h-screen bg-blue-100 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/naturesnap" element={<NatureSnap />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
