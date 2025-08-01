import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.png';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await signup(name, email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-orange-300 p-10 text-white">
          <img src={Logo} alt="logo" className="w-14 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Join SehatSathi</h2>
          <p className="text-center max-w-sm">
            Your AI health companion for elderly care.<br />
            Sign up now to start your health journey.
          </p>
        </div>

        {/* RIGHT SIDE - Simple Signup Form */}
        <div className="p-8 bg-white flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Join SehatSathi today</p>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Password</label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-2 mt-4 rounded"
              >
                {loading ? 'Creating Account...' : 'Join SehatSathi'}
              </button>
            </form>
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?
              <button 
                onClick={() => navigate('/login')}
                className="text-teal-600 hover:underline ml-1"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
