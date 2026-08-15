import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, Users, Library, LogOut, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-[#2E1F3D]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-marigold to-berry p-0.5 shadow-md group-hover:scale-105 transition-transform border-2 border-ink">
              <div className="w-full h-full bg-parchment rounded-[14px] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-ink group-hover:text-berry transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl text-ink tracking-tight flex items-center gap-1.5">
                StoryTale <Sparkles className="w-4 h-4 text-marigold fill-marigold inline" />
              </span>
              <span className="block text-[11px] font-extrabold uppercase tracking-widest text-berry -mt-1">
                Picture Book Studio
              </span>
            </div>
          </Link>

          {/* Nav Items */}
          {isAuthenticated ? (
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/dashboard')
                    ? 'bg-parchment-dark text-ink border border-ink/20 shadow-inner'
                    : 'text-ink/80 hover:text-ink hover:bg-parchment/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-marigold-dark" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                to="/library"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/library')
                    ? 'bg-parchment-dark text-ink border border-ink/20 shadow-inner'
                    : 'text-ink/80 hover:text-ink hover:bg-parchment/60'
                }`}
              >
                <Library className="w-4 h-4 text-berry" />
                <span className="hidden sm:inline">Bookshelf</span>
              </Link>

              <Link
                to="/children"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/children')
                    ? 'bg-parchment-dark text-ink border border-ink/20 shadow-inner'
                    : 'text-ink/80 hover:text-ink hover:bg-parchment/60'
                }`}
              >
                <Users className="w-4 h-4 text-meadow" />
                <span className="hidden sm:inline">Children</span>
              </Link>

              {/* Create Story CTA Button */}
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2.5 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-ink" />
                <span>New Story</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-2 text-ink/60 hover:text-berry hover:bg-parchment rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </nav>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-ink font-bold text-sm hover:text-berry transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-berry hover:bg-berry-dark text-white font-bold text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
