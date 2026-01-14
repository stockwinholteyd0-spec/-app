
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface VideoCallProps {
  user: User;
  onEnd: () => void;
  myAvatar: string;
}

interface FilterEffect {
  id: string;
  name: string;
  cssFilter: string;
  previewColor: string;
}

const FILTERS: FilterEffect[] = [
  { id: 'original', name: '原图', cssFilter: 'none', previewColor: 'bg-slate-200' },
  { id: 'warm', name: '暖阳', cssFilter: 'sepia(0.3) brightness(1.1) saturate(1.2)', previewColor: 'bg-orange-100' },
  { id: 'cool', name: '冷调', cssFilter: 'hue-rotate(180deg) brightness(1.05) saturate(0.9)', previewColor: 'bg-blue-100' },
  { id: 'bw', name: '黑白', cssFilter: 'grayscale(1)', previewColor: 'bg-slate-500' },
  { id: 'vibrant', name: '鲜艳', cssFilter: 'saturate(1.8) contrast(1.1)', previewColor: 'bg-pink-100' },
  { id: 'dreamy', name: '梦幻', cssFilter: 'blur(0.5px) contrast(0.9) brightness(1.1) saturate(1.3)', previewColor: 'bg-purple-100' },
  { id: 'retro', name: '复古', cssFilter: 'sepia(0.5) contrast(1.2) brightness(0.9)', previewColor: 'bg-yellow-200' },
];

const VideoCall: React.FC<VideoCallProps> = ({ user, onEnd, myAvatar }) => {
  const [timer, setTimer] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterEffect>(FILTERS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-full bg-slate-900 overflow-hidden animate-in fade-in duration-700">
      <div className="w-full h-full relative transition-all duration-500" style={{ filter: activeFilter.cssFilter }}>
        <img src={user.avatar} alt="Remote user" className="w-full h-full object-cover scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none"></div>

      <div className="absolute top-16 right-6 w-32 h-44 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 z-30 group active:scale-95 transition-transform">
        <img src={myAvatar} className="w-full h-full object-cover" alt="Me" />
        <div className="absolute bottom-2 left-2 right-2 flex justify-center">
           <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
              <span className="text-[8px] font-bold text-white uppercase tracking-tighter">ME (LIVE)</span>
           </div>
        </div>
      </div>

      <div className="absolute top-16 left-6 flex items-center gap-3 z-30">
        <div className="glass-nav p-1 pr-5 rounded-full flex items-center gap-3 border border-white/20 shadow-xl bg-white/10 backdrop-blur-md">
          <img src={user.avatar} className="w-11 h-11 rounded-full border-2 border-emerald-500 object-cover" />
          <div>
            <div className="flex items-center gap-1.5">
               <h4 className="font-black text-white text-sm">{user.name}</h4>
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-tighter">极速响应中</p>
          </div>
        </div>
      </div>

      <div className="absolute top-32 left-8 z-20">
        <div className="bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-2xl flex items-center gap-2 border border-white/10">
          <span className="text-sm font-black text-white font-mono tracking-widest">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 px-8 flex justify-between items-center z-40">
        <button onClick={() => setShowFilters(!showFilters)} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${showFilters ? 'bg-yellow-400 text-black scale-110 shadow-[0_0_20px_rgba(250,204,21,0.4)]' : 'bg-white/10 backdrop-blur-md text-white border border-white/30'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>

        <div className="flex items-center gap-6">
          <button className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30 active:scale-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </button>
          <button onClick={onEnd} className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(239,68,68,0.4)] active:scale-90 transition-all border-4 border-white/20">
            <svg className="w-10 h-10 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15.46l-5.27-.61-2.52 2.52a15.045 15.045 0 01-6.59-6.59l2.52-2.52-.61-5.27C8.4 2.39 7.74 2 7.06 2H3c-.55 0-1 .45-1 1 0 10.49 8.51 19 19 19 .55 0 1-.45 1-1v-4.06c0-.68-.39-1.34-1.03-1.48z" /></svg>
          </button>
          <button className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30 active:scale-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
        </div>

        <button className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
        </button>
      </div>

      <div className="absolute bottom-40 right-6 flex flex-col gap-4 z-40">
        {['❤️', '🔥', '✨', '👋'].map((emoji, i) => (
          <button key={emoji} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl hover:bg-white/40 active:scale-150 transition-all shadow-lg border border-white/20 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{emoji}</button>
        ))}
      </div>

      {showFilters && (
        <div className="absolute bottom-32 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
           <div className="mx-6 bg-black/60 backdrop-blur-2xl p-5 rounded-[40px] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">实时美颜滤镜</span>
                <button onClick={() => setShowFilters(false)} className="text-white/30 hover:text-white transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x">
                {FILTERS.map(filter => (
                  <button key={filter.id} onClick={() => setActiveFilter(filter)} className="flex flex-col items-center gap-2 flex-shrink-0 group snap-start outline-none">
                    <div className={`relative w-16 h-16 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${activeFilter.id === filter.id ? 'border-emerald-500 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-white/10 group-hover:border-white/30'}`}>
                       <div className={`w-full h-full ${filter.previewColor} opacity-40`}></div>
                       <img src={user.avatar} className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50" style={{ filter: filter.cssFilter }} />
                       {activeFilter.id === filter.id && <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center"><svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg></div>}
                    </div>
                    <span className={`text-[10px] font-black tracking-widest uppercase transition-colors ${activeFilter.id === filter.id ? 'text-emerald-500' : 'text-white/40'}`}>{filter.name}</span>
                  </button>
                ))}
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default VideoCall;
