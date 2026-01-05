import { BookOpen, Briefcase, Cpu, Globe, Sprout, Wifi } from 'lucide-react';

export const newsEvents = [
    {
        id: 1,
        title: 'EALI.BI Annual Leadership Conference 2024',
        date: '2024-03-15',
        description: 'Join us for our annual leadership conference featuring keynote speakers from across East Africa.',
        category: 'Conference'
    },
    {
        id: 2,
        title: 'New Partnership with Kabale University',
        date: '2024-02-28',
        description: 'EALI.BI signs MOU with Kabale University Uganda for student exchange programs.',
        category: 'Partnership'
    },
    {
        id: 3,
        title: 'Admissions Open for 2024 Academic Year',
        date: '2024-01-15',
        description: 'Applications are now open for all bachelor and diploma programs.',
        category: 'Admissions'
    },
    {
        id: 4,
        title: 'The new developer of EALI.bi University',
        date: '2025-12-30',
        description: 'The new developer of EALI.bi University is announced.',
        category: 'Announcement'
    }
];

export const programs = {
    faculties: [
        {
            name: 'faculty_communication',
            icon: Globe,
            options: [
                'option_communication_development'
            ]
        },
        {
            name: 'faculty_economics_management',
            icon: Briefcase,
            options: [
                'option_management_accounting',
                'option_community_development'
            ]
        },
        {
            name: 'faculty_health',
            icon: BookOpen,
            options: [
                'option_public_health',
                'option_human_nutrition'
            ]
        },
        {
            name: 'faculty_tech',
            icon: Cpu,
            options: [
                'option_network_management',
                'option_it_maintenance',
                'option_business_computing'
            ]
        },
        {
            name: 'faculty_agronomy',
            icon: Sprout,
            options: [
                'option_plant_production',
                'option_animal_production',
                'option_food_security'
            ]
        }
    ],
    professional_courses: [
        {
            name: 'course_management_accounting',
            icon: Briefcase
        },
        {
            name: 'course_community_development',
            icon: Globe
        },
        {
            name: 'course_telecom_networks',
            icon: Wifi
        },
        {
            name: 'course_it_maintenance',
            icon: Cpu
        },
        {
            name: 'course_hospitality_tourism',
            icon: Briefcase
        },
        {
            name: 'course_agriculture_development',
            icon: Sprout
        },
        {
            name: 'course_livestock_development',
            icon: Sprout
        }
    ]
};

export const partners = {
    international: [
        { name: 'Kabale University', country: 'Uganda' },
        { name: 'Centre International de Recherche pour le Développement Durable (CIRDD)', country: 'International' },
        { name: 'Pareto University', country: 'United Kingdom' },
        { name: 'Université Evangelique en Afrique (UEA)', country: 'RDC' },
        { name: 'Institut Supérieur de Développement Rural (ISDR)', country: 'RDC' }
    ],
    national: [
        { name: 'Université du Burundi', country: 'Burundi' },
        { name: 'Université de Ngozi', country: 'Burundi' },
        { name: 'Universités privées au Burundi', country: 'Burundi' },
        { name: 'Gouvernement du Burundi (Ministère de l’environnement, de l’agriculture et de l’élevage, Ministère de l’éducation nationale et de la recherche scientifique)', country: 'Burundi' },
        { name: 'Institut des Sciences Agronomiques du Burundi (ISABU)', country: 'Burundi' },
        { name: 'US Embassy du Burundi', country: 'Burundi' },
        { name: 'Higher Life Foundation', country: 'Burundi' }
    ]
};
