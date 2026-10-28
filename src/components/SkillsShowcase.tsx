import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, CheckCircle2 } from 'lucide-react';

export const SkillsShowcase: React.FC = () => {
  const { locale, data } = usePortfolio();

  return (
    <section id="skills" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <Cpu size={14} />
            <span>{locale === 'ar' ? 'المهارات التقنية والتصميمية' : 'Skills & Technologies'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'أدوات وحلول برمجية وبصرية متكاملة' : 'Integrated Technical & Design Toolset'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'مجموعة المهارات العملية واللغات البرمجية وبرامج التصميم التي أعتمد عليها في تنفيذ المشاريع.'
              : 'Core programming languages, frameworks, design tools, and IT infrastructure capabilities.'}
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
            gap: '2rem'
          }}
        >
          {data.skills.map((cat) => (
            <div 
              key={cat.id}
              className="card"
              style={{
                padding: '1.75rem',
                backgroundColor: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <h3 
                style={{
                  fontSize: '1.22rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  borderBottom: '2px solid var(--accent)',
                  paddingBottom: '0.65rem',
                  display: 'inline-block',
                  width: 'fit-content'
                }}
              >
                {cat.title[locale]}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--accent)" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

