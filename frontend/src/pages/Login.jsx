import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For hackathon demo - skip actual auth
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-70 via-white to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="logo" className="w-10 mb-4" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Demo mode - Click login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="demo@sehatsathi.com"
              className="border px-3 py-2 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="demo@sehatsathi.com"
            />
          </div>
          <div>
            <label className="text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="border px-3 py-2 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="demo123"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm py-2 rounded mt-4"
          >
            Login to SehatSathi
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
