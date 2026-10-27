DHIAA AL-HMIRI — PROFESSIONAL PORTFOLIO

Master Project Specification & AI Development Instructions

Project Owner: Eng. Dhiaa Abdulrahman Ghalib Al-Hmiri
Project Type: Premium Personal Portfolio, Online CV, Project Showcase, and Private CMS
Primary Languages: Arabic and English
Default Language: Arabic
Public Access: Open to everyone
Admin Access: One owner, protected by a secure password-based login
Primary Platforms: Mobile, tablet, laptop, desktop
Repository Owner: En-Dhiaa
Project Status: Initial specification and implementation plan

---

1. PROJECT VISION

Build a premium, modern, creative, responsive, bilingual personal portfolio website for Eng. Dhiaa Abdulrahman Ghalib Al-Hmiri.

This must not be a basic CV template or a static landing page. It must be a complete professional identity platform that combines:

- A premium personal website.
- An interactive online CV.
- A professional project portfolio.
- A career and education timeline.
- A technology and design skills showcase.
- GitHub project integration.
- A private content management dashboard.
- A secure contact system.
- Downloadable Arabic and English CV documents.
- Light and dark themes.
- Carefully designed animations.
- Search engine optimization.
- Excellent mobile usability.

The website must present the owner as a multidisciplinary IT professional who combines software development, mobile applications, technical support, computer maintenance, graphic design, and UI/UX thinking.

The design must communicate technical competence, creativity, attention to detail, reliability, and professional maturity.

1.1 Primary objectives

1. Make a strong first impression within the first few seconds.
2. Make professional identity and main skills immediately understandable.
3. Display real projects with images, technical details, and working links.
4. Help recruiters evaluate experience, education, skills, and certifications.
5. Help potential clients discover services and contact the owner.
6. Allow the owner to manage almost all website content without changing source code.
7. Provide a consistent experience in Arabic and English.
8. Make the mobile experience as polished as the desktop experience.
9. Keep the website fast, accessible, secure, and easy to maintain.
10. Preserve project progress in Git and publish completed stages to GitHub.

---

2. NON-NEGOTIABLE DEVELOPMENT RULES

The AI development agent must follow these rules throughout the project.

1. Build a working application, not merely screenshots, mockups, or a static prototype.
2. Do not stop after creating the homepage.
3. Do not use generic template layouts without adapting them to the owner's identity.
4. Do not invent professional experience, clients, project outcomes, certificates, awards, ratings, or GitHub statistics.
5. Do not display fake charts, fake testimonials, fake activity counters, or fictional project metrics.
6. Every visible button must perform its advertised action.
7. Every dashboard form must save data to the database.
8. All public content must be editable through the administration dashboard wherever appropriate.
9. Never expose passwords, private environment variables, administrative secrets, or privileged API keys.
10. Do not protect the dashboard merely by hiding its URL.
11. Do not create public registration, visitor accounts, or additional administrator accounts.
12. Do not require visitors to sign in to read the portfolio, view projects, download the CV, or contact the owner.
13. Never replace working features with temporary mock data when implementing another feature.
14. Do not rewrite the entire application unnecessarily when fixing a localized issue.
15. Use reusable components, typed data models, clear module boundaries, and consistent naming.
16. Keep the project buildable and runnable after every implementation stage.
17. Do not claim that deployment, testing, GitHub synchronization, or email delivery succeeded unless it has actually been verified.
18. Record unresolved questions in a project decisions file instead of making unsupported assumptions.
19. Keep documentation synchronized with actual implementation.
20. Do not commit secrets, ".env" files, service-role keys, or private credentials to GitHub.

The development agent must first inspect the existing workspace. If the project already exists, preserve useful working code and data rather than deleting or recreating everything without justification.

---

3. TECHNOLOGY STACK

Use the following architecture unless an actual compatibility problem requires a documented alternative.

3.1 Frontend and application framework

- Next.js using the App Router.
- TypeScript with strict type checking.
- React Server Components by default.
- Client Components only where interaction requires them.
- Tailwind CSS.
- A consistent component system using accessible, reusable UI components.
- Motion for carefully controlled animations.
- Lucide icons for consistent iconography.
- Zod for runtime validation of forms and structured inputs.

Use current stable, mutually compatible package versions when the project is initialized. Lock dependency versions and preserve the lockfile.

Official references:

- Next.js: https://nextjs.org/docs
- Next.js internationalization: https://nextjs.org/docs/app/guides/internationalization
- Tailwind CSS: https://tailwindcss.com/docs
- Motion: https://motion.dev/docs
- TypeScript: https://www.typescriptlang.org/docs/

3.2 Backend and data storage

Use Supabase for:

- PostgreSQL database.
- Administrator authentication.
- Public content retrieval.
- Secure file storage.
- Database access policies.
- Optional server-side functions where required.

Official documentation:

- https://supabase.com/docs
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/storage

Do not introduce an additional backend framework unless it solves a documented requirement that the selected architecture cannot handle adequately.

3.3 GitHub integration

Use the official GitHub REST API to retrieve information about public repositories.

Documentation:

https://docs.github.com/en/rest/repos/repos

GitHub account:

https://github.com/En-Dhiaa

GitHub integration must not require visitors to authorize their personal GitHub accounts.

3.4 Deployment

Prepare the application for deployment on a compatible Next.js hosting platform and a hosted Supabase project.

A custom domain must be supported, but the final domain is not yet specified.

The project must also run locally during development.

Do not assume that GitHub itself provides the complete runtime hosting environment for a dynamic Next.js application. Choose a hosting provider that supports the features actually used.

---

4. BRAND IDENTITY

4.1 Professional name

Primary English display:

Eng. Dhiaa Al-Hmiri

Full formal English name:

Eng. Dhiaa Abdulrahman Ghalib Al-Hmiri

Primary Arabic display:

م. ضياء عبدالرحمن غالب الحميري

Use the full formal name in the CV and appropriate professional documents. The shorter display name may be used in the navigation, hero section, and logo lockup.

4.2 Suggested professional title

Primary English title:

IT Engineer | Software Developer | UI/UX & Graphic Designer

Arabic title:

مهندس تقنية معلومات | مطور برمجيات | مصمم UI/UX وجرافيك

The title must be editable from the dashboard.

The homepage may rotate between a small number of short professional specialties, but the animation must not reduce readability or create a confusing identity.

Suggested specialties:

- Flutter & Mobile Application Development
- UI/UX Design
- Graphic Design & Visual Identity
- Technical Support & Computer Maintenance
- Networking Fundamentals

Do not describe the owner as a senior engineer, certified cybersecurity expert, or experienced full-stack architect unless independent information supports that claim.

4.3 Visual direction

Create an original visual identity combining:

- Premium editorial typography.
- Modern software-engineering aesthetics.
- Creative portfolio presentation.
- Strong spacing and alignment.
- Refined borders and surfaces.
- Subtle gradients.
- Restrained depth and shadows.
- High-quality project imagery.
- A distinctive personal portrait composition.

Avoid excessive neon colors, generic AI-generated layouts, overused glassmorphism, random gradients, giant empty sections, and unnecessary decorative elements.

4.4 Initial color system

Use these colors as the starting point, with final refinements during implementation.

