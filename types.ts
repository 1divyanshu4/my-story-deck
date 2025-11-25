
export interface CTAButton {
    id: string;
    type: 'primary' | 'secondary';
    label: string;
    scrollTo: string;
}

export interface Profile {
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
    ctaButtons: CTAButton[];
}

export interface Stat {
    id: string;
    value: string;
    label: string;
}

export interface JourneyItem {
    id: string;
    type: 'Education' | 'Experience' | 'Milestone';
    title: string;
    institution?: string;
    year: string;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    logoUrl: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    liveUrl: string;
    liveAccess: 'public' | 'private';
    repoUrl: string;
    repoAccess: 'public' | 'private';
    companyName?: string;
    companyUrl?: string;
}

export interface Contact {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
    web3formsKey: string;
}

export interface PortfolioData {
    selectedTemplate: string;
    profile: Profile;
    stats: Stat[];
    journey: JourneyItem[];
    skills: Skill[];
    projects: Project[];
    contact: Contact;
}
