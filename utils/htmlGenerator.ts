import { Language, translations } from '@/constants/translations';
import { ResumeData } from '@/constants/types';

// --- TEMPLATE DEFINITIONS ---
export const templates = [
    { id: 'titanium', name: 'Titanium', color: '#3b82f6', isPremium: false },
    { id: 'magenta', name: 'Magenta', color: '#d946ef', isPremium: false },
    { id: 'noir', name: 'Noir', color: '#000000', isPremium: false },
    { id: 'manhattan', name: 'Manhattan', color: '#1a365d', isPremium: false },
    { id: 'swiss', name: 'Swiss', color: '#ef4444', isPremium: false },
    { id: 'monaco', name: 'Monaco', color: '#4f46e5', isPremium: false },
    { id: 'verona', name: 'Verona', color: '#57534e', isPremium: false },
    { id: 'stockholm', name: 'Stockholm', color: '#0f172a', isPremium: false },
    { id: 'horizon', name: 'Horizon', color: '#2563eb', isPremium: false },
    { id: 'element', name: 'Element', color: '#333333', isPremium: false },
    // Mega Pack
    { id: 'glacier', name: 'Glacier', color: '#0ea5e9', isPremium: false },
    { id: 'berlin', name: 'Berlin', color: '#10b981', isPremium: false },
    { id: 'canvas', name: 'Canvas', color: '#be185d', isPremium: false },
    { id: 'toronto', name: 'Toronto', color: '#334155', isPremium: false },
    // User Examples
    { id: 'unique', name: 'Unique', color: '#84cc16', isPremium: false },
    { id: 'hoffman', name: 'Hoffman', color: '#3b82f6', isPremium: false },
    { id: 'creative', name: 'Creative', color: '#EC4899', isPremium: false },
    // Batch 2 (User Requested)
    { id: 'polished', name: 'Polished', color: '#db2777', isPremium: false },
    { id: 'executive', name: 'Executive', color: '#1e3a8a', isPremium: false },
    // New Pro Templates
    { id: 'gatsby', name: 'Gatsby', color: '#ab6f03', isPremium: true },
    { id: 'vanguard', name: 'Vanguard', color: '#1e293b', isPremium: true },
    { id: 'glider', name: 'Glider', color: '#3b82f6', isPremium: true },
];

// --- MODULE STATE ---
export let isExportMode = false;
export const setIsExportMode = (value: boolean) => { isExportMode = value; };

// Responsive viewport for preview, fixed for PDF export
const META_TAG = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">`;

const calculateZoom = (data: ResumeData) => {
    let score = 0;
    score += (data.experience?.length || 0) * 20;
    score += (data.education?.length || 0) * 15;
    score += (data.skills?.length || 0) * 2;
    score += (data.projects?.length || 0) * 10;
    score += (data.references?.length || 0) * 10;
    score += (data.certifications?.length || 0) * 10;
    score += (data.languages?.length || 0) * 5;
    score += (data.personalInfo.about?.length || 0) / 20;

    // Balanced - fills page while iOS width/height prevents second page
    if (score > 400) return 0.50;
    if (score > 350) return 0.56;
    if (score > 300) return 0.62;
    if (score > 260) return 0.68;
    if (score > 220) return 0.74;
    if (score > 180) return 0.80;
    if (score > 140) return 0.85;
    if (score > 100) return 0.89;
    if (score > 70) return 0.92;
    if (score > 50) return 0.95;
    return 0.98;
};

const getGlobalStyle = (data: ResumeData) => {
    const zoom = isExportMode ? calculateZoom(data) : 1.0;
    const pageHeight = isExportMode ? '1123px' : '100%';
    const minHeight = isExportMode ? '0' : '100vh';

    // Export mode'da margin/padding'leri azalt
    const exportModeStyles = isExportMode ? `
        .exp-item, .s-item, .item { margin-bottom: 15px !important; }
        .m-head, .s-head, .section-title { margin-bottom: 15px !important; margin-top: 15px !important; }
        .e-desc, .desc, p { margin-bottom: 8px !important; line-height: 1.4 !important; }
        .photo { max-height: 120px !important; }
    ` : '';

    return `${META_TAG} * { box-sizing: border-box; margin: 0; padding: 0; } 
    html { 
        height: ${pageHeight}; 
        max-height: ${pageHeight}; 
        overflow: hidden; 
        margin: 0;
        padding: 0;
    }
    body { 
        -webkit-print-color-adjust: exact; 
        zoom: ${zoom}; 
        width: 100%; 
        height: ${pageHeight};
        max-height: ${pageHeight};
        min-height: ${minHeight};
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    ${exportModeStyles}
    @media print {
        html, body {
            height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
        }
        @page {
            size: A4;
            margin: 0mm;
        }
    }
    .page, .sheet, .container { min-height: ${minHeight}; }`;
};

const renderContactExtras = (info: ResumeData['personalInfo'], language: Language, style: 'text' | 'modern' | 'titanium' = 'text', color: string = '#666') => {
    const t = translations[language];
    const parts = [];
    if (info.birthDate) parts.push(`<b>${t.birth_label}</b> ${info.birthDate}`);
    if (info.birthPlace) parts.push(`<b>${t.place_label}</b> ${info.birthPlace}`);
    if (info.maritalStatus) parts.push(`<b>${t.marital_label}</b> ${info.maritalStatus}`);
    if (info.militaryStatus && info.militaryStatus.toLowerCase() !== 'yok' && info.militaryStatus.toLowerCase() !== 'none') parts.push(`<b>${t.military_label}</b> ${info.militaryStatus}`);
    if (info.drivingLicense) parts.push(`<b>${t.license_label}</b> ${info.drivingLicense}`);

    if (parts.length === 0) return '';

    if (style === 'modern') {
        return `<div style="margin-top:20px;border-top:1px solid ${color}30;padding-top:15px">
            ${parts.map(p => {
            const [label, val] = p.split('</b>');
            return `<div style="font-size:13px;color:${color};margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
                    <span style="opacity:0.8">${label}</b></span>
                    <span style="font-weight:600">${val}</span>
                </div>`;
        }).join('')}
         </div>`;
    }

    if (style === 'titanium') {
        return `<div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:15px;margin-bottom:20px">
            ${parts.map(p => `<div class="c-row">${p}</div>`).join('')}
        </div>`;
    }

    return `<div style="margin-top:15px;font-size:13px;color:${color};line-height:1.6;border-top:1px dashed ${color}40;padding-top:10px">
        ${parts.map(p => `<div style="margin-bottom:2px">${p}</div>`).join('')}
    </div>`;
};