Dark theme:

- Main background: "#10141D"
- Elevated surface: "#181E29"
- Primary text: "#F5F7FC"
- Secondary text: "#A8B1C2"
- Accent: "#8B7CFF"
- Border: a subtle low-contrast neutral.

Light theme:

- Main background: "#F7F8FC"
- Elevated surface: "#FFFFFF"
- Primary text: "#161B26"
- Secondary text: "#626B7B"
- Accent: "#6555E8"
- Border: "#E5E8F0"

Use semantic design tokens rather than scattering hard-coded color values throughout components.

Provide accessible contrast in both themes. Test text, buttons, hover states, focus rings, disabled controls, and form errors.

4.5 Typography

Arabic:

- Cairo or another carefully tested Arabic font.
- Include suitable weights for regular, medium, semibold, and bold when available.
- Avoid synthetic font weights when real font files are available.

English:

- Inter or a similar modern sans-serif family.

Use self-hosted font files where licensing permits. Otherwise use a reliable optimized font-loading strategy.

Use separate typography tokens for:

- Hero title.
- Section headings.
- Project titles.
- Body text.
- Supporting metadata.
- Buttons.
- Labels.
- Technical information.

---

5. PERSONAL PHOTO AND HERO COMPOSITION

This section is a high-priority design requirement.

5.1 Image requirements

The owner will supply an actual personal photograph.

Do not substitute a stock photograph or a generated face for the owner's identity.

Prepare the image for a professional portrait presentation:

- Remove the original background where appropriate.
- Preserve natural facial features and clothing details.
- Export a high-quality transparent PNG or WebP with alpha transparency.
- Keep the original photograph separately.
- Optimize the final image for fast loading.
- Provide a sensible fallback image if the main asset is unavailable.

If automated background removal is unavailable, document the required asset instead of claiming it has been completed.

5.2 Hero layout

Create a distinctive first-screen composition.

Desktop:

- Compact navigation at the top.
- Main professional introduction on one side.
- Portrait overlapping the lower edge of the header or hero composition.
- Subtle geometric background elements.
- Clear primary and secondary actions.
- A small visual cue that encourages scrolling.

The portrait must appear integrated into the website layout, not like a basic image inserted into a rectangular card.

Mobile:

- Recompose the layout specifically for portrait screens.
- Keep the face visible and correctly cropped.
- Avoid overlapping text and image.
- Keep the primary action visible without excessive scrolling.
- Prevent horizontal overflow.
- Ensure the header remains easy to navigate.

Do not force the desktop composition onto mobile screens.

5.3 Hero content

English:

Eng. Dhiaa Al-Hmiri

IT Engineer, Software Developer & Designer

A multidisciplinary IT professional combining software development, mobile application interfaces, visual design, and technical problem-solving to build practical digital experiences.

Arabic:

م. ضياء الحميري

مهندس تقنية معلومات ومطور برمجيات ومصمم

مهني في مجال تقنية المعلومات يجمع بين تطوير التطبيقات، وتصميم واجهات المستخدم، والتصميم البصري، والحلول التقنية لتقديم تجارب رقمية عملية ومدروسة.

These are initial editorial drafts. The owner must be able to edit both language versions.

Primary button:

- English: Explore My Work
- Arabic: استكشف أعمالي

Secondary button:

- English: Download CV
- Arabic: تحميل السيرة الذاتية

Optional contact action:

- English: Let's Work Together
- Arabic: لنتعاون معًا

The portrait must not be hidden behind a large modal, cookie banner, or unnecessary introductory animation.

---

6. PUBLIC WEBSITE INFORMATION ARCHITECTURE

Create the following public pages and sections.

6.1 Homepage

Suggested section order:

1. Header and language/theme controls.
2. Hero section and portrait.
3. Selected specialties.
4. Featured projects.
5. Professional introduction.
6. Technical and creative skills.
7. Experience timeline.
8. Education and certifications.
9. GitHub projects and profile link.
10. Contact call to action.
11. Footer and professional links.

The owner must be able to reorder, hide, or show configurable homepage sections through the dashboard.

Do not force every section into a long homepage if it creates unnecessary repetition. Use dedicated detail pages for content that benefits from more space.

6.2 About page

Include:

- Professional biography.
- Main areas of expertise.
- Career interests.
- Technical and creative approach.
- Professional goals, only when confirmed by the owner.
- Selected activities and leadership experience.

Provide separate Arabic and English content fields.

6.3 Projects page

Provide a searchable, filterable project gallery.

Suggested categories:

- Mobile Applications.
- Flutter Development.
- UI/UX Design.
- Web Development.
- Graphic Design.
- Branding & Visual Identity.
- Technical Projects.
- Other.

Categories must be configurable.

Each project card may contain:

- Project cover image.
- Project title.
- Short description.
- Project category.
- Technology tags.
- Project status.
- GitHub link.
- Live demo link.
- Case-study link.

Only show links that actually exist and have been verified.

Support project statuses such as:

- Completed.
- In Progress.
- Experimental.
- Archived.

Display the status only when it adds meaningful context.

6.4 Project detail page

Each featured project must have a dedicated detail page containing:

- Project title and summary.
- Background and problem.
- Proposed solution.
- Owner's role.
- Technologies used.
- Design and development process.
- Screenshots and gallery.
- Important features.
- Challenges and implementation decisions.
- Verified results, when available.
- GitHub repository.
- Live demo, if available.
- Related projects.

Do not invent measurable outcomes.

If no performance data, client outcome, or business result exists, omit the relevant claim rather than filling it with fabricated statistics.

Support optional case-study sections so the owner can publish a short project description or a detailed case study.

6.5 Experience page

Display experience chronologically with clear organization names, roles, dates, and responsibilities.

Use a responsive timeline on desktop and a compact chronological list on mobile.

Allow missing dates to remain explicitly unspecified until confirmed. Do not manufacture exact months.

6.6 Education and certifications page

Separate academic qualifications from professional certifications, training, and participation activities.

Allow:

- Institution logo.
- Qualification or certificate title.
- Issuing institution.
- Issue date.
- Description.
- Optional certificate image or PDF.
- Public/private visibility setting.

Do not publicly expose private documents without explicit approval.

6.7 Contact page

Display:

- Email.
- WhatsApp contact.
- GitHub.
- Other confirmed professional links.
- Contact form.

The form should ask for only necessary information:

- Name.
- Email.
- Inquiry category.
- Message.

The inquiry category may include:

- Employment.
- Mobile application development.
- Web development.
- UI/UX and graphic design.
- Technical support.
- Other.

Include validation, loading state, success state, failure state, and a clear confirmation message.

Do not claim that a message was delivered unless the delivery provider confirms success.

6.8 Global footer

Include:

- Professional display name.
- Short professional description.
- Navigation links.
- GitHub and confirmed social links.
- Email contact.
- Language control if useful.
- Copyright year generated dynamically.

Do not add unnecessary legal pages containing invented company registration details or unsupported claims.

---

7. COMPLETE PROFESSIONAL CONTENT

The following is the initial source of truth for the portfolio content.

The development agent must preserve the meaning of the supplied CV, normalize formatting, and flag inconsistencies for confirmation.

7.1 Professional profile

English:

