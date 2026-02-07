import { useNavigate } from 'react-router-dom';

export default function TurfOwnerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

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
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-lg">
          <div className="text-6xl mb-4">🏟️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Turf Owner Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8">Coming Soon...</p>
          <p className="text-gray-500">Manage your turfs, bookings, and earnings</p>
        </div>
      </main>
    </div>
  );
}
