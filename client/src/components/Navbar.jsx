import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkStyles = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-white/10 text-white"
      : "text-slate-400 hover:bg-white/5 hover:text-white"
  }`;

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-pink to-brand-purple">
            <span className="text-lg font-bold text-white">T</span>
          </div>
          <span className="text-xl font-bold gradient-text">Thumblify</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkStyles} end>Home</NavLink>
          <NavLink to="/generate" className={linkStyles}>Generate</NavLink>
          <NavLink to="/my-generations" className={linkStyles}>My Generations</NavLink>
          <NavLink to="/community" className={linkStyles}>Community</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="rounded-full bg-brand-purple/20 px-3 py-1 text-xs font-semibold text-brand-purple">
                {user?.credits ?? 0} credits
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-gradient-to-r from-brand-pink to-brand-purple px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;