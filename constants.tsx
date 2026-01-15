
import React from 'react';
import { Gift, RechargePackage, MembershipPackage, MembershipTier, User } from './types';

export const COLORS = {
  green: '#10b981',
  yellow: '#ffde00',
  dark: '#0c0c0c',
  gray: '#1f1f1f',
  gold: '#d4af37'
};

export const INTEREST_TAGS = [
  '音乐', '摄影', '旅行', '美食', '健身', 
  '游戏', '阅读', '电影', '猫派', '狗派', 
  '艺术', '时尚', '科技', '二次元', '剧本杀',
  'K歌', '咖啡', '露营', '瑜伽', '发呆'
];

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: '林苏',
    age: 22,
    city: '上海',
    avatar: 'https://picsum.photos/seed/user1/400/600',
    isOnline: true,
    tags: ['音乐', '摄影', '猫派'],
    responseRate: '99%',
    bio: '想遇到一个灵魂有趣的人，一起看日落。',
    gender: '女',
    education: '硕士',
    height: '168cm',
    weight: '48kg',
    income: '20W+',
    profession: '插画师'
  },
  {
    id: '2',
    name: '陈若熙',
    age: 24,
    city: '杭州',
    avatar: 'https://picsum.photos/seed/user2/400/600',
    isOnline: true,
    tags: ['运动', '旅游', '吃货'],
    responseRate: '100%',
    bio: '生活不是为了工作，是为了看世界。',
    gender: '女',
    education: '本科',
    height: '165cm',
    weight: '50kg',
    income: '15W+',
    profession: '空乘'
  },
  {
    id: '3',
    name: '夏语星',
    age: 21,
    city: '成都',
    avatar: 'https://picsum.photos/seed/user3/400/600',
    isOnline: true,
    tags: ['游戏', '动漫', '二次元'],
    responseRate: '98%',
    bio: '希望你也喜欢原神和周杰伦！',
    gender: '女',
    education: '在大专',
    height: '162cm',
    weight: '45kg',
    income: '保密',
    profession: '自由职业'
  },
  {
    id: '4',
    name: '陆清漪',
    age: 23,
    city: '北京',
    avatar: 'https://picsum.photos/seed/user4/400/600',
    isOnline: true,
    tags: ['职场', '读书', '健身'],
    responseRate: '97%',
    bio: '在这个喧嚣的城市，寻找一份宁静。',
    gender: '女',
    education: '本科',
    height: '172cm',
    weight: '52kg',
    income: '40W+',
    profession: '金融分析师'
  }
];

export const MOCK_GIFTS: Gift[] = [
  { id: 'g1', name: '玫瑰', icon: '🌹', price: 1, category: 'POPULAR' },
  { id: 'g2', name: '爱心', icon: '❤️', price: 5, category: 'POPULAR' },
  { id: 'g3', name: '棒棒糖', icon: '🍭', price: 10, category: 'POPULAR' },
  { id: 'g8', name: '独角兽', icon: '🦄', price: 66, category: 'POPULAR' },
  { id: 'g4', name: '钻戒', icon: '💍', price: 199, category: 'LUXURY' },
  { id: 'g5', name: '跑车', icon: '🏎️', price: 520, category: 'LUXURY' },
  { id: 'g6', name: '火箭', icon: '🚀', price: 1314, category: 'LUXURY' },
  { id: 'g7', name: '心动烟花', icon: '🎆', price: 188, category: 'SPECIAL' },
  { id: 'g9', name: '皇冠', icon: '👑', price: 299, category: 'SPECIAL' },
  { id: 'g10', name: '城堡', icon: '🏰', price: 2000, category: 'LUXURY' },
  { id: 'g11', name: '干杯', icon: '🍻', price: 20, category: 'POPULAR' },
  { id: 'g12', name: '流星', icon: '💫', price: 88, category: 'SPECIAL' },
];

export const MOCK_RECHARGE_PACKAGES: RechargePackage[] = [
  { id: 'p1', coins: 60, price: 6 },
  { id: 'p2', coins: 300, price: 30 },
  { id: 'p3', coins: 680, price: 68, isHot: true },
  { id: 'p4', coins: 1280, price: 128 },
  { id: 'p5', coins: 3280, price: 328 },
  { id: 'p6', coins: 6480, price: 648 },
];

export const MOCK_MEMBERSHIP_PACKAGES: MembershipPackage[] = [
  { 
    id: 'm1', 
    name: '月度会员', 
    duration: '1个月', 
    price: 30, 
    originalPrice: 45,
    tier: MembershipTier.BASIC,
    benefits: ['基础VIP标识', 'HD视频通话', '礼物95折优惠', '优先匹配(30%)']
  },
  { 
    id: 'm2', 
    name: '季度会员', 
    duration: '3个月', 
    price: 68, 
    originalPrice: 135, 
    isBestValue: true,
    tier: MembershipTier.PRO,
    benefits: ['黄金VIP标识', 'HD视频通话', '礼物85折优惠', '不限次匹配', '隐身模式', '优先匹配(100%)']
  },
  { 
    id: 'm3', 
    name: '年度会员', 
    duration: '12个月', 
    price: 198, 
    originalPrice: 540,
    tier: MembershipTier.ELITE,
    benefits: ['铂金至尊标识', '4K极致画质', '礼物8折优惠', '独家精英礼物', '瞬间匹配(300%)', '专属管家服务']
  },
];

export const LightningIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 10V3L4 14H11V21L20 10H13Z" />
  </svg>
);

export const VipBadge = ({ className, tier = MembershipTier.BASIC }: { className?: string, tier?: MembershipTier }) => {
  const gradients = {
    [MembershipTier.NONE]: '',
    [MembershipTier.BASIC]: 'from-amber-400 to-amber-600',
    [MembershipTier.PRO]: 'from-emerald-400 to-emerald-600',
    [MembershipTier.ELITE]: 'from-purple-500 to-indigo-600',
  };
  
  return (
    <div className={`bg-gradient-to-r ${gradients[tier]} px-1.5 py-0.5 rounded-md text-white text-[7px] font-black italic shadow-sm flex items-center gap-0.5 ${className}`}>
      <span>VIP</span>
    </div>
  );
};
