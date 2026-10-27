import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  heroImage: './images/hero-portrait-fade.webp',
  avatarImage: './images/avatar.webp',
  aboutImage: './images/about-portrait.webp',
  profile: {
    name: {
      ar: 'م. ضياء عبدالرحمن غالب الحميري',
      en: 'Eng. Dhiaa Abdulrahman Ghalib Al-Hmiri'
    },
    displayName: {
      ar: 'م. ضياء الحميري',
      en: 'Eng. Dhiaa Al-Hmiri'
    },
    title: {
      ar: 'مهندس تقنية معلومات | مطور برمجيات | مصمم UI/UX وجرافيك',
      en: 'IT Engineer | Software Developer | UI/UX & Graphic Designer'
    },
    specialties: {
      ar: [
        'تطوير تطبيقات الجوال و Flutter',
        'تصميم واجهات وتجربة المستخدم UI/UX',
        'تطوير تطبيقات الويب ولوحات التحكم ERP',
        'الدعم الفني والتشخيص وصيانة الحواسيب',
        'أساسيات الشبكات والبنية التحتية IT'
      ],
      en: [
        'Flutter & Cross-Platform Mobile Apps',
        'UI/UX & Interactive Product Design',
        'Full-Stack Web & ERP Dashboards',
        'IT Technical Support & Device Diagnostics',
        'Networking Fundamentals & IT Infrastructure'
      ]
    },
    shortBio: {
      ar: 'مهندس تقنية معلومات يجمع بين التفكير الهندسي الدقيق والإبداع البصري لتطوير تطبيقات عملية، واجهات مستخدم جذابة، وحلول تقنية موثوقة تلبي احتياجات المؤسسات والمستخدمين.',
      en: 'Information Technology Engineer combining disciplined engineering and visual creativity to build robust applications, intuitive UI/UX experiences, and dependable IT solutions.'
    },
    fullBio: {
      ar: 'مهندس تقنية معلومات يمتلك خلفية مهنية متعددة المجالات تجمع بين تطوير تطبيقات الجوال باستخدام Flutter وDart، وتصميم واجهات وتجربة المستخدم UI/UX، والتصميم البصري والهوية المؤسسية، بالإضافة إلى خبرة عملية واسعة في الدعم الفني، تشخيص مشكلات الأجهزة والأنظمة، وأساسيات الشبكات. حاصل على بكالوريوس تقنية معلومات من جامعة الحكمة ودبلومات متخصصة في اللغة الإنجليزية والتصميم الجرافيكي وتدريبات معتمدة من Cisco في الشبكات والأمن السيبراني.',
      en: 'Information Technology Engineer with a multidisciplinary background spanning mobile application development with Flutter & Dart, UI/UX interaction design, visual identity, and extensive hands-on experience in technical support, computer diagnostics, and networking fundamentals. Holds a Bachelor of IT from Al-Hikma University, advanced diplomas in English and Graphic Design, and certified Cisco academy credentials in networking and cybersecurity.'
    },
    location: {
      ar: 'صنعاء، الجمهورية اليمنية',
      en: 'Sana\'a, Republic of Yemen'
    },
    email: 'dhiaa.org@gmail.com',
    phone: '+967 777117683',
    whatsapp: '967777117683',
    github: 'https://github.com/En-Dhiaa',
    stats: {
      yearsExperience: 5,
      completedProjects: 18,
      repositoriesCount: 28
    }
  },
  projects: [
    {
      id: 'proj-1',
      slug: 'hisabi',
      title: {
        ar: 'نظام حِسابي الشامل (Hisabi)',
        en: 'Hisabi Financial & Debt Ledger Platform'
      },
      summary: {
        ar: 'منصة مالية شاملة لإدارة الديون، القيود المحاسبية، الفواتير، وصناديق النقد مع معمارية Offline-First ونظام نسخ احتياطي سحابي ومحلي متعدد المستويات.',
        en: 'Comprehensive financial, debt ledger, invoicing, and cashbox platform built with offline-first local database and multi-tier encrypted cloud/local backup.'
      },
      description: {
        ar: 'تطبيق متكامل تم تطويره لتلبية احتياجات أصحاب الأعمال والمتاجر لتتبع المعاملات المالية، الديون، الفواتير الدورية، والتقارير التحليلية بدقة بالغة. يتميز بواجهة عربية أولاً فائقة السلاسة، دعم العمل بدون إنترنت، ونسخ احتياطي متعدد المستويات لضمان عدم فقدان أي بيانات.',
        en: 'A full-scale financial application engineered for business owners and retailers to track financial records, customer debts, recurring invoices, and analytical cash flows. Features an Arabic-first fluid UI, true offline-first SQLite synchronization, and automated multi-tier backups.'
      },
      category: 'mobile',
      categoryLabel: {
        ar: 'تطبيقات الجوال والأنظمة المالية',
        en: 'Mobile & Financial Systems'
      },
      tags: ['Flutter', 'Dart', 'SQLite', 'Clean Architecture', 'Multi-Tier Backup', 'UI/UX'],
      githubUrl: 'https://github.com/En-Dhiaa/hisabi',
      coverImage: './images/showcase-portrait.webp',
      isFeatured: true,
      status: 'Production',
      highlights: {
        ar: [
          'إدارة شاملة لدفاتر الديون والسندات المالية',
          'نظام نسخ احتياطي مشفر محلي وسحابي',
          'تقارير تفاعلية وتصدير PDF وكشوفات حساب',
          'تصميم واجهات احترافي مريح وسهل الاستخدام'
        ],
        en: [
          'Comprehensive debt ledgers and financial vouchers',
          'Encrypted multi-tier local and cloud backups',
          'Interactive reports and PDF account statements',
          'Modern, high-ergonomics Arabic/English UI'
        ]
      }
    },
    {
      id: 'proj-2',
      slug: 'umco-pharma',
      title: {
        ar: 'منصة شركة يومكو للأدوية (UMCO Pharma)',
        en: 'UMCO Pharmaceuticals Enterprise Platform'
      },
      summary: {
        ar: 'منصة ويب وعمليات رقمية متطورة ثنائية اللغة لشركة يومكو للأدوية لعرض الكتالوج الدوائي، التوكيلات العالمية، وإدارة التواصل المؤسسي.',
        en: 'Modern bilingual enterprise web and operations management platform for UMCO Pharmaceuticals showcasing medical portfolios, global agencies, and operations.'
      },
      description: {
        ar: 'تم بناء المنصة بأحدث تقنيات الويب لتقديم واجهة مؤسسية راقية تدعم اللغتين العربية والإنجليزية. تتضمن دليلاً تفاعلياً للأدوية المصنفة، تفاصيل التوكيلات العالمية المعتمدة، وبوابة طلب عروض أسعار وتواصل مهني آمن.',
        en: 'Engineered using modern web technologies to present a premium bilingual corporate identity. Includes an interactive pharmaceutical directory, certified international agency portfolios, and enterprise inquiry pipelines.'
      },
      category: 'web',
      categoryLabel: {
        ar: 'تطبيقات الويب والمؤسسات',
        en: 'Enterprise Web Platforms'
      },
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js Arch', 'Bilingual', 'Pharma Operations'],
      githubUrl: 'https://github.com/En-Dhiaa/umco-pharma',
      coverImage: './images/about-portrait.webp',
      isFeatured: true,
      status: 'Production',
      highlights: {
        ar: [
          'واجهة ثنائية اللغة تدعم RTL/LTR بالكامل',
          'دليل أدوية تفاعلي مع فلترة متقدمة وبحث سريع',
          'أداء عالي وسرعة استجابة فائقة وفق معايير SEO'
        ],
        en: [
          'Fully native RTL & LTR bilingual experience',
          'Interactive pharmaceutical catalog with instant search',
          'Top-tier SEO performance and accessibility'
        ]
      }
    },
    {
      id: 'proj-3',
      slug: 'brand-testing',
      title: {
        ar: 'استوديو ألوان الشعارات والهوية (Brand Testing)',
        en: 'Logo Color Studio & Brand Testing Web App'
      },
      summary: {
        ar: 'تطبيق ويب عربي رائد لاختبار وتلوين الشعارات التفاعلية SVG وتطبيق لوحات وتدرجات الألوان والتصويت وتصدير الشعارات بدقة عالية.',
        en: 'Modern Arabic-first Logo Color Studio web application allowing designers and clients to customize SVG logos, apply palette gradients, vote, and export.'
      },
      description: {
        ar: 'أداة مبتكرة للمصممين والعملاء لتجربة تركيبات لونية حية على شعارات SVG، استخراج كود الألوان، حفظ المقترحات، والتصويت التشاركي مع إمكانية التصدير بصيغ PNG وJPG وتجربة تطبيق PWA للهواتف.',
        en: 'An innovative tool for designers and brands to test live color combinations on SVG vectors, extract hex codes, participate in design voting, and export high-resolution assets with mobile PWA support.'
      },
      category: 'uiux',
      categoryLabel: {
        ar: 'تصميم UI/UX وأدوات الهوية',
        en: 'UI/UX & Brand Identity'
      },
      tags: ['TypeScript', 'PWA', 'SVG Manipulation', 'Tailwind CSS', 'Color Theory', 'Graphic Design'],
      githubUrl: 'https://github.com/En-Dhiaa/Brand-testing',
      coverImage: './images/hero-portrait.webp',
      isFeatured: true,
      status: 'Completed',
      highlights: {
        ar: [
          'تعديل ديناميكي لطبقات ومسارات SVG اللونية',
          'لوحات ألوان مدروسة متوافقة مع نظريات التصميم',
          'تصدير فوري بجودة طباعية ورقمية'
        ],
        en: [
          'Dynamic SVG layer & path recoloring engine',
          'Curated color palettes based on design harmony',
          'Instant high-res raster export for print and screen'
        ]
      }
    },
    {
      id: 'proj-4',
      slug: 'carx',
      title: {
        ar: 'منصة CarX للسيارات وقطع الغيار',
        en: 'CarX Integrated Automotive Platform'
      },
      summary: {
        ar: 'منصة إلكترونية متكاملة للسيارات، قطع الغيار، ومراكز الصيانة وحجز الخدمات مع واجهة تفاعلية حديثة وسريعة.',
        en: 'Comprehensive automotive ecosystem for vehicle listings, spare parts catalog, workshop appointments, and technical services.'
      },
      description: {
        ar: 'منظومة رقمية صُممت لربط ملاك السيارات بمراكز الصيانة وموردي قطع الغيار، مع بحث متقدم حسب الموديل وسنة الصنع، ونظام إدارة مواعيد الصيانة واستعراض الأسعار.',
        en: 'A digital ecosystem connecting vehicle owners with certified repair workshops and genuine parts suppliers, featuring vehicle fitment search and service booking.'
      },
      category: 'web',
      categoryLabel: {
        ar: 'منصات الويب والخدمات',
        en: 'Web Platforms & Services'
      },
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Search Engine'],
      githubUrl: 'https://github.com/En-Dhiaa/CarX',
      coverImage: './images/showcase-portrait.webp',
      isFeatured: true,
      status: 'Completed'
    },
    {
      id: 'proj-5',
      slug: 'pharmaleaf-ai',
      title: {
        ar: 'نظام PharmaLeaf AI لتحليل النشرات الطبية',
        en: 'PharmaLeaf AI Leaflet OCR & Layout Analysis'
      },
      summary: {
        ar: 'نظام مكتبي ذكي لمعالجة صور النشرات الدوائية متعددة الأعمدة وتحديد تسلسل القراءة واستخراج النصوص العربية والإنجليزية بدقة.',
        en: 'Intelligent desktop OCR system for pharmaceutical leaflets with multi-column layout analysis and bi-directional text extraction.'
      },
      description: {
        ar: 'حل هندسي برمجي باستخدام خوارزميات معالجة الصور الرقمية لتحليل الهياكل المعقدة لنشرات الأدوية الطبية وفصل الأعمدة واستخراج النصوص باللغتين العربية والإنجليزية بدقة متناهية.',
        en: 'An engineering solution employing image processing algorithms to detect complex pharmaceutical leaflet column boundaries and reconstruct reading streams.'
      },
      category: 'tools',
      categoryLabel: {
        ar: 'أنظمة الذكاء الاصطناعي ومعالجة الصور',
        en: 'AI & Image Processing Systems'
      },
      tags: ['Python', 'OpenCV', 'OCR Engine', 'Layout Analysis', 'Desktop GUI'],
      githubUrl: 'https://github.com/En-Dhiaa/PharmaLeaf-AI',
      coverImage: './images/about-portrait.webp',
      isFeatured: true,
      status: 'Completed'
    },
    {
      id: 'proj-6',
      slug: 'agriculture-erp',
      title: {
        ar: 'نظام ERP الزراعي والبيطري ولوحة التحكم',
        en: 'Agriculture & Veterinary ERP Dashboard'
      },
      summary: {
        ar: 'لوحة تحكم ونظام ERP متطور للمنتجات الزراعية والبيطرية يدمج واجهة Flutter مع معمارية ASP.NET Core 8 النظيفة.',
        en: 'Full-featured Agriculture & Veterinary ERP Dashboard combining Flutter with ASP.NET Core 8 Clean Architecture.'
      },
      description: {
        ar: 'تطبيق تجاري متكامل لإدارة المخازن، المنتجات الزراعية والبيطرية، المبيعات والعملاء مع دعم نمط عدم الاتصال وتصميم واجهة مستخدم مريح وعصري.',
        en: 'A commercial management system for agricultural and veterinary inventory, product cataloging, and sales analytics with responsive modern UI.'
      },
      category: 'erp',
      categoryLabel: {
        ar: 'أنظمة ERP ولوحات التحكم',
        en: 'ERP & Dashboards'
      },
      tags: ['Flutter', 'ASP.NET Core 8', 'Clean Architecture', 'Tailwind CSS', 'ERP System'],
      githubUrl: 'https://github.com/En-Dhiaa/AgricultureMarketplace',
      coverImage: './images/hero-portrait.webp',
      isFeatured: true,
      status: 'Completed'
    },
    {
      id: 'proj-7',
      slug: 'formora-3d',
      title: {
        ar: 'استوديو Formora لتصميم العبوات ثلاثية الأبعاد',
        en: 'Formora 3D Packaging Design Studio'
      },
      summary: {
        ar: 'استوديو احترافي لتصميم وتجسيد عبوات المنتجات ثلاثية الأبعاد وعرض النماذج المجسمة والتصدير للويب والطباعة.',
        en: 'Professional product packaging design studio featuring real-time 3D mockups and industrial print preparation.'
      },
      description: {
        ar: 'بيئة عمل متقدمة تتيح للمصممين إسقاط التصاميم الجرافيكية على عبوات ثلاثية الأبعاد وضبط الإضاءة والزوايا وعرض النموذج بشكل تفاعلي 360 درجة.',
        en: 'An interactive 3D studio allowing graphic designers to project packaging designs onto 3D boxes and bottles with real-time lighting and orbit controls.'
      },
      category: 'tools',
      categoryLabel: {
        ar: 'التصميم ثلاثي الأبعاد والويب',
        en: '3D Graphics & Web Studio'
      },
      tags: ['Three.js', 'WebGL', '3D Graphics', 'Packaging Design', 'Canvas'],
      githubUrl: 'https://github.com/En-Dhiaa/formora-3d',
      coverImage: './images/showcase-portrait.webp',
      isFeatured: false,
      status: 'Completed'
    },
    {
      id: 'proj-8',
      slug: 'pharmaleaf-studio',
      title: {
        ar: 'استوديو تصميم نشرات الأدوية (PharmaLeaf Studio)',
        en: 'PharmaLeaf Web Design & Print Studio'
      },
      summary: {
        ar: 'استوديو تفاعلي على الويب لتصميم نشرات الأدوية الدقيقة وتصدير ملفات جاهزة للطباعة الصناعية (PDF, SVG, EPS).',
        en: 'Interactive web-based pharmaceutical leaflet designer and industrial print production studio (PDF, SVG, EPS).'
      },
      description: {
        ar: 'أداة ويب متخصصة تتيح لفرق التصميم والمصانع الدوائية تصميم النشرات الطبية وفق المعايير العالمية مع محاذاة دقيقة للنصوص متعددة الأعمدة وتصدير ملفات متجهة عالية الجودة.',
        en: 'A specialized web tool for pharmaceutical designers and manufacturing teams to engineer leaflet layouts according to regulatory standards with multi-column alignment and vector export.'
      },
      category: 'web',
      categoryLabel: {
        ar: 'أدوات التصميم والطباعة',
        en: 'Design & Print Tools'
      },
      tags: ['TypeScript', 'Canvas API', 'Print Standards', 'PDF Generation'],
      githubUrl: 'https://github.com/En-Dhiaa/pharmaleaf-studio',
      coverImage: './images/about-portrait.webp',
      isFeatured: false,
      status: 'Completed'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: {
        ar: 'مصمم جرافيك وأخصائي إعلامي',
        en: 'Graphic Designer & Media Specialist'
      },
      organization: {
        ar: 'مركز اليمن للطباعة والنشر — صنعاء',
        en: 'Yemen Print Center — Sana\'a'
      },
      location: {
        ar: 'صنعاء، اليمن',
        en: 'Sana\'a, Yemen'
      },
      period: {
        ar: '2021 – 2025',
        en: '2021 – 2025'
      },
      type: 'design',
      responsibilities: {
        ar: [
          'تصميم المواد الإعلانية، الهويات البصرية المؤسسية، والمطبوعات التجارية عالية الجودة',
          'إعداد وتجهيز ملفات الفرز الطباعي والصناعي وفق أعلى معايير الدقة والألوان',
          'المساهمة في ابتكار حملات بصرية وتسويقية ناجحة للعملاء'
        ],
        en: [
          'Designed advertising collateral, corporate brand identities, and high-precision print media',
          'Prepared industrial pre-press color separations and print-ready digital files',
          'Co-created creative visual identities and digital campaigns for corporate clients'
        ]
      }
    },
    {
      id: 'exp-2',
      role: {
        ar: 'مطور تطبيقات Flutter',
        en: 'Flutter Mobile Developer'
      },
      organization: {
        ar: 'نادي الخريجين — صنعاء',
        en: 'Graduates Club — Sana\'a'
      },
      location: {
        ar: 'صنعاء، اليمن',
        en: 'Sana\'a, Yemen'
      },
      period: {
        ar: '2021 – 2024',
        en: '2021 – 2024'
      },
      type: 'development',
      responsibilities: {
        ar: [
          'برمجة وتطوير تطبيقات الجوال متعددة المنصات باستخدام Flutter وDart',
          'بناء واجهات مستخدم مخصصة وفلاتر عرض تفاعلية تدمج بين الجمالية وسرعة الأداء',
          'الربط مع خدمات وقواعد البيانات السحابية والمحلية وتجربة المستخدم السلسة'
        ],
        en: [
          'Developed cross-platform mobile applications using Flutter and Dart',
          'Engineered custom UI widgets and interactive filters blending aesthetics with speed',
          'Integrated cloud/local data persistence and ensured smooth UX performance'
        ]
      }
    },
    {
      id: 'exp-3',
      role: {
        ar: 'ممثل مبيعات ودعم فني متخصص',
        en: 'Sales & Technical Support Specialist'
      },
      organization: {
        ar: 'الماجد للكمبيوتر والشبكات',
        en: 'Al-Majed Computer & Networks'
      },
      location: {
        ar: 'صنعاء، اليمن',
        en: 'Sana\'a, Yemen'
      },
      period: {
        ar: '2019 – 2025',
        en: '2019 – 2025'
      },
      type: 'support',
      responsibilities: {
        ar: [
          'تقديم الدعم الفني المباشر وتشخيص أعطال أجهزة الحاسوب والشبكات والملحقات',
          'إصلاح وصيانة العتاد وتثبيت وترقية أنظمة التشغيل والبرمجيات الاحترافية',
          'إرشاد العملاء للحلول التقنية والعتادية المناسبة لاحتياجاتهم المؤسسية والشخصية'
        ],
        en: [
          'Delivered on-site technical support and device diagnostics for computers and network hardware',
          'Performed hardware repair, OS maintenance, driver optimizations, and security setups',
          'Guided enterprise and retail clients in selecting ideal IT hardware and systems'
        ]
      }
    },
    {
      id: 'exp-4',
      role: {
        ar: 'مدرب لغة إنجليزية',
        en: 'English Language Instructor'
      },
      organization: {
        ar: 'المعهد البريطاني الوطني',
        en: 'National British Institute'
      },
      location: {
        ar: 'صنعاء، اليمن',
        en: 'Sana\'a, Yemen'
      },
      period: {
        ar: '2019 – 2023',
        en: '2019 – 2023'
      },
      type: 'teaching',
      responsibilities: {
        ar: [
          'تدريس برامج ودورات اللغة الإنجليزية للمستويات التأسيسية والمتقدمة',
          'تطوير مهارات التحدث والتواصل التقني والمهني للطلاب والمتدربين',
          'إعداد الخطط التدريبية والاختبارات التقييمية وإدارة الفصول التفاعلية'
        ],
        en: [
          'Instructed English language proficiency courses for foundational and advanced students',
          'Enhanced conversational, technical, and professional communication skills',
          'Designed interactive lesson plans, evaluated assessments, and led language workshops'
        ]
      }
    },
    {
      id: 'exp-5',
      role: {
        ar: 'مدرب حاسوب وتقنية معلومات',
        en: 'Computer & IT Instructor'
      },
      organization: {
        ar: 'معهد إيسنس للتدريب',
        en: 'Essence Institute'
      },
      location: {
        ar: 'صنعاء، اليمن',
        en: 'Sana\'a, Yemen'
      },
      period: {
        ar: '2020 – 2022',
        en: '2020 – 2022'
      },
      type: 'teaching',
      responsibilities: {
        ar: [
          'تقديم دورات تدريبية متخصصة في قيادة الحاسوب، التطبيقات المكتبية، والبرمجيات',
          'تدريب الطلاب على المفاهيم التقنية الأساسية واستخدام الأدوات الرقمية بكفاءة'
        ],
        en: [
          'Delivered training programs in computer fundamentals, office suites, and digital literacy',
          'Mentored students in practical software skills, data management, and computer workflows'
        ]
      }
    },
    {
      id: 'exp-6',
      role: {
        ar: 'مصمم جرافيك ومصور فوتوغرافي',
        en: 'Graphic Designer & Photographer'
      },
      organization: {
        ar: 'مركز الغيث للإنتاج الفني',
        en: 'Al-Ghaith Center'
      },
      location: {
        ar: 'صنعاء، اليمن',
        en: 'Sana\'a, Yemen'
      },
      period: {
        ar: '2018 – 2020',
        en: '2018 – 2020'
      },
      type: 'design',
      responsibilities: {
        ar: [
          'تصوير المنتجات والفعاليات ومعالجة الصور الفوتوغرافية رقمياً',
          'تصميم البوسترات والكتيبات والمواد الترويجية بأسلوب بصري حديث'
        ],
        en: [
          'Commercial product and event photography with digital post-processing',
          'Designed promotional posters, brochures, and visual marketing assets'
        ]
      }
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: {
        ar: 'بكالوريوس تقنية معلومات (Information Technology)',
        en: 'Bachelor of Information Technology'
      },
      institution: {
        ar: 'جامعة الحكمة — الجمهورية اليمنية',
        en: 'Al-Hikma University — Republic of Yemen'
      },
      period: {
        ar: '2023 – 2024',
        en: '2023 – 2024'
      },
      status: {
        ar: 'صدر بيان التخرج الرسمي (Official Statement Issued)',
        en: 'Official Graduation Statement Issued'
      },
      details: {
        ar: 'رئيس اللجنة الفنية والإعلامية لدفعة التخرج، والمشاركة الفاعلة في معرض الهندسة والابتكار السنوي 2022.',
        en: 'Head of Technical and Media Committee for the graduating cohort; active contributor to the Annual Engineering & Innovation Exhibition.'
      }
    },
    {
      id: 'edu-2',
      degree: {
        ar: 'دبلوم متقدم في اللغة الإنجليزية (Advanced Diploma)',
        en: 'Advanced Diploma in English Language'
      },
      institution: {
        ar: 'المعهد البريطاني الوطني',
        en: 'National British Institute'
      },
      period: {
        ar: '2018 – 2019',
        en: '2018 – 2019'
      },
      status: {
        ar: '300 ساعة تدريبية معتمدة',
        en: '300 Accredited Training Hours'
      },
      grade: {
        ar: 'تقدير: جيد جداً (Very Good)',
        en: 'Grade: Very Good'
      }
    },
    {
      id: 'edu-3',
      degree: {
        ar: 'دبلوم التصميم الجرافيكي وتطبيقات أدوبي',
        en: 'Diploma in Graphic Design — Adobe Applications'
      },
      institution: {
        ar: 'المعهد البريطاني الوطني',
        en: 'National British Institute'
      },
      period: {
        ar: '2017',
        en: '2017'
      },
      status: {
        ar: 'معتمد رسمياً في تطبيقات Photoshop, Illustrator, InDesign',
        en: 'Certified in Adobe Photoshop, Illustrator & InDesign'
      },
      grade: {
        ar: 'تقدير: ممتاز (Excellent)',
        en: 'Grade: Excellent'
      }
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: {
        ar: 'شهادة خبرة معتمدة في التصميم والإعلان',
        en: 'Professional Experience Certificate — Advertising'
      },
      issuer: {
        ar: 'اليمن للإعلان',
        en: 'Yemen Advertising'
      },
      year: '2021 – 2025',
      type: 'certificate'
    },
    {
      id: 'cert-2',
      title: {
        ar: 'مهارات ريادة الأعمال وإدارة المشاريع',
        en: 'Entrepreneurship & Business Innovation Skills'
      },
      issuer: {
        ar: 'مؤسسة الأمل التنموية',
        en: 'Al-Amal Hope Foundation'
      },
      year: '2025',
      type: 'training'
    },
    {
      id: 'cert-3',
      title: {
        ar: 'أساسيات الشبكات (Network Basics)',
        en: 'Network Basics — Cisco Networking Academy'
      },
      issuer: {
        ar: 'أكاديمية سيسكو للشبكات (Cisco)',
        en: 'Cisco Networking Academy'
      },
      year: '2023',
      type: 'certificate'
    },
    {
      id: 'cert-4',
      title: {
        ar: 'مقدمة في الأمن السيبراني (Introduction to Cybersecurity)',
        en: 'Introduction to Cybersecurity — Cisco'
      },
      issuer: {
        ar: 'أكاديمية سيسكو للشبكات (Cisco)',
        en: 'Cisco Networking Academy'
      },
      year: '2023',
      type: 'certificate'
    },
    {
      id: 'cert-5',
      title: {
        ar: 'دورة صيانة الحاسوب والتشخيص العتادي المتقدم',
        en: 'Advanced Computer Maintenance & Diagnostics'
      },
      issuer: {
        ar: 'جامعة الحكمة',
        en: 'Al-Hikma University'
      },
      year: '2021',
      type: 'training'
    },
    {
      id: 'cert-6',
      title: {
        ar: 'مهارات خدمة العملاء والاتصال الاحترافي',
        en: 'Customer Service Skills & Communication'
      },
      issuer: {
        ar: 'المعهد الأمريكي الوطني',
        en: 'American National Institute'
      },
      year: '2019',
      type: 'training'
    },
    {
      id: 'cert-7',
      title: {
        ar: 'مشروع إسفير والعمل الإغاثي والإنساني الدولي',
        en: 'The Sphere Project & Humanitarian Relief Training'
      },
      issuer: {
        ar: 'مؤسسة وجهة الحياة',
        en: 'Wajha Al-Hayat Foundation'
      },
      year: '2019',
      type: 'workshop'
    }
  ],
  skills: [
    {
      id: 'skill-cat-1',
      title: {
        ar: 'تطوير التطبيقات والبرمجيات',
        en: 'Software & Mobile Engineering'
      },
      skills: [
        { name: 'Flutter & Dart' },
        { name: 'TypeScript & JavaScript' },
        { name: 'React & Next.js Architecture' },
        { name: 'C# & ASP.NET Core 8' },
        { name: 'Python & Automation' },
        { name: 'SQLite & PostgreSQL' },
        { name: 'REST APIs & WebSockets' },
        { name: 'Clean Architecture & MVVM' },
        { name: 'Git & GitHub Workflows' }
      ]
    },
    {
      id: 'skill-cat-2',
      title: {
        ar: 'تصميم واجهات المستخدم والهوية البصرية',
        en: 'UI/UX & Visual Arts'
      },
      skills: [
        { name: 'UI/UX Prototyping (Figma)' },
        { name: 'Adobe Photoshop' },
        { name: 'Adobe Illustrator' },
        { name: 'Adobe InDesign' },
        { name: 'Brand Identity & Guidelines' },
        { name: 'Design Systems & Tokens' },
        { name: 'SVG & Vector Engineering' },
        { name: 'Pre-Press & Industrial Print' }
      ]
    },
    {
      id: 'skill-cat-3',
      title: {
        ar: 'الشبكات والدعم الفني وصيانة الأنظمة',
        en: 'IT Systems, Networking & Hardware'
      },
      skills: [
        { name: 'Cisco Networking Fundamentals' },
        { name: 'Cybersecurity Principles' },
        { name: 'Hardware Diagnostics & Repair' },
        { name: 'Windows OS Administration' },
        { name: 'Computer Architecture & Assembly' },
        { name: 'Technical Troubleshooting' },
        { name: 'Customer & Technical Support' }
      ]
    },
    {
      id: 'skill-cat-4',
      title: {
        ar: 'اللغات والمهارات القيادية',
        en: 'Languages & Leadership'
      },
      skills: [
        { name: 'العربية (اللغة الأم - Native Arabic)' },
        { name: 'English (Fluent Professional Proficiency)' },
        { name: 'Technical Instruction & Mentorship' },
        { name: 'Team Leadership & Coordination' },
        { name: 'Customer Communication' }
      ]
    }
  ]
};
