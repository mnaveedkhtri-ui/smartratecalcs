'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('smartrate_theme');
    const isDark =
      saved === 'dark' ||
      (!saved && document.documentElement.classList.contains('dark'));

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('smartrate_theme', newTheme);
    setTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative inline-flex items-center justify-center gap-2 p-2 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
        theme === 'dark'
          ? 'bg-slate-800/90 hover:bg-slate-700 text-amber-400 border border-slate-700/80 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'dark' ? (
          <i className="fa-solid fa-sun text-sm sm:text-base text-amber-400 transform transition-transform duration-300 rotate-0 group-hover:rotate-45" />
        ) : (
          <i className="fa-solid fa-moon text-sm sm:text-base text-slate-700 transform transition-transform duration-300 -rotate-12 group-hover:rotate-0" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none font-mono">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
