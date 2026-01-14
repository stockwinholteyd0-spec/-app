
import React, { useState, useRef } from 'react';

interface EditProfileProps {
  myProfile: any;
  onBack: () => void;
  onSave: (updatedProfile: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ myProfile, onBack, onSave }) => {
  const [form, setForm] = useState(myProfile);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('请选择图片文件');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setForm({ ...form, avatar: base64 });
        showToast('头像已更新');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] pb-10 overflow-hidden animate-in slide-in-from-right duration-300 relative">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">
            {toast}
          </div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center justify-between border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-black text-slate-900">编辑个人资料</h1>
        </div>
        <button onClick={() => onSave(form)} className="px-5 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform">
          保存
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32 no-scrollbar space-y-10">
        {/* Avatar Section */}
        <section className="flex flex-col items-center gap-6">
           <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <img src={form.avatar} className="w-32 h-32 rounded-[48px] object-cover shadow-2xl border-4 border-white group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 bg-black/20 rounded-[48px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-xl active:scale-90 transition-transform group-hover:bg-emerald-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">点击头像上传本地照片</p>
        </section>

        {/* Basic Fields */}
        <div className="space-y-6">
           <div className="px-2">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-4">核心展示</h3>
             <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm space-y-2">
                <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">昵称</label>
                   <input 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="给自己起个好听的名字"
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none" 
                   />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">个性签名</label>
                   <textarea 
                    value={form.bio} 
                    onChange={e => setForm({...form, bio: e.target.value})}
                    placeholder="用一句话介绍你自己..."
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none min-h-[60px] resize-none" 
                   />
                </div>
             </div>
           </div>

           <div className="px-2">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-4">详细资料</h3>
             <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm grid grid-cols-2 gap-2">
                {[
                  { k: 'age', l: '年龄', i: '🎂', type: 'number' },
                  { k: 'city', l: '所在城市', i: '📍', type: 'text' },
                  { k: 'height', l: '身高', i: '📏', type: 'text' },
                  { k: 'weight', l: '体重', i: '⚖️', type: 'text' },
                  { k: 'education', l: '学历', i: '🎓', type: 'text' },
                  { k: 'income', l: '年收入', i: '💰', type: 'text' },
                  { k: 'profession', l: '职业', i: '💼', type: 'text' },
                  { k: 'gender', l: '性别', i: '⚧️', type: 'text' },
                ].map(item => (
                  <div key={item.k} className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-lg">{item.i}</span>
                    <div className="flex-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">{item.l}</p>
                      <input 
                        type={item.type}
                        value={(form as any)[item.k]}
                        onChange={e => setForm({...form, [item.k]: e.target.value})}
                        className="bg-transparent text-xs font-bold text-slate-800 w-full outline-none"
                      />
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
