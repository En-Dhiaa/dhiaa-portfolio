import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Clock 
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

export const Contact: React.FC = () => {
  const { locale, data, addMessage } = usePortfolio();

  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'mobile',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'mobile', label: locale === 'ar' ? 'تطوير تطبيقات الجوال (Flutter)' : 'Mobile App Development (Flutter)' },
    { id: 'web', label: locale === 'ar' ? 'تطوير منصات ومواقع الويب' : 'Web Platform Development' },
    { id: 'uiux', label: locale === 'ar' ? 'تصميم واجهات المستخدم UI/UX والهوية' : 'UI/UX & Brand Design' },
    { id: 'support', label: locale === 'ar' ? 'استشارات ودعم فني وصيانة IT' : 'IT Technical Support & Consulting' },
    { id: 'hiring', label: locale === 'ar' ? 'فرصة عمل وتوظيف مهني' : 'Career / Job Opportunity' },
    { id: 'other', label: locale === 'ar' ? 'استفسار أو تعاون آخر' : 'General Inquiry / Collaboration' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    setTimeout(() => {
      addMessage({
        name: form.name,
        email: form.email,
        category: form.category,
        message: form.message
      });

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const whatsappUrl = `https://wa.me/${data.profile.whatsapp}?text=${encodeURIComponent(
    locale === 'ar'
      ? `مرحباً مهندس ضياء، يسعدني التواصل معك عبر موقعك المهني بخصوص: ${form.category}`
      : `Hello Eng. Dhiaa, I am reaching out through your portfolio website regarding: ${form.category}`
  )}`;

  return (
    <section id="contact" style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag">
            <Mail size={13} />
            <span>{locale === 'ar' ? 'تواصل معي' : 'Get In Touch'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'لنبدأ العمل معاً على مشروعك القادم' : 'Let\'s Build Something Exceptional Together'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'متاح لمناقشة فرص التوظيف، المشاريع المستقلة، الاستشارات التقنية، وتطوير التطبيقات والأنظمة.'
              : 'Available for full-time opportunities, engineering contracts, technical consultation, and digital products.'}
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: '2.25rem',
            alignItems: 'flex-start'
          }}
        >
          {/* Direct Contact Channels Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            
            {/* WhatsApp Card */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                backgroundColor: 'rgba(16, 185, 129, 0.05)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MessageSquare size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
                  {locale === 'ar' ? 'محادثة مباشرة عبر واتساب' : 'Direct Instant WhatsApp'}
                </div>
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-primary)' }} dir="ltr">
                  {data.profile.phone}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'انقر لفتح المحادثة مباشرة' : 'Click to start direct chat'}
                </div>
              </div>
              <ExternalLink size={16} color="#10B981" />
            </a>

            {/* Email Card */}
            <a 
              href={`mailto:${data.profile.email}`}
              className="card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Mail size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700 }}>
                  {locale === 'ar' ? 'البريد الإلكتروني المهني' : 'Official Professional Email'}
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)', wordBreak: 'break-all' }} dir="ltr">
                  {data.profile.email}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'إرسال بريد إلكتروني مباشر' : 'Click to compose email'}
                </div>
              </div>
              <ExternalLink size={16} color="var(--text-muted)" />
            </a>

            {/* Facebook Card */}
            <a 
              href={data.profile.facebook || 'https://www.facebook.com/share/14tD7vqteaR/'}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem',
                border: '1px solid rgba(24, 119, 242, 0.25)',
                backgroundColor: 'rgba(24, 119, 242, 0.04)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#1877F2',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <FacebookIcon size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', color: '#1877F2', fontWeight: 700 }}>
                  {locale === 'ar' ? 'صفحة الفيسبوك الرسمية' : 'Official Facebook Page'}
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }} dir="ltr">
                  facebook.com/share/14tD7vqteaR
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'متابعة وتواصل على Facebook' : 'Connect on Facebook'}
                </div>
              </div>
              <ExternalLink size={16} color="#1877F2" />
            </a>

            {/* Instagram Card */}
            <a 
              href={data.profile.instagram || 'https://www.instagram.com/eng.d.hm?obrf=b2lpeXJwb3cxZmwz'}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem',
                border: '1px solid rgba(225, 48, 108, 0.25)',
                backgroundColor: 'rgba(225, 48, 108, 0.04)'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <InstagramIcon size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', color: '#DD2A7B', fontWeight: 700 }}>
                  {locale === 'ar' ? 'حساب الانستجرام' : 'Instagram Profile'}
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }} dir="ltr">
                  @eng.d.hm
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'متابعة الأعمال والتصاميم على Instagram' : 'View design & visual works'}
                </div>
              </div>
              <ExternalLink size={16} color="#DD2A7B" />
            </a>

            {/* GitHub Profile Card */}
            <a 
              href={data.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem'
              }}
            >
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <GithubIcon size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  GitHub Profile
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }} dir="ltr">
                  github.com/En-Dhiaa
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'استعراض كافة المستودعات والأكواد' : 'Explore repositories and code'}
                </div>
              </div>
              <ExternalLink size={16} color="var(--text-muted)" />
            </a>

            {/* Availability Note */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                fontSize: '0.82rem'
              }}
            >
              <Clock size={16} color="var(--accent)" />
              <span>
                {locale === 'ar' 
                  ? 'متاح للرد السريع خلال أوقات العمل الرسمية (توقيت صنعاء GMT+3).'
                  : 'Fast response during standard working hours (Sana\'a Time GMT+3).'}
              </span>
            </div>

          </div>

          {/* Interactive Form Column */}
          <div 
            className="card"
            style={{
              padding: '1.75rem',
              backgroundColor: 'var(--bg-main)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {locale === 'ar' ? 'تم استلام رسالتك بنجاح!' : 'Message Received Successfully!'}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  {locale === 'ar' 
                    ? `شكراً لتواصلك يا ${form.name}. سأقوم بالرد عليك عبر بريدك الإلكتروني في أقرب وقت.`
                    : `Thank you for reaching out, ${form.name}. I will review your inquiry and get back to you promptly.`}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <a 
                    href={`https://wa.me/${data.profile.whatsapp}?text=${encodeURIComponent(
                      `مرحباً مهندس ضياء، أنا ${form.name} وأرسلت لك رسالة عبر موقعك: ${form.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    <MessageSquare size={16} />
                    <span>{locale === 'ar' ? 'إرسال نفس الرسالة عبر واتساب أيضاً' : 'Send via WhatsApp as well'}</span>
                  </a>

                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', category: 'mobile', message: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <span>{locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'أرسل رسالة مباشرة' : 'Send a Direct Inquiry'}
                </h3>

                {/* Name Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {locale === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input 
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={locale === 'ar' ? 'مثال: أحمد محمد' : 'e.g. John Smith'}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {locale === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                  </label>
                  <input 
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    dir="ltr"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                {/* Category Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {locale === 'ar' ? 'نوع الطلب أو الاستفسار' : 'Inquiry Category'}
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id} style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    {locale === 'ar' ? 'نص الرسالة أو تفاصيل المشروع *' : 'Message Details *'}
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={locale === 'ar' ? 'اكتب تفاصيل طلبك أو فكرة مشروعك هنا...' : 'Describe your project, timeline, or inquiry here...'}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
                >
                  <Send size={16} />
                  <span>{loading ? (locale === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') : (locale === 'ar' ? 'إرسال الرسالة' : 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
