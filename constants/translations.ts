export type Language = 'tr' | 'en';

export const translations = {
    tr: {
        // App UI
        homeTitle: "CV Oluşturucu",
        homeSubtitle: "✨ Tüm Şablonlar ÜCRETSİZ! (Reklamlı)",
        createNew: "Yeni CV Oluştur",
        continueEdit: "Düzenlemeye Devam Et",
        templates: "Şablonlar",
        settings: "Ayarlar",
        settingsTitle: "Ayarlar & İletişim",
        languageSection: "Dil Seçimi / Language",
        legalSection: "Yasal & Hakkında",
        privacy: "Gizlilik Politikası",
        terms: "Kullanım Koşulları",
        contact: "Bize Ulaşın",
        resetResume: "CV'yi Sıfırla",
        resetConfirm: "Tüm verileriniz silinecek ve başlangıç durumuna dönecektir. Emin misiniz?",
        reset: "Sıfırla",

        // Editor Fields
        personalInfo: "Kişisel Bilgiler",
        education: "Eğitim",
        experience: "İş Deneyimi",
        skills: "Yetenekler",
        projects: "Projeler",
        languages: "Diller",
        references: "Referanslar",
        certifications: "Sertifikalar",
        eduTitleAdd: "Yeni Eğitim Ekle",
        eduTitleEdit: "Eğitimi Düzenle",
        schoolLabel: "Okul / Üniversite",
        degreeLabel: "Bölüm / Derece",
        startDate: "Başlangıç",
        endDate: "Bitiş (veya Devam)",
        city: "Şehir",
        cancel: "İptal",

        // Experience
        expTitleAdd: "Yeni Deneyim Ekle",
        expTitleEdit: "Deneyimi Düzenle",
        companyLabel: "Şirket Adı",
        positionLabel: "Pozisyon / Ünvan",
        descLabel: "Açıklama / Görevler",

        // Skills
        skillTitle: "Yetenekler",
        skillPlaceholder: "Örn: React Native, Liderlik...",
        skillLevel: "Seviye",
        skillsSubtitle: "Yazılım dilleri, teknik beceriler veya hobilerini ekle.",
        addSkill: "Yetenek Ekle",
        noSkills: "Henüz yetenek eklenmedi.",

        // Languages
        langTitle: "Diller",
        langPlaceholder: "Örn: İngilizce",
        langLevel: "Seviye",
        addLang: "Dil Ekle",

        // Projects
        projTitleAdd: "Yeni Proje Ekle",
        projTitleEdit: "Projeyi Düzenle",
        projName: "Proje Adı",
        projLink: "Proje Linki (Opsiyonel)",
        projDesc: "Açıklama",

        // References
        refTitleAdd: "Yeni Referans Ekle",
        refTitleEdit: "Referansı Düzenle",
        refName: "Ad Soyad",
        refCompany: "Şirket / Kurum",
        refContact: "İletişim (Tel/Email)",

        // Certifications
        certTitleAdd: "Yeni Sertifika Ekle",
        certTitleEdit: "Sertifikayı Düzenle",
        certName: "Sertifika Adı",
        certIssuer: "Veren Kurum",
        certDate: "Alınan Tarih",

        projSubtitle: "Yaptığın önemli projeleri veya görevleri ekle.",
        langSubtitle: "Bildiğin yabancı dilleri ekle.",
        noLangs: "Henüz bir dil eklemedin.",
        refSubtitle: "Seni tavsiye edebilecek kişileri ekle.",
        certSubtitle: "Sertifikalarını ve başarılarını ekle.",

        proficiencies: ['Başlangıç', 'Orta', 'İyi', 'İleri', 'Anadil'],

        // Form Labels
        personalTitle: "Kişisel Bilgiler",
        personalSubtitle: "Fotoğrafını ekle, iletişim bilgilerini ve sosyal medya linklerini gir.",
        addPhoto: "Fotoğraf Ekle",
        namePlaceholder: "Ad Soyad",
        jobPlaceholder: "Meslek / Ünvan",
        aboutPlaceholder: "Kendinden kısaca bahset...",
        aboutLabel: "Hakkımda",
        socialLabel: "Sosyal Medya",
        phone: "Telefon",
        address: "Adres",
        email: "E-posta",
        birthDate: "Doğum Tarihi",
        birthPlace: "Doğum Yeri",
        military: "Askerlik",
        marital: "Medeni Hali",
        license: "Ehliyet",

        // CV Section Headers (Output)
        cv_contact: "İLETİŞİM",
        cv_experience: "İŞ DENEYİMİ",
        cv_education: "EĞİTİM",
        cv_skills: "YETENEKLER",
        cv_projects: "PROJELER",
        cv_languages: "DİLLER",
        cv_references: "REFERANSLAR",
        cv_certifications: "SERTİFİKALAR",
        cv_about: "HAKKINDA",

        // Actions
        save: "Kaydet",
        next: "Sonraki",
        select: "Devam Et",
        unlock: "Kilidi Aç",
        back: "Geri",
        add: "Ekle",
        preview: "Önizleme",
        completePreview: "Tamamla ve Önizle",
        download: "İndir / Paylaş",
        backToEditor: "Düzenlemeye Dön",
        selectTemplate: "Şablon Seçimi",
        shareErrorTitle: "Paylaşım Hatası",
        shareErrorMessage: "Paylaşım özelliği bu cihazda kullanılamıyor.",
        errorTitle: "Hata",
        pdfError: "PDF oluşturulurken bir hata oluştu.",

        // Support Modal
        supportTitle: "Ücretsiz Kullan",
        supportBody: "Bu şablonu kullanmak tamamen ÜCRETSİZDİR! Sadece kısa bir reklam izleyerek kilidi açabilirsin. Hiçbir ücret talep edilmez.",
        watchAd: "Reklam İzle & Ücretsiz Aç",
        noThanks: "Vazgeç",
        adLoadError: "Reklam yüklenemedi. Lütfen internet bağlantınızı kontrol edin.",

        // Extras
        military_label: "Askerlik:",
        birth_label: "Doğum:",
        place_label: "Yer:",
        marital_label: "Medeni Hal:",
        license_label: "Ehliyet:"
    },
    en: {
        // App UI
        homeTitle: "Resume Builder",
        homeSubtitle: "✨ All Templates are FREE! (With Ads)",
        createNew: "Create New CV",
        continueEdit: "Continue Editing",
        templates: "Templates",
        settings: "Settings",
        settingsTitle: "Settings & Contact",
        languageSection: "Language Selection",
        legalSection: "Legal & About",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        contact: "Contact Us",
        resetResume: "Reset CV",
        resetConfirm: "All your data will be deleted and reset to default. Are you sure?",
        reset: "Reset",

        // Editor Fields
        personalInfo: "Personal Info",
        education: "Education",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        languages: "Languages",
        references: "References",
        certifications: "Certifications",
        eduTitleAdd: "Add New Education",
        eduTitleEdit: "Edit Education",
        schoolLabel: "School / University",
        degreeLabel: "Degree / Major",
        startDate: "Start Date",
        endDate: "End Date (or Present)",
        city: "City",
        cancel: "Cancel",

        // Experience
        expTitleAdd: "Add New Experience",
        expTitleEdit: "Edit Experience",
        companyLabel: "Company Name",
        positionLabel: "Job Title",
        descLabel: "Description / Tasks",

        // Skills
        skillTitle: "Skills",
        skillPlaceholder: "Ex: React Native, Leadership...",
        skillLevel: "Level",
        skillsSubtitle: "Add programming languages, technical skills or hobbies.",
        addSkill: "Add Skill",
        noSkills: "No skills added yet.",

        // Languages
        langTitle: "Languages",
        langPlaceholder: "Ex: English",
        langLevel: "Level",
        addLang: "Add Language",

        // Projects
        projTitleAdd: "Add New Project",
        projTitleEdit: "Edit Project",
        projName: "Project Name",
        projLink: "Project Link (Optional)",
        projDesc: "Description",

        // References
        refTitleAdd: "Add New Reference",
        refTitleEdit: "Edit Reference",
        refName: "Full Name",
        refCompany: "Company / Organization",
        refContact: "Contact (Phone/Email)",

        // Certifications
        certTitleAdd: "Add New Certification",
        certTitleEdit: "Edit Certification",
        certName: "Certification Name",
        certIssuer: "Issuing Organization",
        certDate: "Date Obtained",

        projSubtitle: "Add important projects or tasks you've done.",
        langSubtitle: "Add foreign languages you know.",
        noLangs: "No languages added yet.",
        refSubtitle: "Add people who can recommend you.",
        certSubtitle: "Add certifications and achievements.",

        proficiencies: ['Beginner', 'Intermediate', 'Good', 'Advanced', 'Native'],

        // Form Labels
        personalTitle: "Personal Information",
        personalSubtitle: "Add your photo, enter contact details and social media links.",
        addPhoto: "Add Photo",
        namePlaceholder: "Full Name",
        jobPlaceholder: "Job Title",
        aboutPlaceholder: "Briefly describe yourself...",
        aboutLabel: "About Me",
        socialLabel: "Social Media",
        phone: "Phone",
        address: "Address",
        email: "Email",
        birthDate: "Date of Birth",
        birthPlace: "Place of Birth",
        military: "Military Status",
        marital: "Marital Status",
        license: "Driving License",

        // CV Section Headers (Output)
        cv_contact: "CONTACT",
        cv_experience: "EXPERIENCE",
        cv_education: "EDUCATION",
        cv_skills: "SKILLS",
        cv_projects: "PROJECTS",
        cv_languages: "LANGUAGES",
        cv_references: "REFERENCES",
        cv_certifications: "CERTIFICATIONS",
        cv_about: "ABOUT",

        // Actions
        save: "Save",
        next: "Next",
        select: "Continue",
        unlock: "Unlock",
        back: "Back",
        add: "Add",
        preview: "Preview",
        completePreview: "Complete & Preview",
        download: "Download / Share",
        backToEditor: "Return to Editor",
        selectTemplate: "Select Template",
        shareErrorTitle: "Sharing Error",
        shareErrorMessage: "Sharing is not available on this device.",
        errorTitle: "Error",
        pdfError: "Error generating PDF.",

        // Support Modal
        supportTitle: "Unlock for Free",
        supportBody: "Using this template is completely FREE! Just watch a short ad to unlock it. No payment required.",
        watchAd: "Watch Ad & Unlock Free",
        noThanks: "Cancel",
        adLoadError: "Failed to load ad. Please check your internet connection.",

        // Extras
        military_label: "Military:",
        birth_label: "Birth Date:",
        place_label: "Birth Place:",
        marital_label: "Marital Status:",
        license_label: "License:"
    }
};
