import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  User, 
  Code, 
  Palette, 
  Cpu, 
  Network, 
  CheckCircle
} from 'lucide-react';

export const About: React.FC = () => {
  const { locale, data } = usePortfolio();

  const competencies = [
    {
      icon: <Code size={22} color="var(--accent)" />,
      title: locale === 'ar' ? 'تطوير التطبيقات والبرمجيات' : 'Mobile & Software Engineering',
      desc: locale === 'ar' 
        ? 'بناء تطبيقات جوال متقدمة بـ Flutter وDart، معمارية نظيفة Clean Architecture، وربط فعال مع قواعد البيانات المحلية والسحابية.'
        : 'Building high-performance Flutter mobile apps, clean architecture patterns, and resilient offline/cloud data persistence.'
    },
    {
      icon: <Palette size={22} color="#EC4899" />,
      title: locale === 'ar' ? 'تصميم واجهات المستخدم UI/UX والهوية' : 'UI/UX Design & Visual Identity',
      desc: locale === 'ar'
        ? 'تصميم تجارب رقمية ممتعة، نماذج تفاعلية بـ Figma، وهويات بصرية كاملة باستخدام حزمة Adobe (Photoshop, Illustrator, InDesign).'
        : 'Designing intuitive digital experiences, Figma interactive prototypes, and cohesive branding systems using Adobe Creative Cloud.'
    },
    {
      icon: <Network size={22} color="#10B981" />,
      title: locale === 'ar' ? 'أساسيات الشبكات والأمن السيبراني' : 'Networking & Cyber Defense',
      desc: locale === 'ar'
        ? 'معرفة راسخة بأساسيات الشبكات وهندستها وبروتوكولات الأمان مع شهادات معتمدة من أكاديمية سيسكو العالمية Cisco Networking Academy.'
        : 'Solid grounding in network topology, IP routing, and foundational cybersecurity verified by official Cisco Academy credentials.'
    },
    {
      icon: <Cpu size={22} color="#F59E0B" />,
      title: locale === 'ar' ? 'الدعم الفني وصيانة الأجهزة والأنظمة' : 'Technical Support & Diagnostics',
      desc: locale === 'ar'
        ? 'خبرة عملية ممتدة في تشخيص وحل أعطال الحواسيب والعتاد وترقية الأنظمة وحل المشكلات التقنية للمؤسسات والمستخدمين.'
        : 'Extensive hands-on expertise diagnosing PC hardware faults, system tuning, operating systems, and end-user technical support.'
    }
  ];

  return (
    <section id="about" style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <User size={13} />
            <span>{locale === 'ar' ? 'عن المهندس' : 'Professional Biography'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'التفكير الهندسي يلتقي بالإبداع البصري' : 'Engineering Rigor Meets Visual Creativity'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'نبذة شاملة عن المسيرة الأكاديمية والمهنية للمهندس ضياء الحميري والمجالات التي يقدم فيها حلولاً عملية متقنة.'
              : 'A comprehensive overview of Eng. Dhiaa Al-Hmiri\'s academic background, multidisciplinary skillset, and professional philosophy.'}
          </p>
        </div>

        {/* Content Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          
          {/* Image & Key Attributes Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '340px',
                borderRadius: '22px',
                overflow: 'hidden',
                border: '2px solid var(--border-hover)',
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: 'var(--bg-elevated)'
              }}
            >
              <img 
                src={data.aboutImage} 
                alt={data.profile.name[locale]} 
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Theme-Aware Frosted Glass Caption */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  borderTop: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>
                  {data.profile.name[locale]}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'بكالوريوس تقنية معلومات | جامعة الحكمة' : 'B.S. Information Technology | Al-Hikma Univ.'}
                </div>
              </div>
            </div>

            {/* Quick Points List */}
            <div 
              className="card"
              style={{
                width: '100%',
                maxWidth: '340px',
                padding: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
                <CheckCircle size={16} color="#10B981" />
                <span>{locale === 'ar' ? 'إتقان تام للغتين العربية والإنجليزية' : 'Fluent Bilingual (Arabic & English)'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
                <CheckCircle size={16} color="#10B981" />
                <span>{locale === 'ar' ? 'مشاريع حقيقية مفتوحة المصدر على GitHub' : 'Proven Open-Source Code on GitHub'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
                <CheckCircle size={16} color="#10B981" />
                <span>{locale === 'ar' ? 'التزام تام بالجودة والمواعيد المحددة' : 'Commitment to Quality & Deadlines'}</span>
              </div>
            </div>
          </div>

          {/* Biography & Competency Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Detailed Bio Paragraph */}
            <div 
              className="card"
              style={{
                padding: '1.6rem',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'الملف التعريفي والمنهجية' : 'Profile & Engineering Philosophy'}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {data.profile.fullBio[locale]}
              </p>
            </div>

            {/* 4 Core Competency Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem'
              }}
            >
              {competencies.map((comp, idx) => (
                <div 
                  key={idx}
                  className="card"
                  style={{
                    padding: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}
                >
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {comp.icon}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {comp.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {comp.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
