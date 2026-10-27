import React, { useState } from 'react';
import { usePortfolio, AVAILABLE_FONTS, THEME_COLOR_PRESETS } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Save, 
  Trash2, 
  Plus, 
  Edit3, 
  FolderGit2, 
  Image as ImageIcon, 
  Palette, 
  Type, 
  User, 
  Mail, 
  Download, 
  Upload, 
  CheckCircle2, 
  RotateCcw,
  LogOut,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const { 
    locale, 
    theme,
    setTheme,
    data, 
    isAdmin, 
    messages,
    currentFont,
    setFont,
    setThemeColor,
    loginAdmin, 
    logoutAdmin, 
    updateData, 
    addProject,
    updateProject,
    deleteProject,
    resetToDefaults, 
    exportDataJSON, 
    importDataJSON,
    deleteMessage
  } = usePortfolio();

  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'images' | 'appearance' | 'profile' | 'inbox' | 'backup'>('projects');
  const [saveSuccess, setSaveSuccess] = useState('');

  // Profile temporary edit state
  const [editProfile, setEditProfile] = useState(data.profile);

  // Images temporary edit state
  const [editImages, setEditImages] = useState({
    heroImage: data.heroImage,
    avatarImage: data.avatarImage,
    aboutImage: data.aboutImage
  });

  // Project editing state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Project form fields
  const [projForm, setProjForm] = useState<Partial<ProjectItem>>({
    id: '',
    slug: '',
    title: { ar: '', en: '' },
    summary: { ar: '', en: '' },
    description: { ar: '', en: '' },
    category: 'mobile',
    categoryLabel: { ar: 'تطبيقات الجوال', en: 'Mobile Apps' },
    tags: [],
    githubUrl: '',
    demoUrl: '',
    coverImage: './images/projects/hisabi-cover.webp',
    isFeatured: true,
    status: 'Production',
    highlights: { ar: [], en: [] }
  });

  const [tagsInput, setTagsInput] = useState('');
  const [highlightsArInput, setHighlightsArInput] = useState('');
  const [highlightsEnInput, setHighlightsEnInput] = useState('');

  const BackArrow = locale === 'ar' ? ArrowRight : ArrowLeft;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setAuthError('');
      setPassword('');
      setEditProfile(data.profile);
      setEditImages({
        heroImage: data.heroImage,
        avatarImage: data.avatarImage,
        aboutImage: data.aboutImage
      });
    } else {
      setAuthError(locale === 'ar' ? 'كلمة المرور غير صحيحة.' : 'Invalid password.');
    }
  };

  const showNotification = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveProfile = () => {
    updateData({
      ...data,
      profile: editProfile
    });
    showNotification(locale === 'ar' ? 'تم حفظ بيانات الملف الشخصي بنجاح!' : 'Profile updated successfully!');
  };

  const handleSaveImages = () => {
    updateData({
      ...data,
      heroImage: editImages.heroImage,
      avatarImage: editImages.avatarImage,
      aboutImage: editImages.aboutImage
    });
    showNotification(locale === 'ar' ? 'تم تحديث صور الموقع بنجاح!' : 'Website images updated successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'avatar' | 'about' | 'projCover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (target === 'hero') {
          setEditImages(prev => ({ ...prev, heroImage: result }));
        } else if (target === 'avatar') {
          setEditImages(prev => ({ ...prev, avatarImage: result }));
        } else if (target === 'about') {
          setEditImages(prev => ({ ...prev, aboutImage: result }));
        } else if (target === 'projCover') {
          setProjForm(prev => ({ ...prev, coverImage: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Start new project creation
  const handleStartNewProject = () => {
    const newId = 'proj-' + Date.now();
    setProjForm({
      id: newId,
      slug: 'project-' + Date.now(),
      title: { ar: '', en: '' },
      summary: { ar: '', en: '' },
      description: { ar: '', en: '' },
      category: 'mobile',
      categoryLabel: { ar: 'تطبيقات الجوال', en: 'Mobile Apps' },
      tags: ['Flutter', 'Dart'],
      githubUrl: 'https://github.com/En-Dhiaa',
      demoUrl: '',
      coverImage: './images/projects/hisabi-cover.webp',
      isFeatured: true,
      status: 'Production',
      highlights: { ar: ['ميزة برمجية أولى', 'ميزة برمجية ثانية'], en: ['First highlight', 'Second highlight'] }
    });
    setTagsInput('Flutter, Dart');
    setHighlightsArInput('ميزة برمجية أولى\nميزة برمجية ثانية');
    setHighlightsEnInput('First highlight\nSecond highlight');
    setIsCreatingProject(true);
    setEditingProject(null);
  };

  // Start editing existing project
  const handleStartEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjForm(proj);
    setTagsInput(proj.tags.join(', '));
    setHighlightsArInput((proj.highlights?.ar || []).join('\n'));
    setHighlightsEnInput((proj.highlights?.en || []).join('\n'));
    setIsCreatingProject(false);
  };

  // Save project (new or edit)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projForm.title?.ar || !projForm.title?.en) {
      alert(locale === 'ar' ? 'يرجى إدخال عنوان المشروع بالعربية والإنجليزية' : 'Please provide project title in Arabic & English');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const highlightsAr = highlightsArInput.split('\n').map(h => h.trim()).filter(Boolean);
    const highlightsEn = highlightsEnInput.split('\n').map(h => h.trim()).filter(Boolean);

    const projectItem: ProjectItem = {
      id: projForm.id || 'proj-' + Date.now(),
      slug: projForm.slug || 'project-' + Date.now(),
      title: { ar: projForm.title.ar, en: projForm.title.en },
      summary: { ar: projForm.summary?.ar || '', en: projForm.summary?.en || '' },
      description: { ar: projForm.description?.ar || '', en: projForm.description?.en || '' },
      category: projForm.category || 'mobile',
      categoryLabel: projForm.categoryLabel || { ar: 'تطبيقات', en: 'Apps' },
      tags: tags.length ? tags : ['Software'],
      githubUrl: projForm.githubUrl,
      demoUrl: projForm.demoUrl,
      coverImage: projForm.coverImage || './images/projects/hisabi-cover.webp',
      isFeatured: projForm.isFeatured !== false,
      status: projForm.status || 'Production',
      highlights: { ar: highlightsAr, en: highlightsEn }
    };

    if (isCreatingProject) {
      addProject(projectItem);
      showNotification(locale === 'ar' ? 'تمت إضافة المشروع الجديد بنجاح!' : 'New project added successfully!');
    } else {
      updateProject(projectItem);
      showNotification(locale === 'ar' ? 'تم تحديث بيانات المشروع بنجاح!' : 'Project updated successfully!');
    }

    setIsCreatingProject(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (confirm(locale === 'ar' ? `هل أنت متأكد من حذف المشروع: "${name}"؟` : `Are you sure you want to delete "${name}"?`)) {
      deleteProject(id);
      showNotification(locale === 'ar' ? 'تم حذف المشروع بنجاح.' : 'Project deleted successfully.');
      if (editingProject?.id === id) {
        setEditingProject(null);
        setIsCreatingProject(false);
      }
    }
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
        const content = event.target?.result as string;
        if (importDataJSON(content)) {
          showNotification(locale === 'ar' ? 'تم استيراد واسترجاع البيانات بنجاح!' : 'Data imported successfully!');
        } else {
          alert(locale === 'ar' ? 'ملف غير صالح.' : 'Invalid file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Standalone Header Bar */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0.75rem 1rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            padding: 0
          }}
        >
          {/* Back to Site Button */}
          <button
            onClick={onBack}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.84rem',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <BackArrow size={16} />
            <span>{locale === 'ar' ? 'العودة للموقع' : 'Back to Portfolio'}</span>
          </button>

          {/* Title & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img 
              src={data.avatarImage} 
              alt={data.profile.displayName[locale]} 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent)'
              }}
            />
            <div style={{ display: 'none', lineHeight: 1.2 }} className="desktop-brand">
              <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                {locale === 'ar' ? 'لوحة تحكم الإدارة (CMS)' : 'Admin Dashboard'}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn btn-secondary"
              style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#6366F1" />}
            </button>

            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', color: '#EF4444' }}
                title={locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              >
                <LogOut size={15} />
                <span className="logout-text">{locale === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '1.5rem 1rem' }}>
        <div className="container" style={{ maxWidth: '1000px', padding: 0 }}>
          
          {/* Global Notification Toast */}
          {saveSuccess && (
            <div 
              style={{ 
                padding: '0.75rem 1.25rem', 
                backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                color: '#10B981', 
                borderRadius: 'var(--radius-md)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.55rem', 
                fontWeight: 700,
                fontSize: '0.9rem',
                marginBottom: '1.25rem',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              <CheckCircle2 size={18} />
              <span>{saveSuccess}</span>
            </div>
          )}

          {/* Authentication Screen */}
          {!isAdmin ? (
            <div 
              className="card"
              style={{
                maxWidth: '420px',
                margin: '3rem auto',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <Lock size={24} />
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'تسجيل دخول لوحة الإدارة' : 'Admin Sign In'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                {locale === 'ar' ? 'أدخل كلمة مرور المشرف للوصول إلى كافة صلاحيات إدارة المشاريع والصور والنصوص.' : 'Enter password to unlock portfolio management privileges.'}
              </p>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  dir="ltr"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                />

                {authError && (
                  <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600 }}>
                    {authError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem', fontSize: '0.95rem' }}>
                  <span>{locale === 'ar' ? 'دخول لوحة التحكم' : 'Sign In'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div>
              {/* Standalone Responsive Tabs Bar */}
              <div 
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  paddingBottom: '0.75rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  WebkitOverflowScrolling: 'touch'
                }}
                className="admin-tabs-bar"
              >
                <button
                  onClick={() => { setActiveTab('projects'); setIsCreatingProject(false); setEditingProject(null); }}
                  className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <FolderGit2 size={16} />
                  <span>{locale === 'ar' ? 'المشاريع' : 'Projects'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('images')}
                  className={`btn ${activeTab === 'images' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <ImageIcon size={16} />
                  <span>{locale === 'ar' ? 'الصور والوسائط' : 'Images'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`btn ${activeTab === 'appearance' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <Palette size={16} />
                  <span>{locale === 'ar' ? 'الألوان والخطوط' : 'Colors & Fonts'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <User size={16} />
                  <span>{locale === 'ar' ? 'الملف والنصوص' : 'Profile & Texts'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('inbox')}
                  className={`btn ${activeTab === 'inbox' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap', position: 'relative' }}
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
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <Download size={16} />
                  <span>{locale === 'ar' ? 'النسخ الاحتياطي' : 'Backup'}</span>
                </button>
              </div>

              {/* TAB 1: Projects Management */}
              {activeTab === 'projects' && (
                <div>
                  {isCreatingProject || editingProject ? (
                    <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
                      <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {isCreatingProject 
                              ? (locale === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project') 
                              : (locale === 'ar' ? `تعديل المشروع: ${editingProject?.title[locale]}` : `Edit Project: ${editingProject?.title[locale]}`)}
                          </h3>
                          <button
                            type="button"
                            onClick={() => { setIsCreatingProject(false); setEditingProject(null); }}
                            className="btn btn-secondary"
                            style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                          >
                            {locale === 'ar' ? 'إلغاء والعودة للقائمة' : 'Cancel'}
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              عنوان المشروع (بالعربية) *
                            </label>
                            <input 
                              type="text"
                              required
                              value={projForm.title?.ar || ''}
                              onChange={(e) => setProjForm({ ...projForm, title: { ...projForm.title!, ar: e.target.value } })}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              Project Title (English) *
                            </label>
                            <input 
                              type="text"
                              required
                              value={projForm.title?.en || ''}
                              onChange={(e) => setProjForm({ ...projForm, title: { ...projForm.title!, en: e.target.value } })}
                              dir="ltr"
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              تصنيف المشروع (Category)
                            </label>
                            <select
                              value={projForm.category || 'mobile'}
                              onChange={(e) => {
                                const cat = e.target.value as any;
                                const labelMap: Record<string, { ar: string; en: string }> = {
                                  mobile: { ar: 'تطبيقات الجوال و Flutter', en: 'Mobile & Flutter Apps' },
                                  web: { ar: 'منصات ومواقع الويب', en: 'Web Platforms' },
                                  uiux: { ar: 'تصميم UI/UX والهوية', en: 'UI/UX & Branding' },
                                  erp: { ar: 'أنظمة ERP ولوحات التحكم', en: 'ERP Systems' },
                                  tools: { ar: 'الأدوات والذكاء الاصطناعي', en: 'AI & Tools' }
                                };
                                setProjForm({ 
                                  ...projForm, 
                                  category: cat,
                                  categoryLabel: labelMap[cat] || { ar: 'أخرى', en: 'Other' }
                                });
                              }}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            >
                              <option value="mobile">تطبيقات الجوال و Flutter</option>
                              <option value="web">منصات ومواقع الويب</option>
                              <option value="uiux">تصميم UI/UX والهوية</option>
                              <option value="erp">أنظمة ERP ولوحات التحكم</option>
                              <option value="tools">أدوات وبرمجيات الذكاء الاصطناعي</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              حالة المشروع (Status)
                            </label>
                            <select
                              value={projForm.status || 'Production'}
                              onChange={(e) => setProjForm({ ...projForm, status: e.target.value as any })}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            >
                              <option value="Production">Production (مطبق فعلياً في الإنتاج)</option>
                              <option value="Completed">Completed (مكتمل)</option>
                              <option value="In Progress">In Progress (قيد التطوير)</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              رابط مستودع GitHub
                            </label>
                            <input 
                              type="text"
                              dir="ltr"
                              value={projForm.githubUrl || ''}
                              onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                              placeholder="https://github.com/En-Dhiaa/..."
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              رابط المعاينة المباشرة (Demo / Live URL)
                            </label>
                            <input 
                              type="text"
                              dir="ltr"
                              value={projForm.demoUrl || ''}
                              onChange={(e) => setProjForm({ ...projForm, demoUrl: e.target.value })}
                              placeholder="https://..."
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            />
                          </div>
                        </div>

                        {/* Cover Image */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                            صورة غلاف المشروع (Cover Image)
                          </label>
                          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <input 
                              type="text"
                              dir="ltr"
                              value={projForm.coverImage || ''}
                              onChange={(e) => setProjForm({ ...projForm, coverImage: e.target.value })}
                              placeholder="./images/projects/... or https://..."
                              style={{ flex: 1, minWidth: '220px', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                            />
                            <label className="btn btn-secondary" style={{ padding: '0.65rem 1rem', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                              <Upload size={15} />
                              <span>رفع صورة</span>
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'projCover')} style={{ display: 'none' }} />
                            </label>
                          </div>
                          {projForm.coverImage && (
                            <div style={{ marginTop: '0.5rem', width: '140px', height: '75px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                              <img src={projForm.coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                            التقنيات المستخدمة (Tags - مفصولة بفواصل)
                          </label>
                          <input 
                            type="text"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            placeholder="Flutter, Dart, SQLite, Clean Architecture, UI/UX"
                            dir="ltr"
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        {/* Summary */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              ملخص مختصر (بالعربية)
                            </label>
                            <textarea 
                              rows={2}
                              value={projForm.summary?.ar || ''}
                              onChange={(e) => setProjForm({ ...projForm, summary: { ...projForm.summary!, ar: e.target.value } })}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              Summary (English)
                            </label>
                            <textarea 
                              rows={2}
                              dir="ltr"
                              value={projForm.summary?.en || ''}
                              onChange={(e) => setProjForm({ ...projForm, summary: { ...projForm.summary!, en: e.target.value } })}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              الشرح الكامل وتفاصيل المشروع (بالعربية)
                            </label>
                            <textarea 
                              rows={3}
                              value={projForm.description?.ar || ''}
                              onChange={(e) => setProjForm({ ...projForm, description: { ...projForm.description!, ar: e.target.value } })}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                              Full Description (English)
                            </label>
                            <textarea 
                              rows={3}
                              dir="ltr"
                              value={projForm.description?.en || ''}
                              onChange={(e) => setProjForm({ ...projForm, description: { ...projForm.description!, en: e.target.value } })}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                            />
                          </div>
                        </div>

                        {/* Featured Checkbox */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input 
                            type="checkbox"
                            id="isFeaturedStandalone"
                            checked={projForm.isFeatured !== false}
                            onChange={(e) => setProjForm({ ...projForm, isFeatured: e.target.checked })}
                            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                          />
                          <label htmlFor="isFeaturedStandalone" style={{ fontSize: '0.88rem', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600 }}>
                            تمييز المشروع في الواجهة الرئيسية (Featured)
                          </label>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                            <Save size={16} />
                            <span>{locale === 'ar' ? 'حفظ المشروع' : 'Save Project'}</span>
                          </button>
                          <button 
                            type="button" 
                            onClick={() => { setIsCreatingProject(false); setEditingProject(null); }}
                            className="btn btn-secondary"
                            style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
                          >
                            <span>{locale === 'ar' ? 'إلغاء' : 'Cancel'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {locale === 'ar' ? 'قائمة المشاريع المنشورة' : 'Published Projects'} ({data.projects.length})
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {locale === 'ar' ? 'إدارة كاملة لجميع المشاريع مع إمكانية التعديل والإضافة والحذف الفوري.' : 'Full CRUD control over all portfolio projects.'}
                          </p>
                        </div>

                        <button
                          onClick={handleStartNewProject}
                          className="btn btn-primary"
                          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                        >
                          <Plus size={16} />
                          <span>{locale === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</span>
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {data.projects.map((proj) => (
                          <div 
                            key={proj.id}
                            className="card"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '1rem',
                              gap: '1rem',
                              flexWrap: 'wrap'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                              <div style={{ width: '54px', height: '54px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
                                <img src={proj.coverImage} alt={proj.title[locale]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                                  {proj.title[locale]}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                  <span>{proj.categoryLabel[locale]}</span>
                                  <span>•</span>
                                  <span style={{ color: proj.status === 'Production' ? '#10B981' : 'var(--accent)', fontWeight: 600 }}>{proj.status}</span>
                                  {proj.isFeatured && <span>⭐</span>}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleStartEditProject(proj)}
                                className="btn btn-secondary"
                                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                              >
                                <Edit3 size={15} />
                                <span>{locale === 'ar' ? 'تعديل' : 'Edit'}</span>
                              </button>

                              <button
                                onClick={() => handleDeleteProject(proj.id, proj.title[locale])}
                                className="btn btn-secondary"
                                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', color: '#EF4444' }}
                              >
                                <Trash2 size={15} />
                                <span>{locale === 'ar' ? 'حذف' : 'Delete'}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Images Management */}
              {activeTab === 'images' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {locale === 'ar' ? 'إدارة صور الموقع والبروفايل' : 'Site & Profile Images'}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {locale === 'ar' ? 'يمكنك استبدال أو رفع أي صورة من جهازك وتطبيقها حياً على الموقع.' : 'Update or upload images directly from your device.'}
                    </p>
                  </div>

                  {/* Hero Portrait Cutout */}
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          {locale === 'ar' ? 'الصورة الشخصية الرئيسية (مفرغة - بدون إطار)' : 'Hero Portrait (Frameless Cutout)'}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                          {locale === 'ar' ? 'الصورة المفرغة التي تظهر في واجهة الهيرو والتعريفي بدون أي إطار.' : 'Transparent cutout image seamlessly integrated into hero section.'}
                        </p>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editImages.heroImage}
                          onChange={(e) => setEditImages({ ...editImages, heroImage: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
                        />
                        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                          <label className="btn btn-secondary" style={{ padding: '0.55rem 1rem', cursor: 'pointer', fontSize: '0.82rem' }}>
                            <Upload size={15} />
                            <span>{locale === 'ar' ? 'رفع صورة مفرغة جديدة' : 'Upload Cutout'}</span>
                            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero')} style={{ display: 'none' }} />
                          </label>
                          <button
                            type="button"
                            onClick={() => setEditImages({ ...editImages, heroImage: './images/hero-cutout.webp' })}
                            className="btn btn-secondary"
                            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                          >
                            {locale === 'ar' ? 'استخدام صورة مفرغة.png الأصلية' : 'Use Original Cutout'}
                          </button>
                        </div>
                      </div>

                      <div style={{ width: '120px', height: '140px', borderRadius: '14px', border: '1px solid var(--border-hover)', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={editImages.heroImage} alt="Hero Cutout Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    </div>
                  </div>

                  {/* Avatar Image */}
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          {locale === 'ar' ? 'صورة الأفاتار الدائرية (الهيدر والفوتر)' : 'Circular Avatar (Header & Footer)'}
                        </h4>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editImages.avatarImage}
                          onChange={(e) => setEditImages({ ...editImages, avatarImage: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
                        />
                        <label className="btn btn-secondary" style={{ padding: '0.55rem 1rem', cursor: 'pointer', fontSize: '0.82rem', display: 'inline-flex', width: 'fit-content' }}>
                          <Upload size={15} />
                          <span>{locale === 'ar' ? 'رفع صورة أفاتار' : 'Upload Avatar'}</span>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} style={{ display: 'none' }} />
                        </label>
                      </div>

                      <div style={{ width: '85px', height: '85px', borderRadius: '50%', border: '2.5px solid var(--accent)', overflow: 'hidden' }}>
                        <img src={editImages.avatarImage} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>

                  {/* About Section Image */}
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                          {locale === 'ar' ? 'صورة قسم "عن المهندس"' : 'About Section Portrait'}
                        </h4>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editImages.aboutImage}
                          onChange={(e) => setEditImages({ ...editImages, aboutImage: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
                        />
                        <label className="btn btn-secondary" style={{ padding: '0.55rem 1rem', cursor: 'pointer', fontSize: '0.82rem', display: 'inline-flex', width: 'fit-content' }}>
                          <Upload size={15} />
                          <span>{locale === 'ar' ? 'رفع صورة لقسم عن المهندس' : 'Upload About Photo'}</span>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'about')} style={{ display: 'none' }} />
                        </label>
                      </div>

                      <div style={{ width: '95px', height: '95px', borderRadius: '12px', border: '1px solid var(--border-hover)', overflow: 'hidden' }}>
                        <img src={editImages.aboutImage} alt="About Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>

                  <button onClick={handleSaveImages} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                    <Save size={16} />
                    <span>{locale === 'ar' ? 'حفظ كافة تعديلات الصور' : 'Save Images'}</span>
                  </button>
                </div>
              )}

              {/* TAB 3: Appearance (Colors & Fonts) */}
              {activeTab === 'appearance' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {locale === 'ar' ? 'التحكم بألوان وخطوط الموقع' : 'Theme Colors & Typography'}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {locale === 'ar' ? 'تخصيص الهوية البصرية ونمط العرض للموقع لحظياً.' : 'Customize visual identity and typography live.'}
                    </p>
                  </div>

                  {/* Accent Color */}
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {locale === 'ar' ? 'لون التمييز الأساسي (Accent Color)' : 'Primary Accent Color'}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      {locale === 'ar' ? 'يتحكم في لون الأزرار والتوهج والروابط والتدرجات في كامل الموقع.' : 'Controls buttons, glows, links, and gradients across the site.'}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {THEME_COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setThemeColor(preset.hex)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.55rem',
                            padding: '0.55rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: data.themeColor === preset.hex ? '2px solid #FFFFFF' : '1px solid var(--border-subtle)',
                            backgroundColor: 'var(--bg-main)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: preset.hex }} />
                          <span style={{ fontWeight: 600 }}>{preset.name}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {locale === 'ar' ? 'أو اختر كود لون مخصص:' : 'Or custom HEX:'}
                      </span>
                      <input 
                        type="color"
                        value={data.themeColor || '#8B7CFF'}
                        onChange={(e) => setThemeColor(e.target.value)}
                        style={{ width: '45px', height: '38px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent' }}
                      />
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent)' }} dir="ltr">
                        {data.themeColor || '#8B7CFF'}
                      </span>
                    </div>
                  </div>

                  {/* Fonts Selector */}
                  <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                      {locale === 'ar' ? 'الخط الافتراضي للموقع (Font Family)' : 'Default Site Font Family'}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      {locale === 'ar' ? 'اختر الخط العربي واللاتيني المعتمد لعرض كافة نصوص وعناوين الموقع.' : 'Select the main font family used across the site.'}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      {AVAILABLE_FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => {
                            setFont(font.id);
                            showNotification(locale === 'ar' ? `تم تفعيل خط: ${font.name}` : `Font changed to: ${font.name}`);
                          }}
                          style={{
                            padding: '0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: currentFont === font.id ? '2px solid var(--accent)' : '1px solid var(--border-subtle)',
                            backgroundColor: currentFont === font.id ? 'rgba(var(--accent-rgb), 0.12)' : 'var(--bg-main)',
                            color: currentFont === font.id ? 'var(--accent)' : 'var(--text-primary)',
                            fontFamily: font.fontFamily,
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Profile Editor */}
              {activeTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {locale === 'ar' ? 'تعديل نصوص وبيانات الملف الشخصي' : 'Edit Profile Information & Texts'}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {locale === 'ar' ? 'يمكنك تعديل أي نص في الموقع وحفظه مباشرة في النظام.' : 'Edit and update your profile texts in real time.'}
                    </p>
                  </div>

                  <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          الاسم الكامل (بالعربية)
                        </label>
                        <input 
                          type="text"
                          value={editProfile.name.ar}
                          onChange={(e) => setEditProfile({ ...editProfile, name: { ...editProfile.name, ar: e.target.value } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          Full Name (English)
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editProfile.name.en}
                          onChange={(e) => setEditProfile({ ...editProfile, name: { ...editProfile.name, en: e.target.value } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          المسمى المهني (العربية)
                        </label>
                        <input 
                          type="text"
                          value={editProfile.title.ar}
                          onChange={(e) => setEditProfile({ ...editProfile, title: { ...editProfile.title, ar: e.target.value } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          Professional Title (English)
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editProfile.title.en}
                          onChange={(e) => setEditProfile({ ...editProfile, title: { ...editProfile.title, en: e.target.value } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          رقم الهاتف
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editProfile.phone}
                          onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          رقم WhatsApp الدولي
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editProfile.whatsapp}
                          onChange={(e) => setEditProfile({ ...editProfile, whatsapp: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
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
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
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

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          رابط Facebook
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editProfile.facebook || ''}
                          onChange={(e) => setEditProfile({ ...editProfile, facebook: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          رابط Instagram
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={editProfile.instagram || ''}
                          onChange={(e) => setEditProfile({ ...editProfile, instagram: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                        النبذة المختصرة للواجهة (العربية)
                      </label>
                      <textarea 
                        rows={2}
                        value={editProfile.shortBio.ar}
                        onChange={(e) => setEditProfile({ ...editProfile, shortBio: { ...editProfile.shortBio, ar: e.target.value } })}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                        النبذة المهنية الكاملة (لقسم عن المهندس)
                      </label>
                      <textarea 
                        rows={3}
                        value={editProfile.fullBio.ar}
                        onChange={(e) => setEditProfile({ ...editProfile, fullBio: { ...editProfile.fullBio, ar: e.target.value } })}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                      />
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          سنوات الخبرة
                        </label>
                        <input 
                          type="number"
                          value={editProfile.stats.yearsExperience}
                          onChange={(e) => setEditProfile({ ...editProfile, stats: { ...editProfile.stats, yearsExperience: parseInt(e.target.value, 10) || 0 } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          المشاريع المنجزة
                        </label>
                        <input 
                          type="number"
                          value={editProfile.stats.completedProjects}
                          onChange={(e) => setEditProfile({ ...editProfile, stats: { ...editProfile.stats, completedProjects: parseInt(e.target.value, 10) || 0 } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          مستودعات GitHub
                        </label>
                        <input 
                          type="number"
                          value={editProfile.stats.repositoriesCount}
                          onChange={(e) => setEditProfile({ ...editProfile, stats: { ...editProfile.stats, repositoriesCount: parseInt(e.target.value, 10) || 0 } })}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>
                    </div>

                    <button onClick={handleSaveProfile} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                      <Save size={16} />
                      <span>{locale === 'ar' ? 'حفظ تعديلات الملف الشخصي' : 'Save Profile Changes'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: Inbox Messages */}
              {activeTab === 'inbox' && (
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {locale === 'ar' ? 'رسائل واستفسارات الزوار' : 'Incoming Inquiries'} ({messages.length})
                  </h3>

                  {messages.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      {locale === 'ar' ? 'لا توجد رسائل واردة حالياً.' : 'No messages received yet.'}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {messages.map((msg) => (
                        <div 
                          key={msg.id}
                          className="card"
                          style={{ padding: '1.25rem' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                                {msg.name}
                              </div>
                              <div style={{ fontSize: '0.82rem', color: 'var(--accent)' }} dir="ltr">
                                {msg.email}
                              </div>
                            </div>
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="btn btn-secondary"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', color: '#EF4444' }}
                            >
                              <Trash2 size={14} />
                              <span>{locale === 'ar' ? 'حذف' : 'Delete'}</span>
                            </button>
                          </div>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            {msg.message}
                          </p>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.65rem' }}>
                            {new Date(msg.date).toLocaleString(locale === 'ar' ? 'ar-YE' : 'en-US')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: Backup & Import */}
              {activeTab === 'backup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {locale === 'ar' ? 'النسخ الاحتياطي واسترجاع البيانات' : 'Backup & Data Management'}
                    </h3>
                  </div>

                  <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      {locale === 'ar' ? 'تصدير نسخة احتياطية كاملة (JSON)' : 'Export Full JSON Backup'}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      {locale === 'ar' ? 'قم بتنزيل كافة مشاريعك وبياناتك وصورك في ملف واحد للحفظ أو النقل.' : 'Download your entire portfolio configuration and projects in a single JSON file.'}
                    </p>
                    <button onClick={handleExport} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                      <Download size={16} />
                      <span>{locale === 'ar' ? 'تحميل النسخة الاحتياطية' : 'Download Backup'}</span>
                    </button>
                  </div>

                  <div className="card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                      {locale === 'ar' ? 'استيراد واسترجاع بيانات سابقة' : 'Import Portfolio Data'}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      {locale === 'ar' ? 'حدد ملف JSON لاستعادة المشاريع والإعدادات السابقة مباشرة.' : 'Select a JSON file to restore projects and configuration.'}
                    </p>
                    <label className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', cursor: 'pointer', fontSize: '0.88rem', display: 'inline-flex', width: 'fit-content' }}>
                      <Upload size={16} />
                      <span>{locale === 'ar' ? 'اختيار ملف الاستيراد' : 'Choose File to Import'}</span>
                      <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
                    </label>
                  </div>

                  <div className="card" style={{ padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.06)', borderColor: 'rgba(239, 68, 68, 0.25)' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.35rem', color: '#EF4444' }}>
                      {locale === 'ar' ? 'إعادة ضبط المصنع (Factory Reset)' : 'Factory Reset'}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      {locale === 'ar' ? 'استعادة البيانات الأساسية الأصلية للموقع كما تم إعدادها لأول مرة.' : 'Reset all data back to the original defaults.'}
                    </p>
                    <button 
                      onClick={() => {
                        if (confirm(locale === 'ar' ? 'هل أنت متأكد من استعادة بيانات الموقع الأصلية؟ ستفقد التعديلات المحلية غير المحفوظة.' : 'Are you sure you want to reset to defaults?')) {
                          resetToDefaults();
                          showNotification(locale === 'ar' ? 'تمت استعادة البيانات الافتراضية بنجاح!' : 'Defaults restored!');
                        }
                      }} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem', color: '#EF4444' }}
                    >
                      <RotateCcw size={16} />
                      <span>{locale === 'ar' ? 'استعادة البيانات الافتراضية' : 'Restore Defaults'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @media (min-width: 640px) {
          .desktop-brand {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .logout-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
