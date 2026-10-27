import React, { useState } from 'react';
import { usePortfolio, AVAILABLE_FONTS, THEME_COLOR_PRESETS } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { 
  Lock, 
  X, 
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
  ExternalLink,
  Star,
  Layers
} from 'lucide-react';

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

  if (!isOpen) return null;

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
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '94vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          padding: '1.75rem',
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
            paddingBottom: '1rem',
            marginBottom: '1.25rem'
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
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'لوحة إدارة المحتوى والتحكم الكامل (CMS)' : 'Full Content Management Dashboard'}
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {locale === 'ar' ? 'المهندس ضياء الحميري — تحكم فوري بالمشاريع والصور والألوان والخطوط' : 'Eng. Dhiaa Al-Hmiri — Realtime Control'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="btn btn-secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: '#EF4444' }}
                title={locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              >
                <LogOut size={15} />
                <span>{locale === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.4rem'
              }}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Global Notification */}
        {saveSuccess && (
          <div 
            style={{ 
              padding: '0.65rem 1rem', 
              backgroundColor: 'rgba(16, 185, 129, 0.15)', 
              color: '#10B981', 
              borderRadius: 'var(--radius-sm)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontWeight: 600,
              fontSize: '0.88rem',
              marginBottom: '1rem'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Authentication View */}
        {!isAdmin ? (
          <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '2.5rem auto', textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {locale === 'ar' ? 'دخول لوحة تحكم الإدارة' : 'Admin Authentication'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {locale === 'ar' ? 'أدخل كلمة مرور المشرف للوصول إلى كافة صلاحيات التعديل والإدارة.' : 'Enter your password to access admin privileges.'}
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                dir="ltr"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
            </div>

            {authError && (
              <div style={{ color: '#EF4444', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {authError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.7rem' }}>
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
                gap: '0.4rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.65rem',
                marginBottom: '1.25rem'
              }}
            >
              <button
                onClick={() => { setActiveTab('projects'); setIsCreatingProject(false); setEditingProject(null); }}
                className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem' }}
              >
                <FolderGit2 size={15} />
                <span>{locale === 'ar' ? 'إدارة المشاريع' : 'Projects'}</span>
              </button>

              <button
                onClick={() => setActiveTab('images')}
                className={`btn ${activeTab === 'images' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem' }}
              >
                <ImageIcon size={15} />
                <span>{locale === 'ar' ? 'صور الموقع والبروفايل' : 'Images'}</span>
              </button>

              <button
                onClick={() => setActiveTab('appearance')}
                className={`btn ${activeTab === 'appearance' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem' }}
              >
                <Palette size={15} />
                <span>{locale === 'ar' ? 'الألوان والخطوط' : 'Colors & Fonts'}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem' }}
              >
                <User size={15} />
                <span>{locale === 'ar' ? 'الملف الشخصي والنصوص' : 'Profile & Texts'}</span>
              </button>

              <button
                onClick={() => setActiveTab('inbox')}
                className={`btn ${activeTab === 'inbox' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem', position: 'relative' }}
              >
                <Mail size={15} />
                <span>{locale === 'ar' ? 'صندوق الرسائل' : 'Inbox'}</span>
                {messages.length > 0 && (
                  <span className="badge" style={{ backgroundColor: '#10B981', color: '#FFF', padding: '0.1rem 0.35rem', fontSize: '0.68rem' }}>
                    {messages.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`btn ${activeTab === 'backup' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.84rem' }}
              >
                <Download size={15} />
                <span>{locale === 'ar' ? 'النسخ الاحتياطي' : 'Backup'}</span>
              </button>
            </div>

            {/* TAB 1: Projects Management (List, Add, Edit, Delete) */}
            {activeTab === 'projects' && (
              <div>
                {/* When creating or editing a project */}
                {isCreatingProject || editingProject ? (
                  <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {isCreatingProject 
                          ? (locale === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project') 
                          : (locale === 'ar' ? `تعديل المشروع: ${editingProject?.title[locale]}` : `Edit Project: ${editingProject?.title[locale]}`)}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setIsCreatingProject(false); setEditingProject(null); }}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        {locale === 'ar' ? 'إلغاء والعودة للقائمة' : 'Cancel'}
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      {/* Titles */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          عنوان المشروع (بالعربية) *
                        </label>
                        <input 
                          type="text"
                          required
                          value={projForm.title?.ar || ''}
                          onChange={(e) => setProjForm({ ...projForm, title: { ...projForm.title!, ar: e.target.value } })}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          Project Title (English) *
                        </label>
                        <input 
                          type="text"
                          required
                          value={projForm.title?.en || ''}
                          onChange={(e) => setProjForm({ ...projForm, title: { ...projForm.title!, en: e.target.value } })}
                          dir="ltr"
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      {/* Category & Status */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          تصنيف المشروع (Category)
                        </label>
                        <select
                          value={projForm.category || 'mobile'}
                          onChange={(e) => {
                            const cat = e.target.value as any;
                            const labelMap: Record<string, { ar: string; en: string }> = {
                              mobile: { ar: 'تطبيقات الجوال', en: 'Mobile Apps' },
                              web: { ar: 'منصات الويب', en: 'Web Platforms' },
                              uiux: { ar: 'تصميم UI/UX', en: 'UI/UX Design' },
                              erp: { ar: 'أنظمة ERP', en: 'ERP Systems' },
                              tools: { ar: 'الأدوات والذكاء الاصطناعي', en: 'Tools & AI' }
                            };
                            setProjForm({ 
                              ...projForm, 
                              category: cat,
                              categoryLabel: labelMap[cat] || { ar: 'أخرى', en: 'Other' }
                            });
                          }}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        >
                          <option value="mobile">تطبيقات الجوال و Flutter</option>
                          <option value="web">منصات ومواقع الويب</option>
                          <option value="uiux">تصميم UI/UX والهوية</option>
                          <option value="erp">أنظمة ERP ولوحات التحكم</option>
                          <option value="tools">أدوات وبرمجيات الذكاء الاصطناعي</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          حالة المشروع (Status)
                        </label>
                        <select
                          value={projForm.status || 'Production'}
                          onChange={(e) => setProjForm({ ...projForm, status: e.target.value as any })}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        >
                          <option value="Production">Production (في الإنتاج والعمل الفعلي)</option>
                          <option value="Completed">Completed (مكتمل وجاهز)</option>
                          <option value="In Progress">In Progress (قيد التطوير)</option>
                        </select>
                      </div>

                      {/* Links */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          رابط GitHub
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={projForm.githubUrl || ''}
                          onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                          placeholder="https://github.com/En-Dhiaa/..."
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          رابط المعاينة المباشرة (Demo / Live URL)
                        </label>
                        <input 
                          type="text"
                          dir="ltr"
                          value={projForm.demoUrl || ''}
                          onChange={(e) => setProjForm({ ...projForm, demoUrl: e.target.value })}
                          placeholder="https://..."
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                      </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                        صورة غلاف المشروع (Cover Image)
                      </label>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input 
                          type="text"
                          dir="ltr"
                          value={projForm.coverImage || ''}
                          onChange={(e) => setProjForm({ ...projForm, coverImage: e.target.value })}
                          placeholder="./images/projects/... or https://..."
                          style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                        />
                        <label className="btn btn-secondary" style={{ padding: '0.55rem 0.85rem', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                          <Upload size={14} />
                          <span>رفع صورة</span>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'projCover')} style={{ display: 'none' }} />
                        </label>
                      </div>
                      {projForm.coverImage && (
                        <div style={{ marginTop: '0.5rem', width: '120px', height: '65px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                          <img src={projForm.coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                        التقنيات المستخدمة (Tags - مفصولة بفواصل)
                      </label>
                      <input 
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="Flutter, Dart, SQLite, Clean Architecture, UI/UX"
                        dir="ltr"
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                      />
                    </div>

                    {/* Summary Arabic & English */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          ملخص مختصر (بالعربية)
                        </label>
                        <textarea 
                          rows={2}
                          value={projForm.summary?.ar || ''}
                          onChange={(e) => setProjForm({ ...projForm, summary: { ...projForm.summary!, ar: e.target.value } })}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          Summary (English)
                        </label>
                        <textarea 
                          rows={2}
                          dir="ltr"
                          value={projForm.summary?.en || ''}
                          onChange={(e) => setProjForm({ ...projForm, summary: { ...projForm.summary!, en: e.target.value } })}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>

                    {/* Description Arabic & English */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          الشرح والتفاصيل الكاملة (بالعربية)
                        </label>
                        <textarea 
                          rows={3}
                          value={projForm.description?.ar || ''}
                          onChange={(e) => setProjForm({ ...projForm, description: { ...projForm.description!, ar: e.target.value } })}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          Full Description (English)
                        </label>
                        <textarea 
                          rows={3}
                          dir="ltr"
                          value={projForm.description?.en || ''}
                          onChange={(e) => setProjForm({ ...projForm, description: { ...projForm.description!, en: e.target.value } })}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>

                    {/* Highlights */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          أهم مميزات المشروع (كل ميزة في سطر - بالعربية)
                        </label>
                        <textarea 
                          rows={3}
                          value={highlightsArInput}
                          onChange={(e) => setHighlightsArInput(e.target.value)}
                          placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                          Key Highlights (one per line - English)
                        </label>
                        <textarea 
                          rows={3}
                          dir="ltr"
                          value={highlightsEnInput}
                          onChange={(e) => setHighlightsEnInput(e.target.value)}
                          placeholder="Highlight 1&#10;Highlight 2&#10;Highlight 3"
                          style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>

                    {/* Featured Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="checkbox"
                        id="isFeatured"
                        checked={projForm.isFeatured !== false}
                        onChange={(e) => setProjForm({ ...projForm, isFeatured: e.target.checked })}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />
                      <label htmlFor="isFeatured" style={{ fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
                        تمييز المشروع في الواجهة (Featured Project)
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                        <Save size={16} />
                        <span>{locale === 'ar' ? 'حفظ المشروع' : 'Save Project'}</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setIsCreatingProject(false); setEditingProject(null); }}
                        className="btn btn-secondary"
                        style={{ padding: '0.65rem 1.25rem' }}
                      >
                        <span>{locale === 'ar' ? 'إلغاء' : 'Cancel'}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Projects List View */
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {locale === 'ar' ? 'قائمة المشاريع المنشورة' : 'Published Projects'} ({data.projects.length})
                      </h4>
                      <button
                        onClick={handleStartNewProject}
                        className="btn btn-primary"
                        style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                      >
                        <Plus size={16} />
                        <span>{locale === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {data.projects.map((proj) => (
                        <div 
                          key={proj.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem 1rem',
                            backgroundColor: 'var(--bg-main)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)',
                            gap: '0.75rem',
                            flexWrap: 'wrap'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '220px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
                              <img src={proj.coverImage} alt={proj.title[locale]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                                {proj.title[locale]}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                                <span>{proj.categoryLabel[locale]}</span>
                                <span>•</span>
                                <span style={{ color: proj.status === 'Production' ? '#10B981' : 'var(--accent)' }}>{proj.status}</span>
                                {proj.isFeatured && <span title="Featured">⭐</span>}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <button
                              onClick={() => handleStartEditProject(proj)}
                              className="btn btn-secondary"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                              title={locale === 'ar' ? 'تعديل بيانات المشروع' : 'Edit Project'}
                            >
                              <Edit3 size={14} />
                              <span>{locale === 'ar' ? 'تعديل' : 'Edit'}</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title[locale])}
                              className="btn btn-secondary"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', color: '#EF4444' }}
                              title={locale === 'ar' ? 'حذف المشروع' : 'Delete Project'}
                            >
                              <Trash2 size={14} />
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

            {/* TAB 2: Images Management (Hero Cutout, Avatar, About) */}
            {activeTab === 'images' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'إدارة صور الموقع والبروفايل' : 'Manage Site & Profile Images'}
                </h4>

                {/* Hero Portrait (Cutout) */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {locale === 'ar' ? 'الصورة الشخصية الرئيسية (Hero Portrait - مفرغة)' : 'Hero Main Portrait (Cutout)'}
                      </label>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        {locale === 'ar' ? 'تظهر في واجهة الموقع بدون إطار وبشكل مندمج في الصفحة.' : 'Appears in hero section frameless and transparent.'}
                      </p>
                      <input 
                        type="text"
                        dir="ltr"
                        value={editImages.heroImage}
                        onChange={(e) => setEditImages({ ...editImages, heroImage: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <label className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', cursor: 'pointer', fontSize: '0.78rem' }}>
                          <Upload size={14} />
                          <span>{locale === 'ar' ? 'رفع صورة من جهازك' : 'Upload From Device'}</span>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero')} style={{ display: 'none' }} />
                        </label>
                        <button
                          type="button"
                          onClick={() => setEditImages({ ...editImages, heroImage: './images/hero-cutout.webp' })}
                          className="btn btn-secondary"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                        >
                          {locale === 'ar' ? 'استخدام الصورة المفرغة الافتراضية' : 'Use Default Cutout'}
                        </button>
                      </div>
                    </div>

                    <div style={{ width: '100px', height: '120px', borderRadius: '12px', border: '1px solid var(--border-hover)', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={editImages.heroImage} alt="Hero Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>
                </div>

                {/* Avatar Image */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {locale === 'ar' ? 'صورة الأفاتار المصغرة (Avatar - الهيدر والفوتر)' : 'Avatar Image (Header & Footer)'}
                      </label>
                      <input 
                        type="text"
                        dir="ltr"
                        value={editImages.avatarImage}
                        onChange={(e) => setEditImages({ ...editImages, avatarImage: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                      />
                      <label className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', cursor: 'pointer', fontSize: '0.78rem' }}>
                        <Upload size={14} />
                        <span>{locale === 'ar' ? 'رفع صورة جديدة' : 'Upload Image'}</span>
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatar')} style={{ display: 'none' }} />
                      </label>
                    </div>

                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--accent)', overflow: 'hidden' }}>
                      <img src={editImages.avatarImage} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>

                {/* About Section Image */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {locale === 'ar' ? 'صورة قسم "عن المهندس" (About Section)' : 'About Section Portrait'}
                      </label>
                      <input 
                        type="text"
                        dir="ltr"
                        value={editImages.aboutImage}
                        onChange={(e) => setEditImages({ ...editImages, aboutImage: e.target.value })}
                        style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}
                      />
                      <label className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', cursor: 'pointer', fontSize: '0.78rem' }}>
                        <Upload size={14} />
                        <span>{locale === 'ar' ? 'رفع صورة جديدة' : 'Upload Image'}</span>
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'about')} style={{ display: 'none' }} />
                      </label>
                    </div>

                    <div style={{ width: '90px', height: '90px', borderRadius: '12px', border: '1px solid var(--border-hover)', overflow: 'hidden' }}>
                      <img src={editImages.aboutImage} alt="About Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>

                <button onClick={handleSaveImages} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.65rem 1.25rem' }}>
                  <Save size={16} />
                  <span>{locale === 'ar' ? 'حفظ كافة تعديلات الصور' : 'Save Images Changes'}</span>
                </button>
              </div>
            )}

            {/* TAB 3: Appearance (Colors & Fonts) */}
            {activeTab === 'appearance' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'التحكم بألوان وخطوط الموقع' : 'Theme Colors & Fonts Control'}
                </h4>

                {/* Theme Accent Color */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {locale === 'ar' ? 'لون التمييز الأساسي (Accent Color)' : 'Primary Accent Color'}
                  </label>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {locale === 'ar' ? 'يتحكم في لون الأزرار، التوهج، التدرجات، والروابط التفاعلية في كامل الموقع.' : 'Controls buttons, glows, gradients, and interactive highlights.'}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                    {THEME_COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setThemeColor(preset.hex)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.45rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: data.themeColor === preset.hex ? '2px solid #FFFFFF' : '1px solid var(--border-subtle)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          fontSize: '0.82rem'
                        }}
                      >
                        <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: preset.hex }} />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {locale === 'ar' ? 'أو اختر كود لون مخصص:' : 'Or custom HEX color:'}
                    </label>
                    <input 
                      type="color"
                      value={data.themeColor || '#8B7CFF'}
                      onChange={(e) => setThemeColor(e.target.value)}
                      style={{ width: '42px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'transparent' }}
                    />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)' }} dir="ltr">
                      {data.themeColor || '#8B7CFF'}
                    </span>
                  </div>
                </div>

                {/* Font Selector */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {locale === 'ar' ? 'الخط الافتراضي للموقع (Font Family)' : 'Default Site Font Family'}
                  </label>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {locale === 'ar' ? 'اختر الخط العربي واللاتيني المعتمد لعرض كافة نصوص وعناوين الموقع.' : 'Select the primary font used across the entire website.'}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
                    {AVAILABLE_FONTS.map((font) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => {
                          setFont(font.id);
                          showNotification(locale === 'ar' ? `تم تفعيل خط: ${font.name}` : `Font changed to: ${font.name}`);
                        }}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: currentFont === font.id ? '2px solid var(--accent)' : '1px solid var(--border-subtle)',
                          backgroundColor: currentFont === font.id ? 'rgba(var(--accent-rgb), 0.12)' : 'var(--bg-surface)',
                          color: currentFont === font.id ? 'var(--accent)' : 'var(--text-primary)',
                          fontFamily: font.fontFamily,
                          fontSize: '0.9rem',
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

            {/* TAB 4: Profile Editor (Texts, Bio, Contacts) */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'تعديل نصوص وبيانات الملف الشخصي' : 'Edit Profile Information & Texts'}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      الاسم الكامل (بالعربية)
                    </label>
                    <input 
                      type="text"
                      value={editProfile.name.ar}
                      onChange={(e) => setEditProfile({ ...editProfile, name: { ...editProfile.name, ar: e.target.value } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Full Name (English)
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.name.en}
                      onChange={(e) => setEditProfile({ ...editProfile, name: { ...editProfile.name, en: e.target.value } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      المسمى المهني (العربية)
                    </label>
                    <input 
                      type="text"
                      value={editProfile.title.ar}
                      onChange={(e) => setEditProfile({ ...editProfile, title: { ...editProfile.title, ar: e.target.value } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      Professional Title (English)
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.title.en}
                      onChange={(e) => setEditProfile({ ...editProfile, title: { ...editProfile.title, en: e.target.value } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رقم الهاتف
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رقم WhatsApp الدولي
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.whatsapp}
                      onChange={(e) => setEditProfile({ ...editProfile, whatsapp: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      البريد الإلكتروني
                    </label>
                    <input 
                      type="email"
                      dir="ltr"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رابط GitHub
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.github}
                      onChange={(e) => setEditProfile({ ...editProfile, github: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رابط صفحة Facebook
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.facebook || ''}
                      onChange={(e) => setEditProfile({ ...editProfile, facebook: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      رابط حساب Instagram
                    </label>
                    <input 
                      type="text"
                      dir="ltr"
                      value={editProfile.instagram || ''}
                      onChange={(e) => setEditProfile({ ...editProfile, instagram: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {/* Short Bio */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    النبذة المختصرة للواجهة (العربية)
                  </label>
                  <textarea 
                    rows={2}
                    value={editProfile.shortBio.ar}
                    onChange={(e) => setEditProfile({ ...editProfile, shortBio: { ...editProfile.shortBio, ar: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Full Bio */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    النبذة المهنية الكاملة (لقسم عن المهندس)
                  </label>
                  <textarea 
                    rows={3}
                    value={editProfile.fullBio.ar}
                    onChange={(e) => setEditProfile({ ...editProfile, fullBio: { ...editProfile.fullBio, ar: e.target.value } })}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      سنوات الخبرة
                    </label>
                    <input 
                      type="number"
                      value={editProfile.stats.yearsExperience}
                      onChange={(e) => setEditProfile({ ...editProfile, stats: { ...editProfile.stats, yearsExperience: parseInt(e.target.value, 10) || 0 } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      المشاريع المنجزة
                    </label>
                    <input 
                      type="number"
                      value={editProfile.stats.completedProjects}
                      onChange={(e) => setEditProfile({ ...editProfile, stats: { ...editProfile.stats, completedProjects: parseInt(e.target.value, 10) || 0 } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                      مستودعات GitHub
                    </label>
                    <input 
                      type="number"
                      value={editProfile.stats.repositoriesCount}
                      onChange={(e) => setEditProfile({ ...editProfile, stats: { ...editProfile.stats, repositoriesCount: parseInt(e.target.value, 10) || 0 } })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <button onClick={handleSaveProfile} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.65rem 1.25rem' }}>
                  <Save size={16} />
                  <span>{locale === 'ar' ? 'حفظ تعديلات الملف الشخصي' : 'Save Profile Changes'}</span>
                </button>
              </div>
            )}

            {/* TAB 5: Inbox Messages */}
            {activeTab === 'inbox' && (
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  {locale === 'ar' ? 'رسائل واستفسارات الزوار' : 'Incoming Inquiries'} ({messages.length})
                </h4>

                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    {locale === 'ar' ? 'لا توجد رسائل واردة حالياً.' : 'No messages received yet.'}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        style={{
                          padding: '1rem',
                          backgroundColor: 'var(--bg-main)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                              {msg.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--accent)' }} dir="ltr">
                              {msg.email}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="btn btn-secondary"
                            style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem', color: '#EF4444' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                          {msg.message}
                        </p>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'النسخ الاحتياطي واسترجاع البيانات' : 'Backup & Data Management'}
                </h4>

                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    {locale === 'ar' ? 'تصدير نسخة احتياطية كاملة (JSON)' : 'Export Full JSON Backup'}
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    {locale === 'ar' ? 'قم بتنزيل كافة مشاريعك وبياناتك وصورك في ملف واحد للحفظ أو النقل.' : 'Download your entire portfolio configuration and projects in a JSON file.'}
                  </p>
                  <button onClick={handleExport} className="btn btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}>
                    <Download size={15} />
                    <span>{locale === 'ar' ? 'تحميل النسخة الاحتياطية' : 'Download Backup'}</span>
                  </button>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    {locale === 'ar' ? 'استيراد واسترجاع بيانات سابقة' : 'Import Portfolio Data'}
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    {locale === 'ar' ? 'حدد ملف JSON لاستعادة المشاريع والإعدادات السابقة مباشرة.' : 'Select a JSON file to restore projects and configuration.'}
                  </p>
                  <label className="btn btn-secondary" style={{ padding: '0.55rem 1rem', cursor: 'pointer', fontSize: '0.84rem', display: 'inline-flex', width: 'fit-content' }}>
                    <Upload size={15} />
                    <span>{locale === 'ar' ? 'اختيار ملف الاستيراد' : 'Choose File to Import'}</span>
                    <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
                  </label>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(239, 68, 68, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.35rem', color: '#EF4444' }}>
                    {locale === 'ar' ? 'إعادة ضبط المصنع (Factory Reset)' : 'Factory Reset'}
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    {locale === 'ar' ? 'استعادة البيانات الأساسية الأصلية للموقع كما تم إعدادها لأول مرة.' : 'Reset all data back to the original portfolio plan defaults.'}
                  </p>
                  <button 
                    onClick={() => {
                      if (confirm(locale === 'ar' ? 'هل أنت متأكد من استعادة بيانات الموقع الأصلية؟ ستفقد التعديلات المحلية غير المحفوظة.' : 'Are you sure you want to reset to defaults?')) {
                        resetToDefaults();
                        showNotification(locale === 'ar' ? 'تمت استعادة البيانات الافتراضية بنجاح!' : 'Defaults restored!');
                      }
                    }} 
                    className="btn btn-secondary" 
                    style={{ padding: '0.55rem 1rem', fontSize: '0.84rem', color: '#EF4444' }}
                  >
                    <RotateCcw size={15} />
                    <span>{locale === 'ar' ? 'استعادة البيانات الافتراضية' : 'Restore Defaults'}</span>
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
