import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import PlayerDashboard from './pages/player/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import TurfOwnerDashboard from './pages/turfOwner/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Player Routes */}
        <Route path="/player/dashboard" element={<PlayerDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Turf Owner Routes */}
        <Route path="/turf-owner/dashboard" element={<TurfOwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