An Information Technology Engineer with a multidisciplinary background in technical support, computer maintenance, graphic design, and Flutter application development. Experienced in mobile application UI/UX implementation, Flutter and Dart development, technical troubleshooting, networking fundamentals, and end-user support. Combines technical problem-solving with creative design thinking and has completed training in networking, cybersecurity fundamentals, computer maintenance, customer service, and graphic design.

Arabic:

مهندس تقنية معلومات يمتلك خلفية مهنية متعددة المجالات تشمل الدعم الفني، وصيانة الحاسوب، والتصميم الجرافيكي، وتطوير تطبيقات Flutter. لديه خبرة في تنفيذ واجهات تطبيقات الجوال، والبرمجة باستخدام Flutter وDart، وتشخيص المشكلات التقنية، وأساسيات الشبكات، ودعم المستخدمين. يجمع بين معالجة المشكلات التقنية والتفكير التصميمي، مع تدريب في الشبكات، وأساسيات الأمن السيبراني، وصيانة الحاسوب، وخدمة العملاء، والتصميم الجرافيكي.

This biography is an editorial draft based on the supplied CV. The owner must be able to edit it.

7.2 Contact information

- Full name: Eng. Dhiaa Abdulrahman Ghalib Al-Hmiri
- Display name: Eng. Dhiaa Al-Hmiri
- Arabic display name: م. ضياء الحميري
- Phone: +967 777117683
- Email: dhiaa.org@gmail.com
- GitHub: https://github.com/En-Dhiaa
- Location: Sana'a, Yemen

Privacy requirements:

- Display Sana'a, Yemen publicly by default.
- Do not publish the full residential street address.
- Make phone and email display settings configurable.
- Use the supplied WhatsApp number only after verifying that it is the intended public contact.
- Never expose administrative credentials in public content.

7.3 Academic qualifications

Bachelor of Information Technology

Institution: Al-Hikma University, Republic of Yemen
Period: 2023–2024
Status: Official graduation statement issued; final degree certificate pending completion.

Use this status exactly. Do not imply that the final certificate has already been issued.

Advanced Diploma in English Language

Institution: National British Institute
Period: 2018–2019
Training hours: 300 accredited hours
Grade: Very Good

Diploma in Graphic Design — Adobe Applications

Institution: National British Institute
Year: 2017
Grade: Excellent

7.4 Professional experience

Graphic Designer & Media Specialist

Organization: Yemen Print Center — Sana'a

Responsibilities:

- Designed advertising materials, branding, and digital content.
- Contributed to institutional identity development.
- Maintained attention to creativity and visual precision.

The exact employment period must be confirmed before publication.

Flutter Developer

Organization: Graduates Club — Sana'a
Supplied period: September 2021 – August 2025, with an additional reference to 2023–2024.

Responsibilities:

- Developed mobile applications using Flutter and Dart.
- Built UI components and custom Flutter filters.
- Aligned design requirements with functional implementation.

The employment dates contain an inconsistency. Do not silently select one period. Store the dates as pending confirmation.

Sales & Technical Support Representative

Organization: Al-Majed Computer & Networks
Supplied period: 2019–2025.

Responsibilities:

- Provided technical support and device troubleshooting.
- Assisted customers with computer hardware and accessories.
- Supported product sales and customer needs.

Confirm whether the period represents continuous employment or multiple engagements.

English Language Instructor

Organization: National British Institute
Supplied period: 2019–2023.

Responsibilities and detailed dates should be confirmed before publishing a longer description.

Computer Instructor

Organization: Essence Institute.

Responsibilities:

- Delivered computer and IT training courses.
- Demonstrated discipline, leadership, and teaching skills.

Exact employment dates must be confirmed.

Graphic Designer & Photographer

Organization: Al-Ghaith Center
Supplied period: 2018–2020, with an additional reference to 2019–2020.

The overlapping dates must be confirmed before publication.

7.5 Professional certifications and training

Display each item as a separate record.

1. Experience Certificate — Yemen Advertising — 2021–2025.
2. Entrepreneurship Skills — Participation and Attendance — Al-Amal Hope Foundation — 2025.
3. Network Basics — Cisco Networking Academy — 2023.
4. Introduction to Cyber Security — Cisco Networking Academy — 2023.
5. Computer Maintenance Course — Al-Hikma University — 2021.
6. Customer Service Skills — American National Institute — 2019.
7. Sphere Project and Humanitarian and Relief Training — Wajha Al-Hayat Foundation — 2019.

Important:

- Preserve the supplied titles.
- Do not describe participation certificates as professional licenses.
- Verify the issuer and year before displaying an uploaded certificate.
- Do not invent certificate numbers or accreditation claims.
- Allow certificate images to be added later.

7.6 Academic and professional activities

- Head of Technical and Media Committee — Graduation Cohort, Al-Hikma University.
- Participation in Engineering & Innovation Exhibition — 2022.
- Computer laboratory maintenance and technical volunteering activities.

Do not invent event details, awards, or leadership achievements beyond the supplied information.

7.7 Languages

Arabic: Native.
English: Fluent in speaking and writing, according to the supplied CV.

Display language proficiency without invented test scores.

7.8 References

The supplied CV states that academic and professional references are available upon request from Al-Hikma University, University of Sana'a, National British Institute, and Essence Institute.

Recommended public wording:

"Academic and professional references are available upon request."

Do not publish personal reference names, phone numbers, or email addresses without permission.

---

8. GITHUB PROFILE AND REPOSITORY INTEGRATION

Profile:

https://github.com/En-Dhiaa

8.1 Objectives

Use GitHub to support the portfolio with verifiable project information.

The public website must not simply dump a list of every repository onto the homepage.

It must distinguish between:

- Owner-selected featured projects.
- Automatically discovered public repositories.
- Projects with detailed case studies.
- Archived or experimental projects.

8.2 Repository retrieval

Use the official GitHub REST API.

Possible public endpoint:

"GET https://api.github.com/users/En-Dhiaa/repos"

Support pagination, sorting, and filtering.

Where appropriate, retrieve:

- Repository name.
- Description.
- HTML URL.
- Homepage URL.
- Primary language.
- Topics.
- Created date.
- Last updated date.
- Archived status.
- Fork status.

Use only fields that are available and useful.

Do not assume that repository stars, commits, language, or activity prove a particular level of professional expertise.

8.3 Cache and failure handling

- Cache GitHub data to avoid unnecessary requests.
- Configure a sensible revalidation period.
- Display the last successful synchronization time.
- Handle API rate limits.
- Handle network errors.
- Preserve the last valid cached result where possible.
- Provide a manual refresh action in the dashboard.
- Avoid exposing private tokens to the browser.
- Use unauthenticated public requests where sufficient.
- Use a server-side GitHub token only if a real need exists.

If GitHub is temporarily unavailable, the rest of the portfolio must continue to function.

8.4 Featured project management

In the admin dashboard, allow the owner to:

- Select a repository.
- Override its public title.
- Add Arabic and English descriptions.
- Upload project screenshots.
- Assign categories and tags.
- Add a case study.
- Set featured status.
- Set display order.
- Hide a project.
- Link a repository manually when API discovery is insufficient.

Do not overwrite owner-written descriptions with automatic API updates.

