import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Users,
  Library,
  LogOut,
  PlusCircle,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-[#2E1F3D]/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-marigold to-berry p-0.5 shadow-md group-hover:scale-105 transition-transform border-2 border-ink">
              <div className="w-full h-full bg-parchment rounded-[14px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-ink group-hover:text-berry transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-display font-black text-xl sm:text-2xl text-ink tracking-tight flex items-center gap-1">
                StoryTale <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-marigold fill-marigold inline" />
              </span>
              <span className="block text-[9px] sm:text-[11px] font-extrabold uppercase tracking-widest text-berry -mt-1">
                Picture Book Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('/dashboard')
                    ? 'bg-parchment-dark text-ink border border-ink/20 shadow-inner'
                    : 'text-ink/80 hover:text-ink hover:bg-parchment/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-marigold-dark" />
                <span>Dashboard</span>
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
                <span>Bookshelf</span>
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
                <span>Children</span>
              </Link>

              {/* Create Story CTA Button */}
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2 bg-marigold hover:bg-marigold-dark text-ink font-black text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-ink" />
                <span>New Story</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-2 text-ink/60 hover:text-berry hover:bg-parchment rounded-xl transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile Right Controls: Fast Action + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center gap-1 px-3 py-1.5 bg-marigold text-ink font-black text-xs rounded-xl border-2 border-ink shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl border-2 border-ink/20 bg-parchment/60 text-ink hover:bg-parchment transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-berry" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-ink font-bold text-xs hover:text-berry"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 bg-berry text-white font-bold text-xs rounded-xl border-2 border-ink shadow-sm"
                >
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu for Authenticated Users */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-ink/10 bg-[#FFFDF7] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-ink/10">
            <span className="text-xs font-bold text-charcoal/70">
              Signed in as <strong className="text-ink font-black">{user?.name || 'Parent'}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 p-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                isActive('/dashboard')
                  ? 'bg-parchment-dark border-ink text-ink shadow-inner'
                  : 'bg-parchment/30 border-ink/15 text-ink'
              }`}
            >
              <BookOpen className="w-5 h-5 text-marigold-dark shrink-0" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 p-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                isActive('/library')
                  ? 'bg-parchment-dark border-ink text-ink shadow-inner'
                  : 'bg-parchment/30 border-ink/15 text-ink'
              }`}
            >
              <Library className="w-5 h-5 text-berry shrink-0" />
              <span>Bookshelf</span>
            </Link>

            <Link
              to="/children"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 p-3 rounded-2xl text-sm font-bold border-2 transition-all ${
                isActive('/children')
                  ? 'bg-parchment-dark border-ink text-ink shadow-inner'
                  : 'bg-parchment/30 border-ink/15 text-ink'
              }`}
            >
              <Users className="w-5 h-5 text-meadow shrink-0" />
              <span>Children</span>
            </Link>

            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-2xl text-sm font-black bg-marigold text-ink border-2 border-ink shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-ink shrink-0" />
              <span>New Story</span>
            </Link>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-berry hover:bg-rose-100 font-bold text-sm rounded-xl border border-berry/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
