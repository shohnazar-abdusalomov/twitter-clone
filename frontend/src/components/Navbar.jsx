import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { Home, User, Heart, LogOut, Moon, Sun, Feather } from 'lucide-react';

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/my-posts', icon: User, label: 'My Posts' },
    { path: '/liked-posts', icon: Heart, label: 'Liked' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-14
                    bg-white/80 dark:bg-[#0d0d0f]/80
                    backdrop-blur-xl
                    border-b border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-[640px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center
                          group-hover:scale-105 transition-transform duration-150">
            <Feather size={14} className="text-white dark:text-gray-900" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm tracking-tight">
            Mini Twitter
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              title={label}
              className={`p-2 rounded-xl transition-all duration-150 ${
                isActive(path)
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400
                       hover:bg-gray-100 dark:hover:bg-white/[0.06]
                       hover:text-gray-900 dark:hover:text-gray-100
                       transition-all duration-150"
            title="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-white/10 mx-1" />

          <div className="w-7 h-7 avatar text-xs">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={() => dispatch(logout())}
            title="Sign out"
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400
                       hover:bg-red-50 dark:hover:bg-red-500/10
                       hover:text-red-500 dark:hover:text-red-400
                       transition-all duration-150"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
