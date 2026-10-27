import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  User, 
  Code, 
  Palette, 
  Cpu, 
  Network, 
  CheckCircle, 
  GraduationCap, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const About: React.FC = () => {
  const { locale, data } = usePortfolio();

  const competencies = [
    {
      icon: <Code size={24} color="var(--accent)" />,
      title: locale === 'ar' ? 'تطوير التطبيقات والبرمجيات' : 'Mobile & Software Engineering',
      desc: locale === 'ar' 
        ? 'بناء تطبيقات جوال متقدمة بـ Flutter وDart، معمارية نظيفة Clean Architecture، وربط فعال مع قواعد البيانات المحلية والسحابية.'
        : 'Building high-performance Flutter mobile apps, clean architecture patterns, and resilient offline/cloud data persistence.'
    },
    {
      icon: <Palette size={24} color="#EC4899" />,
      title: locale === 'ar' ? 'تصميم واجهات المستخدم UI/UX والهوية' : 'UI/UX Design & Visual Identity',
      desc: locale === 'ar'
        ? 'تصميم تجارب رقمية ممتعة، نماذج تفاعلية بـ Figma، وهويات بصرية كاملة باستخدام حزمة Adobe (Photoshop, Illustrator, InDesign).'
        : 'Designing intuitive digital experiences, Figma interactive prototypes, and cohesive branding systems using Adobe Creative Cloud.'
    },
    {
      icon: <Network size={24} color="#10B981" />,
      title: locale === 'ar' ? 'أساسيات الشبكات والأمن السيبراني' : 'Networking & Cyber Defense',
      desc: locale === 'ar'
        ? 'معرفة راسخة بأساسيات الشبكات وهندستها وبروتوكولات الأمان مع شهادات معتمدة من أكاديمية سيسكو العالمية Cisco Networking Academy.'
        : 'Solid grounding in network topology, IP routing, and foundational cybersecurity verified by official Cisco Academy credentials.'
    },
    {
      icon: <Cpu size={24} color="#F59E0B" />,
      title: locale === 'ar' ? 'الدعم الفني وصيانة الأجهزة والأنظمة' : 'Technical Support & Diagnostics',
      desc: locale === 'ar'
        ? 'خبرة عملية ممتدة في تشخيص وحل أعطال الحواسيب والعتاد وترقية الأنظمة وحل المشكلات التقنية للمؤسسات والمستخدمين.'
        : 'Extensive hands-on expertise diagnosing PC hardware faults, system tuning, operating systems, and end-user technical support.'
    }
  ];

  return (
    <section id="about" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <User size={14} />
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          
          {/* Image & Key Attributes Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid var(--border-hover)',
                boxShadow: 'var(--shadow-lg)'
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
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(16, 20, 29, 0.95), transparent)',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  {data.profile.name[locale]}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  {locale === 'ar' ? 'بكالوريوس تقنية معلومات | جامعة الحكمة' : 'B.S. Information Technology | Al-Hikma Univ.'}
                </div>
              </div>
            </div>

            {/* Quick Points List */}
            <div 
              className="card"
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem' }}>
                <CheckCircle size={18} color="#10B981" />
                <span>{locale === 'ar' ? 'إتقان تام للغتين العربية والإنجليزية' : 'Fluent Bilingual (Arabic & English)'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem' }}>
                <CheckCircle size={18} color="#10B981" />
                <span>{locale === 'ar' ? 'مشاريع حقيقية مفتوحة المصدر على GitHub' : 'Proven Open-Source Code on GitHub'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem' }}>
                <CheckCircle size={18} color="#10B981" />
                <span>{locale === 'ar' ? 'التزام تام بالجودة والمواعيد المحددة' : 'Commitment to Quality & Deadlines'}</span>
              </div>
            </div>
          </div>

          {/* Biography & Competency Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Detailed Bio Paragraph */}
            <div 
              className="card"
              style={{
                padding: '2rem',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {locale === 'ar' ? 'الملف التعريفي والمنهجية' : 'Profile & Engineering Philosophy'}
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                {data.profile.fullBio[locale]}
              </p>
            </div>

            {/* 4 Core Competency Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {competencies.map((comp, idx) => (
                <div 
                  key={idx}
                  className="card"
                  style={{
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div 
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {comp.icon}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {comp.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
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
