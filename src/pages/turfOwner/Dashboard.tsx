import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';

export default function TurfOwnerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🏟️</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Turf Manager
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">Turf Owner</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 🏟️</h1>
          <p className="text-gray-600">Manage your turfs and bookings</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => navigate('/turf-owner/create-turf')}
            className="bg-white rounded-2xl p-6 border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="text-4xl mb-3">➕</div>
            <h3 className="font-bold text-gray-900 mb-1">Add New Turf</h3>
            <p className="text-sm text-gray-600">Register a new venue</p>
          </button>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900 mb-1">My Turfs</h3>
            <p className="text-sm text-gray-600">0 turfs registered</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="font-bold text-gray-900 mb-1">Bookings</h3>
            <p className="text-sm text-gray-600">0 active bookings</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-gray-900 mb-1">Earnings</h3>
            <p className="text-sm text-gray-600">$0 this month</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-lg">
          <div className="text-6xl mb-4">🏟️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Turfs</h2>
          <p className="text-xl text-gray-600 mb-8">No turfs registered yet</p>
          <button
            onClick={() => navigate('/turf-owner/create-turf')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Create Your First Turf
          </button>
        </div>
      </main>
    </div>
  );
}
