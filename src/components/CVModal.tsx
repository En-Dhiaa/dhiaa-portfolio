import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Printer, 
  Download, 
  Languages, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award,
  Layers
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { Locale } from '../types';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { data, locale: initialLocale } = usePortfolio();
  const [cvLocale, setCvLocale] = useState<Locale>(initialLocale);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="no-print"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(10px)',
        zIndex: 200,
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
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Controls (Language Toggle, Print, Close) */}
        <div 
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-surface)',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => setCvLocale(cvLocale === 'ar' ? 'en' : 'ar')}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Languages size={16} />
              <span>{cvLocale === 'ar' ? 'Switch to English CV' : 'عرض السيرة بالعربية'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              <span>{cvLocale === 'ar' ? 'طباعة / حفظ PDF' : 'Print / Save PDF'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.45rem', borderRadius: '50%' }}
            aria-label="Close CV"
          >
            <X size={20} />
          </button>
        </div>

        {/* Printable CV Document Content */}
        <div 
          className="cv-printable"
          dir={cvLocale === 'ar' ? 'rtl' : 'ltr'}
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: '1rem',
            fontFamily: cvLocale === 'ar' ? 'var(--font-arabic)' : 'var(--font-english)',
            lineHeight: 1.6
          }}
        >
          {/* CV Header */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              borderBottom: '2px solid var(--accent)',
              paddingBottom: '1.5rem',
              marginBottom: '1.75rem'
            }}
          >
            <img 
              src={data.avatarImage} 
              alt={data.profile.name[cvLocale]}
              style={{
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent)',
                flexShrink: 0
              }} 
            />

            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 900, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                {data.profile.name[cvLocale]}
              </h1>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.65rem' }}>
                {data.profile.title[cvLocale]}
              </div>

              {/* Contact meta strip */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={14} color="var(--accent)" />
                  <span dir="ltr">{data.profile.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Phone size={14} color="#10B981" />
                  <span dir="ltr">{data.profile.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} color="var(--accent)" />
                  <span>{data.profile.location[cvLocale]}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <GithubIcon size={14} />
                  <span dir="ltr">github.com/En-Dhiaa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Profile */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.4rem',
                marginBottom: '0.75rem'
              }}
            >
              {cvLocale === 'ar' ? 'الملخص المهني' : 'Professional Summary'}
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {data.profile.fullBio[cvLocale]}
            </p>
          </div>

          {/* Section 2: Education */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.4rem',
                marginBottom: '0.75rem'
              }}
            >
              {cvLocale === 'ar' ? 'التعليم والمؤهلات الأكاديمية' : 'Education & Qualifications'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '0.98rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{edu.degree[cvLocale]}</span>
                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{edu.period[cvLocale]}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {edu.institution[cvLocale]} • {edu.status[cvLocale]}
                    {edu.grade && ` (${edu.grade[cvLocale]})`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Work Experience */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.4rem',
                marginBottom: '0.75rem'
              }}
            >
              {cvLocale === 'ar' ? 'الخبرات المهنية' : 'Work Experience'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, fontSize: '0.98rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{exp.role[cvLocale]}</span>
                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{exp.period[cvLocale]}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    {exp.organization[cvLocale]} — {exp.location[cvLocale]}
                  </div>
                  <ul style={{ paddingRight: cvLocale === 'ar' ? '1.25rem' : '0', paddingLeft: cvLocale === 'ar' ? '0' : '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {exp.responsibilities[cvLocale].map((resp, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Certified Training & Certificates */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.4rem',
                marginBottom: '0.75rem'
              }}
            >
              {cvLocale === 'ar' ? 'الدورات والشهادات المعتمدة' : 'Certifications & Training'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {data.certifications.map((c) => (
                <div key={c.id} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Award size={14} color="var(--accent)" flex-shrink="0" />
                  <span><strong>{c.title[cvLocale]}</strong> — {c.issuer[cvLocale]} ({c.year})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Technical Skills Summary */}
          <div style={{ marginBottom: '1rem' }}>
            <h2 
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.4rem',
                marginBottom: '0.75rem'
              }}
            >
              {cvLocale === 'ar' ? 'المهارات والقدرات التقنية' : 'Key Technical Skills'}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {data.skills.flatMap(cat => cat.skills).map((skill, i) => (
                <span key={i} className="badge" style={{ fontSize: '0.8rem' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Footer */}
          <div 
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.85rem',
              marginTop: '1.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textAlign: 'center'
            }}
          >
            {cvLocale === 'ar'
              ? 'المراجع الأكاديمية والمهنية وشهادات الخبرة متوفرة عند الطلب.'
              : 'Academic and professional references are available upon request.'}
          </div>
        </div>

      </div>
    </div>
  );
};
