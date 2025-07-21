import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@sehatsathi.com');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-70 via-white to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="logo" className="w-10 mb-4" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to login
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="demo@sehatsathi.com"
              className="border px-3 py-2 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border px-3 py-2 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white text-sm py-2 rounded mt-4"
          >
            {loading ? 'Logging in...' : 'Login to SehatSathi'}
          </button>
        </form>
        
        <p className="text-sm text-center mt-4">
          Don't have an account? 
          <button 
            onClick={() => navigate('/signup')}
            className="text-teal-600 hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
