import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, clearError } from '../features/auth/authSlice';
import { Feather, User, Lock } from 'lucide-react';

function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0d0d0f]">
      <div className="w-full max-w-sm animate-fade-up">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white
                          items-center justify-center mb-4 shadow-card">
            <Feather size={22} className="text-white dark:text-gray-900" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted mt-1">Sign in to continue</p>
        </div>

        <div className="card p-6 space-y-4">
          {error && (
            <div className="px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10
                            text-red-600 dark:text-red-400 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="your_username"
                className="input-field pl-9 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pl-9 text-sm"
                required
              />
            </div>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); dispatch(login(form)); }}
            disabled={loading || !form.username || !form.password}
            className="btn-primary w-full h-10 mt-2"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              : 'Sign In'
            }
          </button>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          No account?{' '}
          <Link to="/signup" className="font-medium text-gray-900 dark:text-gray-100 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
