import { useState } from 'react';
import Modal from './Modal';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fillDemoCredentials = (type) => {
    if (type === 'retail') {
      setEmail('trader.demo@zevoriq.com');
      setPassword('ZevoriqTrade2026!');
      setName('Alex Mercer');
    } else {
      setEmail('desk.capital@zevoriq.com');
      setPassword('InstitutionalAlpha99!');
      setName('Morgan Vance (Desk Head)');
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    if (mode === 'signup' && !name) {
      setError('Please provide your full legal name.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: name || (email.split('@')[0]),
        email: email,
        accountType: email.includes('desk') ? 'Institutional Tier' : 'Pro Trader Tier',
        avatar: (name ? name[0] : email[0]).toUpperCase(),
      });
      onClose();
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span>{mode === 'login' ? 'Access Trading Terminal' : 'Open Institutional Account'}</span>
        </span>
      }
      maxWidth="max-w-md"
    >
      {/* Mode Switch Tabs */}
      <div className="flex bg-slate-900/80 p-1 rounded-xl mb-6 border border-slate-800">
        <button
          type="button"
          onClick={() => { setMode('login'); setError(''); }}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            mode === 'login'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => { setMode('signup'); setError(''); }}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            mode === 'signup'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Quick Demo Autofill Bar */}
      <div className="mb-5 p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-300 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Quick Demo Autofill:
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemoCredentials('retail')}
            className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-left border border-slate-700 transition"
          >
            Pro Trader Account
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials('institutional')}
            className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-left border border-slate-700 transition"
          >
            Institutional Desk
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@zevoriq.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Password
            </label>
            {mode === 'login' && (
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset link has been dispatched to your email.');
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition"
              >
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition transform active:scale-98 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{mode === 'login' ? 'Sign In to Trade' : 'Activate Trading Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-500 mt-4 leading-normal">
          By continuing, you agree to Zevoriq Capital’s Terms of Market Execution and Privacy Safeguard Protocol.
        </p>
      </form>
    </Modal>
  );
}
