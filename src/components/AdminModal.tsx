import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Lock, 
  LogOut, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit2, 
  FolderGit2, 
  User, 
  Mail, 
  Briefcase, 
  Award,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { ProjectItem, ExperienceItem, CertificationItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { 
    locale, 
    data, 
    isAdmin, 
    messages, 
    loginAdmin, 
    logoutAdmin, 
    updateData, 
    resetToDefaults, 
    exportDataJSON, 
    importDataJSON,
    deleteMessage
  } = usePortfolio();

  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'inbox' | 'backup'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Temporary edit states
  const [editProfile, setEditProfile] = useState(data.profile);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setAuthError('');
      setPassword('');
      setEditProfile(data.profile);
    } else {
      setAuthError(locale === 'ar' ? 'كلمة المرور غير صحيحة.' : 'Invalid password.');
    }
  };

  const handleSaveProfile = () => {
    updateData({
      ...data,
      profile: editProfile
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dhiaa-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (importDataJSON(text)) {
          alert(locale === 'ar' ? 'تم استيراد البيانات وتحديث الموقع بنجاح!' : 'Data imported successfully!');
        } else {
          alert(locale === 'ar' ? 'فشل استيراد الملف. تأكد من صحة تنسيق JSON.' : 'Failed to import JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm(locale === 'ar' ? 'هل أنت متأكد من حذف هذا المشروع؟' : 'Are you sure you want to delete this project?')) {
      const updated = data.projects.filter(p => p.id !== id);
      updateData({ ...data, projects: updated });
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'لوحة إدارة المحتوى والتحكم (CMS)' : 'Content Management Dashboard'}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {locale === 'ar' ? 'المالك: م. ضياء الحميري' : 'Owner: Eng. Dhiaa Al-Hmiri'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', color: '#EF4444' }}
              >
                <LogOut size={16} />
                <span>{locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.45rem', borderRadius: '50%' }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content depending on Auth Status */}
        {!isAdmin ? (
          <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center' }}>
            <Lock size={44} color="var(--accent)" style={{ margin: '0 auto 1.25rem' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {locale === 'ar' ? 'تسجيل الدخول للوحة التحكم' : 'Owner Admin Authentication'}
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {locale === 'ar' 
                ? 'أدخل كلمة المرور الخاصة بإدارة وتحديث بيانات موقعك.' 
                : 'Enter your administrative password to manage site content.'}
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={locale === 'ar' ? 'كلمة المرور...' : 'Password...'}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
            </div>

            {authError && (
              <div style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {authError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <span>{locale === 'ar' ? 'دخول لوحة التحكم' : 'Sign In'}</span>
            </button>
          </form>
        ) : (
          <div>
            {/* Admin Tabs */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.75rem',
                marginBottom: '1.75rem'
              }}
            >
              <button
                onClick={() => setActiveTab('profile')}
                className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}
              >
                <User size={16} />
                <span>{locale === 'ar' ? 'البيانات الشخصية' : 'Profile'}</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}
              >
                <FolderGit2 size={16} />
                <span>{locale === 'ar' ? 'إدارة المشاريع' : 'Projects'}</span>
              </button>

              <button
                onClick={() => setActiveTab('inbox')}
                className={`btn ${activeTab === 'inbox' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.88rem', position: 'relative' }}
              >
                <Mail size={16} />
                <span>{locale === 'ar' ? 'صندوق الرسائل' : 'Inbox'}</span>
                {messages.length > 0 && (
                  <span className="badge" style={{ backgroundColor: '#10B981', color: '#FFF', padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                    {messages.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`btn ${activeTab === 'backup' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}
              >
                <Download size={16} />
                <span>{locale === 'ar' ? 'النسخ الاحتياطي والبيانات' : 'Backup & Data'}</span>
              </button>
            </div>

            {/* TAB 1: Profile Editor */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {saveSuccess && (
                  <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <CheckCircle2 size={18} />
                    <span>{locale === 'ar' ? 'تم حفظ التعديلات بنجاح في النظام!' : 'Profile updated successfully!'}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      الاسم بالعربية
                    </label>
                    <input 
                      type="text"
                      value={editProfile.name.ar}
                      onChange={(e) => setEditProfile({ ...editProfile, name: { ...editProfile.name, ar: e.target.value } })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Name in English
                    </label>
                    <input 
                      type="text"
                      value={editProfile.name.en}
                      onChange={(e) => setEditProfile({ ...editProfile, name: { ...editProfile.name, en: e.target.value } })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      المسمى الوظيفي بالعربية
                    </label>
                    <input 
                      type="text"
                      value={editProfile.title.ar}
                      onChange={(e) => setEditProfile({ ...editProfile, title: { ...editProfile.title, ar: e.target.value } })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Title in English
                    </label>
                    <input 
                      type="text"
                      value={editProfile.title.en}
                      onChange={(e) => setEditProfile({ ...editProfile, title: { ...editProfile.title, en: e.target.value } })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رقم الهاتف / واتساب
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value, whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      البريد الإلكتروني
                    </label>
                    <input 
                      type="email"
                      dir="ltr"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رابط GitHub
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.github}
                      onChange={(e) => setEditProfile({ ...editProfile, github: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    الملخص المهني (العربية)
                  </label>
                  <textarea 
                    rows={3}
                    value={editProfile.shortBio.ar}
                    onChange={(e) => setEditProfile({ ...editProfile, shortBio: { ...editProfile.shortBio, ar: e.target.value } })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                  />
                </div>

                <button onClick={handleSaveProfile} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <Save size={18} />
                  <span>{locale === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}</span>
                </button>
              </div>
            )}

            {/* TAB 2: Projects Manager */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {locale === 'ar' ? 'قائمة المشاريع المنشورة' : 'Current Published Projects'} ({data.projects.length})
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {data.projects.map((proj) => (
                    <div 
                      key={proj.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img 
                          src={proj.coverImage} 
                          alt="" 
                          style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {proj.title[locale]}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {proj.categoryLabel[locale]} • {proj.status}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem' }}>
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button 
                          onClick={() => handleDeleteProject(proj.id)}
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', color: '#EF4444' }}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Contact Messages / Inbox */}
            {activeTab === 'inbox' && (
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                  {locale === 'ar' ? 'رسائل الزوار ونماذج الاتصال' : 'Visitor Messages & Inquiries'} ({messages.length})
                </h4>

                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--text-muted)' }}>
                    <Mail size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                    <p>{locale === 'ar' ? 'لا توجد رسائل واردة حالياً.' : 'No messages received yet.'}</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map((m) => (
                      <div 
                        key={m.id}
                        style={{
                          padding: '1.25rem',
                          backgroundColor: 'var(--bg-main)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{m.name}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--accent)' }}>{m.email}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="badge">{m.category}</span>
                            <button 
                              onClick={() => deleteMessage(m.id)}
                              className="btn btn-secondary"
                              style={{ padding: '0.25rem 0.5rem', color: '#EF4444' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                          {m.message}
                        </p>

                        <div style={{ display: 'flex', gap: '0.65rem' }}>
                          <a href={`mailto:${m.email}?subject=Re: Inquiry`} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                            <Mail size={14} />
                            <span>{locale === 'ar' ? 'رد عبر الإيميل' : 'Reply via Email'}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Backup & Reset */}
            {activeTab === 'backup' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {locale === 'ar' ? 'تصدير نسخة احتياطية من الموقع' : 'Export Full Portfolio Data'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {locale === 'ar' 
                      ? 'قم بتحميل ملف JSON يحتوي على كامل نصوص ومشاريع وخبرات موقعك للاحتفاظ به أو نقله.'
                      : 'Download a complete JSON snapshot of all your portfolio content.'}
                  </p>
                  <button onClick={handleExport} className="btn btn-primary">
                    <Download size={18} />
                    <span>{locale === 'ar' ? 'تصدير ملف النسخة الاحتياطية (JSON)' : 'Download JSON Backup'}</span>
                  </button>
                </div>

                <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {locale === 'ar' ? 'استيراد نسخة احتياطية' : 'Restore from JSON Backup'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {locale === 'ar' 
                      ? 'حدد ملف JSON تم تصديره مسبقاً لاستعادة البيانات فوراً.'
                      : 'Select a previously exported JSON backup file to restore content.'}
                  </p>
                  <label className="btn btn-secondary" style={{ display: 'inline-flex', cursor: 'pointer' }}>
                    <Upload size={18} />
                    <span>{locale === 'ar' ? 'اختيار ملف الاستيراد' : 'Choose JSON File'}</span>
                    <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
                  </label>
                </div>

                <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#EF4444', marginBottom: '0.5rem' }}>
                    {locale === 'ar' ? 'إعادة التعيين لبيانات المصنع الأصلية' : 'Reset to Original Data'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {locale === 'ar' 
                      ? 'يعيد ضبط كافة بيانات الموقع ومشاريع GitHub إلى القيم الأولية المعتمدة في خطة المشروع.'
                      : 'Resets all portfolio content back to the verified initial specification state.'}
                  </p>
                  <button 
                    onClick={() => {
                      if (confirm(locale === 'ar' ? 'هل أنت متأكد من رغبتك في إعادة التعيين الأصلية؟' : 'Are you sure you want to reset all data?')) {
                        resetToDefaults();
                        alert(locale === 'ar' ? 'تمت إعادة تعيين البيانات بنجاح.' : 'Data reset successfully.');
                      }
                    }} 
                    className="btn btn-secondary" 
                    style={{ color: '#EF4444' }}
                  >
                    <RotateCcw size={18} />
                    <span>{locale === 'ar' ? 'إعادة التعيين للبيانات الأصلية' : 'Reset to Factory Defaults'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
