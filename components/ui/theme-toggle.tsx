"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';
const storageKey = 'portfolio-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById('theme-switch-slot'));
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(storageKey); } catch { /* Storage may be blocked. */ }
      const next = saved === 'light' || saved === 'dark' ? saved : system.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };
    sync();
    system.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => {
      system.removeEventListener('change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Switching still works without storage. */ }
  };

  if (!slot) return null;
  return createPortal(
    <button type="button" onClick={toggle} className="theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
      <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>, slot,
  );
}