The API data and manually authored presentation content must be stored separately.

8.5 Project selection

Initially inspect all accessible public repositories and identify candidates based on actual contents.

Do not automatically label a repository as complete merely because it exists.

For each candidate, check:

- README.
- Source files where accessible.
- Recent activity.
- Screenshots or demonstrations.
- Project purpose.
- Existing deployment link.
- Whether it is a fork.
- Whether it contains meaningful documentation.

Recommend projects for the featured section only when there is sufficient evidence.

---

9. BILINGUAL ARABIC AND ENGLISH SUPPORT

Arabic must be the default language.

9.1 Routing

Use explicit localized routes such as:

- "/ar"
- "/en"
- "/ar/projects"
- "/en/projects"

Use a reliable Next.js App Router internationalization implementation.

Official reference:

https://nextjs.org/docs/app/guides/internationalization

9.2 Direction

Arabic:

- "lang="ar""
- "dir="rtl""

English:

- "lang="en""
- "dir="ltr""

Direction must be applied correctly at the document level and within any intentionally isolated components.

Use logical CSS properties such as "margin-inline-start" rather than assuming that left and right always have the same meaning.

9.3 Translation management

All editable content must support separate Arabic and English fields where appropriate.

Do not mechanically translate the entire page in the browser and replace the original content.

The owner must be able to review and edit translations independently.

If a translation is missing:

- Show a clearly defined fallback.
- Do not display an empty heading.
- Do not leave internal translation keys visible.
- Do not mix Arabic and English paragraphs unexpectedly.

9.4 Language switching

The language switch must:

- Preserve the current page where an equivalent translated page exists.
- Preserve the relevant project slug or project identifier.
- Use a sensible fallback if a translated page does not exist.
- Be usable on mobile.
- Remain accessible to keyboard users.

---

10. LIGHT AND DARK THEMES

Implement both themes as first-class design systems.

Requirements:

- Light mode.
- Dark mode.
- System preference as an optional initial setting.
- Manual theme toggle.
- Persistent visitor preference.
- Correct initial rendering without unnecessary flashing.
- Consistent colors across all public pages and the dashboard.
- Correct contrast for all interactive states.
- Theme-aware images and illustrations where needed.

The owner may set the preferred default theme from the dashboard.

The visitor's manual selection should take priority over the default theme when the implementation supports per-visitor preferences.

The site must not become visually broken when the theme changes.

---

11. RESPONSIVE DESIGN AND MOBILE-FIRST QUALITY

Mobile quality is a release requirement, not an optional refinement.

11.1 Test sizes

At minimum, test:

- 320px wide.
- 360px wide.
- 390px wide.
- 430px wide.
- Tablet widths.
- 1366px desktop.
- 1440px desktop.
- Large desktop screens.

11.2 Mobile behavior

- Compact navigation with an accessible menu.
- Touch targets of approximately 44 CSS pixels where practical.
- No horizontal page overflow.
- Responsive typography.
- Images with appropriate aspect ratios.
- Project cards that fit small screens.
- Clear spacing between actions.
- Contact buttons that remain easy to reach.
- Correct RTL behavior.
- Responsive dashboard tables or alternative mobile card layouts.
- Forms that work with mobile keyboards.
- No hover-only essential functionality.
- No heavy animation that causes scrolling lag.

11.3 Desktop behavior

- Strong grid alignment.
- Balanced whitespace.
- Clear visual hierarchy.
- Consistent content width.
- Well-composed hero and portrait.
- Richer project presentation without excessive decoration.
- Accessible keyboard focus and hover behavior.

Do not use the same rigid layout at every screen width. Recompose the interface where necessary.

---

12. ANIMATION AND INTERACTION DESIGN

Use animations to support the narrative and visual identity.

Potential effects:

- Hero elements fade and move into place.
- Portrait reveals with a restrained mask or opacity transition.
- Section headings appear as the visitor scrolls.
- Project cards respond subtly to hover or focus.
- Buttons have smooth state transitions.
- Navigation transitions remain short and predictable.
- Galleries use smooth, accessible image transitions.
- Dashboard feedback uses clear state changes rather than distracting motion.

12.1 Performance rules

- Prefer CSS transitions for simple interactions.
- Animate transform and opacity where practical.
- Avoid animating large areas of layout unnecessarily.
- Do not use scroll hijacking.
- Do not force an intro animation before visitors can interact.
- Do not create an animation that blocks primary actions.
- Avoid excessive parallax on mobile.
- Lazy-load noncritical visual elements.
- Use dynamic imports for heavy optional components.

12.2 Reduced motion

Respect "prefers-reduced-motion".

Provide a reduced-motion mode for significant animation.

The website must remain fully understandable and functional with animations disabled.

---

13. ADMINISTRATION DASHBOARD

Create a private dashboard at:

"/admin"

The login screen should be reachable directly at a route such as:

"/admin/login"

Only the owner is allowed to manage content.

There must be no public registration page.

13.1 Dashboard home

Display useful operational information:

- Published projects.
- Draft projects.
- Experience entries.
- Education entries.
- Certifications.
- Unread contact messages.
- Recent content updates.
- GitHub synchronization status.
- Storage or integration warnings when available.

Do not add fictional analytics or pretend that data is available when it is not.

13.2 Profile management

Editable fields:

- Display name in Arabic and English.
- Full formal name.
- Professional title.
- Biography.
- Main photograph.
- Secondary photographs.
- Email.
- Public phone number.
- WhatsApp number.
- GitHub URL.
- Other social links.
- Location.
- CV files.
- SEO metadata.
- Public contact visibility.

13.3 Project management

Support:

- Create.
- Edit.
- Save draft.
- Publish.
- Unpublish.
- Archive.
- Delete with confirmation.
- Duplicate.
- Reorder.
- Set featured status.
- Upload cover image.
- Upload gallery images.
- Add and remove tags.
- Set project category.
- Add GitHub URL.
- Add demo URL.
- Edit Arabic and English content.
- Preview before publishing.

13.4 Experience management

Fields:

- Employer.
- Arabic employer name.
- English employer name.
- Role.
- Arabic role.
- English role.
- Start date.
- End date.
- Current position.
- Responsibilities.
- Logo.
- Display order.
- Visibility.
- Verification status for internal editorial use.

Do not display an internal verification flag to visitors unless it has a clear public meaning.

13.5 Education and certifications

Fields:

- Record type.
- Institution.
- Arabic and English title.
- Description.
- Start date.
- End date or issue date.
- Grade.
- Training hours.
- Credential status.
- Optional certificate file.
- Public visibility.
- Display order.

13.6 Skills and categories

Allow the owner to manage:

- Skill groups.
- Skill names.
- Arabic and English descriptions.
- Relevant projects.
- Display order.
- Visibility.
- Technology icons where licensing and asset availability permit.

Do not use arbitrary proficiency percentages.

13.7 Media library

Support uploads for:

- Portraits.
- Project screenshots.
- Logos.
- Certificate images.
- Optional PDFs.
- Decorative assets.

Features:

- Preview.
- Replace.
- Delete with confirmation.
- File metadata.
- Alternative text.
- Image dimensions.
- Upload progress.
- Clear error messages.
- File type and size validation.

