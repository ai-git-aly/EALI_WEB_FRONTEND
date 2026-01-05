const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface NewsImage {
    id: number;
    image: string;
}

export interface NewsEvent {
    id: number;
    title_en: string;
    title_fr: string;
    date: string;
    description_en: string;
    description_fr: string;
    category: string;
    created_at: string;
    images: NewsImage[];
}

export interface Tender {
    id: number;
    title_en: string;
    title_fr: string;
    description_en: string;
    description_fr: string;
    file: string;
    date_posted: string;
    deadline: string | null;
}

export interface Partner {
    id: number;
    name_en: string;
    name_fr: string;
    country_en: string;
    country_fr: string;
    type: 'International' | 'National';
    logo: string | null;
}

export interface FacultyOption {
    id: number;
    name_en: string;
    name_fr: string;
}

export interface Faculty {
    id: number;
    name_en: string;
    name_fr: string;
    icon_name: string;
    options: FacultyOption[];
}

export interface ProfessionalCourse {
    id: number;
    name_en: string;
    name_fr: string;
    icon_name: string;
}

async function fetchFromApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/`);
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return response.json();
}

export const api = {
    getNews: () => fetchFromApi<NewsEvent[]>('news'),
    getTenders: () => fetchFromApi<Tender[]>('tenders'),
    getPartners: () => fetchFromApi<Partner[]>('partners'),
    getFaculties: () => fetchFromApi<Faculty[]>('faculties'),
    getCourses: () => fetchFromApi<ProfessionalCourse[]>('courses'),
};

export default api;
