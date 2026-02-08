import { Certification, Education, Experience, initialResumeData, Language, PersonalInfo, Project, Reference, ResumeData, Skill } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ResumeState {
    resumeData: ResumeData;
    setPersonalInfo: (info: Partial<PersonalInfo>) => void;
    addEducation: (edu: Education) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    addExperience: (exp: Experience) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    addSkill: (skill: Skill) => void;
    removeSkill: (id: string) => void;
    addLanguage: (lang: Language) => void;
    removeLanguage: (id: string) => void;
    addReference: (ref: Reference) => void;
    removeReference: (id: string) => void;

    // New Actions
    loadExampleData: () => void; // New action definition
    addProject: (proj: Project) => void;
    removeProject: (id: string) => void;
    addCertification: (cert: Certification) => void;
    removeCertification: (id: string) => void;

    resetResume: () => void;
    setThemeColor: (color: string) => void;
    setTemplate: (id: string) => void;

    // Language
    selectedLanguage: 'tr' | 'en';
    setLanguage: (lang: 'tr' | 'en') => void;
}

export const useResumeStore = create<ResumeState>()(
    persist(
        (set) => ({
            resumeData: initialResumeData,
            setPersonalInfo: (info) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, personalInfo: { ...state.resumeData.personalInfo, ...info } },
                })),
            addEducation: (edu) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, education: [...state.resumeData.education, edu] },
                })),
            updateEducation: (id, edu) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
                    },
                })),
            removeEducation: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.filter((e) => e.id !== id),
                    },
                })),
            addExperience: (exp) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, experience: [...state.resumeData.experience, exp] },
                })),
            updateExperience: (id, exp) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
                    },
                })),
            removeExperience: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.filter((e) => e.id !== id),
                    },
                })),
            addSkill: (skill) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, skills: [...state.resumeData.skills, skill] },
                })),
            removeSkill: (id) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, skills: state.resumeData.skills.filter((s) => s.id !== id) },
                })),
            addLanguage: (lang) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, languages: [...state.resumeData.languages, lang] },
                })),
            removeLanguage: (id) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, languages: state.resumeData.languages.filter((l) => l.id !== id) },
                })),
            addReference: (ref) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, references: [...state.resumeData.references, ref] },
                })),
            removeReference: (id) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, references: state.resumeData.references.filter((r) => r.id !== id) },
                })),

            loadExampleData: () =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
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
                    },
                })),

            // New Implementation
            addProject: (proj) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, projects: [...(state.resumeData.projects || []), proj] }
                })),
            removeProject: (id) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, projects: (state.resumeData.projects || []).filter((p) => p.id !== id) }
                })),
            addCertification: (cert) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, certifications: [...(state.resumeData.certifications || []), cert] }
                })),
            removeCertification: (id) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, certifications: (state.resumeData.certifications || []).filter((c) => c.id !== id) }
                })),

            setThemeColor: (color) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, themeColor: color },
                })),
            setTemplate: (id) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, selectedTemplate: id },
                })),
            resetResume: () => set({ resumeData: initialResumeData }),

            // Language Support
            selectedLanguage: 'tr',
            setLanguage: (lang) => set({ selectedLanguage: lang }),
        }),
        {
            name: 'cv-maker-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