// ENGINE 1: TITANIUM (Tech Executive)
const renderTitanium = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Inter') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:0;color:#1e293b}
    .page{display:grid;grid-template-columns:300px 1fr;min-height:100vh}
    .side{background:#0f172a;color:#fff;padding:50px 30px;display:flex;flex-direction:column}
    .main{padding:60px 50px;background:#fff}
    .photo{width:160px;height:160px;border-radius:24px;object-fit:cover;margin:0 auto 40px;display:block;border:4px solid ${primaryColor}}
    .name{font-size:42px;font-weight:800;line-height:0.95;color:#0f172a;margin-bottom:10px;letter-spacing:-1px}
    .role{font-size:18px;color:${primaryColor};font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:40px}
    .s-head{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${primaryColor};margin-bottom:20px;display:flex;align-items:center}
    .s-head::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.1);margin-left:15px}
    .s-item{margin-bottom:25px}
    .c-row{display:flex;align-items:center;margin-bottom:12px;font-size:13px;color:#cbd5e1;line-height:1.4}.c-row b{color:#fff;margin-right:8px}
    .skill-tag{display:inline-block;background:rgba(255,255,255,0.1);padding:6px 12px;border-radius:6px;font-size:12px;margin:0 6px 6px 0;border:1px solid rgba(255,255,255,0.05)}
    .m-head{font-size:20px;font-weight:800;color:#0f172a;border-bottom:3px solid ${primaryColor};display:inline-block;padding-bottom:5px;margin-bottom:30px}
    .exp-item{margin-bottom:40px;position:relative;padding-left:25px;border-left:2px solid #e2e8f0}
    .exp-item::before{content:'';position:absolute;left:-7px;top:0;width:12px;height:12px;background:#fff;border:3px solid ${primaryColor};border-radius:50%}
    .e-tit{font-size:18px;font-weight:700;color:#0f172a}
    .e-sub{font-size:14px;color:${primaryColor};font-weight:600;margin-bottom:8px;text-transform:uppercase}
    .e-date{font-size:12px;color:#64748b;font-weight:600;margin-bottom:8px}
    .e-desc{font-size:14px;line-height:1.7;color:#334155}
    </style></head><body>
    <div class="page">
        <div class="side">
             ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
             <div class="s-head">${t.cv_contact}</div>
             <div class="c-row">${personalInfo.email}</div>
             <div class="c-row">${personalInfo.phone}</div>
             <div class="c-row">${personalInfo.address}</div>
             ${renderContactExtras(personalInfo, language, 'titanium', '#cbd5e1')}
             ${personalInfo.socialLinks?.linkedin ? `<div class="c-row">in/ ${personalInfo.socialLinks.linkedin}</div>` : ''}
             
             <div class="s-head" style="margin-top:40px">${t.cv_skills}</div>
             <div>${skills.map(s => `<span class="skill-tag">${s.name}</span>`).join('')}</div>

             ${languages.length > 0 ? `<div class="s-head" style="margin-top:40px">${t.cv_languages}</div>${languages.map(l => `<div class="c-row" style="justify-content:space-between"><span>${l.name}</span><span style="color:${primaryColor}">${l.proficiency}</span></div>`).join('')}` : ''}
        </div>
        <div class="main">
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
            ${personalInfo.about ? `<p style="font-size:15px;line-height:1.7;color:#475569;margin-bottom:50px;border-left:4px solid #e2e8f0;padding-left:20px">${personalInfo.about}</p>` : ''}
            
            <div class="m-head">${t.cv_experience}</div>
            ${experience.map(e => `<div class="exp-item"><div class="e-tit">${e.position}</div><div class="e-sub">${e.company}</div><div class="e-date">${e.startDate} - ${e.endDate}</div><div class="e-desc">${e.description}</div></div>`).join('')}

            ${projects && projects.length > 0 ? `<div class="m-head" style="margin-top:20px">${t.cv_projects}</div>${projects.map(p => `<div class="exp-item"><div class="e-tit">${p.name}</div><div class="e-desc">${p.description}</div></div>`).join('')}` : ''}

            <div class="m-head" style="margin-top:20px">${t.cv_education}</div>
            ${education.map(e => `<div class="exp-item"><div class="e-tit">${e.school}</div><div class="e-sub" style="color:#64748b">${e.degree}</div><div class="e-date">${e.startDate} - ${e.endDate}</div></div>`).join('')}
            
             ${certifications && certifications.length > 0 ? `<div class="m-head" style="margin-top:20px">${t.cv_certifications}</div>${certifications.map(c => `<div class="exp-item" style="margin-bottom:25px"><div class="e-tit" style="font-size:16px">${c.name}</div><div class="e-sub" style="color:#64748b;font-size:13px">${c.issuer}</div></div>`).join('')}` : ''}
             
             ${references && references.length > 0 ? `<div class="m-head" style="margin-top:20px">${t.cv_references}</div>${references.map(r => `<div class="exp-item" style="margin-bottom:25px"><div class="e-tit" style="font-size:16px">${r.fullName}</div><div class="e-sub" style="color:#64748b;font-size:13px">${r.position || r.company}</div>${r.email || r.phone ? `<div class="e-desc" style="font-size:12px">${r.email || ''}${r.email && r.phone ? ' • ' : ''}${r.phone || ''}</div>` : ''}</div>`).join('')}` : ''}
        </div>
    </div></body></html>`;
};

// ENGINE 2: MAGENTA
const renderMagenta = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Poppins') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;600;700;800&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)}
    body { font-family: '${font}', sans-serif; background: #f3f4f6; }
    .page { width: 100%; min-height: 100vh; display: grid; grid-template-columns: 320px 1fr; background: #fff; }
    .sidebar { background: #111827; color: #fff; padding: 50px 30px; position: relative; overflow: hidden; }
    .sidebar::before { content: ''; position: absolute; top: -100px; left: -100px; width: 300px; height: 300px; background: ${primaryColor}; border-radius: 50%; opacity: 0.2; }
    .sidebar::after { content: ''; position: absolute; bottom: -50px; right: -50px; width: 200px; height: 200px; background: ${primaryColor}; border-radius: 50%; opacity: 0.1; }
    .photo-frame { width: 160px; height: 160px; border-radius: 50%; border: 6px solid ${primaryColor}; padding: 5px; margin: 0 auto 50px; position: relative; z-index:1; }
    .photo { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
    .side-title { font-size: 14px; font-weight: 700; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; position: relative; z-index: 1; }
    .contact-row { display: flex; align-items: center; margin-bottom: 15px; font-size: 12px; color: #d1d5db; }
    .contact-icon { width: 26px; height: 26px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: ${primaryColor}; font-size: 10px; }
    .main { padding: 50px; background: #fff; position: relative; }
    .header-bg { position: absolute; top: 0; left: 0; width: 100%; height: 180px; background: linear-gradient(135deg, ${primaryColor}10 0%, #fff 100%); z-index: 0; }
    .header { position: relative; z-index: 1; margin-bottom: 50px; }
    .name-huge { font-size: 50px; font-weight: 800; line-height: 0.9; color: #111827; letter-spacing: -2px; margin-bottom: 10px; }
    .role-badge { display: inline-block; background: #111827; color: #fff; padding: 6px 14px; font-weight: 600; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; border-radius: 4px; }
    .section-title { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 25px; position: relative; display: inline-block; }
    .section-title::after { content: ''; position: absolute; bottom: -8px; left: 0; width: 40px; height: 4px; background: ${primaryColor}; border-radius: 2px; }
    .exp-card { background: #fff; border-left: 4px solid ${primaryColor}; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 25px; border-radius: 0 8px 8px 0; }
    .exp-role { font-size: 18px; font-weight: 700; color: #111827; }
    .exp-comp { color: ${primaryColor}; font-weight: 600; font-size: 13px; }
    .exp-desc { color: #1f2937; line-height: 1.6; font-size: 13px; margin-top: 10px; }
    </style></head><body><div class="page"><div class="sidebar"><div class="photo-frame">${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}</div>
    <div class="side-title">${t.cv_contact}</div><div class="contact-row"><div class="contact-icon">@</div>${personalInfo.email}</div><div class="contact-row"><div class="contact-icon">T</div>${personalInfo.phone}</div><div class="contact-row"><div class="contact-icon">L</div>${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'modern', '#d1d5db')}
    ${personalInfo.socialLinks?.linkedin ? `<div class="contact-row"><div class="contact-icon">in</div>${personalInfo.socialLinks.linkedin}</div>` : ''}
    <div class="side-title" style="margin-top:40px">${t.cv_skills}</div>${skills.map(s => `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:12px;color:#fff;margin-bottom:4px"><span>${s.name}</span></div><div style="background:rgba(255,255,255,0.1);height:6px;border-radius:3px"><div style="background:${primaryColor};width:80%;height:100%;border-radius:3px"></div></div></div>`).join('')}
    ${languages.length > 0 ? `<div class="side-title" style="margin-top:40px">${t.cv_languages}</div>${languages.map(l => `<div class="contact-row"><b>${l.name}</b> (${l.proficiency})</div>`).join('')}` : ''}
    ${references && references.length > 0 ? `<div class="side-title" style="margin-top:40px">${t.cv_references}</div>${references.map(r => `<div style="font-size:11px;color:#ccc;margin-bottom:10px"><b>${r.fullName}</b><br>${r.company}<br>${r.phone} / ${r.email}</div>`).join('')}` : ''}
    </div><div class="main"><div class="header-bg"></div><div class="header"><div class="name-huge">${personalInfo.fullName.split(' ')[0]} <span style="color:${primaryColor}">${personalInfo.fullName.split(' ').slice(1).join(' ')}</span></div><div class="role-badge">${personalInfo.jobTitle}</div>${personalInfo.about ? `<p style="margin-top:30px;color:#4b5563;line-height:1.7;font-size:14px">${personalInfo.about}</p>` : ''}</div>
    <div class="section-title">${t.cv_experience}</div>${experience.map(e => `<div class="exp-card"><div style="display:flex;justify-content:space-between"><div class="exp-role">${e.position}</div><div style="font-size:12px;color:#9ca3af;background:#f3f4f6;padding:4px 8px;border-radius:4px">${e.startDate} - ${e.endDate}</div></div><div class="exp-comp">${e.company}</div><div class="exp-desc">${e.description}</div></div>`).join('')}
    ${projects && projects.length > 0 ? `<div class="section-title" style="margin-top:30px">${t.cv_projects}</div>${projects.map(p => `<div class="exp-card" style="border-left-color:#111827"><div class="exp-role">${p.name}</div><div class="exp-desc">${p.description}</div></div>`).join('')}` : ''}
    ${certifications && certifications.length > 0 ? `<div class="section-title" style="margin-top:30px">${t.cv_certifications}</div>${certifications.map(c => `<div class="exp-card" style="border-left-color:#111827;padding:15px"><div class="exp-role" style="font-size:15px">${c.name}</div><div style="font-size:13px;color:#666">${c.issuer} // ${c.date}</div></div>`).join('')}` : ''}
    <div class="section-title" style="margin-top:30px">${t.cv_education}</div>${education.map(e => `<div style="margin-bottom:20px;display:flex;align-items:center"><div style="width:10px;height:10px;background:${primaryColor};border-radius:50%;margin-right:15px"></div><div><div style="font-weight:700;font-size:15px">${e.school}</div><div style="color:#6b7280;font-size:13px">${e.degree}</div></div></div>`).join('')}</div></div></body></html>`;
};

// ENGINE 3: NOIR
const renderNoir = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Oswald') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    const isDark = primaryColor === '#000000' || primaryColor === '#111827';
    const accent = primaryColor;
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@500;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'Open Sans',sans-serif;color:#000}.container{max-width:900px;margin:0 auto;padding:60px}
    .grid{display:grid;grid-template-columns:1fr 280px;gap:60px}
    .header{margin-bottom:60px;border-bottom:6px solid ${accent};padding-bottom:20px;display:flex;align-items:flex-end;justify-content:space-between}
    .name{font-family:'${font}',sans-serif;font-size:52px;line-height:1.1;text-transform:uppercase;letter-spacing:-1px;color:${accent}}
    .role{font-family:'${font}',sans-serif;font-size:16px;background:${accent};color:#fff;display:inline-block;padding:5px 10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
    .s-title{font-family:'${font}';font-size:20px;text-transform:uppercase;border-bottom:1px solid ${accent};margin-bottom:20px;padding-bottom:5px;color:${accent}}
    .job{margin-bottom:30px}.job-p{font-size:18px;font-weight:300}.job-c{font-weight:700;font-size:13px;text-transform:uppercase;margin-bottom:8px;display:block;color:#555}
    .job-d{font-size:14px;line-height:1.7;color:#333}
    .contact-b{background:${accent};color:#fff;padding:25px;margin-bottom:30px}
    .c-row{margin-bottom:10px;font-size:12px;font-weight:600}
    </style></head><body><div class="container"><div class="header"><div><div class="role">${personalInfo.jobTitle}</div><div class="name">${personalInfo.fullName.split(' ')[0]}<br>${personalInfo.fullName.split(' ').slice(1).join(' ')}</div></div>${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" style="width:140px;height:180px;object-fit:cover;border:4px solid #fff;box-shadow:0 10px 30px rgba(0,0,0,0.2)"/>` : ''}</div><div class="grid"><div class="main">${personalInfo.about ? `<p style="font-size:16px;font-weight:300;line-height:1.6;margin-bottom:40px;border-left:4px solid ${accent};padding-left:20px">${personalInfo.about}</p>` : ''}<div class="s-title">${t.cv_experience}</div>${experience.map(e => `<div class="job"><div class="job-p">${e.position}</div><span class="job-c">${e.company} / ${e.startDate}-${e.endDate}</span><div class="job-d">${e.description}</div></div>`).join('')}${projects && projects.length > 0 ? `<div class="s-title" style="margin-top:40px">${t.cv_projects}</div>${projects.map(p => `<div class="job"><div class="job-p" style="font-size:18px">${p.name}</div><div class="job-d">${p.description}</div></div>`).join('')}` : ''}
    ${certifications && certifications.length > 0 ? `<div class="s-title" style="margin-top:40px">${t.cv_certifications}</div>${certifications.map(c => `<div style="margin-bottom:10px;font-size:14px"><b>${c.name}</b> / ${c.issuer}</div>`).join('')}` : ''}
    </div><div class="sidebar"><div class="contact-b"><div class="c-row">${t.email.toUpperCase()}: ${personalInfo.email}</div><div class="c-row">${t.phone.toUpperCase()}: ${personalInfo.phone}</div><div class="c-row">${t.address.toUpperCase()}: ${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#fff')}
    ${personalInfo.socialLinks?.linkedin ? `<div class="c-row">LN: ${personalInfo.socialLinks.linkedin}</div>` : ''}</div>
    <div class="s-title">${t.cv_skills}</div>${skills.map(s => `<div style="border-bottom:1px solid #ccc;padding:5px 0;font-weight:700;font-size:13px;display:flex;justify-content:space-between"><span>${s.name}</span><span>●</span></div>`).join('')}
    ${references && references.length > 0 ? `<div class="s-title" style="margin-top:30px">${t.cv_references}</div>${references.map(r => `<div style="font-size:12px;margin-bottom:10px"><b>${r.fullName}</b><br>${r.company}<br><span style="color:#555">${r.phone} / ${r.email}</span></div>`).join('')}` : ''}
    <div class="s-title" style="margin-top:30px">${t.cv_education}</div>${education.map(e => `<div style="margin-bottom:15px;font-size:14px"><b>${e.school}</b><br><span style="font-size:12px">${e.degree}</span></div>`).join('')}</div></div></div></body></html>`;
};

// ENGINE 4: MANHATTAN
const renderManhattan = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Cormorant+Garamond', secondaryFont: string = 'Montserrat') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@400;600;700&family=${secondaryFont}:wght@300;400;500&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{background:#0f1115;color:#e2e2e2;font-family:'${secondaryFont}',sans-serif;padding:0}
    .sheet{max-width:900px;margin:0 auto;min-height:100vh;display:grid;grid-template-columns:300px 1fr}
    .sidebar{background:#181a20;padding:50px 30px;border-right:1px solid #2a2d35}
    .main{padding:70px 50px}
    .gold-line{height:2px;width:40px;background:${primaryColor};margin-bottom:20px}
    .gold-text{color:${primaryColor};letter-spacing:2px;text-transform:uppercase;font-size:10px;font-weight:600;margin-bottom:8px;display:block}
    .name{font-family:'${font}',serif;font-size:48px;color:#fff;line-height:0.9;margin-bottom:10px}
    .role{font-family:'${secondaryFont}',sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:3px;color:#888;margin-bottom:50px}
    .profile-img{width:100%;height:220px;object-fit:cover;margin-bottom:30px;border-radius:2px}
    .section-header{font-family:'${font}',serif;font-size:24px;color:#fff;margin-bottom:25px;border-bottom:1px solid #2a2d35;padding-bottom:8px}
    .exp-item{margin-bottom:35px;position:relative;padding-left:20px;border-left:1px solid #333}.exp-item::before{content:'';position:absolute;left:-3px;top:8px;width:5px;height:5px;background:${primaryColor};border-radius:50%}
    .exp-role{font-size:18px;color:#fff;font-family:'${font}',serif;font-weight:600;margin-bottom:4px}
    .exp-meta{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#666;margin-bottom:10px}
    .exp-desc{font-size:13px;line-height:1.7;color:#444}
    ${primaryColor === '#d4af37' || primaryColor === '#334155' || primaryColor === '#44403c' || primaryColor === '#1c1917' ? `body{background:#fff;color:#333}.sidebar{background:#f9fafb;border-right:1px solid #e5e7eb}.name{color:#111}.section-header{color:#111;border-bottom:1px solid #e5e7eb}.exp-role{color:#111}.exp-item{border-left:1px solid #eee}.profile-img{filter:none}` : ''}
    </style></head><body><div class="sheet"><div class="sidebar">${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="profile-img"/>` : ''}<span class="gold-text">${t.cv_contact}</span><div class="gold-line"></div>
    <div style="margin-bottom:20px;font-size:12px;color:#aaa;line-height:1.6">${personalInfo.email}<br>${personalInfo.phone}<br>${personalInfo.address}${renderContactExtras(personalInfo, language, 'modern', '#aaa')}
    ${personalInfo.socialLinks?.linkedin ? `<br>LinkedIn: ${personalInfo.socialLinks.linkedin}` : ''}</div>
    <span class="gold-text" style="margin-top:40px">${t.cv_skills}</span><div class="gold-line"></div><div>${skills.map(s => `<div style="color:${primaryColor === '#d4af37' ? '#555' : '#ccc'};font-size:11px;margin-bottom:5px">• ${s.name}</div>`).join('')}</div>
    ${languages.length > 0 ? `<span class="gold-text" style="margin-top:40px">${t.cv_languages}</span><div class="gold-line"></div><div>${languages.map(l => `<div style="color:${primaryColor === '#d4af37' ? '#555' : '#ccc'};font-size:11px;margin-bottom:5px">${l.name} (${l.proficiency})</div>`).join('')}</div>` : ''}
    ${references && references.length > 0 ? `<span class="gold-text" style="margin-top:40px">${t.cv_references}</span><div class="gold-line"></div>${references.map(r => `<div style="color:#aaa;font-size:11px;margin-bottom:5px">${r.fullName}<br>${r.company}<br><span style="color:#666">${r.phone} / ${r.email}</span></div>`).join('')}` : ''}
    </div><div class="main"><div class="name">${personalInfo.fullName}</div><div class="role">${personalInfo.jobTitle}</div>${personalInfo.about ? `<div style="font-family:'${font}',serif;font-size:18px;line-height:1.6;color:${primaryColor === '#d4af37' ? '#555' : '#bbb'};margin-bottom:50px;font-style:italic">"${personalInfo.about}"</div>` : ''}<div class="section-header">${t.cv_experience}</div>${experience.map(e => `<div class="exp-item"><div class="exp-role">${e.position}</div><div class="exp-meta">${e.company} — ${e.startDate}-${e.endDate}</div><div class="exp-desc">${e.description}</div></div>`).join('')}${projects && projects.length > 0 ? `<div class="section-header">${t.cv_projects}</div>${projects.map(p => `<div class="exp-item"><div class="exp-role">${p.name}</div><div class="exp-desc">${p.description}</div></div>`).join('')}` : ''}
    ${certifications && certifications.length > 0 ? `<div class="section-header">${t.cv_certifications}</div>${certifications.map(c => `<div class="exp-item"><div class="exp-role">${c.name}</div><div class="exp-meta">${c.issuer}</div></div>`).join('')}` : ''}
    <div class="section-header">${t.cv_education}</div>${education.map(e => `<div class="exp-item"><div class="exp-role">${e.school}</div><div class="exp-meta">${e.degree}</div></div>`).join('')}</div></div></body></html>`;
};

// ENGINE 5: SWISS
const renderSwiss = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Inter') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;600;700;900&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:60px;color:#000}
    .grid{display:grid;grid-template-columns:300px 1fr;gap:60px}
    .header{grid-column:1 / -1;margin-bottom:60px}
    .name{font-size:60px;font-weight:900;line-height:0.9;letter-spacing:-2px;margin-bottom:15px;color:${primaryColor}}
    .role{font-size:20px;font-weight:400;letter-spacing:1px;color:#555}
    .label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:15px;color:#999}
    .item{margin-bottom:30px}
    .item-h{font-size:18px;font-weight:700;margin-bottom:2px}
    .item-s{font-size:14px;color:${primaryColor};font-weight:600;margin-bottom:8px}
    .item-p{font-size:14px;line-height:1.5;color:#333}
    .contact-item{font-size:13px;font-weight:600;margin-bottom:8px}
    .photo{width:100%;height:350px;object-fit:cover;margin-bottom:40px;}
    </style></head><body>
    <div class="grid">
        <div class="header">
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
        </div>
        <div class="side">
            ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
            <div class="item">
                <div class="label">${t.cv_contact}</div>
                <div class="contact-item">${personalInfo.email}</div>
                <div class="contact-item">${personalInfo.phone}</div>
                <div class="contact-item">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#333')}
                ${personalInfo.socialLinks?.linkedin ? `<div class="contact-item">LN: ${personalInfo.socialLinks.linkedin}</div>` : ''}
            </div>
            <div class="item">
                <div class="label">${t.cv_skills}</div>
                ${skills.map(s => `<div style="font-weight:600;margin-bottom:8px;font-size:13px">${s.name}</div>`).join('')}
            </div>
             ${references && references.length > 0 ? `<div class="item"><div class="label">${t.cv_references}</div>${references.map(r => `<div style="margin-bottom:10px;font-size:12px"><b>${r.fullName}</b><br>${r.company}<br><span style="color:#666">${r.phone} / ${r.email}</span></div>`).join('')}</div>` : ''}
        </div>
        <div class="main">
            <div class="label">${t.cv_experience}</div>
            ${experience.map(e => `<div class="item"><div class="item-h">${e.position}</div><div class="item-s">${e.company} (${e.startDate} - ${e.endDate})</div><div class="item-p">${e.description}</div></div>`).join('')}
            
            ${projects && projects.length > 0 ? `<div class="label" style="margin-top:40px">${t.cv_projects}</div>${projects.map(p => `<div class="item"><div class="item-h">${p.name}</div><div class="item-p">${p.description}</div></div>`).join('')}` : ''}
            
             ${certifications && certifications.length > 0 ? `<div class="label" style="margin-top:40px">${t.cv_certifications}</div>${certifications.map(c => `<div class="item"><div class="item-h">${c.name}</div><div class="item-s">${c.issuer}</div></div>`).join('')}` : ''}

            <div class="label" style="margin-top:40px">${t.cv_education}</div>
            ${education.map(e => `<div class="item"><div class="item-h">${e.school}</div><div class="item-s">${e.degree} (${e.startDate} - ${e.endDate})</div></div>`).join('')}
        </div>
    </div></body></html>`;
};

// ENGINE 6: MONACO (Luxury Sidebar)
const renderMonaco = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Playfair Display') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'Lato',sans-serif;background:#fff;display:grid;grid-template-columns:280px 1fr;min-height:100vh}
    .sidebar{background:#f8fafc;padding:50px 30px;color:#334155;border-right:1px solid #e2e8f0}
    .main{padding:60px 50px;color:#1e293b}
    .photo{width:160px;height:160px;object-fit:cover;border-radius:50%;margin:0 auto 40px;display:block;box-shadow:0 10px 20px -10px rgba(0,0,0,0.1)}
    .side-sec{margin-bottom:40px}
    .side-label{font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:700;color:${primaryColor};margin-bottom:15px;border-bottom:1px solid #e2e8f0;padding-bottom:5px}
    .contact-item{font-size:13px;color:#475569;margin-bottom:10px;word-break:break-all}
    .skill-item{font-size:13px;margin-bottom:8px;font-weight:500}
    .name{font-family:'${font}',serif;font-size:42px;color:#0f172a;line-height:1;margin-bottom:10px}
    .role{font-size:14px;text-transform:uppercase;letter-spacing:3px;color:${primaryColor};font-weight:700;margin-bottom:40px}
    .section-head{font-family:'${font}',serif;font-size:24px;border-bottom:2px solid ${primaryColor}20;padding-bottom:10px;margin-bottom:30px;color:#0f172a}
    .exp-item{margin-bottom:35px;display:grid;grid-template-columns:140px 1fr;gap:20px}
    .exp-date{font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;padding-top:5px}
    .exp-main{border-left:2px solid #e2e8f0;padding-left:20px;position:relative}
    .exp-main::before{content:'';width:10px;height:10px;background:#fff;border:2px solid ${primaryColor};border-radius:50%;position:absolute;left:-6px;top:5px}
    .exp-role{font-family:'${font}',serif;font-size:18px;font-weight:700;color:#1e293b}
    .exp-comp{font-size:13px;color:${primaryColor};font-weight:700;margin-bottom:10px;text-transform:uppercase}
    .exp-desc{font-size:14px;color:#475569;line-height:1.6}
    </style></head><body>
    <div class="sidebar">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        <div class="side-sec">
            <div class="side-label">${t.cv_contact}</div>
            <div class="contact-item">${personalInfo.email}</div>
            <div class="contact-item">${personalInfo.phone}</div>
            <div class="contact-item">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#475569')}
            ${personalInfo.socialLinks?.linkedin ? `<div class="contact-item">in/ ${personalInfo.socialLinks.linkedin}</div>` : ''}
        </div>
        <div class="side-sec">
             <div class="side-label">${t.cv_skills}</div>
             ${skills.map(s => `<div class="skill-item">• ${s.name}</div>`).join('')}
        </div>
        ${languages.length > 0 ? `<div class="side-sec"><div class="side-label">${t.cv_languages}</div>${languages.map(l => `<div style="font-size:13px;margin-bottom:5px"><b>${l.name}</b> <span style="opacity:0.6">(${l.proficiency})</span></div>`).join('')}</div>` : ''}
         ${references && references.length > 0 ? `<div class="side-sec"><div class="side-label">${t.cv_references}</div>${references.map(r => `<div style="margin-bottom:10px;font-size:12px"><b>${r.fullName}</b><br>${r.company}<br><span style="color:#64748b">${r.phone} / ${r.email}</span></div>`).join('')}</div>` : ''}
    </div>
    <div class="main">
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        ${personalInfo.about ? `<p style="font-size:15px;line-height:1.7;color:#475569;margin-bottom:50px">${personalInfo.about}</p>` : ''}
        
        <div class="section-head">${t.cv_experience}</div>
        <div>
            ${experience.map(e => `<div class="exp-item"><div class="exp-date">${e.startDate}<br>${e.endDate}</div><div class="exp-main"><div class="exp-role">${e.position}</div><div class="exp-comp">${e.company}</div><div class="exp-desc">${e.description}</div></div></div>`).join('')}
        </div>

        ${projects && projects.length > 0 ? `<div class="section-head" style="margin-top:50px">${t.cv_projects}</div><div>${projects.map(p => `<div class="exp-item"><div class="exp-date">Proje</div><div class="exp-main" style="border-left:none"><div class="exp-role">${p.name}</div><div class="exp-desc">${p.description}</div></div></div>`).join('')}</div>` : ''}

        <div class="section-head" style="margin-top:50px">${t.cv_education}</div>
        <div>
             ${education.map(e => `<div class="exp-item"><div class="exp-date">${e.startDate}<br>${e.endDate}</div><div class="exp-main"><div class="exp-role">${e.school}</div><div class="exp-comp" style="text-transform:none;color:#64748b">${e.degree}</div></div></div>`).join('')}
        </div>
         ${certifications && certifications.length > 0 ? `<div class="section-head" style="margin-top:50px">${t.cv_certifications}</div><div>${certifications.map(c => `<div style="display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f1f5f9"><div><b>${c.name}</b></div><div style="font-size:13px;color:#64748b">${c.issuer}</div></div>`).join('')}</div>` : ''}

    </div></body></html>`;
};

// ENGINE 7: VERONA (Ivy League Professional)
const renderVerona = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Times New Roman') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><style>${getGlobalStyle(data)} 
    body{font-family:'Times New Roman',serif;background:#fff;color:#000;padding:50px 70px;line-height:1.4}
    .header{text-align:center;border-bottom:1px solid #000;padding-bottom:20px;margin-bottom:25px}
    .name{font-size:32px;text-transform:uppercase;font-weight:bold;margin-bottom:10px;letter-spacing:1px}
    .contact{font-size:14px;border-top:1px solid #000;padding-top:5px;margin-top:10px;display:flex;justify-content:center;gap:15px}
    .contact div{position:relative;display:inline-block}
    .section{margin-bottom:20px}
    .sec-t{font-size:16px;text-transform:uppercase;font-weight:bold;border-bottom:1px solid #000;margin-bottom:10px;padding-bottom:3px}
    .item{margin-bottom:12px}
    .i-row{display:flex;justify-content:space-between;font-weight:bold;font-size:15px}
    .i-sub{font-style:italic;font-size:15px;margin-bottom:3px}
    .i-desc{font-size:14px;text-align:justify}
    .i-desc li{margin-left:15px;margin-bottom:2px}
    .skills{font-size:14px}
    </style></head><body>
    <div class="header">
        <div class="name">${personalInfo.fullName}</div>
        <div style="font-size:15px;font-style:italic">${personalInfo.jobTitle}</div>
        <div class="contact">
            <div>${personalInfo.phone}</div><div>•</div>
            <div>${personalInfo.email}</div><div>•</div>
            <div>${personalInfo.address}</div>
            ${personalInfo.socialLinks?.linkedin ? `<div>•</div><div>${personalInfo.socialLinks.linkedin}</div>` : ''}
        </div>
    </div>
    
    <div class="section">
        <div class="sec-t">${t.cv_education}</div>
        ${education.map(e => `<div class="item"><div class="i-row"><div>${e.school}</div><div>${e.startDate} - ${e.endDate}</div></div><div class="i-sub">${e.degree}</div></div>`).join('')}
    </div>

    <div class="section">
        <div class="sec-t">${t.cv_experience}</div>
        ${experience.map(e => `<div class="item"><div class="i-row"><div>${e.company}</div><div>${e.startDate} - ${e.endDate}</div></div><div class="i-sub">${e.position}</div><div class="i-desc">• ${e.description.replace(/\./g, '.<br>• ').replace(/• $/g, '')}</div></div>`).join('')}
    </div>

    ${projects && projects.length > 0 ? `<div class="section"><div class="sec-t">${t.cv_projects}</div>${projects.map(p => `<div class="item"><div class="i-row"><div>${p.name}</div></div><div class="i-desc">${p.description}</div></div>`).join('')}</div>` : ''}

    <div class="section">
        <div class="sec-t">ADDITIONAL INFORMATION</div>
        <div class="skills">
            <div><b>${t.cv_skills}:</b> ${skills.map(s => s.name).join(', ')}</div>
            ${languages.length > 0 ? `<div style="margin-top:5px"><b>${t.cv_languages}:</b> ${languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</div>` : ''}
            ${certifications && certifications.length > 0 ? `<div style="margin-top:5px"><b>${t.cv_certifications}:</b> ${certifications.map(c => c.name).join(', ')}</div>` : ''}
        </div>
    </div>

    ${references && references.length > 0 ? `<div class="section"><div class="sec-t">${t.cv_references}</div>${references.map(r => `<div style="font-size:14px">${r.fullName} (${r.company}) - ${r.email}</div>`).join('')}</div>` : ''}
    
    </body></html>`;
};

// ENGINE 8: STOCKHOLM (Swiss Grid System)
const renderStockholm = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Helvetica') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><style>${getGlobalStyle(data)} 
    body{font-family:'Helvetica', 'Arial', sans-serif;background:#fff;padding:60px;color:#000}
    .header{margin-bottom:60px;border-top:8px solid #000;padding-top:30px}
    .name{font-size:64px;font-weight:900;letter-spacing:-2px;line-height:0.9;margin-bottom:10px}
    .role{font-size:20px;font-weight:400;color:${primaryColor};margin-bottom:40px}
    .grid{display:grid;grid-template-columns:250px 1fr;gap:60px;border-top:1px solid #000;padding-top:40px}
    .label{font-size:12px;font-weight:900;text-transform:uppercase;margin-bottom:20px;letter-spacing:1px}
    .item{margin-bottom:40px}
    .i-tit{font-size:20px;font-weight:700;margin-bottom:5px;line-height:1.2}
    .i-sub{font-size:14px;color:#555;margin-bottom:10px}
    .i-desc{font-size:16px;line-height:1.5;color:#000;font-weight:400}
    .contact-item{font-size:14px;margin-bottom:5px;font-weight:700}
    .skill-block{margin-bottom:30px}
    .s-cat{font-size:12px;font-weight:700;text-transform:uppercase;margin-bottom:10px;border-bottom:1px solid #000;padding-bottom:5px}
    .s-list{font-size:14px;line-height:1.6}
    </style></head><body>
    <div class="header">
        <div class="name">${personalInfo.fullName.split(' ')[0]}<br>${personalInfo.fullName.split(' ').slice(1).join(' ')}</div>
        <div class="role">${personalInfo.jobTitle}</div>
    </div>
    <div class="grid">
        <div class="left">
            <div class="label">${t.cv_contact}</div>
            <div class="item">
                <div class="contact-item">${personalInfo.email}</div>
                <div class="contact-item">${personalInfo.phone}</div>
                <div class="contact-item">${personalInfo.address}</div>
                ${personalInfo.socialLinks?.linkedin ? `<div class="contact-item" style="color:${primaryColor}">in/${personalInfo.socialLinks.linkedin}</div>` : ''}
            </div>

             <div class="label" style="margin-top:60px">${t.cv_skills}</div>
             <div class="skill-block">
                <div class="s-list">${skills.map(s => `<div>${s.name}</div>`).join('')}</div>
             </div>
             
             ${languages.length > 0 ? `<div class="label" style="margin-top:40px">${t.cv_languages}</div><div class="s-list">${languages.map(l => `<div>${l.name} / ${l.proficiency}</div>`).join('')}</div>` : ''}
        </div>
        <div class="right">
            ${personalInfo.about ? `<div class="item" style="font-size:24px;line-height:1.4;font-weight:700;margin-bottom:60px">${personalInfo.about}</div>` : ''}
            
            <div class="label">${t.cv_experience}</div>
            ${experience.map(e => `<div class="item"><div class="i-tit">${e.position}</div><div class="i-sub">${e.company} <span>//</span> ${e.startDate} - ${e.endDate}</div><div class="i-desc">${e.description}</div></div>`).join('')}

            ${projects && projects.length > 0 ? `<div class="label" style="margin-top:60px">${t.cv_projects}</div>${projects.map(p => `<div class="item"><div class="i-tit">${p.name}</div><div class="i-desc">${p.description}</div></div>`).join('')}` : ''}
            
            <div class="label" style="margin-top:60px">${t.cv_education}</div>
            ${education.map(e => `<div class="item"><div class="i-tit">${e.school}</div><div class="i-sub">${e.degree} <span>//</span> ${e.startDate} - ${e.endDate}</div></div>`).join('')}
        </div>
    </div></body></html>`;
};

// ENGINE 9: HORIZON (Modern Corporate)
const renderHorizon = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Lato') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    // Simple localization for labels
    const l_e = language === 'tr' ? 'E' : 'E'; // Email
    const l_t = language === 'tr' ? 'T' : 'P'; // Phone
    const l_a = language === 'tr' ? 'A' : 'A'; // Address
    const l_l = 'L'; // LinkedIn

    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;700;900&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;color:#333}
    .header{background:${primaryColor};color:#fff;padding:60px 40px 80px;display:flex;align-items:center}
    .h-l{flex:1;padding-right:40px}
    .name{font-size:50px;font-weight:900;letter-spacing:1px;margin-bottom:10px}
    .role{font-size:18px;font-weight:400;opacity:0.9;letter-spacing:1px;text-transform:uppercase}
    .h-r{width:180px;height:180px;border-radius:12px;overflow:hidden;border:4px solid rgba(255,255,255,0.3);flex-shrink:0}
    .photo{width:100%;height:100%;object-fit:cover}
    .c-bar{background:#111827;color:#fff;padding:15px 40px;display:flex;justify-content:space-between;flex-wrap:wrap;font-size:13px;margin-top:-30px;position:relative;z-index:10;margin-left:40px;margin-right:40px;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.15)}
    .c-item{display:flex;align-items:center;margin:5px 0}.c-item span{opacity:0.7;margin-right:10px}
    .main{padding:60px 40px;display:grid;grid-template-columns:1fr 300px;gap:50px}
    .sec-t{font-size:22px;font-weight:700;color:${primaryColor};border-bottom:2px solid #e5e7eb;padding-bottom:10px;margin-bottom:25px}
    .item{margin-bottom:30px}
    .i-role{font-size:18px;font-weight:700;margin-bottom:2px}
    .i-comp{font-size:14px;color:#666;font-weight:700;margin-bottom:8px}
    .i-desc{font-size:14px;line-height:1.6;color:#444}
    .skill-bar{margin-bottom:12px}
    .s-name{font-size:13px;font-weight:700;margin-bottom:5px;display:flex;justify-content:space-between}
    .s-progress{height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden}
    .s-fill{height:100%;background:${primaryColor};border-radius:3px}
    </style></head><body>
    <div class="header">
        <div class="h-l">
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
            ${personalInfo.about ? `<div style="margin-top:20px;font-size:14px;line-height:1.6;opacity:0.8;max-width:600px">${personalInfo.about}</div>` : ''}
        </div>
        ${personalInfo.photoUri ? `<div class="h-r"><img src="${personalInfo.photoUri}" class="photo"/></div>` : ''}
    </div>
    <div class="c-bar">
        <div class="c-item"><span>${l_e}:</span>${personalInfo.email}</div>
        <div class="c-item"><span>${l_t}:</span>${personalInfo.phone}</div>
        <div class="c-item"><span>${l_a}:</span>${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#fff').replace(/div style="/g, 'div class="c-item" style="color:#fff;').replace(/<br>/g, ' ')}
        ${personalInfo.socialLinks?.linkedin ? `<div class="c-item"><span>${l_l}:</span>${personalInfo.socialLinks.linkedin}</div>` : ''}
    </div>
    <div class="main">
        <div class="col-l">
            <div class="sec-t">${t.cv_experience}</div>
            ${experience.map(e => `<div class="item"><div class="i-role">${e.position}</div><div class="i-comp">${e.company} | ${e.startDate} - ${e.endDate}</div><div class="i-desc">${e.description}</div></div>`).join('')}

            ${projects && projects.length > 0 ? `<div class="sec-t" style="margin-top:40px">${t.cv_projects}</div>${projects.map(p => `<div class="item"><div class="i-role">${p.name}</div><div class="i-desc" style="margin-top:5px">${p.description}</div></div>`).join('')}` : ''}
        </div>
        <div class="col-r">
            <div class="sec-t">${t.cv_education}</div>
            ${education.map(e => `<div class="item"><div class="i-role" style="font-size:16px">${e.school}</div><div style="font-size:13px;color:#666">${e.degree}</div><div style="font-size:12px;color:#999;margin-top:2px">${e.startDate}-${e.endDate}</div></div>`).join('')}

            <div class="sec-t" style="margin-top:40px">${t.cv_skills}</div>
            ${skills.map(s => `<div class="skill-bar"><div class="s-name"><span>${s.name}</span></div><div class="s-progress"><div class="s-fill" style="width:85%"></div></div></div>`).join('')}

            ${languages.length > 0 ? `<div class="sec-t" style="margin-top:40px">${t.cv_languages}</div>${languages.map(l => `<div style="margin-bottom:8px;font-size:13px"><b>${l.name}</b> (${l.proficiency})</div>`).join('')}` : ''}
            
            ${certifications && certifications.length > 0 ? `<div class="sec-t" style="margin-top:40px">${t.cv_certifications}</div>${certifications.map(c => `<div style="margin-bottom:10px;font-size:13px"><b>${c.name}</b><div style="font-size:11px;color:#666">${c.issuer}</div></div>`).join('')}` : ''}
             ${references && references.length > 0 ? `<div class="sec-t" style="margin-top:40px">${t.cv_references}</div>${references.map(r => `<div style="margin-bottom:10px;font-size:13px"><b>${r.fullName}</b><br>${r.company}<br><span style="color:#666">${r.phone} / ${r.email}</span></div>`).join('')}` : ''}
        </div>
    </div></body></html>`;
};

// ENGINE 10: ELEMENT (Minimalist Block)
const renderElement = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Nunito') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;600;700;800&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#e5e7eb;padding:30px;color:#374151}
    .page{max-width:900px;margin:0 auto;background:#f9fafb;border-radius:20px;padding:40px;box-shadow:0 20px 40px rgba(0,0,0,0.05);min-height:100vh}
    .header{display:flex;align-items:center;margin-bottom:40px;background:#fff;padding:30px;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.02)}
    .photo{width:120px;height:120px;border-radius:12px;object-fit:cover;margin-right:30px}
    .h-info{flex:1}
    .name{font-size:36px;font-weight:800;color:#111827;line-height:1.1}
    .role{font-size:18px;color:${primaryColor};font-weight:700;margin-top:5px}
    .contact{margin-top:15px;display:flex;gap:20px;font-size:13px;color:#6b7280;flex-wrap:wrap}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .card{background:#fff;padding:25px;border-radius:16px;box-shadow:0 2px 4px rgba(0,0,0,0.02)}
    .full{grid-column:1 / -1}
    .c-title{font-size:16px;font-weight:800;color:#111827;margin-bottom:20px;display:flex;align-items:center}
    .c-title::before{content:'';width:6px;height:6px;background:${primaryColor};border-radius:50%;margin-right:10px}
    .item{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f3f4f6}
    .item:last-child{border:none;margin:0;padding:0}
    .i-head{display:flex;justify-content:space-between;font-weight:700;font-size:15px;color:#374151;margin-bottom:4px}
    .i-sub{font-size:13px;color:${primaryColor};margin-bottom:8px;font-weight:600}
    .i-desc{font-size:13px;line-height:1.6;color:#6b7280}
    .tag{display:inline-block;background:#f3f4f6;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;color:#4b5563;margin:0 6px 6px 0}
    </style></head><body>
    <div class="page">
        <div class="header">
            ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
            <div class="h-info">
                <div class="name">${personalInfo.fullName}</div>
                <div class="role">${personalInfo.jobTitle}</div>
                <div class="contact">
                    <span>${personalInfo.email}</span><span>${personalInfo.phone}</span>
                </div>
                ${personalInfo.about ? `<div style="margin-top:15px;font-size:14px;color:#4b5563;line-height:1.5">${personalInfo.about}</div>` : ''}
            </div>
        </div>
        
        <div class="grid">
            <div class="card full">
                <div class="c-title">${t.cv_experience}</div>
                ${experience.map(e => `<div class="item"><div class="i-head"><span>${e.position}</span><span style="font-size:12px;color:#9ca3af">${e.startDate}-${e.endDate}</span></div><div class="i-sub">${e.company}</div><div class="i-desc">${e.description}</div></div>`).join('')}
            </div>
            
            ${projects && projects.length > 0 ? `<div class="card full"><div class="c-title">${t.cv_projects}</div>${projects.map(p => `<div class="item"><div class="i-head"><span>${p.name}</span></div><div class="i-desc">${p.description}</div></div>`).join('')}</div>` : ''}

            <div class="card">
                <div class="c-title">${t.cv_education}</div>
                ${education.map(e => `<div class="item"><div class="i-head"><span style="font-size:14px">${e.school}</span></div><div class="i-sub" style="margin:0;color:#6b7280">${e.degree}</div></div>`).join('')}
            </div>

            <div class="card">
                <div class="c-title">${t.cv_skills}</div>
                <div>${skills.map(s => `<span class="tag">${s.name}</span>`).join('')}</div>
            </div>

            ${certifications && certifications.length > 0 ? `<div class="card"><div class="c-title">${t.cv_certifications}</div>${certifications.map(c => `<div class="item"><div class="i-head" style="font-size:13px">${c.name}</div><div style="font-size:12px;color:#9ca3af">${c.issuer}</div></div>`).join('')}</div>` : ''}

            <div class="card">
                <div class="c-title">${t.cv_contact} & ${t.cv_references}</div>
                <div style="font-size:13px;color:#4b5563">
                    <div style="margin-bottom:8px"><b>${t.address.replace(':', '').replace('A:', '').trim()}:</b> ${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#4b5563')}
                    ${personalInfo.socialLinks?.linkedin ? `<div style="margin-bottom:8px"><b>LinkedIn:</b> ${personalInfo.socialLinks.linkedin}</div>` : ''}
                    ${personalInfo.socialLinks?.github ? `<div style="margin-bottom:8px"><b>GitHub:</b> ${personalInfo.socialLinks.github}</div>` : ''}
                     ${languages.length > 0 ? `<div style="margin-top:15px;font-weight:700;margin-bottom:5px">${t.cv_languages}:</div>${languages.map(l => `<div>${l.name} (${l.proficiency})</div>`).join('')}` : ''}
                </div>
            </div>
        </div>
        
         ${references && references.length > 0 ? `<div class="card full" style="margin-top:20px"><div class="c-title">${t.cv_references}</div>${references.map(r => `<div class="item" style="border:none;padding:0"><div class="i-head">${r.fullName}</div><div class="i-desc">${r.company}</div><div class="i-desc">${r.phone} / ${r.email}</div></div>`).join('')}</div>` : ''}

    </div></body></html>`;
};

// ENGINE 11: GLACIER (Cool Blue)
const renderGlacier = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Kanit') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;display:grid;grid-template-columns:1fr 320px;min-height:100%}
    .left{padding:60px 50px}
    .right{background:#f0f9ff;padding:60px 40px;border-left:1px solid #e0f2fe;display:flex;flex-direction:column}
    .name{font-size:48px;font-weight:700;line-height:1;margin-bottom:10px;color:#0c4a6e}
    .role{font-size:20px;color:${primaryColor};font-weight:500;margin-bottom:40px;letter-spacing:1px}
    .section-title{font-size:20px;font-weight:700;color:#0f172a;margin-bottom:25px;display:flex;align-items:center}
    .section-title::after{content:'';flex:1;height:2px;background:#e2e8f0;margin-left:15px;border-radius:1px}
    .item{margin-bottom:35px}
    .item-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px}
    .item-tit{font-size:18px;font-weight:600;color:#334155}
    .item-sub{font-size:14px;color:${primaryColor};font-weight:500}
    .item-date{font-size:13px;color:#94a3b8}
    .item-desc{font-size:14px;color:#475569;line-height:1.6;margin-top:8px}
    .photo{width:160px;height:160px;border-radius:20px;object-fit:cover;margin:0 auto 40px;display:block;box-shadow:0 10px 20px rgba(14,165,233,0.15)}
    .r-sec{margin-bottom:40px}
    .r-tit{font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#0369a1;margin-bottom:15px;border-bottom:2px solid #bae6fd;padding-bottom:5px}
    .r-item{margin-bottom:12px;font-size:13px;color:#334155}
    .skill-tag{display:inline-block;background:#fff;border:1px solid #bae6fd;padding:6px 12px;border-radius:8px;margin:0 6px 6px 0;font-size:13px;color:#0284c7}
    </style></head><body>
    <div class="left">
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        ${personalInfo.about ? `<p style="margin-bottom:50px;font-size:15px;line-height:1.7;color:#475569">${personalInfo.about}</p>` : ''}
        
        <div class="section-title">${t.cv_experience}</div>
        ${experience.map(e => `<div class="item"><div class="item-head"><div class="item-tit">${e.position}</div><div class="item-date">${e.startDate}-${e.endDate}</div></div><div class="item-sub">${e.company}</div><div class="item-desc">${e.description}</div></div>`).join('')}

        ${projects && projects.length > 0 ? `<div class="section-title" style="margin-top:40px">${t.cv_projects}</div>${projects.map(p => `<div class="item"><div class="item-tit">${p.name}</div><div class="item-desc">${p.description}</div></div>`).join('')}` : ''}

        <div class="section-title" style="margin-top:40px">${t.cv_education}</div>
        ${education.map(e => `<div class="item"><div class="item-head"><div class="item-tit">${e.school}</div><div class="item-date">${e.startDate}-${e.endDate}</div></div><div class="item-sub">${e.degree}</div></div>`).join('')}
    </div>
    <div class="right">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        <div class="r-sec">
             <div class="r-tit">${t.cv_contact}</div>
             <div class="r-item">${personalInfo.email}</div>
             <div class="r-item">${personalInfo.phone}</div>
             <div class="r-item">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#334155')}
             ${personalInfo.socialLinks?.linkedin ? `<div class="r-item">in/${personalInfo.socialLinks.linkedin}</div>` : ''}
        </div>
        <div class="r-sec">
             <div class="r-tit">${t.cv_skills}</div>
             <div>${skills.map(s => `<span class="skill-tag">${s.name}</span>`).join('')}</div>
        </div>
        ${languages.length > 0 ? `<div class="r-sec"><div class="r-tit">${t.cv_languages}</div>${languages.map(l => `<div class="r-item"><b>${l.name}</b> (${l.proficiency})</div>`).join('')}</div>` : ''}
        ${references && references.length > 0 ? `<div class="r-sec"><div class="r-tit">${t.cv_references}</div>${references.map(r => `<div style="font-size:12px;margin-bottom:10px"><b>${r.fullName}</b><br>${r.company}<br>${r.phone} / ${r.email}</div>`).join('')}</div>` : ''}
        ${certifications && certifications.length > 0 ? `<div class="r-sec"><div class="r-tit">${t.cv_certifications}</div>${certifications.map(c => `<div style="margin-bottom:10px;font-size:13px"><b>${c.name}</b><br>${c.issuer}</div>`).join('')}</div>` : ''}
    </div></body></html>`;
};

// ENGINE 12: GATSBY (Editorial Pro)
const renderGatsby = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Playfair Display') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'Lato',sans-serif;background:#f9f9f9;padding:0;color:#333;min-height:100%}
    .page{background:#fff;max-width:900px;margin:0 auto;box-shadow:0 10px 30px rgba(0,0,0,0.05);min-height:100vh;display:flex;flex-direction:column}
    .header{padding:60px 40px 40px;text-align:center;background:#fff;position:relative}
    .photo{width:180px;height:180px;border-radius:50%;object-fit:cover;margin:0 auto 30px;display:block;box-shadow:0 0 0 10px #f9f9f9}
    .name{font-family:'${font}',serif;font-size:52px;font-weight:900;color:#111;margin-bottom:10px;line-height:0.9;letter-spacing:-1px}
    .role{font-family:'${font}',serif;font-size:18px;color:${primaryColor};margin-bottom:20px;font-style:italic}
    .contact{display:flex;justify-content:center;gap:25px;font-size:13px;color:#666;flex-wrap:wrap;border-top:1px solid #eee;border-bottom:1px solid #eee;padding:15px 0;margin:0 40px}
    .main{padding:40px 60px;display:grid;grid-template-columns:1fr 280px;gap:50px}
    .sec-t{font-family:'${font}',serif;font-size:24px;font-weight:900;color:#111;margin-bottom:30px;display:flex;align-items:center}
    .sec-t::after{content:'';flex:1;height:1px;background:#eee;margin-left:20px}
    .item{margin-bottom:40px;position:relative}
    .date{font-size:12px;font-weight:700;color:#999;margin-bottom:5px;text-transform:uppercase;letter-spacing:1px}
    .tit{font-family:'${font}',serif;font-size:20px;font-weight:700;color:#000;margin-bottom:5px}
    .sub{font-size:14px;color:${primaryColor};font-style:italic;margin-bottom:12px;font-family:'${font}',serif}
    .desc{font-size:15px;line-height:1.7;color:#444;font-weight:300}
    .side-sec{margin-bottom:40px}
    .side-t{font-family:'${font}',serif;font-size:18px;font-weight:900;color:#111;margin-bottom:20px;border-bottom:2px solid ${primaryColor};display:inline-block;padding-bottom:5px}
    .sk-item{margin-bottom:12px;font-size:14px;display:flex;justify-content:space-between;border-bottom:1px dotted #eee;padding-bottom:5px}
    </style></head><body>
    <div class="page">
        <div class="header">
            ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
            <div class="contact">
                <span>${personalInfo.email}</span>
                <span>${personalInfo.phone}</span>
                <span>${personalInfo.address}</span>${renderContactExtras(personalInfo, language, 'text', '#666').replace(/div/g, 'span').replace(/<br>/g, ' ')}
            </div>
            ${personalInfo.about ? `<div style="margin:30px auto 0;max-width:600px;font-size:16px;line-height:1.8;color:#555;font-style:italic;font-family:'${font}'">${personalInfo.about}</div>` : ''}
        </div>
        
        <div class="main">
            <div class="left">
                 <div class="sec-t">${t.cv_experience}</div>
                 ${experience.map(e => `
                 <div class="item">
                    <div class="date">${e.startDate} - ${e.endDate}</div>
                    <div class="tit">${e.position}</div>
                    <div class="sub">${e.company}</div>
                    <div class="desc">${e.description}</div>
                 </div>`).join('')}
                 
                 ${projects && projects.length > 0 ? `
                 <div class="sec-t" style="margin-top:50px">${t.cv_projects}</div>
                 ${projects.map(p => `
                 <div class="item">
                    <div class="tit">${p.name}</div>
                    <div class="desc">${p.description}</div>
                 </div>`).join('')}` : ''}
            </div>
            
            <div class="right">
                <div class="side-sec">
                    <div class="side-t">${t.cv_skills}</div>
                    ${skills.map(s => `<div class="sk-item"><span>${s.name}</span></div>`).join('')}
                </div>
                
                <div class="side-sec">
                    <div class="side-t">${t.cv_education}</div>
                    ${education.map(e => `
                    <div style="margin-bottom:20px">
                        <div style="font-weight:700;font-size:15px;font-family:'${font}'">${e.school}</div>
                        <div style="font-size:13px;color:#666;margin-top:2px">${e.degree}</div>
                        <div style="font-size:12px;color:#999;margin-top:2px">${e.startDate}-${e.endDate}</div>
                    </div>`).join('')}
                </div>
                
                ${languages.length > 0 ? `
                <div class="side-sec">
                    <div class="side-t">${t.cv_languages}</div>
                    ${languages.map(l => `<div class="sk-item"><span>${l.name}</span><span style="color:#999;font-size:12px">${l.proficiency}</span></div>`).join('')}
                </div>` : ''}

                 ${references && references.length > 0 ? `
                <div class="side-sec">
                    <div class="side-t">${t.cv_references}</div>
                    ${references.map(r => `<div style="margin-bottom:15px;font-size:13px"><b>${r.fullName}</b><br><span style="color:#666">${r.company}</span></div>`).join('')}
                </div>` : ''}
                
                ${personalInfo.socialLinks?.linkedin || personalInfo.socialLinks?.github || personalInfo.socialLinks?.twitter ? `
                 <div class="side-sec">
                    <div class="side-t">Social</div>
                    ${personalInfo.socialLinks.linkedin ? `<div style="margin-bottom:5px;font-size:13px"><span style="font-weight:700">IN:</span> ${personalInfo.socialLinks.linkedin}</div>` : ''}
                    ${personalInfo.socialLinks.twitter ? `<div style="margin-bottom:5px;font-size:13px"><span style="font-weight:700">TW:</span> ${personalInfo.socialLinks.twitter}</div>` : ''}
                    ${personalInfo.socialLinks.github ? `<div style="margin-bottom:5px;font-size:13px"><span style="font-weight:700">GH:</span> ${personalInfo.socialLinks.github}</div>` : ''}
                 </div>` : ''}
            </div>
        </div>
    </div></body></html>`;
};

// ENGINE 13: CANVAS (Artistic/Creative)
const renderCanvas = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Raleway') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;700;900&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:0;min-height:100%;border-top:10px solid ${primaryColor}}
    .wrap{max-width:800px;margin:0 auto;padding:60px 40px}
    .header{text-align:center;margin-bottom:60px}
    .photo{width:150px;height:150px;border-radius:50%;object-fit:cover;margin:0 auto 20px;border:3px solid ${primaryColor};padding:3px}
    .name{font-size:48px;font-weight:900;letter-spacing:-1px;color:#1a1a1a}
    .role{font-size:18px;color:${primaryColor};font-weight:700;text-transform:uppercase;margin-top:5px;letter-spacing:2px}
    .contact{margin-top:20px;display:flex;justify-content:center;gap:20px;font-size:13px;color:#555}
    .section{margin-bottom:50px}
    .s-head{font-size:24px;font-weight:900;color:#1a1a1a;margin-bottom:30px;text-align:center;position:relative}
    .s-head::after{content:'';width:40px;height:4px;background:${primaryColor};position:absolute;bottom:-10px;left:50%;transform:translateX(-50%)}
    .edu-grid{display:flex;justify-content:center;gap:40px;text-align:center}
    .exp-item{margin-bottom:40px;background:#f9fafb;padding:30px;border-radius:12px;border-left:4px solid ${primaryColor}}
    .e-role{font-size:20px;font-weight:700;margin-bottom:5px}
    .e-comp{font-size:14px;color:${primaryColor};font-weight:600;margin-bottom:15px;text-transform:uppercase}
    .e-desc{font-size:15px;line-height:1.7;color:#444}
    .skills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
    .tag{background:#1a1a1a;color:#fff;padding:8px 16px;border-radius:30px;font-size:13px;font-weight:600}
    </style></head><body>
    <div class="wrap">
        <div class="header">
            ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
            <div class="contact">
                <span>${personalInfo.email}</span><span>${personalInfo.phone}</span><span>${personalInfo.address}</span>${renderContactExtras(personalInfo, language, 'text', '#555').replace(/<div/g, '<span').replace(/<\/div>/g, '</span>')}
                ${personalInfo.socialLinks?.linkedin ? `<span>${personalInfo.socialLinks.linkedin}</span>` : ''}
            </div>
            ${personalInfo.about ? `<div style="margin-top:30px;font-size:16px;line-height:1.6;color:#444;max-width:600px;margin-left:auto;margin-right:auto">${personalInfo.about}</div>` : ''}
        </div>
        
        <div class="section">
            <div class="s-head">${t.cv_skills}</div>
            <div class="skills">${skills.map(s => `<span class="tag">${s.name}</span>`).join('')}</div>
        </div>

        <div class="section">
             <div class="s-head">${t.cv_experience}</div>
             ${experience.map(e => `<div class="exp-item"><div class="e-role">${e.position}</div><div class="e-comp">${e.company} | ${e.startDate}-${e.endDate}</div><div class="e-desc">${e.description}</div></div>`).join('')}
        </div>
        
        ${projects && projects.length > 0 ? `<div class="section"><div class="s-head">${t.cv_projects}</div>${projects.map(p => `<div class="exp-item"><div class="e-role">${p.name}</div><div class="e-desc">${p.description}</div></div>`).join('')}</div>` : ''}

        <div class="section">
            <div class="s-head">${t.cv_education}</div>
            <div class="edu-grid">
                ${education.map(e => `<div><div style="font-size:18px;font-weight:700">${e.school}</div><div style="color:${primaryColor}">${e.degree}</div><div style="font-size:13px;color:#777;margin-top:5px">${e.startDate}-${e.endDate}</div></div>`).join('')}
            </div>
        </div>
        
        ${languages.length > 0 ? `<div class="section"><div class="s-head">${t.cv_languages}</div><div class="skills">${languages.map(l => `<span class="tag" style="background:#fff;border:1px solid #ddd;color:#333">${l.name} (${l.proficiency})</span>`).join('')}</div></div>` : ''}
         ${references && references.length > 0 ? `<div class="section"><div class="s-head">${t.cv_references}</div><div class="edu-grid">${references.map(r => `<div><b>${r.fullName}</b><br>${r.company}<br>${r.phone}</div>`).join('')}</div></div>` : ''}
    </div></body></html>`;
};

// ENGINE 14: TORONTO (Modern Corporate)
const renderToronto = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Roboto') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@400;500;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:0;color:#333;display:flex;min-height:100%}
    .side{width:30%;background:#f4f6f8;padding:40px 20px;flex-shrink:0}
    .main{flex:1;padding:40px 40px}
    .photo{width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:20px;display:block;margin-left:auto;margin-right:auto}
    .s-head{font-size:14px;font-weight:700;text-transform:uppercase;color:${primaryColor};margin-bottom:15px;border-bottom:1px solid #ddd;padding-bottom:5px}
    .s-item{margin-bottom:10px;font-size:13px;word-break:break-all}
    .sk-tag{display:block;background:#e2e8f0;padding:5px 10px;border-radius:4px;font-size:12px;margin-bottom:5px;font-weight:500;color:#333}
    .name{font-size:36px;font-weight:700;color:#111;margin-bottom:5px}
    .role{font-size:18px;color:${primaryColor};font-weight:500;margin-bottom:30px}
    .m-sec{margin-bottom:35px}
    .m-head{font-size:16px;font-weight:700;text-transform:uppercase;border-left:3px solid ${primaryColor};padding-left:10px;margin-bottom:20px;color:#111}
    .item{margin-bottom:25px}
    .i-top{display:flex;justify-content:space-between;margin-bottom:2px}
    .i-tit{font-weight:700;font-size:15px}
    .i-sub{font-size:14px;color:#555}
    .i-date{font-size:13px;color:#777}
    .i-desc{font-size:14px;line-height:1.6;margin-top:5px;color:#444}
    </style></head><body>
    
    <div class="side">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        
        <div class="s-head">${t.cv_contact}</div>
        <div class="s-item">${personalInfo.email}</div>
        <div class="s-item">${personalInfo.phone}</div>
        <div class="s-item">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#333')}
        
        <div class="s-head" style="margin-top:30px">${t.cv_education}</div>
        ${education.map(e => `
        <div style="margin-bottom:15px">
            <div style="font-weight:700;font-size:13px">${e.school}</div>
            <div style="font-size:12px;color:#555">${e.degree}</div>
            <div style="font-size:11px;color:#777">${e.startDate}-${e.endDate}</div>
        </div>`).join('')}

        <div class="s-head" style="margin-top:30px">${t.cv_skills}</div>
        ${skills.map(s => `<div class="sk-tag">${s.name}</div>`).join('')}
        
        ${languages.length > 0 ? `
        <div class="s-head" style="margin-top:30px">${t.cv_languages}</div>
        ${languages.map(l => `<div class="s-item">${l.name} (${l.proficiency})</div>`).join('')}` : ''}
    </div>

    <div class="main">
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        ${personalInfo.about ? `<div style="font-size:14px;line-height:1.6;color:#555;margin-bottom:40px">${personalInfo.about}</div>` : ''}
        
        <div class="m-sec">
             <div class="m-head">${t.cv_experience}</div>
             ${experience.map(e => `
             <div class="item">
                <div class="i-top"><div class="i-tit">${e.position}</div><div class="i-date">${e.startDate} - ${e.endDate}</div></div>
                <div class="i-sub">${e.company}</div>
                <div class="i-desc">${e.description}</div>
             </div>`).join('')}
        </div>
        
        ${projects && projects.length > 0 ? `
        <div class="m-sec">
             <div class="m-head">${t.cv_projects}</div>
             ${projects.map(p => `
             <div class="item">
                <div class="i-tit">${p.name}</div>
                <div class="i-desc">${p.description}</div>
             </div>`).join('')}
        </div>` : ''}
        
        ${references && references.length > 0 ? `
        <div class="m-sec">
            <div class="m-head">${t.cv_references}</div>
            ${references.map(r => `<div style="font-size:14px"><b>${r.fullName}</b><br>${r.company}</div>`).join('')}
        </div>` : ''}

    </div></body></html>`;
};

// ENGINE 15: UNIQUE (Left Dark, Right Light)
const renderUnique = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Ubuntu') => {
    const { personalInfo, education, experience, skills, languages, projects, references } = data;
    const t = translations[language];
    const accent = primaryColor;
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;display:flex;min-height:100%}
    .left{width:280px;background:#1e1e1e;color:#fff;padding:40px 25px}
    .right{flex:1;padding:50px 40px}
    .photo-con{width:120px;height:120px;border-radius:12px;overflow:hidden;margin-bottom:30px;border:3px solid ${accent}}
    .l-sec{margin-bottom:40px}
    .l-head{font-size:16px;font-weight:700;color:${accent};text-transform:uppercase;margin-bottom:15px;letter-spacing:1px}
    .l-item{margin-bottom:10px;font-size:13px;color:#ddd}
    .r-sec{margin-bottom:35px}
    .r-head{font-size:20px;font-weight:700;color:#333;margin-bottom:20px;position:relative;display:inline-block}
    .r-head::after{content:'';width:100%;height:3px;background:${accent};position:absolute;bottom:-5px;left:0;border-radius:2px}
    .t-item{margin-bottom:25px;position:relative;padding-left:20px;border-left:2px solid #eee}
    .t-dot{position:absolute;left:-6px;top:5px;width:10px;height:10px;border-radius:50%;background:${accent}}
    .sk-bar{height:6px;background:#555;border-radius:3px;margin-top:5px;width:100%}
    .sk-fill{height:100%;background:${accent};border-radius:3px}
    </style></head><body>
    
    <div class="left">
        <div class="photo-con">
             ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" style="width:100%;height:100%;object-fit:cover"/>` : ''}
        </div>
        
        <div class="l-sec" style="margin-top:40px">
            <div class="l-head">${t.cv_contact}</div>
            <div class="l-item">📞 ${personalInfo.phone}</div>
            <div class="l-item">📧 ${personalInfo.email}</div>
            <div class="l-item">📍 ${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#fff')}
            ${personalInfo.socialLinks?.linkedin ? `<div class="l-item">🔗 ${personalInfo.socialLinks.linkedin}</div>` : ''}
        </div>

        <div class="l-sec">
             <div class="l-head">${t.cv_skills}</div>
             ${skills.map(s => `
             <div style="margin-bottom:12px">
                <div style="font-size:13px;font-weight:600">${s.name}</div>
                <div class="sk-bar"><div class="sk-fill" style="width:80%"></div></div>
             </div>`).join('')}
        </div>

        ${languages.length > 0 ? `
        <div class="l-sec">
            <div class="l-head">${t.cv_languages}</div>
            ${languages.map(l => `<div class="l-item">• ${l.name} (${l.proficiency})</div>`).join('')}
        </div>` : ''}
    </div>

    <div class="right">
        <div style="margin-bottom:50px;margin-left:20px">
            <div class="name-h" style="font-size:42px;font-weight:700;line-height:1;margin-bottom:5px">${personalInfo.fullName}</div>
            <div class="role-h" style="font-size:18px;color:${accent};font-weight:500;text-transform:uppercase">${personalInfo.jobTitle}</div>
            ${personalInfo.about ? `<div style="margin-top:20px;color:#555;line-height:1.6">${personalInfo.about}</div>` : ''}
        </div>

        <div class="r-sec">
            <div class="r-head">${t.cv_experience}</div>
            ${experience.map(e => `
            <div class="t-item">
                <div class="t-dot"></div>
                <div style="font-weight:700;font-size:16px">${e.position}</div>
                <div style="font-size:13px;color:#666;font-weight:500">${e.company} | ${e.startDate} - ${e.endDate}</div>
                <div style="font-size:14px;color:#444;margin-top:5px;line-height:1.5">${e.description}</div>
            </div>`).join('')}
        </div>

        <div class="r-sec">
            <div class="r-head">${t.cv_education}</div>
            ${education.map(e => `
            <div class="t-item">
                <div class="t-dot"></div>
                <div style="font-weight:700;font-size:16px">${e.school}</div>
                <div style="font-size:13px;color:#666">${e.degree}</div>
                <div style="font-size:13px;color:#888">${e.startDate} - ${e.endDate}</div>
            </div>`).join('')}
        </div>
        
        ${projects && projects.length > 0 ? `
        <div class="r-sec">
            <div class="r-head">${t.cv_projects}</div>
            ${projects.map(p => `
            <div class="t-item">
                <div class="t-dot"></div>
                <div style="font-weight:700;font-size:15px">${p.name}</div>
                <div style="font-size:14px;color:#444">${p.description}</div>
            </div>`).join('')}
        </div>` : ''}
        
    </div></body></html>`;
};

// ENGINE 16: HOFFMAN (Classic Dark Side)
const renderHoffman = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Roboto') => {
    const { personalInfo, education, experience, skills, languages, projects, references } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;700;900&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;display:flex;min-height:100%}
    .left{width:32%;background:#2d3748;color:#fff;padding:40px 25px}
    .right{flex:1;padding:50px 40px}
    .photo{width:150px;height:150px;border-radius:50%;object-fit:cover;border:4px solid #fff;margin:0 auto 30px;display:block}
    .l-sec{margin-bottom:35px}
    .l-tit{font-size:16px;font-weight:700;text-transform:uppercase;margin-bottom:15px;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:5px;letter-spacing:1px}
    .l-txt{font-size:13px;margin-bottom:8px;line-height:1.4;color:#e2e8f0}
    .name{font-size:38px;font-weight:900;text-transform:uppercase;color:#1a202c;margin-bottom:5px;letter-spacing:-1px}
    .role{font-size:15px;background:${primaryColor};color:#fff;display:inline-block;padding:4px 12px;text-transform:uppercase;font-weight:700;letter-spacing:1px;border-radius:4px;margin-bottom:30px}
    .r-sec{margin-bottom:40px}
    .r-tit{font-size:18px;font-weight:700;color:#2d3748;text-transform:uppercase;margin-bottom:20px;display:flex;align-items:center}
    .r-tit::before{content:'';width:8px;height:8px;background:${primaryColor};margin-right:10px;transform:rotate(45deg)}
    .item{display:grid;grid-template-columns:140px 1fr;gap:20px;margin-bottom:25px}
    .date{font-weight:700;color:#718096;font-size:13px;text-align:right}
    .i-tit{font-weight:700;font-size:16px;color:#1a202c}
    .i-sub{font-size:13px;font-style:italic;color:${primaryColor};margin-bottom:5px}
    .i-desc{font-size:14px;color:#4a5568;line-height:1.6}
    .sk-tag{background:rgba(255,255,255,0.1);padding:5px 10px;border-radius:4px;display:inline-block;margin:0 5px 5px 0;font-size:12px}
    </style></head><body>
    
    <div class="left">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        
        <div class="l-sec">
             <div class="l-tit">${t.cv_about}</div>
             <div class="l-txt" style="opacity:0.9">${personalInfo.about || ''}</div>
        </div>
        
        <div class="l-sec">
             <div class="l-tit">${t.cv_contact}</div>
             <div class="l-txt">${personalInfo.phone}</div>
             <div class="l-txt">${personalInfo.email}</div>
             <div class="l-txt">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#e2e8f0')}
        </div>
        
        <div class="l-sec">
             <div class="l-tit">${t.cv_skills}</div>
             <div>${skills.map(s => `<span class="sk-tag">${s.name}</span>`).join('')}</div>
        </div>

        ${languages.length > 0 ? `
        <div class="l-sec">
            <div class="l-tit">${t.cv_languages}</div>
            ${languages.map(l => `<div class="l-txt">• ${l.name} (${l.proficiency})</div>`).join('')}
        </div>` : ''}
    </div>

    <div class="right">
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        
        <div class="r-sec">
            <div class="r-tit">${t.cv_experience}</div>
            ${experience.map(e => `
            <div class="item">
                <div class="date">${e.startDate}<br>to<br>${e.endDate}</div>
                <div>
                   <div class="i-tit">${e.position}</div>
                   <div class="i-sub">${e.company}</div>
                   <div class="i-desc">${e.description}</div>
                </div>
            </div>`).join('')}
        </div>
        
        <div class="r-sec">
            <div class="r-tit">${t.cv_education}</div>
            ${education.map(e => `
            <div class="item">
                <div class="date">${e.startDate}<br>${e.endDate}</div>
                <div>
                   <div class="i-tit">${e.school}</div>
                   <div class="i-sub">${e.degree}</div>
                </div>
            </div>`).join('')}
        </div>

        ${projects && projects.length > 0 ? `
        <div class="r-sec">
            <div class="r-tit">${t.cv_projects}</div>
            ${projects.map(p => `
            <div class="item">
                <div class="date">Proje</div>
                <div>
                   <div class="i-tit">${p.name}</div>
                   <div class="i-desc">${p.description}</div>
                </div>
            </div>`).join('')}
        </div>` : ''}

        ${references && references.length > 0 ? `<div style="font-size:13px;color:#718096;margin-top:40px">${t.cv_references} - ${references.map(r => r.fullName).join(', ')}</div>` : ''}
    </div></body></html>`;
};

// ENGINE 17: CREATIVE (Clean Modern)
const renderCreative = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Raleway') => {
    const { personalInfo, education, experience, skills, languages, projects, references } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#f8fafc;padding:50px;color:#334155}
    .head{text-align:center;margin-bottom:50px}
    .photo{width:130px;height:130px;border-radius:30px;object-fit:cover;margin:0 auto 20px;box-shadow:0 10px 25px rgba(0,0,0,0.1)}
    .name{font-size:40px;font-weight:700;color:#0f172a;letter-spacing:-0.5px}
    .role{color:${primaryColor};font-size:16px;text-transform:uppercase;font-weight:700;letter-spacing:2px;margin-top:5px}
    .contact{display:flex;justify-content:center;gap:20px;margin-top:20px;font-size:13px;color:#64748b}
    .main{display:grid;grid-template-columns:1fr 1fr;gap:40px;background:#fff;padding:40px;border-radius:20px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}
    .sec-t{font-size:18px;font-weight:700;color:#0f172a;margin-bottom:20px;border-bottom:2px solid #f1f5f9;padding-bottom:10px}
    .item{margin-bottom:25px}
    .tit{font-weight:700;font-size:15px;color:#1e293b}
    .sub{font-size:13px;color:${primaryColor};margin-bottom:5px;font-weight:500}
    .desc{font-size:14px;line-height:1.6;color:#475569}
    .sk-bar{height:8px;background:#f1f5f9;border-radius:4px;margin-top:5px;overflow:hidden}
    .sk-fill{height:100%;background:${primaryColor};border-radius:4px}
    </style></head><body>
    
    <div class="head">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        <div class="contact">
            <span>${personalInfo.email}</span>
            <span>${personalInfo.phone}</span>
            <span>${personalInfo.address}</span>
            <div style="width:100%;text-align:center">${renderContactExtras(personalInfo, language, 'text', '#64748b')}</div>
        </div>
    </div>
    
    <div class="main">
        <div class="l-col">
            ${personalInfo.about ? `<div class="sec-t">${t.cv_about}</div><div style="margin-bottom:30px;line-height:1.7;font-size:14px">${personalInfo.about}</div>` : ''}
            
            <div class="sec-t">${t.cv_education}</div>
            ${education.map(e => `
            <div class="item">
                <div class="tit">${e.school}</div>
                <div class="sub">${e.degree} (${e.startDate}-${e.endDate})</div>
            </div>`).join('')}

            <div class="sec-t">${t.cv_skills}</div>
            ${skills.map(s => `
            <div style="margin-bottom:12px">
                <div style="display:flex;justify-content:space-between;font-size:13px"><span>${s.name}</span></div>
                <div class="sk-bar"><div class="sk-fill" style="width:85%"></div></div>
            </div>`).join('')}
        </div>
        
        <div class="r-col">
             <div class="sec-t">${t.cv_experience}</div>
             ${experience.map(e => `
             <div class="item">
                <div class="tit">${e.position}</div>
                <div class="sub">${e.company} | ${e.startDate}-${e.endDate}</div>
                <div class="desc">${e.description}</div>
             </div>`).join('')}
             
             ${projects && projects.length > 0 ? `
             <div class="sec-t">${t.cv_projects}</div>
             ${projects.map(p => `
             <div class="item">
                <div class="tit">${p.name}</div>
                <div class="desc">${p.description}</div>
             </div>`).join('')}` : ''}
        </div>
    </div></body></html>`;
};

// --- STUB ENGINES (Placeholder to avoid errors before full implementation) ---
// ENGINE 18: POLISHED (Elegant & Pink/Purple default)
const renderPolished = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Inter') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;700&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:0;min-height:100%;display:grid;grid-template-columns:260px 1fr}
    .side{background:#fdf2f8;padding:40px 25px;border-right:1px solid #fce7f3}
    .main{padding:50px 40px}
    .photo{width:140px;height:140px;border-radius:50%;object-fit:cover;margin:0 auto 30px;display:block;border:4px solid #fff;box-shadow:0 10px 20px rgba(0,0,0,0.05)}
    .s-head{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#db2777;margin-bottom:15px;border-bottom:1px solid #fbcfe8;padding-bottom:5px}
    .s-item{margin-bottom:10px;font-size:13px;color:#831843}
    .tag{display:inline-block;background:#fff;border:1px solid #fbcfe8;padding:5px 10px;border-radius:20px;margin:0 5px 5px 0;font-size:12px;color:#be185d}
    .name{font-size:42px;font-weight:700;color:#831843;line-height:1}
    .role{font-size:18px;color:${primaryColor};font-weight:500;margin-top:5px;margin-bottom:40px}
    .m-head{font-size:20px;font-weight:700;color:#831843;margin-bottom:20px;display:flex;align-items:center}
    .m-head::after{content:'';flex:1;height:1px;background:#fce7f3;margin-left:15px}
    .item{margin-bottom:30px}
    .tit{font-weight:700;font-size:16px;color:#1e293b}
    .sub{font-size:14px;color:${primaryColor};font-weight:500;margin-bottom:5px}
    .desc{font-size:14px;color:#475569;line-height:1.6}
    .date{font-size:12px;color:#94a3b8}
    </style></head><body>
    
    <div class="side">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        
        <div class="s-head">${t.cv_contact}</div>
        <div class="s-item">💌 ${personalInfo.email}</div>
        <div class="s-item">📱 ${personalInfo.phone}</div>
        <div class="s-item">🏠 ${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#831843')}
        
        <div class="s-head" style="margin-top:40px">${t.cv_skills}</div>
        <div>${skills.map(s => `<span class="tag">${s.name}</span>`).join('')}</div>
        
        ${languages.length > 0 ? `
        <div class="s-head" style="margin-top:40px">${t.cv_languages}</div>
        ${languages.map(l => `<div class="s-item">${l.name} - ${l.proficiency}</div>`).join('')}` : ''}
        
        ${references && references.length > 0 ? `
        <div class="s-head" style="margin-top:40px">${t.cv_references}</div>
        ${references.map(r => `<div class="s-item"><b>${r.fullName}</b><br>${r.company}</div>`).join('')}` : ''}
    </div>

    <div class="main">
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        ${personalInfo.about ? `<div style="font-size:15px;line-height:1.7;color:#475569;margin-bottom:50px">${personalInfo.about}</div>` : ''}
        
        <div class="m-head">${t.cv_experience}</div>
        ${experience.map(e => `
        <div class="item">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="tit">${e.position}</div>
                <div class="date">${e.startDate} - ${e.endDate}</div>
            </div>
            <div class="sub">${e.company}</div>
            <div class="desc">${e.description}</div>
        </div>`).join('')}
        
        ${projects && projects.length > 0 ? `
        <div class="m-head" style="margin-top:40px">${t.cv_projects}</div>
        ${projects.map(p => `
        <div class="item">
            <div class="tit">${p.name}</div>
            <div class="desc">${p.description}</div>
        </div>`).join('')}` : ''}

        <div class="m-head" style="margin-top:40px">${t.cv_education}</div>
        ${education.map(e => `
        <div class="item">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
                <div class="tit">${e.school}</div>
                <div class="date">${e.startDate} - ${e.endDate}</div>
            </div>
            <div class="sub">${e.degree}</div>
        </div>`).join('')}

        ${certifications && certifications.length > 0 ? `
        <div class="m-head" style="margin-top:40px">${t.cv_certifications}</div>
        ${certifications.map(c => `
        <div class="item">
            <div class="tit">${c.name}</div>
            <div class="date">${c.issuer}</div>
        </div>`).join('')}` : ''}
    </div></body></html>`;
};

// ENGINE 19: EXECUTIVE (Corporate Modern)
const renderExecutive = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Lato') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;700;900&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:0;min-height:100vh;display:flex}
    .left{width:260px;background:#1e293b;color:#e2e8f0;padding:50px 25px;display:flex;flex-direction:column}
    .right{flex:1;padding:60px 50px}
    .photo{width:140px;height:140px;object-fit:cover;margin:0 auto 40px;border-radius:50%;border:4px solid rgba(255,255,255,0.1)}
    .l-sec{margin-bottom:40px}
    .l-tit{color:${primaryColor};font-weight:700;text-transform:uppercase;margin-bottom:15px;letter-spacing:1px;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px}
    .l-txt{font-size:13px;margin-bottom:10px;line-height:1.5;word-wrap:break-word}
    .sk-tag{display:inline-block;background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:4px;margin:0 5px 5px 0;font-size:12px}
    .name{font-size:42px;font-weight:900;color:#1e293b;line-height:1;margin-bottom:5px;text-transform:uppercase}
    .role{font-size:18px;color:${primaryColor};font-weight:600;margin-bottom:50px;letter-spacing:1px;text-transform:uppercase}
    .r-sec{margin-bottom:50px}
    .r-tit{font-size:20px;font-weight:800;color:#1e293b;margin-bottom:25px;border-bottom:2px solid #e2e8f0;padding-bottom:10px}
    .item{display:grid;grid-template-columns:120px 1fr;gap:20px;margin-bottom:30px}
    .date{font-size:13px;font-weight:700;color:#64748b;text-align:right;line-height:1.5}
    .i-tit{font-weight:800;font-size:16px;color:#1e293b}
    .i-sub{font-size:14px;color:${primaryColor};font-weight:600;margin-bottom:5px}
    .i-desc{font-size:14px;color:#334155;line-height:1.6}
    </style></head><body>
    
    <div class="left">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        
        ${personalInfo.about ? `<div class="l-head">${t.cv_about}</div><div style="font-size:14px;line-height:1.6;margin-bottom:40px;opacity:0.9">${personalInfo.about}</div>` : ''}
        
        <div class="l-head">${t.cv_contact}</div>
        <div class="l-txt">${personalInfo.email}</div>
        <div class="l-txt">${personalInfo.phone}</div>
        <div class="l-txt">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#dbeafe')}
        
        <div class="l-head" style="margin-top:40px">${t.cv_skills}</div>
        ${skills.map(s => `
        <div class="sk-item">
            <div class="sk-name">${s.name}</div>
            <div class="sk-bar"><div class="sk-fill" style="width:90%"></div></div>
        </div>`).join('')}
        
        <div class="l-head" style="margin-top:40px">${t.cv_education}</div>
        ${education.map(e => `
        <div style="margin-bottom:20px">
            <div style="font-weight:700;font-size:14px">${e.school}</div>
            <div style="font-size:13px;color:#bfdbfe">${e.degree}</div>
        </div>`).join('')}

        ${languages.length > 0 ? `
        <div class="l-head" style="margin-top:40px">${t.cv_languages}</div>
        ${languages.map(l => `<div class="l-txt">${l.name} (${l.proficiency})</div>`).join('')}` : ''}
    </div>

    <div class="right">
        <div class="name">${personalInfo.fullName}</div>
        <div class="role">${personalInfo.jobTitle}</div>
        
        <div class="r-head">${t.cv_experience}</div>
        ${experience.map(e => `
        <div class="item">
            <div class="date">${e.startDate}<br>to<br>${e.endDate}</div>
            <div>
                <div class="tit">${e.position}</div>
                <div class="sub">${e.company}</div>
                <div class="desc">${e.description}</div>
            </div>
        </div>`).join('')}

        ${projects && projects.length > 0 ? `
        <div class="r-head" style="margin-top:50px">${t.cv_projects}</div>
        ${projects.map(p => `
        <div class="item">
            <div class="date">PROJE</div>
            <div>
                <div class="tit">${p.name}</div>
                <div class="desc">${p.description}</div>
            </div>
        </div>`).join('')}` : ''}
        
        ${certifications && certifications.length > 0 ? `
        <div class="r-head" style="margin-top:50px">${t.cv_certifications}</div>
        ${certifications.map(c => `
        <div class="item" style="margin-bottom:15px">
            <div class="date">SERTİFİKA</div>
            <div>
                <div class="tit">${c.name}</div>
                <div class="sub" style="font-size:14px;color:#64748b">${c.issuer}</div>
            </div>
        </div>`).join('')}` : ''}

        ${references && references.length > 0 ? `
        <div class="r-head" style="margin-top:50px">${t.cv_references}</div>
        ${references.map(r => `
        <div style="margin-bottom:10px"><b>${r.fullName}</b>, ${r.company} (<span style="color:#64748b">${r.email}</span>)</div>`).join('')}` : ''}
    </div></body></html>`;
};

// ENGINE 20: VANGUARD (Corporate Pro)
const renderVanguard = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Inter') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;600;700;800&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#fff;padding:0;min-height:100vh;display:flex}
    .side{width:290px;background:#1e293b;color:#fff;padding:60px 30px;display:flex;flex-direction:column;position:relative}
    .side::after{content:'';position:absolute;top:0;right:0;width:10px;height:100%;background:rgba(0,0,0,0.1)}
    .main{flex:1;padding:60px 50px;background:#f8fafc}
    .photo{width:160px;height:160px;object-fit:cover;margin:0 auto 40px;border-radius:6px;border:4px solid rgba(255,255,255,0.1)}
    .s-tit{font-size:13px;font-weight:800;text-transform:uppercase;color:#94a3b8;margin-bottom:20px;letter-spacing:1px;border-bottom:1px solid #334155;padding-bottom:10px}
    .s-item{margin-bottom:15px;font-size:14px;color:#cbd5e1;line-height:1.4}
    .sk-pill{display:inline-block;background:#334155;padding:6px 10px;border-radius:4px;font-size:12px;margin:0 5px 5px 0}
    .top-bar{margin-bottom:50px;border-bottom:2px solid ${primaryColor};padding-bottom:20px}
    .name{font-size:48px;font-weight:800;color:#0f172a;line-height:0.9;text-transform:uppercase;letter-spacing:-1px}
    .role{font-size:20px;color:${primaryColor};font-weight:700;margin-top:5px;text-transform:uppercase;letter-spacing:2px}
    .m-tit{font-size:20px;font-weight:800;color:#0f172a;margin-bottom:25px;display:flex;align-items:center}
    .m-tit::before{content:'';width:8px;height:8px;background:${primaryColor};margin-right:12px}
    .item{background:#fff;padding:25px;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);margin-bottom:25px;border-left:4px solid ${primaryColor}}
    .i-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px}
    .tit{font-size:18px;font-weight:700;color:#1e293b}
    .date{font-size:13px;font-weight:600;color:#64748b}
    .sub{font-size:14px;color:${primaryColor};font-weight:600;margin-bottom:10px;text-transform:uppercase}
    .desc{font-size:14px;color:#334155;line-height:1.6}
    </style></head><body>
    
    <div class="side">
        ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
        
        <div class="s-tit">${t.cv_contact}</div>
        <div class="s-item">${personalInfo.email}</div>
        <div class="s-item">${personalInfo.phone}</div>
        <div class="s-item">${personalInfo.address}</div>${renderContactExtras(personalInfo, language, 'text', '#cbd5e1')}
        
        <div class="s-tit" style="margin-top:40px">${t.cv_skills}</div>
        <div>${skills.map(s => `<span class="sk-pill">${s.name}</span>`).join('')}</div>
        
        ${languages.length > 0 ? `
        <div class="s-tit" style="margin-top:40px">${t.cv_languages}</div>
        ${languages.map(l => `<div class="s-item"><b>${l.name}</b> <span style="opacity:0.6">(${l.proficiency})</span></div>`).join('')}` : ''}
    </div>

    <div class="main">
        <div class="top-bar">
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
            ${personalInfo.about ? `<div style="margin-top:20px;font-size:15px;color:#475569;line-height:1.6;max-width:700px">${personalInfo.about}</div>` : ''}
        </div>
        
        <div class="m-tit">${t.cv_experience}</div>
        ${experience.map(e => `
        <div class="item">
            <div class="i-head"><div class="tit">${e.position}</div><div class="date">${e.startDate} - ${e.endDate}</div></div>
            <div class="sub">${e.company}</div>
            <div class="desc">${e.description}</div>
        </div>`).join('')}
        
        ${projects && projects.length > 0 ? `
        <div class="m-tit" style="margin-top:40px">${t.cv_projects}</div>
        ${projects.map(p => `
        <div class="item">
            <div class="tit" style="margin-bottom:5px">${p.name}</div>
            <div class="desc">${p.description}</div>
        </div>`).join('')}` : ''}

        <div class="m-tit" style="margin-top:40px">${t.cv_education}</div>
        ${education.map(e => `
        <div class="item">
            <div class="i-head"><div class="tit">${e.school}</div><div class="date">${e.startDate} - ${e.endDate}</div></div>
            <div class="sub">${e.degree}</div>
        </div>`).join('')}
        
        ${certifications && certifications.length > 0 ? `
        <div class="m-tit" style="margin-top:40px">${t.cv_certifications}</div>
        ${certifications.map(c => `
        <div class="item">
            <div class="tit">${c.name}</div>
            <div class="sub">${c.issuer}</div>
        </div>`).join('')}` : ''}
    </div></body></html>`;
};

// ENGINE 21: GLIDER (Modern Minimalist)
const renderGlider = (data: ResumeData, language: Language, primaryColor: string, font: string = 'Manrope') => {
    const { personalInfo, education, experience, skills, languages, projects, references, certifications } = data;
    const t = translations[language];
    return `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;600;800&display=swap" rel="stylesheet"><style>${getGlobalStyle(data)} 
    body{font-family:'${font}',sans-serif;background:#eff6ff;padding:40px}
    .card{background:#fff;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.08);overflow:hidden;min-height:95vh;display:flex}
    .side{width:300px;background:#fff;padding:50px 30px;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;align-items:center;text-align:center}
    .main{flex:1;padding:60px 50px}
    .photo{width:160px;height:160px;object-fit:cover;border-radius:60px;margin-bottom:30px;box-shadow:0 10px 20px ${primaryColor}40}
    .name{font-size:32px;font-weight:800;color:#0f172a;line-height:1.1;margin-bottom:5px}
    .role{font-size:16px;color:${primaryColor};font-weight:600;text-transform:uppercase;margin-bottom:30px;letter-spacing:1px;background:${primaryColor}10;padding:5px 15px;border-radius:20px;display:inline-block}
    .c-info{width:100%;text-align:left;background:#f8fafc;padding:20px;border-radius:16px;margin-bottom:30px}
    .c-item{font-size:13px;color:#475569;margin-bottom:8px;display:flex;align-items:center;word-break:break-word}
    .c-icon{width:24px;height:24px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-right:10px;color:${primaryColor};font-size:12px;box-shadow:0 2px 5px rgba(0,0,0,0.05);flex-shrink:0}
    .sk-cont{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
    .sk-tag{background:#fff;border:1px solid #e2e8f0;padding:6px 12px;border-radius:12px;font-size:13px;color:#334155;font-weight:600}
    .sec-t{font-size:20px;font-weight:800;color:#1e293b;margin-bottom:25px;display:flex;align-items:center}
    .sec-t::after{content:'';flex:1;height:2px;background:#f1f5f9;margin-left:15px;border-radius:2px}
    .item{margin-bottom:35px}
    .i-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .tit{font-size:18px;font-weight:700;color:#1e293b}
    .date{font-size:12px;font-weight:700;color:#94a3b8;background:#f1f5f9;padding:4px 10px;border-radius:20px}
    .sub{font-size:14px;color:${primaryColor};font-weight:600;margin-bottom:10px}
    .desc{font-size:15px;line-height:1.7;color:#475569}
    </style></head><body>
    <div class="card">
        <div class="side">
            ${personalInfo.photoUri ? `<img src="${personalInfo.photoUri}" class="photo"/>` : ''}
            <div class="name">${personalInfo.fullName}</div>
            <div class="role">${personalInfo.jobTitle}</div>
            
            <div class="c-info">
                <div class="c-item"><div class="c-icon">@</div>${personalInfo.email}</div>
                <div class="c-item"><div class="c-icon">T</div>${personalInfo.phone}</div>
                <div class="c-item"><div class="c-icon">L</div>${personalInfo.address}</div>
                ${personalInfo.socialLinks?.linkedin ? `<div class="c-item"><div class="c-icon">in</div>${personalInfo.socialLinks.linkedin}</div>` : ''}
            </div>
            
            ${renderContactExtras(personalInfo, language, 'text', '#475569')}
            
            <div style="width:100%;text-align:left;margin-bottom:15px;font-weight:700;color:#0f172a;font-size:14px">${t.cv_skills}</div>
            <div class="sk-cont">${skills.map(s => `<span class="sk-tag">${s.name}</span>`).join('')}</div>
            
            ${languages.length > 0 ? `
            <div style="width:100%;text-align:left;margin-top:30px;margin-bottom:15px;font-weight:700;color:#0f172a;font-size:14px">${t.cv_languages}</div>
            <div class="c-info">${languages.map(l => `<div class="c-item"><b>${l.name}</b> <span style="margin-left:auto;color:#94a3b8;font-size:12px">${l.proficiency}</span></div>`).join('')}</div>` : ''}
        </div>
        
        <div class="main">
            ${personalInfo.about ? `<div style="margin-bottom:50px;font-size:16px;line-height:1.8;color:#475569">${personalInfo.about}</div>` : ''}
            
            <div class="sec-t">${t.cv_experience}</div>
            ${experience.map(e => `
            <div class="item">
                <div class="i-head"><div class="tit">${e.position}</div><div class="date">${e.startDate} - ${e.endDate}</div></div>
                <div class="sub">${e.company}</div>
                <div class="desc">${e.description}</div>
            </div>`).join('')}
            
            ${projects && projects.length > 0 ? `
            <div class="sec-t" style="margin-top:40px">${t.cv_projects}</div>
            ${projects.map(p => `
            <div class="item">
                <div class="tit">${p.name}</div>
                <div class="desc">${p.description}</div>
            </div>`).join('')}` : ''}

            <div class="sec-t" style="margin-top:40px">${t.cv_education}</div>
            ${education.map(e => `
            <div class="item">
                <div class="i-head"><div class="tit">${e.school}</div><div class="date">${e.startDate} - ${e.endDate}</div></div>
                <div class="sub">${e.degree}</div>
            </div>`).join('')}
             ${certifications && certifications.length > 0 ? `
            <div class="sec-t" style="margin-top:40px">${t.cv_certifications}</div>
            ${certifications.map(c => `
            <div class="item">
                <div class="tit">${c.name}</div>
                <div class="sub">${c.issuer}</div>
            </div>`).join('')}` : ''}
        </div>
    </div></body></html>`;
};

// --- INSERT MORE ENGINES HERE ---



// MAIN GENERATOR
export const generateCVHtml = (data: ResumeData, templateId: string, language: Language): string => {
    let color = data.themeColor;
    if (!color) {
        // Fallback colors
        if (templateId === 'titanium') color = '#3b82f6';
        else if (templateId === 'magenta') color = '#d946ef';
        else if (templateId === 'noir') color = '#000000';
        else if (templateId === 'manhattan') color = '#1a365d';
        else if (templateId === 'swiss') color = '#ef4444';
        else if (templateId === 'monaco') color = '#4f46e5';
        else if (templateId === 'verona') color = '#57534e';
        else if (templateId === 'stockholm') color = '#0f172a';
        else if (templateId === 'horizon') color = '#2563eb';
        else if (templateId === 'element') color = '#333333';
        // Mega Pack Fallbacks
        else if (templateId === 'glacier') color = '#0ea5e9';
        else if (templateId === 'berlin') color = '#10b981';
        else if (templateId === 'canvas') color = '#be185d';
        else if (templateId === 'toronto') color = '#334155';
        else if (templateId === 'unique') color = '#84cc16';
        else if (templateId === 'hoffman') color = '#3b82f6';
        else if (templateId === 'creative') color = '#EC4899';
        else if (templateId === 'polished') color = '#db2777';
        else if (templateId === 'executive') color = '#1e3a8a';
        else if (templateId === 'gatsby') color = '#ab6f03';
        else if (templateId === 'vanguard') color = '#1e293b';
        else if (templateId === 'glider') color = '#3b82f6';
        else color = '#1a365d';
    }

    let html = '';
    if (templateId === 'titanium') html = renderTitanium(data, language, color || '#3b82f6');
    else if (templateId === 'magenta') html = renderMagenta(data, language, color || '#d946ef');
    else if (templateId === 'noir') html = renderNoir(data, language, color || '#000000');
    else if (templateId === 'manhattan') html = renderManhattan(data, language, color || '#1a365d');
    else if (templateId === 'swiss') html = renderSwiss(data, language, color || '#ef4444');

    // New Engines
    else if (templateId === 'monaco') html = renderMonaco(data, language, color || '#4f46e5');
    else if (templateId === 'verona') html = renderVerona(data, language, color || '#57534e');
    else if (templateId === 'stockholm') html = renderStockholm(data, language, color || '#0f172a');
    else if (templateId === 'horizon') html = renderHorizon(data, language, color || '#2563eb');
    else if (templateId === 'element') html = renderElement(data, language, color || '#333333');

    // Mega Pack Engines
    else if (templateId === 'glacier') html = renderGlacier(data, language, color || '#0ea5e9');
    else if (templateId === 'gatsby') html = renderGatsby(data, language, color || '#ab6f03');
    else if (templateId === 'canvas') html = renderCanvas(data, language, color || '#be185d');
    else if (templateId === 'toronto') html = renderToronto(data, language, color || '#334155');
    // New User-Requested Templates
    else if (templateId === 'unique') html = renderUnique(data, language, color || '#84cc16');
    else if (templateId === 'hoffman') html = renderHoffman(data, language, color || '#3b82f6');
    else if (templateId === 'creative') html = renderCreative(data, language, color || '#EC4899');
    // Batch 2 Engines
    else if (templateId === 'polished') html = renderPolished(data, language, color || '#db2777');
    else if (templateId === 'executive') html = renderExecutive(data, language, color || '#1e3a8a');
    else if (templateId === 'vanguard') html = renderVanguard(data, language, color || '#1e293b');
    else if (templateId === 'glider') html = renderGlider(data, language, color || '#3b82f6');
    else html = renderManhattan(data, language, color || '#1a365d');

    // Wrap content in height-constrained div for export mode
    if (isExportMode && html.includes('<body>')) {
        html = html.replace('<body>', '<body><div style="max-height:1123px;height:1123px;overflow:hidden;position:relative;">');
        html = html.replace('</body>', '</div></body>');
    }

    return html;
};