Do not permit arbitrary executable file uploads.

Do not expose private certificates or documents through public storage policies.

13.8 Homepage editor

Allow the owner to:

- Edit hero copy.
- Select featured projects.
- Change section order.
- Hide or show sections.
- Change CTA labels.
- Change the default theme.
- Change selected accent colors within accessible limits.
- Update footer information.
- Preview changes before publication.

The editor does not need to become a complex unrestricted page builder. Use predefined, well-designed sections with controlled configuration.

13.9 CV management

The dashboard must allow the owner to:

- Update the structured career data.
- Upload an existing CV PDF.
- Replace uploaded files.
- Generate an Arabic CV.
- Generate an English CV.
- Preview the final PDF.
- Download the generated PDF.
- Set which CV is the public default.
- Keep unpublished versions as drafts.

The generated CV should use the same verified data as the public website.

Do not generate a PDF that cuts off text, breaks Arabic shaping, uses the wrong writing direction, or produces unreadable font sizes.

---

14. ADMIN AUTHENTICATION AND SECURITY

Security is mandatory.

14.1 One administrator

Create one owner-controlled administrator account using Supabase Auth or an equivalent secure authentication provider.

Requirements:

- Email and password login.
- No public registration.
- No public account creation.
- No administrator account creation through the website.
- Logout.
- Session management.
- Password reset through a securely configured process.
- Strong password policy.
- Optional MFA if supported and configured.
- Rate limiting for authentication and sensitive operations.

The administrator email must be configured privately during setup. Do not invent an administrator email or password.

14.2 Authorization

Authentication and authorization must be enforced on the server and in the database.

Protect:

- "/admin"
- "/admin/*"
- Content mutation routes.
- File upload routes.
- Publish/unpublish operations.
- Settings changes.
- Contact-message management.
- Any administrative API endpoint.

A visitor who enters an administrative URL directly must be redirected to login or receive a proper unauthorized response.

A visitor must not be able to perform administrative operations by calling an API endpoint directly.

Do not rely solely on client-side route guards or hidden UI controls.

14.3 Database security

Use Row Level Security on exposed database tables.

Public visitors may read only published public content.

Only the authorized administrator may create, update, delete, reorder, or publish content.

Draft content must not be available through public queries.

Private contact messages must never be readable through anonymous public queries.

The "service_role" key or any privileged Supabase secret must never be included in client-side bundles.

Official references:

- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/security/product-security
- https://supabase.com/docs/guides/storage/security/access-control

14.4 Password and session security

- Never store plaintext passwords in the application database.
- Never hardcode the administrator password in source code.
- Never commit secrets to GitHub.
- Use secure session handling.
- Use HTTPS in production.
- Use secure cookies when implementing custom session cookies.
- Validate server-side authorization for every sensitive action.
- Use CSRF protection where applicable to the authentication and mutation architecture.
- Use rate limiting and reasonable login-attempt controls.
- Do not log passwords, tokens, or sensitive form contents.
- Provide a safe logout flow.

Official password security guidance:

https://supabase.com/docs/guides/auth/password-security

14.5 Storage security

Use separate storage policies for public and private files.

Public assets may include:

- Published project screenshots.
- Approved logos.
- Public portrait.
- Approved public CV PDFs.

Private assets may include:

- Unpublished documents.
- Private certificates.
- Draft media.
- Files that must not be publicly indexed.

Do not assume that an unlinked file is private. Enforce access restrictions at the storage layer.

14.6 Contact form protection

- Server-side validation.
- Input length limits.
- Email validation.
- Rate limiting.
- Honeypot or other appropriate bot protection.
- Safe error messages.
- Spam handling.
- No arbitrary HTML execution.
- No open email relay.
- No secrets exposed in browser code.

If an external email service is used, keep its API key server-side.

If email delivery is not configured, store the message securely and clearly report the actual submission status.

---

15. DATA MODEL

Design a normalized PostgreSQL schema with clear relationships and appropriate indexes.

Suggested tables:

15.1 "site_settings"

Purpose: Global website configuration.

Suggested fields:

- "id"
- "site_name_ar"
- "site_name_en"
- "default_locale"
- "default_theme"
- "accent_color"
- "public_email"
- "public_phone"
- "public_whatsapp"
- "public_location"
- "github_username"
- "logo_asset_id"
- "portrait_asset_id"
- "updated_at"
- "updated_by"

Sensitive credentials must not be stored in this table.

15.2 "profile_content"

Purpose: Professional biography and hero content.

Suggested fields:

- "id"
- "locale"
- "display_name"
- "professional_title"
- "short_bio"
- "long_bio"
- "hero_heading"
- "hero_description"
- "primary_cta_label"
- "secondary_cta_label"
- "updated_at"

Use appropriate uniqueness constraints for locale-specific records.

15.3 "projects"

Suggested fields:

- "id"
- "slug"
- "title_ar"
- "title_en"
- "summary_ar"
- "summary_en"
- "description_ar"
- "description_en"
- "category_id"
- "github_url"
- "demo_url"
- "cover_asset_id"
- "status"
- "is_featured"
- "is_published"
- "sort_order"
- "published_at"
- "created_at"
- "updated_at"

Do not store unrestricted arbitrary executable content.

15.4 "project_translations"

Optional separate translation table if the selected architecture benefits from it.

Suggested fields:

- "id"
- "project_id"
- "locale"
- "title"
- "summary"
- "description"
- "case_study"
- "seo_title"
- "seo_description"

Use one consistent translation strategy throughout the application. Do not duplicate content across multiple incompatible structures.

15.5 "project_media"

Suggested fields:

- "id"
- "project_id"
- "asset_id"
- "alt_ar"
- "alt_en"
- "caption_ar"
- "caption_en"
- "sort_order"

15.6 "experience"

Suggested fields:

- "id"
- "employer_ar"
- "employer_en"
- "role_ar"
- "role_en"
- "description_ar"
- "description_en"
- "start_date"
- "end_date"
- "is_current"
- "logo_asset_id"
- "is_published"
- "sort_order"
- "created_at"
- "updated_at"

Support uncertain dates without inventing precision.

15.7 "education"

Suggested fields:

- "id"
- "institution_ar"
- "institution_en"
- "qualification_ar"
- "qualification_en"
- "description_ar"
- "description_en"
- "start_date"
- "end_date"
- "grade"
- "training_hours"
- "status"
- "is_published"
- "sort_order"

15.8 "certifications"

Suggested fields:

- "id"
- "title_ar"
- "title_en"
- "issuer_ar"
- "issuer_en"
- "issue_date"
- "description_ar"
- "description_en"
- "credential_status"
- "asset_id"
- "is_published"
- "sort_order"

15.9 "skills"

Suggested fields:

- "id"
- "name_ar"
- "name_en"
- "group_id"
- "description_ar"
- "description_en"
- "icon"
- "is_published"
- "sort_order"

15.10 "skill_groups"

Suggested fields:

- "id"
- "name_ar"
- "name_en"
- "sort_order"
- "is_published"

15.11 "categories"

Suggested fields:

- "id"
- "name_ar"
- "name_en"
- "slug"
- "sort_order"
- "is_published"

15.12 "assets"

Suggested fields:

