export interface SocialLinks {
    linkedin?: string;
    github?: string;
    website?: string;
    twitter?: string; // Added
}

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    jobTitle: string; // Added
    photoUri?: string;
    birthDate?: string;
    birthPlace?: string;
    militaryStatus?: string;
    maritalStatus?: string;
    drivingLicense?: string;
    website?: string;
    socialLinks: SocialLinks;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string; // or 'Present'
    city?: string; // Added
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    city?: string; // Added
}

export interface Skill {
    id: string;
    name: string;
    level?: number; // 0-100
}

export interface Language {
    id: string;
    name: string;
    proficiency?: string;
}

export interface Reference {
    id: string;
    fullName: string;
    company: string;
    email?: string;
    phone?: string;
    position?: string; // Added
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    languages: Language[];
    references: Reference[];
    projects: Project[];
    certifications: Certification[];
    themeColor: string;
    selectedTemplate: string;
    zoomLevel: number; // Added
}

export const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: 'Alexandra Vogue',
        jobTitle: 'Art Director',
        email: 'alexandra@studio.com',
        phone: '+1 555 0199 283',
        address: 'Milan, Italy',
        about: 'Visionary Art Director with a passion for minimalism. Transforming brands into fashion statements. Expert in editorial design and visual storytelling with over 6 years of experience in high-end fashion publications.',
        photoUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400',
        birthDate: '12/04/1994',
        birthPlace: 'Rome, Italy',
        maritalStatus: 'Single',
        militaryStatus: 'N/A',
        drivingLicense: 'B',
        website: 'alexandra.design',
        socialLinks: {
            linkedin: 'linkedin.com/in/alexandravogue',
            github: 'behance.net/alexandra',
            twitter: 'instagram.com/alexandra_art',
        },
    },
    education: [
        {
            id: '1',
            school: 'Istituto Marangoni',
            degree: 'Master in Fashion Design',
            city: 'Milan',
            startDate: '2018',
            endDate: '2020',
        },
        {
            id: '2',
            school: 'Politecnico di Milano',
            degree: 'B.A. Graphic Design',
            city: 'Milan',
            startDate: '2014',
            endDate: '2018',
        },
    ],
    experience: [
        {
            id: '1',
            company: 'Vogue Italia',
            position: 'Senior Layout Designer',
            city: 'Milan',
            startDate: '2020',
            endDate: 'Present',
            description: 'Leading the editorial design team for the digital edition. Redesigned the monthly layout system increasing reader engagement by 25%.',
        },
        {
            id: '2',
            company: 'Elle Magazine',
            position: 'Junior Art Director',
            city: 'Paris',
            startDate: '2019',
            endDate: '2020',
            description: 'Assisted in photo shoots and layout design for the summer collection issues. Collaborated with top fashion photographers.',
        },
    ],
    skills: [
        { id: '1', name: 'Editorial Design', level: 95 },
        { id: '2', name: 'Typography', level: 90 },
        { id: '3', name: 'Creative Direction', level: 85 },
        { id: '4', name: 'Adobe InDesign', level: 95 },
        { id: '5', name: 'Photography', level: 75 },
    ],
    languages: [
        { id: '1', name: 'English', proficiency: 'Native' },
        { id: '2', name: 'Italian', proficiency: 'Native' },
        { id: '3', name: 'French', proficiency: 'Advanced' },
    ],
    projects: [
        {
            id: '1',
            name: 'Milan Fashion Week 2023',
            description: 'Lead designer for the digital campaign covering MFW 2023. Created social media assets and website headers.',
            url: 'vogue.it/mfw23',
        },
    ],
    references: [
        {
            id: '1',
            fullName: 'Marco Rossi',
            company: 'Vogue Italia',
            position: 'Editor in Chief',
            email: 'marco@vogue.it',
            phone: '+39 02 1234567',
        },
    ],
    certifications: [
        {
            id: '1',
            name: 'Advanced Typography Masterclass',
            issuer: 'AIGA Design',
            date: '2021',
        },
    ],
    selectedTemplate: 'titanium',
    themeColor: '#3b82f6',
    zoomLevel: 100,
};
