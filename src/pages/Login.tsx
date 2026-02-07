import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'player' | 'turf_owner' | 'admin'>('player');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await userAPI.login(email);
      const user = response.user;

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('userRole', user.role);

      // Redirect based on user role
      if (user.role === 'player') {
        navigate('/player/dashboard');
      } else if (user.role === 'turf_owner') {
        navigate('/turf-owner/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      type: 'player' as const,
      icon: '🏃',
      title: 'Player',
      description: 'Find and join games',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      type: 'turf_owner' as const,
      icon: '🏟️',
      title: 'Turf Owner',
      description: 'Manage your venues',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      type: 'admin' as const,
      icon: '⚙️',
      title: 'Admin',
      description: 'System management',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">⚽</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SportFinder
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* User Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-3 gap-3">
              {userTypes.map((type) => (
                <button
                  key={type.type}
                  type="button"
                  onClick={() => setUserType(type.type)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    userType === type.type
                      ? `border-transparent bg-gradient-to-br ${type.gradient} text-white shadow-lg scale-105`
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className={`text-xs font-semibold ${
                    userType === type.type ? 'text-white' : 'text-gray-700'
                  }`}>
                    {type.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r ${
                userTypes.find((t) => t.type === userType)?.gradient
              } shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing In...
                </span>
              ) : (
                `Sign In as ${userTypes.find((t) => t.type === userType)?.title}`
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
