import { useNavigate } from 'react-router-dom';

export default function Turfs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/player/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Book a Turf</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-lg">
          <div className="text-6xl mb-4">🏟️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find & Book Turfs</h2>
          <p className="text-xl text-gray-600 mb-8">Reserve sports venues near you</p>
          <p className="text-gray-500">Coming Soon...</p>
        </div>
      </main>
    </div>
  );
}