- "id"
- "storage_path"
- "file_name"
- "mime_type"
- "file_size"
- "width"
- "height"
- "alt_text_ar"
- "alt_text_en"
- "visibility"
- "created_at"
- "created_by"

Avoid exposing sensitive internal metadata through public endpoints.

15.13 "homepage_sections"

Suggested fields:

- "id"
- "section_key"
- "title_ar"
- "title_en"
- "is_visible"
- "sort_order"
- "configuration"
- "updated_at"

Validate the structure of JSON configuration instead of trusting arbitrary client input.

15.14 "contact_messages"

Suggested fields:

- "id"
- "sender_name"
- "sender_email"
- "inquiry_type"
- "message"
- "status"
- "created_at"
- "read_at"
- "handled_at"

This table must be private.

The public visitor may submit a message through a protected server endpoint, but must not gain permission to read, update, or delete messages.

15.15 "github_cache"

Use this table only if persistent caching is needed.

Suggested fields:

- "id"
- "repository_full_name"
- "api_payload"
- "fetched_at"
- "expires_at"
- "last_error"

Validate the cached payload and avoid storing unnecessary data.

15.16 Schema rules

- Use UUIDs or suitable primary keys.
- Add foreign keys.
- Add indexes for published records, slugs, category filters, and sorting.
- Add uniqueness constraints for slugs and translations.
- Add sensible timestamp defaults.
- Use transactions for related changes where needed.
- Use database migrations for every schema change.
- Add tests for authorization and publication rules.
- Keep development seed data separate from production content.

The exact schema may be refined during implementation, but it must preserve these capabilities and security boundaries.

---

16. CONTENT PUBLICATION WORKFLOW

Implement a clear publication workflow.

Suggested states:

- Draft.
- Published.
- Archived.

Only published content appears on public pages.

The owner must be able to:

1. Create a draft.
2. Edit its Arabic and English content.
3. Upload media.
4. Preview the public presentation.
5. Publish.
6. Update the content later.
7. Unpublish or archive it.

Use confirmation before destructive actions.

Provide clear feedback when saving, uploading, publishing, or encountering errors.

Prevent accidental deletion of referenced media where practical.

Do not show draft projects in public search results, sitemap entries, or public API responses.

---

17. CV GENERATION AND DOWNLOADS

The site must support Arabic and English CVs.

17.1 Requirements

- Separate Arabic and English versions.
- Professional A4 document layout.
- Correct Arabic shaping and RTL.
- Readable typography.
- Clear headings.
- Consistent dates.
- Optional professional photograph.
- Clickable email and GitHub links where supported.
- Suitable margins and page breaks.
- No clipped text.
- No missing glyphs.
- No unnecessary decorative graphics.

17.2 Content consistency

Generate the CV from the structured profile, education, experience, and certification records.

Allow the owner to select which sections and records appear in the exported document.

Use a professional document design rather than a direct screenshot of the website.

If a PDF is uploaded manually, preserve the original and allow the owner to choose between the uploaded document and the generated document.

Do not overwrite the original uploaded file automatically.

17.3 Verification

Test PDFs with:

- Arabic-only content.
- English-only content.
- Mixed Arabic and English.
- Long employer names.
- Multiple pages.
- Missing optional fields.
- Special characters and links.

---

18. SEARCH ENGINE OPTIMIZATION

Implement technical SEO from the beginning.

Requirements:

- Unique page titles.
- Meta descriptions.
- Canonical URLs.
- Correct localized routes.
- "hreflang" links where applicable.
- Open Graph metadata.
- Social sharing images.
- Sitemap.
- Robots configuration.
- Structured data where appropriate.
- Descriptive project slugs.
- Useful image alternative text.
- Meaningful page headings.
- Clean internal links.
- Correct handling of unpublished pages.

Potential structured data:

- Person.
- WebSite.
- CreativeWork for suitable project pages.

Only publish structured-data fields supported by real content.

Do not add fake reviews, fake ratings, or unsupported professional credentials.

The public website must be crawlable without requiring authentication.

The administration dashboard and sensitive routes must not be indexed.

Use server rendering or appropriate static rendering for public content when beneficial.

---

19. ACCESSIBILITY

Aim for WCAG 2.2 AA where practical.

Official reference:

https://www.w3.org/TR/WCAG22/

Requirements:

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Accessible forms.
- Clear labels and error messages.
- Sufficient color contrast.
- Alternative text for meaningful images.
- Accessible navigation menus.
- Correct document language and direction.
- Reduced-motion support.
- Accessible dialogs and confirmations.
- Screen-reader-friendly status messages.
- No essential interaction that depends only on color, hover, or animation.

Test the website using keyboard navigation and automated accessibility tools.

---

20. PERFORMANCE REQUIREMENTS

Optimize for real mobile devices and variable network conditions.

20.1 Images

- Use responsive image sizes.
- Prefer WebP or AVIF where supported.
- Preserve transparency for the portrait when necessary.
- Use correct width and height attributes.
- Avoid loading every project screenshot on initial page load.
- Lazy-load below-the-fold media.
- Do not lazy-load the critical hero image if it would delay the main visual unnecessarily.
- Avoid oversized source files.
- Provide suitable fallbacks.

20.2 Rendering

- Prefer server components for static or database-driven public content.
- Minimize client-side JavaScript.
- Avoid unnecessary global state.
- Load heavy visual components only when needed.
- Use appropriate caching.
- Prevent layout shifts.
- Keep animations lightweight.

20.3 Quality targets

Use Lighthouse and real-browser testing.

Initial targets:

- Performance: aim for 90 or higher on representative pages.
- Accessibility: aim for 95 or higher.
- Best Practices: aim for 95 or higher.
- SEO: aim for 95 or higher.

These are goals, not guaranteed results. Record actual results on the tested environment and improve identified bottlenecks.

---

21. CONTACT AND COMMUNICATION

The contact system must work end to end.

21.1 Public actions

- Open email composition.
- Open the verified WhatsApp contact.
- Open GitHub.
- Submit a contact message.

21.2 Contact message workflow

1. Visitor completes the form.
2. Client-side validation provides immediate feedback.
3. The server validates the request independently.
4. Rate limiting and bot protection are applied.
5. The message is stored securely.
6. The system reports the actual submission result.
7. The owner can view the message in the private dashboard.
8. Optional email notification is sent only if a provider is configured.
9. Message status can be updated by the owner.

Do not expose private messages through the public database API.

Do not automatically reply to visitors using AI unless the owner explicitly enables that feature later.

---

22. OPTIONAL AI FEATURES

Keep the initial release focused. Do not add AI merely for marketing purposes.

Potential future features:

- Draft bilingual project descriptions.
- Suggest translations.
- Summarize a verified project README.
- Generate initial CV drafts from approved profile data.
- Answer visitor questions using published portfolio content.

If AI features are added:

- Require owner approval before publishing generated content.
- Do not invent experience or credentials.
- Keep API keys server-side.
- Apply rate limits.
- Avoid sending private admin data unnecessarily.
- Clearly distinguish generated drafts from published content.
- Allow the owner to disable AI functionality.

AI must not become a dependency for basic website rendering or contact submission.

---

23. GITHUB WORKFLOW AND PROJECT DOCUMENTATION

