import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">⚽</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SportFinder
            </span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-white text-gray-700 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  🏆 Find Players. Book Turfs. Play Sports.
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Play Sports With
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                  People Nearby
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Join games instantly, no friends needed. Find players, book turfs, 
                and coordinate matches—all in one app.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Get Started Free
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-600">Active Players</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Turfs Listed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">50k+</div>
                  <div className="text-sm text-gray-600">Games Played</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🏃</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Find Games</h3>
                  <p className="text-sm text-gray-600">Discover nearby games instantly</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 mt-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Join Instantly</h3>
                  <p className="text-sm text-gray-600">No approval needed</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                   <h3 className="font-bold text-gray-900 mb-2">Group Chat</h3>
                  <p className="text-sm text-gray-600">Coordinate with players</p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 mt-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🏟️</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Book Turfs</h3>
                  <p className="text-sm text-gray-600">Find & reserve venues</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg font-bold rotate-12">
                100% Free
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sports Icons */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">
            Popular Sports
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Cricket', icon: '🏏', color: 'from-green-400 to-emerald-500' },
              { name: 'Football', icon: '⚽', color: 'from-blue-400 to-indigo-500' },
              { name: 'Basketball', icon: '🏀', color: 'from-orange-400 to-red-500' },
              { name: 'Badminton', icon: '🏸', color: 'from-yellow-400 to-orange-400' },
              { name: 'Tennis', icon: '🎾', color: 'from-green-400 to-teal-500' },
              { name: 'Volleyball', icon: '🏐', color: 'from-purple-400 to-pink-500' },
            ].map((sport) => (
              <div
                key={sport.name}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${sport.color} rounded-2xl flex items-center justify-center text-3xl`}>
                  {sport.icon}
                </div>
                <span className="font-semibold text-gray-800">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Play?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of players finding games every day
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            Start Playing Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>© 2026 SportFinder. Built for players who love the game.</p>
        </div>
      </footer>
    </div>
  );
}
