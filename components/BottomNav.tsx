
import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  activeView: AppView;
  setView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
  const items = [
    { view: AppView.HOME, icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { view: AppView.DISCOVERY, icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { view: AppView.MESSAGES, icon: (active: boolean) => (
      <div className="relative">
        <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {!active && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border-2 border-white"></span>}
      </div>
    )},
    { view: AppView.PROFILE, icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-12 pb-6">
      <div className="glass-nav rounded-full px-6 py-2 flex justify-between items-center shadow-lg border border-slate-200/50">
        {items.map(item => {
          const isActive = activeView === item.view;
          return (
            <button 
              key={item.view}
              onClick={() => setView(item.view)}
              className={`relative flex items-center justify-center w-10 h-10 transition-all ${isActive ? 'text-emerald-500 scale-110' : 'text-slate-400 active:scale-90'}`}
            >
              {item.icon(isActive)}
              {isActive && (
                <div className="absolute -bottom-0.5 w-1 h-1 bg-emerald-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