The owner uses the GitHub account:

https://github.com/En-Dhiaa

The implementation agent must preserve project progress using Git.

23.1 Repository

Suggested repository name:

"dhiaa-portfolio"

If a suitable existing repository already exists, inspect it before creating another.

23.2 Required documentation

Create and maintain:

- "README.md"
- "PORTFOLIO_MASTER_PLAN.md"
- "docs/ARCHITECTURE.md"
- "docs/DATABASE_SCHEMA.md"
- "docs/SECURITY.md"
- "docs/DEPLOYMENT.md"
- "docs/CONTENT_GUIDE.md"
- "docs/TESTING.md"
- ".env.example"

The ".env.example" file must contain placeholder names only, never actual secrets.

23.3 Git rules

- Initialize Git if needed.
- Commit meaningful, working stages.
- Use descriptive commit messages.
- Run relevant tests before commits.
- Keep the main branch stable.
- Do not commit build artifacts unnecessarily.
- Do not commit secrets.
- Do not push without the owner's configured GitHub authorization.
- Do not claim that code was pushed unless the remote operation succeeded.
- Record known issues in the README or a project issue.

Suggested commit sequence:

1. "chore: initialize portfolio architecture"
2. "feat: build responsive bilingual design system"
3. "feat: implement homepage and hero composition"
4. "feat: add project portfolio and case studies"
5. "feat: add professional experience and education"
6. "feat: integrate public GitHub repositories"
7. "feat: implement secure admin authentication"
8. "feat: build content management dashboard"
9. "feat: add CV generation and contact workflow"
10. "test: add security and responsive regression coverage"
11. "chore: prepare production deployment"

Use fewer or more commits as appropriate to the actual implementation.

---

24. DEVELOPMENT PHASES

Do not attempt to implement the entire project in one uncontrolled generation pass.

Complete the following stages in order.

Phase 0 — Inspect and plan

Tasks:

- Inspect the existing repository and development environment.
- Confirm the installed runtime and package manager.
- Identify available project assets.
- Inspect the GitHub profile and accessible repositories.
- List existing code that can be reused.
- Establish the directory structure.
- Record technical decisions.
- Identify missing credentials and assets.

Deliverables:

- Architecture plan.
- Initial project documentation.
- ".env.example".
- Clear list of dependencies and unresolved questions.

Acceptance criteria:

- Existing project state is understood.
- No working code is destroyed unnecessarily.
- No secrets are requested through source code or committed files.

Phase 1 — Visual design system

Tasks:

- Define colors and typography.
- Build responsive containers.
- Build navigation.
- Build buttons, cards, badges, form fields, and dialogs.
- Implement Arabic and English layout direction.
- Implement light and dark themes.
- Establish animation conventions.

Acceptance criteria:

- Components work in both languages and themes.
- No horizontal overflow on tested mobile sizes.
- Focus states and basic keyboard navigation work.
- Components remain consistent across the site.

Phase 2 — Public homepage

Tasks:

- Build the hero.
- Prepare the portrait integration.
- Build specialties and project previews.
- Build experience and education summaries.
- Build contact actions.
- Build the footer.
- Implement responsive layouts.

Acceptance criteria:

- The homepage works without administrative login.
- No broken links or inert buttons.
- No placeholder text is accidentally published.
- Portrait and project images have suitable loading behavior.

Phase 3 — Public content pages

Tasks:

- Build project listing.
- Build project details.
- Build experience page.
- Build education and certification pages.
- Build About page.
- Build Contact page.
- Implement localized metadata and routes.

Acceptance criteria:

- Pages render correctly in Arabic and English.
- Unpublished records are not visible.
- Missing optional fields do not break layouts.
- Project links work correctly.

Phase 4 — GitHub integration

Tasks:

- Retrieve public repository information.
- Implement caching.
- Handle pagination and rate limits.
- Allow featured-project selection.
- Allow manually authored descriptions and screenshots.
- Handle API failure gracefully.

Acceptance criteria:

- The website remains usable when GitHub is unavailable.
- Only verified repository URLs are displayed.
- Automatic updates do not overwrite manually authored case studies.
- Repository metadata is not misrepresented as professional achievement.

Phase 5 — Database and administrator authentication

Tasks:

- Configure Supabase.
- Apply migrations.
- Implement the owner authentication flow.
- Disable public registration.
- Apply database permissions and RLS.
- Configure storage policies.
- Protect server-side mutation routes.

Acceptance criteria:

- Anonymous users cannot mutate content.
- Anonymous users cannot read drafts or private messages.
- Direct administrative URL access requires a valid session.
- Privileged keys are absent from browser bundles.
- Authorization tests cover allowed and denied operations.

Phase 6 — Administration dashboard

Tasks:

- Implement dashboard navigation.
- Implement profile editing.
- Implement project management.
- Implement experience and education management.
- Implement certifications and skills.
- Implement media management.
- Implement homepage settings.
- Implement publishing workflow.
- Implement contact-message management.

Acceptance criteria:

- Changes persist in the database.
- The public site reflects published changes.
- Drafts remain private.
- Form errors and upload errors are understandable.
- Destructive actions require confirmation.

Phase 7 — CV and contact delivery

Tasks:

- Implement Arabic and English CV generation.
- Implement PDF preview and download.
- Implement contact submission.
- Implement server validation.
- Implement rate limiting and spam protection.
- Configure email notifications only if credentials and provider are available.

Acceptance criteria:

- CV files are readable and correctly formatted.
- Arabic text and mixed-direction content are rendered correctly.
- Contact messages are stored privately.
- The application reports real delivery status.

Phase 8 — SEO, accessibility, and performance

Tasks:

- Configure metadata.
- Generate sitemap and robots configuration.
- Add localized canonical and language references.
- Audit image loading.
- Audit animations.
- Test keyboard navigation.
- Run accessibility and performance tools.
- Resolve major layout shifts and overflow issues.

Acceptance criteria:

- Public pages are indexable.
- Administrative pages are not indexable.
- No critical accessibility issue remains unresolved.
- Performance results are documented.

Phase 9 — Production preparation

Tasks:

- Configure production environment variables.
- Configure domain and HTTPS when available.
- Apply production database migrations.
- Create the initial administrator securely.
- Verify storage policies.
- Verify backup and recovery arrangements.
- Run end-to-end tests.
- Document deployment and rollback steps.

Acceptance criteria:

- The production build succeeds.
- Authentication and authorization work in production.
- No secret is exposed in client bundles.
- Contact delivery and GitHub integration have been tested.
- Deployment status is accurately reported.

---

25. TESTING STRATEGY

Implement tests throughout development rather than waiting until the end.

25.1 Unit tests

Test:

- Content validation.
- Locale selection.
- Date formatting.
- Project filtering.
- URL validation.
- Publication-state logic.
- CV content selection.

25.2 Integration tests

Test:

- Public content retrieval.
- Draft visibility restrictions.
- Administrator authentication.
- Unauthorized mutation attempts.
- Media upload permissions.
- Contact-message submission.
- GitHub API failure handling.

25.3 End-to-end tests

Test:

