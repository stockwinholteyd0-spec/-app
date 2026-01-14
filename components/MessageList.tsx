
import React from 'react';
import { User, Message } from '../types';
import { MOCK_USERS } from '../constants';

interface MessageListProps {
  allChats: Record<string, Message[]>;
  onSelectUser: (user: User) => void;
  onMarkAllRead?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ allChats, onSelectUser, onMarkAllRead }) => {
  // Extract active conversations
  const chatSessions = Object.entries(allChats)
    .map(([userId, messages]) => {
      // Fix: Cast unknown messages to Message[] to access length and filter
      const msgs = messages as Message[];
      const user = MOCK_USERS.find(u => u.id === userId);
      const lastMsg = msgs[msgs.length - 1];
      const unreadCount = msgs.filter(m => !m.isMe && m.status !== 'read').length;
      return { user, lastMsg, unreadCount };
    })
    .filter(session => session.user && session.lastMsg)
    .sort((a, b) => new Date(b.lastMsg!.timestamp).getTime() - new Date(a.lastMsg!.timestamp).getTime());

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      <div className="pt-14 px-8 pb-4">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">我的消息</h1>
           <button 
            onClick={onMarkAllRead}
            className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
           >
             全部已读
           </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-4">
          <div className="flex flex-col items-center gap-1.5">
             <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
             </div>
             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">动态</span>
          </div>
          {MOCK_USERS.map(user => (
            <div key={user.id} className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => onSelectUser(user)}>
              <div className="w-12 h-12 rounded-full border-2 border-emerald-500 p-0.5">
                <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-[8px] font-bold text-slate-700 uppercase">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-32">
        {chatSessions.length > 0 ? (
          chatSessions.map((session) => (
            <div 
              key={session.user!.id} 
              onClick={() => onSelectUser(session.user!)}
              className="flex items-center gap-4 py-4 border-b border-slate-50 active:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <img src={session.user!.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-100 group-hover:scale-105 transition-transform" />
                {session.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center px-1">
                     <span className="text-[8px] font-black text-white">{session.unreadCount}</span>
                  </div>
                )}
                {session.user!.isOnline && !session.unreadCount && (
                  <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-black text-sm ${session.unreadCount > 0 ? 'text-slate-900' : 'text-slate-700'}`}>{session.user!.name}</span>
                    {session.unreadCount > 0 && (
                      <span className="bg-emerald-50 text-emerald-500 text-[7px] px-1.5 py-0.5 rounded-lg font-black uppercase tracking-widest">秒回中</span>
                    )}
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">
                    {new Date(session.lastMsg!.timestamp).getHours()}:{new Date(session.lastMsg!.timestamp).getMinutes().toString().padStart(2, '0')}
                  </span>
                </div>
                <p className={`text-[11px] truncate max-w-[160px] leading-none ${session.unreadCount > 0 ? 'text-slate-900 font-black' : 'text-slate-500 font-medium'}`}>
                  {session.lastMsg!.text}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
             <div className="text-4xl mb-4">💬</div>
             <p className="text-[10px] font-black uppercase tracking-widest">暂无聊天记录，快去匹配吧</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
