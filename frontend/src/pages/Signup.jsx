import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup, clearError } from "../features/auth/authSlice";
import { Feather, User, AtSign, Lock } from "lucide-react";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signup(form));
    if (signup.fulfilled.match(result)) navigate("/");
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      icon: User,
      placeholder: "Jane Doe",
      type: "text",
    },
    {
      name: "username",
      label: "Username",
      icon: AtSign,
      placeholder: "jane_doe",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      icon: Lock,
      placeholder: "••••••••",
      type: "password",
      minLength: 6,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0d0d0f]">
      <div className="w-full max-w-sm animate-fade-up">
        {/* Brand */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white
                          items-center justify-center mb-4 shadow-card"
          >
            <Feather size={22} className="text-white dark:text-gray-900" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-muted mt-1">Join Mini Twitter today</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10
                              text-red-600 dark:text-red-400 text-sm animate-fade-in"
              >
                {error}
              </div>
            )}

            {fields.map(
              ({ name, label, icon: Icon, placeholder, type, minLength }) => (
                <div key={name} className="space-y-1">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="input-field pl-9 text-sm"
                      required
                      minLength={minLength}
                    />
                  </div>
                </div>
              ),
            )}

            <button
              type="submit"
              disabled={
                loading || !form.name || !form.username || !form.password
              }
              className="btn-primary w-full h-10 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
