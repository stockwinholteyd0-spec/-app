
import React, { useState, useRef } from 'react';
import { INTEREST_TAGS } from '../constants';

interface EditProfileProps {
  myProfile: any;
  onBack: () => void;
  onSave: (updatedProfile: any) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ myProfile, onBack, onSave }) => {
  const [form, setForm] = useState(myProfile);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();
  const handlePhotoAddClick = () => photoInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isAvatar: boolean) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (isAvatar) {
          setForm({ ...form, avatar: base64 });
        } else {
          setForm({ ...form, photos: [...form.photos, base64] });
        }
        showToast(isAvatar ? '头像已更新' : '照片已添加');
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePhoto = (idx: number) => {
    const nextPhotos = [...form.photos];
    nextPhotos.splice(idx, 1);
    setForm({ ...form, photos: nextPhotos });
  };

  const toggleTag = (tag: string) => {
    const currentTags = form.tags || [];
    if (currentTags.includes(tag)) {
        setForm({ ...form, tags: currentTags.filter((t: string) => t !== tag) });
    } else {
        if (currentTags.length >= 8) {
             showToast('最多选择8个标签');
             return;
        }
        setForm({ ...form, tags: [...currentTags, tag] });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] pb-10 overflow-hidden animate-in slide-in-from-right duration-300 relative">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl">{toast}</div>
        </div>
      )}

      <header className="pt-14 px-6 pb-4 glass-nav sticky top-0 z-30 flex items-center justify-between border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 active:bg-slate-100"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg></button>
          <h1 className="text-lg font-black text-slate-900">编辑个人资料</h1>
        </div>
        <button onClick={() => onSave(form)} className="px-5 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest">保存</button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32 no-scrollbar space-y-10">
        {/* Avatar Section */}
        <section className="flex flex-col items-center gap-4">
           <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <img src={form.avatar} className="w-24 h-24 rounded-[32px] object-cover shadow-xl border-4 border-white" />
              <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e, true)} className="hidden" accept="image/*" />
           </div>
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">更换主头像</p>
        </section>

        {/* Basic Fields */}
        <div className="space-y-6">
           <div className="px-2">
             <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm space-y-2">
                <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">昵称</label>
                   <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">个性签名</label>
                   <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none min-h-[60px] resize-none" />
                </div>
             </div>
           </div>
        </div>

        {/* Tags Selection */}
        <section className="px-2">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-4">我的兴趣标签</h3>
           <div className="flex flex-wrap gap-2">
              {INTEREST_TAGS.map(tag => {
                  const isSelected = (form.tags || []).includes(tag);
                  return (
                      <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              isSelected 
                              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                              : 'bg-white text-slate-500 border border-slate-100'
                          }`}
                      >
                          {tag}
                      </button>
                  )
              })}
           </div>
        </section>

        {/* Photos Management */}
        <section className="px-2">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic mb-4">我的照片管理</h3>
           <div className="grid grid-cols-4 gap-2">
              {form.photos.map((url: string, idx: number) => (
                <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                   <img src={url} className="w-full h-full object-cover" />
                   <button onClick={() => deletePhoto(idx)} className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>
              ))}
              <button onClick={handlePhotoAddClick} className="aspect-[3/4] rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" /></svg>
                 <input type="file" ref={photoInputRef} onChange={(e) => handleFileChange(e, false)} className="hidden" accept="image/*" />
              </button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;
