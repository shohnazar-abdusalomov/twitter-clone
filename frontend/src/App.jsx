import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPosts from './pages/MyPosts';
import LikedPosts from './pages/LikedPosts';
import Navbar from './components/Navbar';

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0d0f]">
      {token && <Navbar />}
      <main className={token ? 'pt-14' : ''}>
        <div className={token ? 'max-w-[640px] mx-auto px-4 py-6' : ''}>
          <Routes>
            <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={token ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
            <Route path="/liked-posts" element={<ProtectedRoute><LikedPosts /></ProtectedRoute>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
