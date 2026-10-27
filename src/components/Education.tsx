import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  Building2,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';

export const Education: React.FC = () => {
  const { locale, data } = usePortfolio();

  return (
    <section id="education" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <GraduationCap size={14} />
            <span>{locale === 'ar' ? 'المؤهلات والشهادات' : 'Education & Certifications'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'التحصيل الأكاديمي والشهادات التخصصية المعتمدة' : 'Academic Degrees & Certified Credentials'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'مؤهلات جامعية ودبلومات معتمدة ودورات تخصصية في تقنية المعلومات، الشبكات، الأمن السيبراني، والتصميم.'
              : 'University degrees, accredited diplomas, and industry certifications across IT, Cisco networking, security, and design.'}
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {/* Column 1: Academic Degrees */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <GraduationCap size={22} color="var(--accent)" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'المؤهلات الأكاديمية' : 'Academic Degrees'}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {data.education.map((edu) => (
                <div 
                  key={edu.id}
                  className="card"
                  style={{
                    padding: '1.6rem',
                    backgroundColor: 'var(--bg-main)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {edu.degree[locale]}
                    </h4>
                    <span className="badge" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                      {edu.period[locale]}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    <Building2 size={15} />
                    <span>{edu.institution[locale]}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', color: '#10B981', fontWeight: 600, marginBottom: '0.65rem' }}>
                    <FileCheck2 size={16} />
                    <span>{edu.status[locale]}</span>
                  </div>

                  {edu.grade && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      {edu.grade[locale]}
                    </div>
                  )}

                  {edu.details && (
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem', marginTop: '0.5rem' }}>
                      {edu.details[locale]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Professional Certifications & Training */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <ShieldCheck size={22} color="#10B981" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'الشهادات والدورات المعتمدة' : 'Certifications & Training'}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: 'var(--bg-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent)',
                        flexShrink: 0
                      }}
                    >
                      <Award size={20} />
                    </div>

                    <div>
                      <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                        {cert.title[locale]}
                      </h4>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                        {cert.issuer[locale]}
                      </div>
                    </div>
                  </div>

                  <span className="badge" style={{ flexShrink: 0, fontWeight: 700 }}>
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