1. Visitor opens the Arabic homepage.
2. Visitor switches to English.
3. Visitor switches theme.
4. Visitor opens a project.
5. Visitor downloads the CV.
6. Visitor submits a contact message.
7. Anonymous visitor attempts to access the admin dashboard.
8. Owner logs in.
9. Owner creates a project draft.
10. Owner publishes the project.
11. The published project appears publicly.
12. The owner edits and unpublishes the project.
13. The project disappears from public views.
14. The owner logs out.
15. Administrative operations are denied after logout.

25.4 Responsive regression tests

Verify critical pages on representative mobile, tablet, and desktop viewports.

Check:

- Navigation.
- Portrait crop.
- Text wrapping.
- Project cards.
- Modal dialogs.
- Admin forms.
- Tables.
- PDF actions.
- Theme switching.
- RTL layout.

25.5 Security tests

Verify:

- No public registration.
- No unauthorized data mutation.
- No draft exposure.
- No public contact-message access.
- No private storage access.
- No leaked privileged key.
- No unsafe file upload.
- No unrestricted content injection.
- Rate limiting for sensitive endpoints.
- Proper server-side validation.

---

26. DEPLOYMENT AND ENVIRONMENT VARIABLES

Create a documented ".env.example".

Possible variable names:

- "NEXT_PUBLIC_SUPABASE_URL"
- "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
- "SUPABASE_SECRET_KEY"
- "GITHUB_TOKEN" (optional; server-side only)
- "CONTACT_EMAIL_PROVIDER_KEY" (optional)
- "CONTACT_RECIPIENT_EMAIL"
- "NEXT_PUBLIC_SITE_URL"

Use the exact variable names required by the chosen libraries and configuration.

Rules:

- Public client configuration may be exposed only when intended for browser use.
- Supabase publishable keys do not replace RLS policies.
- Supabase secret keys must remain server-side.
- GitHub tokens must remain server-side.
- Email provider keys must remain server-side.
- The ".env" file must be ignored by Git.
- Never paste production secrets into project documentation.
- Never create a production password automatically and print it in application logs.

Provide documented instructions for local setup, database migration, initial admin provisioning, testing, building, and deployment.

If any provider has not been configured, mark that feature as pending instead of pretending it is operational.

---

27. BACKUPS AND RECOVERY

Because the portfolio contains professional content and uploaded assets, provide a backup strategy.

Requirements:

- Database backup according to the selected hosting plan and operational needs.
- Documented recovery procedure.
- Backup of original portrait and media assets.
- Version control for application source code.
- Migrations stored in Git.
- Export option for important structured portfolio content where practical.
- Periodic verification that backups can be restored.

Do not treat GitHub source control as a backup of the production database or uploaded media.

Do not store database passwords or private backup credentials in the repository.

Document the limitations of the selected Supabase plan and hosting platform.

---

28. DESIGN ACCEPTANCE CRITERIA

The website must feel intentionally designed, not assembled from unrelated components.

The final design should demonstrate:

- A distinctive portrait-based hero.
- Strong visual hierarchy.
- Professional typography.
- Refined Arabic and English typography.
- Balanced whitespace.
- Consistent component styles.
- High-quality project presentations.
- Smooth but restrained animation.
- Excellent mobile composition.
- A coherent light theme.
- A coherent dark theme.
- Functional navigation and interactions.
- Clear professional messaging.
- No accidental placeholder content.
- No unnecessary visual clutter.

The admin dashboard must use the same brand system while prioritizing usability and content management.

Before finalizing the design, inspect all major pages at desktop and mobile sizes.

Do not consider a visually attractive homepage sufficient if the other pages or dashboard are poorly designed.

---

29. PROJECT FILE STRUCTURE

Use a clear, modular structure similar to the following. Adjust it to the actual Next.js conventions and selected libraries.

dhiaa-portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── education/
│   │   └── contact/
│   ├── admin/
│   │   ├── login/
│   │   └── (protected)/
│   ├── api/
│   │   ├── contact/
│   │   └── github/
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css
├── components/
│   ├── layout/
│   ├── hero/
│   ├── projects/
│   ├── experience/
│   ├── education/
│   ├── contact/
│   ├── dashboard/
│   └── ui/
├── lib/
│   ├── auth/
│   ├── github/
│   ├── supabase/
│   ├── validation/
│   ├── i18n/
│   └── utils/
├── types/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── tests/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── .env.example
├── .gitignore
├── README.md
└── PORTFOLIO_MASTER_PLAN.md

This is a logical reference, not a requirement to create empty files or folders without a purpose.

---

30. FIRST ADMINISTRATOR PROVISIONING

Create the initial owner account using a secure setup procedure.

Requirements:

- The account is provisioned through a trusted administrative process.
- Public sign-up is disabled.
- No default password is committed to source control.
- No hardcoded password is included in the project.
- The initial credentials are configured privately by the owner.
- Password reset is securely configured.
- Database policies recognize only the authorized administrator identity or role.
- The account cannot be made administrative merely by editing a client-side profile field.

Document the setup procedure.

If an administrative email is required, ask the owner to configure it privately during setup rather than inventing one.

---

31. FINAL DELIVERY REQUIREMENTS

The completed project must include:

1. Working public portfolio.
2. Arabic and English content and navigation.
3. Light and dark themes.
4. Responsive mobile-first design.
5. Portrait integration when the actual photograph is supplied.
6. Project listing and detail pages.
7. Professional experience and education pages.
8. Certification and skills management.
9. GitHub integration.
10. Secure single-owner admin login.
11. Full content-management dashboard.
12. Media upload and storage policies.
13. CV upload and generation capabilities.
14. Working contact submission.
15. Search engine metadata and sitemap.
16. Accessibility and performance checks.
17. Database migrations and security policies.
18. Unit, integration, and end-to-end tests.
19. Setup and deployment documentation.
20. Git commits for completed stages.
21. A list of verified features.
22. A list of remaining limitations or pending configurations.

Do not mark the project as complete while critical security, authentication, publishing, or mobile layout requirements remain broken.

---

32. FINAL INSTRUCTIONS TO THE AI DEVELOPMENT AGENT

Begin by inspecting the current project and available assets.

Then:

1. Create or update "PORTFOLIO_MASTER_PLAN.md".
2. Create a concise implementation checklist.
3. Record missing assets and unresolved factual questions.
4. Inspect the public GitHub account and repositories.
5. Build the design system.
6. Implement the public website.
7. Implement the backend and database security.
8. Implement the owner-only dashboard.
9. Connect all content forms to persistent storage.
10. Implement GitHub, contact, and CV functionality.
11. Test all routes, languages, themes, and responsive layouts.
12. Fix critical problems before continuing.
13. Commit meaningful completed stages.
14. Document deployment instructions.
15. Provide an honest completion report.

The owner expects a premium result with creative visual design and real functionality.

Do not stop after generating the initial UI.

Do not replace requested features with nonfunctional buttons, mock data, or hardcoded content.

Do not fabricate missing professional information.

When a task requires the owner's portrait, private administrator credentials, or production API credentials, build the necessary integration and document the exact setup required. Never invent those assets or credentials.

The final website must be publicly accessible to visitors while the administration dashboard remains protected and manageable by the owner alone.

The definition of success is a polished, trustworthy, fast, bilingual professional identity website that the owner can maintain independently and that works reliably on mobile and desktop.