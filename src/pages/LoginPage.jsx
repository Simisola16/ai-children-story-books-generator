import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 bg-parchment-pattern">
      <SEO
        title="Sign In to Your Storybook Library"
        description="Sign in to your AI Storybook Generator account to view your children's profiles, read saved books, and generate new personalized bedtime stories."
        canonical="/login"
      />
      <div className="w-full max-w-md bg-[#FFFDF7] rounded-3xl p-8 sm:p-10 border-4 border-ink shadow-parchment-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-marigold border-2 border-ink flex items-center justify-center mb-3 shadow-sm">
            <BookOpen className="w-7 h-7 text-ink" />
          </div>
          <h2 className="font-display font-black text-3xl text-ink">
            Welcome Back
          </h2>
          <p className="font-sans text-xs font-bold text-charcoal/70 uppercase tracking-wider mt-1">
            Open your magical storybook library
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border-2 border-berry/40 rounded-2xl flex items-start gap-3 text-berry text-sm font-bold">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="parent@example.com"
              className="w-full px-4 py-3 bg-parchment/30 rounded-xl border-2 border-ink/30 focus:border-berry focus:bg-white focus:outline-none font-bold text-sm text-ink transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-parchment/30 rounded-xl border-2 border-ink/30 focus:border-berry focus:bg-white focus:outline-none font-bold text-sm text-ink transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-berry hover:bg-berry-dark text-white font-black text-sm rounded-xl border-2 border-ink shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-marigold" />
            <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-ink/10 text-center">
          <p className="text-sm font-medium text-charcoal/80">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-berry hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
