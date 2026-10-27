import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Code, 
  Palette, 
  Cpu, 
  BookOpen 
} from 'lucide-react';

export const Experience: React.FC = () => {
  const { locale, data } = usePortfolio();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'development':
        return <Code size={18} color="var(--accent)" />;
      case 'design':
        return <Palette size={18} color="#EC4899" />;
      case 'support':
        return <Cpu size={18} color="#F59E0B" />;
      case 'teaching':
        return <BookOpen size={18} color="#10B981" />;
      default:
        return <Briefcase size={18} color="var(--accent)" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'development':
        return locale === 'ar' ? 'تطوير وبرمجة' : 'Development';
      case 'design':
        return locale === 'ar' ? 'تصميم وإعلام' : 'Design & Media';
      case 'support':
        return locale === 'ar' ? 'دعم فني وصيانة' : 'Tech Support';
      case 'teaching':
        return locale === 'ar' ? 'تدريس وتدريب' : 'Instruction';
      default:
        return locale === 'ar' ? 'مهني' : 'Professional';
    }
  };

  return (
    <section id="experience" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Briefcase size={14} />
            <span>{locale === 'ar' ? 'المسار المهني' : 'Career Timeline'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'خبرات مهنية متراكمة تجمع البرمجة والدعم والتصميم' : 'Multidisciplinary Professional Experience'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'سجل الخبرات العملية الموثقة في شركات ومؤسسات تقنية وتدريبية رائدة في العاصمة صنعاء.'
              : 'Documented work history across software development, digital media, technical support, and education.'}
          </p>
        </div>

        {/* Timeline Container */}
        <div 
          style={{
            position: 'relative',
            maxWidth: '840px',
            marginInline: 'auto'
          }}
        >
          {/* Vertical Timeline Guide Line */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: locale === 'ar' ? '24px' : 'auto',
              left: locale === 'ar' ? 'auto' : '24px',
              width: '2px',
              backgroundColor: 'var(--border-subtle)',
              zIndex: 0
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
            {data.experiences.map((exp) => (
              <div 
                key={exp.id}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start'
                }}
              >
                {/* Timeline Dot with Icon */}
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '2px solid var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px var(--accent-glow)',
                    flexShrink: 0
                  }}
                >
                  {getTypeIcon(exp.type)}
                </div>

                {/* Experience Card */}
                <div 
                  className="card"
                  style={{
                    flex: 1,
                    padding: '1.75rem',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                >
                  {/* Header: Role & Period */}
                  <div 
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.65rem'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.28rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {exp.role[locale]}
                      </h3>
                      <div style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--accent)', marginTop: '2px' }}>
                        {exp.organization[locale]}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' }}>
                        {getTypeBadge(exp.type)}
                      </span>
                      <span className="badge" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                        <Calendar size={13} />
                        <span>{exp.period[locale]}</span>
                      </span>
                    </div>
                  </div>

                  {/* Location Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                    <MapPin size={14} />
                    <span>{exp.location[locale]}</span>
                  </div>

                  {/* Responsibilities Bullet List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {exp.responsibilities[locale].map((resp, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
