import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';

export default function PlayerDashboard() {
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

  const quickActions = [
    {
      title: 'Find Games',
      icon: '🔍',
      description: 'Discover games nearby',
      gradient: 'from-blue-500 to-indigo-600',
      action: () => navigate('/player/discover'),
    },
    {
      title: 'Create Game',
      icon: '➕',
      description: 'Organize a new match',
      gradient: 'from-green-500 to-emerald-600',
      action: () => navigate('/player/create-game'),
    },
    {
      title: 'My Games',
      icon: '🎮',
      description: 'View joined games',
      gradient: 'from-orange-500 to-red-600',
      action: () => navigate('/player/my-games'),
    },
    {
      title: 'Book Turf',
      icon: '🏟️',
      description: 'Reserve a venue',
      gradient: 'from-purple-500 to-pink-600',
      action: () => navigate('/player/turfs'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">⚽</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SportFinder
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-2xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">Player</div>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to play? Find a game or create your own.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Games Played</span>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {user.stats?.games_played || 0}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Organized</span>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {user.stats?.games_organized || 0}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Attendance</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {user.stats?.attendance_rate || 100}%
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Rating</span>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {user.stats?.average_rating ? user.stats.average_rating.toFixed(1) : 'N/A'}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={action.action}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-left"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <p className="text-gray-600 text-lg mb-4">No recent activity yet</p>
            <p className="text-gray-500">Start by finding or creating a game!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
