import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import Scanner from './pages/Scanner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Offline from './pages/Offline';
import ScrollToTop from './components/ScrollToTop'; 
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function AppContent() {
  //to hide header and footer from login and signup page
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ScrollToTop /> 
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/assistant" element={
            <ProtectedRoute>
              <Assistant />
            </ProtectedRoute>
          } />
          <Route path="/scanner" element={
            <ProtectedRoute>
              <Scanner />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/offline" element={<Offline />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
