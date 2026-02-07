import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameAPI } from '../../api';
import type { Game } from '../../types';

export default function Discover() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    latitude: '',
    longitude: '',
    radius: 10,
    sport: '',
  });

  useEffect(() => {
    // Get user's current location on component mount
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          console.log('📍 User Location:', {
            latitude: lat,
            longitude: lng,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toLocaleString()
          });
          
          setSearchParams((prev) => ({
            ...prev,
            latitude: lat.toString(),
            longitude: lng.toString(),
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('❌ Location Error:', error.message);
          alert('Could not get your location. Please enter manually.');
          setLocationLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLocationLoading(false);
    }
  };

  const fetchNearbyGames = async () => {
    if (!searchParams.latitude || !searchParams.longitude) return;
    
    setLoading(true);
    try {
      const response = await gameAPI.searchNearby({
        lat: parseFloat(searchParams.latitude),
        lng: parseFloat(searchParams.longitude),
        radius_km: searchParams.radius,
        sport: searchParams.sport || undefined,
      });
      setGames(response.posts);
    } catch (err) {
      console.error('Failed to fetch games:', err);
    } finally {
      setLoading(false);
    }
  };

  const sports = ['All', 'Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis', 'Volleyball'];

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
            <h1 className="text-2xl font-bold text-gray-900">Discover Games</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Search Location</h2>
            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all disabled:opacity-50"
            >
              <span className="text-xl">📍</span>
              {locationLoading ? 'Getting location...' : 'Use My Location'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={searchParams.latitude}
              onChange={(e) => setSearchParams({ ...searchParams, latitude: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={searchParams.longitude}
              onChange={(e) => setSearchParams({ ...searchParams, longitude: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="number"
              placeholder="Radius (km)"
              value={searchParams.radius}
              onChange={(e) => setSearchParams({ ...searchParams, radius: parseInt(e.target.value) || 10 })}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <button
              onClick={fetchNearbyGames}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Map Preview */}
          {searchParams.latitude && searchParams.longitude && (
            <div className="mt-4">
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">📍 Your Current Location</p>
                <p className="text-xs text-gray-600">
                  Latitude: {parseFloat(searchParams.latitude).toFixed(6)}<br />
                  Longitude: {parseFloat(searchParams.longitude).toFixed(6)}
                </p>
              </div>
            </div>
          )}

          {/* Sport Filters */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSearchParams({ ...searchParams, sport: sport === 'All' ? '' : sport })}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  (sport === 'All' && !searchParams.sport) || searchParams.sport === sport
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Games List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{game.sport}</h3>
                  <p className="text-sm text-gray-500">by {game.user_name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  game.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {game.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  {game.location.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📅</span>
                  {game.date} at {game.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">👥</span>
                  {game.accepted_players.length}/{game.players_needed} players
                </div>
                {game.distance_km && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🚗</span>
                    {game.distance_km.toFixed(1)} km away
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{game.description}</p>

              <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Join Game
              </button>
            </div>
          ))}
        </div>

        {games.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-600">Try adjusting your search parameters</p>
          </div>
        )}
      </main>
    </div>
  );
}
