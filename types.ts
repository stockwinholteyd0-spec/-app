
export enum AppView {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  DISCOVERY = 'DISCOVERY',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
  MATCHING = 'MATCHING',
  VIDEO_CALL = 'VIDEO_CALL',
  USER_DETAILS = 'USER_DETAILS',
  CHAT = 'CHAT',
  ACCOUNT_SECURITY = 'ACCOUNT_SECURITY',
  BLACKLIST = 'BLACKLIST',
  WALLET = 'WALLET',
  MEMBERSHIP = 'MEMBERSHIP',
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
  EDIT_PROFILE = 'EDIT_PROFILE',
  SETTINGS = 'SETTINGS'
}

export enum MembershipTier {
  NONE = 'NONE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  ELITE = 'ELITE'
}

export interface User {
  id: string;
  name: string;
  age: number;
  city: string;
  avatar: string;
  isOnline: boolean;
  tags: string[];
  responseRate: string;
  isVip?: boolean;
  vipTier?: MembershipTier;
  // Detailed Profile Fields
  bio: string;
  gender: string;
  education: string;
  height: string;
  weight: string;
  income: string;
  profession: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
  status?: 'sending' | 'sent' | 'read';
  isRecalled?: boolean;
  giftId?: string; 
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number;
  category?: 'POPULAR' | 'LUXURY' | 'SPECIAL';
}

export interface RechargePackage {
  id: string;
  coins: number;
  price: number;
  isHot?: boolean;
}

export interface MembershipPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice: number;
  isBestValue?: boolean;
  tier: MembershipTier;
  benefits: string[];
}
