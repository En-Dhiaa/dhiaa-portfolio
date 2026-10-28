import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  Tag, 
  ArrowUpRight, 
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Projects: React.FC = () => {
  const { locale, data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: locale === 'ar' ? 'جميع المشاريع' : 'All Projects' },
    { id: 'mobile', label: locale === 'ar' ? 'تطبيقات الجوال و Flutter' : 'Flutter & Mobile' },
    { id: 'web', label: locale === 'ar' ? 'الويب والمؤسسات' : 'Web & Enterprise' },
    { id: 'uiux', label: locale === 'ar' ? 'UI/UX والهوية' : 'UI/UX & Branding' },
    { id: 'erp', label: locale === 'ar' ? 'أنظمة ERP' : 'ERP Systems' },
    { id: 'tools', label: locale === 'ar' ? 'الأدوات والذكاء الاصطناعي' : 'Tools & AI' }
  ];

  const filteredProjects = data.projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
    const title = proj.title[locale].toLowerCase();
    const summary = proj.summary[locale].toLowerCase();
    const tags = proj.tags.join(' ').toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || title.includes(query) || summary.includes(query) || tags.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">
            <FolderGit2 size={14} />
            <span>{locale === 'ar' ? 'معرض الأعمال والمشاريع' : 'Featured Projects Showcase'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'مشاريع حقيقية مطبقة بأنظمة برمجية متقدمة' : 'Production-Ready Software & Real Products'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'مجموعة مختارة من المشاريع البرمجية وتطبيقات الهواتف والمنصات الرقمية المنشورة على GitHub والمطورة بأحدث المعايير.'
              : 'A curated selection of production mobile applications, web platforms, and design tools hosted on GitHub.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            marginBottom: '3rem'
          }}
        >
          {/* Search Box */}
          <div 
            style={{
              position: 'relative',
              maxWidth: '520px',
              marginInline: 'auto',
              width: '100%'
            }}
          >
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: locale === 'ar' ? '1rem' : 'auto',
                left: locale === 'ar' ? 'auto' : '1rem',
                color: 'var(--text-muted)'
              }} 
            />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'ابحث عن مشروع أو تقنية (Flutter, React, SQLite)...' : 'Search projects or tech stack (Flutter, React, ERP)...'}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                paddingRight: locale === 'ar' ? '2.8rem' : '1.25rem',
                paddingLeft: locale === 'ar' ? '1.25rem' : '2.8rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.96rem',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
            />
          </div>

          {/* Category Filter Pills */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.88rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <Layers size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.1rem' }}>
              {locale === 'ar' ? 'لم يتم العثور على مشاريع تطابق البحث.' : 'No projects match your search.'}
            </p>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1.75rem'
            }}
          >
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="card"
                style={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveProject(project)}
              >
                {/* Project Image Box */}
                <div 
                  style={{
                    position: 'relative',
                    height: '210px',
                    width: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={project.coverImage} 
                    alt={project.title[locale]} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(16, 20, 29, 0.85) 0%, transparent 60%)'
                    }} 
                  />
                  
                  {/* Category Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: locale === 'ar' ? '1rem' : 'auto',
                      left: locale === 'ar' ? 'auto' : '1rem',
                    }}
                  >
                    <span 
                      className="badge" 
                      style={{ 
                        backgroundColor: 'rgba(16, 20, 29, 0.85)', 
                        backdropFilter: 'blur(8px)',
                        color: 'var(--accent)',
                        borderColor: 'rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {project.categoryLabel[locale]}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      right: locale === 'ar' ? '1rem' : 'auto',
                      left: locale === 'ar' ? 'auto' : '1rem',
                    }}
                  >
                    <span 
                      className="badge" 
                      style={{ 
                        backgroundColor: '#10B981', 
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {project.title[locale]}
                    </h3>
                    <ArrowUpRight size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                    {project.summary[locale]}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.25rem' }}>
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="badge" style={{ fontSize: '0.75rem' }}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="badge" style={{ fontSize: '0.75rem' }}>
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '0.85rem',
                      marginTop: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600 }}>
                      {locale === 'ar' ? 'استعراض دراسة المشروع' : 'View Case Study'}
                    </span>
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-secondary"
                        style={{ padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)' }}
                        title="GitHub Repository"
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </section>
  );
};
