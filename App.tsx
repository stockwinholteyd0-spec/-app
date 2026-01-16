
import React, { useState, useEffect, useRef } from 'react';
import { AppView, User, MembershipTier, Message } from './types';
import Splash from './components/Splash';
import Login from './components/Login';
import Home from './components/Home';
import Discovery from './components/Discovery';
import MessageList from './components/MessageList';
import Profile from './components/Profile';
import Matching from './components/Matching';
import VideoCall from './components/VideoCall';
import UserDetails from './components/UserDetails';
import ChatRoom from './components/ChatRoom';
import AccountSecurity from './components/AccountSecurity';
import Blacklist from './components/Blacklist';
import Wallet from './components/Wallet';
import Membership from './components/Membership';
import CustomerService from './components/CustomerService';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';
import TeenMode from './components/TeenMode';
import AboutUs from './components/AboutUs';
import BottomNav from './components/BottomNav';
import { MOCK_USERS } from './constants';

// Simple notification sound (Ding)
const NOTIFICATION_SOUND = "data:audio/mp3;base64,//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQxAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.SPLASH);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Notification Settings
  const [notifSettings, setNotifSettings] = useState(() => {
    const saved = localStorage.getItem('appNotifSettings');
    return saved ? JSON.parse(saved) : {
      newMsg: true,
      sound: true,
      vibration: false
    };
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State for Blocked Users (Shielded - cannot message)
  const [shieldedUsers, setShieldedUsers] = useState<string[]>([]);
  // State for Blacklisted Users (Blacklisted - cannot message + hide info)
  const [blacklistedUsers, setBlacklistedUsers] = useState<string[]>([]);

  // Teen Mode State
  const [isTeenMode, setIsTeenMode] = useState(() => {
    return localStorage.getItem('isTeenMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isTeenMode', String(isTeenMode));
  }, [isTeenMode]);

  useEffect(() => {
    localStorage.setItem('appNotifSettings', JSON.stringify(notifSettings));
  }, [notifSettings]);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(NOTIFICATION_SOUND);
  }, []);

  const playNotificationSound = () => {
    if (notifSettings.newMsg && notifSettings.sound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required first)", e));
      
      if (notifSettings.vibration && navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const [myProfile, setMyProfile] = useState(() => {
    const saved = localStorage.getItem('myProfile');
    return saved ? JSON.parse(saved) : {
      name: '阿正',
      avatar: 'https://picsum.photos/seed/myself/300/300',
      photos: [
        'https://picsum.photos/seed/p1/600/800',
        'https://picsum.photos/seed/p2/600/800',
        'https://picsum.photos/seed/p3/600/800',
      ],
      tags: ['音乐', '摄影', '猫派'],
      city: '上海',
      bio: '不喜欢客套，只喜欢在这里和你‘秒回’视频。愿在平行时空遇到有趣的你。✨',
      gender: '男',
      age: 26,
      education: '本科',
      height: '182cm',
      weight: '75kg',
      income: '30W+',
      profession: 'UI设计师',
      isVerified: false,
      isRealName: false,
      isPhoneBound: false
    };
  });

  const [secondCoins, setSecondCoins] = useState(() => {
    const saved = localStorage.getItem('secondCoins');
    return saved ? parseInt(saved, 10) : 1000;
  });

  const [vipTier, setVipTier] = useState<MembershipTier>(() => {
    const saved = localStorage.getItem('vipTier');
    return (saved as MembershipTier) || MembershipTier.NONE;
  });

  const [freeCredits, setFreeCredits] = useState(() => {
    const saved = localStorage.getItem('freeCredits');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [allChats, setAllChats] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('allChats');
    return saved ? JSON.parse(saved) : {};
  });

  const isVip = vipTier !== MembershipTier.NONE;

  useEffect(() => {
    localStorage.setItem('secondCoins', secondCoins.toString());
  }, [secondCoins]);

  useEffect(() => {
    localStorage.setItem('vipTier', vipTier);
  }, [vipTier]);

  useEffect(() => {
    localStorage.setItem('myProfile', JSON.stringify(myProfile));
  }, [myProfile]);

  useEffect(() => {
    localStorage.setItem('allChats', JSON.stringify(allChats));
  }, [allChats]);

  useEffect(() => {
    localStorage.setItem('freeCredits', freeCredits.toString());
  }, [freeCredits]);

  useEffect(() => {
    if (view === AppView.SPLASH) {
      const timer = setTimeout(() => {
        setView(AppView.LOGIN);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Teen Mode Curfew Check (Simulated)
  const checkTeenModeCurfew = () => {
    if (isTeenMode) {
      const hour = new Date().getHours();
      // 22:00 - 06:00 curfew
      if (hour >= 22 || hour < 6) {
        return true;
      }
    }
    return false;
  };
  
  const isCurfew = checkTeenModeCurfew();

  const handleLogout = () => {
    setMatchedUser(null);
    setSelectedUser(null);
    setView(AppView.LOGIN);
  };

  const handleDeleteAccount = () => {
    setMatchedUser(null);
    setSelectedUser(null);
    setSecondCoins(1000);
    setVipTier(MembershipTier.NONE);
    setFreeCredits(5);
    setAllChats({});
    setShieldedUsers([]);
    setBlacklistedUsers([]);
    setIsTeenMode(false);
    localStorage.clear();
    sessionStorage.clear();
    setView(AppView.LOGIN);
  };

  const startMatch = () => {
    if (isTeenMode) {
      alert("青少年模式下无法使用随机匹配功能");
      return;
    }
    if (!isVip && freeCredits <= 0) {
      setView(AppView.WALLET);
      return;
    }
    setView(AppView.MATCHING);
    if (!isVip) {
      setFreeCredits(prev => Math.max(0, prev - 1));
    }
    setTimeout(() => {
      const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
      setMatchedUser(randomUser);
      playNotificationSound(); // Play sound on match found
      setView(AppView.VIDEO_CALL);
    }, 3000);
  };

  const endCall = () => {
    setView(AppView.HOME);
    setMatchedUser(null);
  };

  const openUserDetails = (user: User) => {
    setSelectedUser(user);
    setView(AppView.USER_DETAILS);
  };

  const handleSearch = (query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    // Search by ID (exact) or Name (partial)
    const found = MOCK_USERS.find(u => 
      u.id === cleanQuery || 
      u.name.includes(cleanQuery)
    );

    if (found) {
      openUserDetails(found);
    } else {
      alert("未找到该用户，请检查ID或昵称");
    }
  };

  const openChat = (user: User) => {
    setSelectedUser(user);
    setView(AppView.CHAT);
  };

  const updateChatMessages = (userId: string, messages: Message[]) => {
    setAllChats(prev => ({ ...prev, [userId]: messages }));
  };

  const markAllAsRead = () => {
    setAllChats(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(userId => {
        next[userId] = next[userId].map(msg => ({ ...msg, status: 'read' }));
      });
      return next;
    });
  };

  // Block handlers
  const handleBlockUser = (userId: string) => {
    if (!shieldedUsers.includes(userId)) {
      setShieldedUsers(prev => [...prev, userId]);
    }
  };

  const handleBlacklistUser = (userId: string) => {
    if (!blacklistedUsers.includes(userId)) {
      setBlacklistedUsers(prev => [...prev, userId]);
    }
  };

  const handleUnblockUser = (userId: string) => {
    setShieldedUsers(prev => prev.filter(id => id !== userId));
    setBlacklistedUsers(prev => prev.filter(id => id !== userId));
  };

  // If Teen Mode Curfew is active, block the entire app except settings/unlock
  if (isCurfew && view !== AppView.TEEN_MODE && view !== AppView.SETTINGS) {
    return (
      <div className="relative w-full h-screen max-w-md mx-auto bg-slate-900 text-white overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 text-center">
         <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6">🌙</div>
         <h2 className="text-2xl font-black mb-2">休息时间</h2>
         <p className="text-white/60 text-sm mb-10 leading-relaxed">
           当前为青少年模式宵禁时段 (22:00 - 06:00)。<br/>请放下手机，注意休息。
         </p>
         <button onClick={() => setView(AppView.TEEN_MODE)} className="bg-white text-slate-900 px-8 py-3 rounded-full font-black text-sm active:scale-95 transition-transform">
           关闭青少年模式
         </button>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case AppView.SPLASH: return <Splash />;
      case AppView.LOGIN: return <Login onLogin={() => setView(AppView.HOME)} />;
      case AppView.HOME: return <Home onStartMatch={startMatch} onSelectUser={openUserDetails} onSearch={handleSearch} isVip={isVip} vipTier={vipTier} freeCredits={freeCredits} />;
      case AppView.DISCOVERY: return <Discovery onSelectUser={openUserDetails} />;
      case AppView.MESSAGES: return <MessageList allChats={allChats} onSelectUser={openChat} onMarkAllRead={markAllAsRead} />;
      case AppView.PROFILE:
        return (
          <Profile 
            onOpenSecurity={() => setView(AppView.ACCOUNT_SECURITY)} 
            onOpenBlacklist={() => setView(AppView.BLACKLIST)}
            onOpenWallet={() => setView(AppView.WALLET)}
            onOpenMembership={() => setView(AppView.MEMBERSHIP)}
            onOpenCustomerService={() => setView(AppView.CUSTOMER_SERVICE)}
            onEditProfile={() => setView(AppView.EDIT_PROFILE)}
            onOpenSettings={() => setView(AppView.SETTINGS)}
            onLogout={handleLogout}
            balance={secondCoins}
            isVip={isVip}
            vipTier={vipTier}
            myProfile={myProfile}
            allChats={allChats}
          />
        );
      case AppView.SETTINGS:
        return (
          <Settings 
            onBack={() => setView(AppView.PROFILE)}
            onOpenSecurity={() => setView(AppView.ACCOUNT_SECURITY)}
            onOpenTeenMode={() => setView(AppView.TEEN_MODE)}
            onOpenAboutUs={() => setView(AppView.ABOUT_US)}
            onLogout={handleLogout}
            notifSettings={notifSettings}
            setNotifSettings={setNotifSettings}
          />
        );
      case AppView.TEEN_MODE: 
        return (
          <TeenMode 
            onBack={() => setView(AppView.SETTINGS)} 
            isEnabled={isTeenMode} 
            toggleMode={(val) => setIsTeenMode(val)} 
          />
        );
      case AppView.ABOUT_US: return <AboutUs onBack={() => setView(AppView.SETTINGS)} />;
      case AppView.EDIT_PROFILE:
        return (
          <EditProfile
            myProfile={myProfile}
            onBack={() => setView(AppView.PROFILE)}
            onSave={(updated) => {
              setMyProfile(updated);
              setView(AppView.PROFILE);
            }}
          />
        );
      case AppView.WALLET: 
        return (
          <Wallet 
            balance={secondCoins} 
            onBack={() => setView(AppView.PROFILE)} 
            onRecharge={(amount) => setSecondCoins(prev => prev + amount)} 
            onOpenMembership={() => setView(AppView.MEMBERSHIP)} 
            isTeenMode={isTeenMode}
          />
        );
      case AppView.MEMBERSHIP: return <Membership onBack={() => setView(AppView.PROFILE)} miaCoins={secondCoins} setMiaCoins={setSecondCoins} onBecomeVip={(tier) => setVipTier(tier)} isVip={isVip} currentTier={vipTier} />;
      case AppView.CUSTOMER_SERVICE: return <CustomerService onBack={() => setView(AppView.PROFILE)} />;
      case AppView.ACCOUNT_SECURITY: return <AccountSecurity onBack={() => setView(AppView.SETTINGS)} onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />;
      case AppView.BLACKLIST: 
        const allBlockedIds = Array.from(new Set([...shieldedUsers, ...blacklistedUsers]));
        return <Blacklist blockedUserIds={allBlockedIds} onUnblock={handleUnblockUser} onBack={() => setView(AppView.PROFILE)} />;
      case AppView.MATCHING: return <Matching onCancel={() => setView(AppView.HOME)} />;
      case AppView.VIDEO_CALL: 
        return matchedUser ? (
          <VideoCall 
            user={matchedUser} 
            onEnd={endCall} 
            myAvatar={myProfile.avatar}
            miaCoins={secondCoins}
            setMiaCoins={setSecondCoins}
            isVip={isVip}
          />
        ) : <Home onStartMatch={startMatch} onSelectUser={openUserDetails} onSearch={handleSearch} isVip={isVip} vipTier={vipTier} freeCredits={freeCredits} />;
      case AppView.USER_DETAILS: 
        return selectedUser ? (
          <UserDetails 
            user={selectedUser} 
            onBack={() => setView(AppView.HOME)} 
            onOpenChat={openChat} 
            onStartCall={() => { if (!isVip && freeCredits <= 0) { setView(AppView.WALLET); return; } setMatchedUser(selectedUser); setView(AppView.VIDEO_CALL); }}
            isShielded={shieldedUsers.includes(selectedUser.id)}
            isBlacklisted={blacklistedUsers.includes(selectedUser.id)}
            onShieldUser={handleBlockUser}
            onBlacklistUser={handleBlacklistUser}
            onUnblockUser={handleUnblockUser}
          />
        ) : <Home onStartMatch={startMatch} onSelectUser={openUserDetails} onSearch={handleSearch} isVip={isVip} vipTier={vipTier} freeCredits={freeCredits} />;
      case AppView.CHAT:
        return selectedUser ? (
          <ChatRoom 
            user={selectedUser} 
            onBack={() => setView(AppView.MESSAGES)}
            onStartCall={() => { if (!isVip && freeCredits <= 0) { setView(AppView.WALLET); return; } setMatchedUser(selectedUser); setView(AppView.VIDEO_CALL); }}
            miaCoins={secondCoins}
            setMiaCoins={setSecondCoins}
            onOpenWallet={() => setView(AppView.WALLET)}
            isVip={isVip}
            vipTier={vipTier}
            persistedMessages={allChats[selectedUser.id] || []}
            onMessagesUpdate={(msgs) => updateChatMessages(selectedUser.id, msgs)}
            myAvatar={myProfile.avatar}
            freeCredits={freeCredits}
            setFreeCredits={setFreeCredits}
            onOpenMembership={() => setView(AppView.MEMBERSHIP)}
            isBlocked={shieldedUsers.includes(selectedUser.id) || blacklistedUsers.includes(selectedUser.id)}
            isTeenMode={isTeenMode}
            onPlaySound={playNotificationSound}
          />
        ) : <MessageList allChats={allChats} onSelectUser={openChat} onMarkAllRead={markAllAsRead} />;
      default: return <Home onStartMatch={startMatch} onSelectUser={openUserDetails} onSearch={handleSearch} isVip={isVip} vipTier={vipTier} freeCredits={freeCredits} />;
    }
  };

  const showNav = [AppView.HOME, AppView.DISCOVERY, AppView.MESSAGES, AppView.PROFILE].includes(view);

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-white text-slate-900 overflow-hidden shadow-2xl">
      {renderView()}
      {showNav && <BottomNav activeView={view} setView={setView} />}
    </div>
  );
};

export default App;
