import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, BookOpen, Briefcase, Cpu, Globe, Sprout, Wifi, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { programs as staticPrograms } from '../data';
import RevealOnScroll from '../components/RevealOnScroll';
import api, { Faculty, ProfessionalCourse } from '../services/api';

const iconMap: Record<string, LucideIcon> = {
    'BookOpen': BookOpen,
    'Briefcase': Briefcase,
    'Cpu': Cpu,
    'Globe': Globe,
    'Sprout': Sprout,
    'Wifi': Wifi,
};

const getIcon = (name: string): LucideIcon => {
    return iconMap[name] || Globe;
};

const Programs: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [courses, setCourses] = useState<ProfessionalCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const [facultiesData, coursesData] = await Promise.all([
                    api.getFaculties(),
                    api.getCourses()
                ]);
                setFaculties(facultiesData);
                setCourses(coursesData);
            } catch (error) {
                console.error('Failed to fetch programs:', error);
                // Fallback to static data
                setFaculties(staticPrograms.faculties.map((f, i) => ({
                    id: i,
                    name_en: f.name,
                    name_fr: f.name,
                    icon_name: f.icon.name || 'Globe',
                    options: f.options.map((o, j) => ({ id: j, name_en: o, name_fr: o }))
                })));
                setCourses(staticPrograms.professional_courses.map((c, i) => ({
                    id: i,
                    name_en: c.name,
                    name_fr: c.name,
                    icon_name: c.icon.name || 'Briefcase'
                })));
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    return (
        <div id="programs" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-brand-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll direction="down" className="text-center mb-16">
                    <h2 className="text-sm font-semibold text-brand-secondary tracking-widest uppercase mb-2">{t('programs')}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t('academic_programs_desc')}</h3>
                </RevealOnScroll>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* Faculties */}
                        <RevealOnScroll direction="up">
                            <h4 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-brand-secondary pl-4">{t('faculties')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {faculties.map((faculty) => {
                                    const Icon = getIcon(faculty.icon_name);
                                    return (
                                        <div
                                            key={faculty.id}
                                            className="group relative p-1 rounded-2xl bg-gradient-to-b from-slate-200 to-transparent hover:from-brand-primary/30 hover:to-brand-secondary/10 transition-all duration-500"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative h-full bg-white rounded-xl p-6 border border-slate-200 group-hover:border-brand-primary/30 overflow-hidden flex flex-col transition-all duration-300 shadow-sm group-hover:shadow-md">
                                                <div className="mb-4 p-3 bg-brand-primary/10 rounded-lg inline-block backdrop-blur-sm w-fit group-hover:bg-brand-primary/20 transition-all duration-300">
                                                    <Icon className="w-8 h-8 text-brand-secondary" />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-brand-primary transition-colors duration-300">
                                                    {t(i18n.language === 'fr' ? faculty.name_fr : faculty.name_en)}
                                                </h3>

                                                <div className="space-y-3">
                                                    {faculty.options.map((option) => (
                                                        <div key={option.id} className="flex items-start gap-3 text-slate-600 group/item hover:text-slate-900 transition-colors">
                                                            <CheckCircle2 className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5 group-hover/item:text-brand-primary transition-colors" />
                                                            <span className="text-sm font-medium">
                                                                {t(i18n.language === 'fr' ? option.name_fr : option.name_en)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-end items-center">
                                                    <button className="text-brand-secondary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
                                                        {t('learn_more')} <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </RevealOnScroll>

                        {/* Professional Courses */}
                        <RevealOnScroll direction="up" delay={0.3}>
                            <h4 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-brand-primary pl-4">{t('professional_courses')}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course) => {
                                    const Icon = getIcon(course.icon_name);
                                    return (
                                        <div
                                            key={course.id}
                                            className="group relative p-1 rounded-2xl bg-gradient-to-b from-slate-200 to-transparent hover:from-brand-secondary/30 hover:to-brand-primary/10 transition-all duration-500"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative h-full bg-white rounded-xl p-6 border border-slate-200 group-hover:border-brand-secondary/30 overflow-hidden flex flex-col transition-all duration-300 shadow-sm group-hover:shadow-md">
                                                <div className="mb-4 p-3 bg-brand-secondary/10 rounded-lg inline-block backdrop-blur-sm w-fit group-hover:bg-brand-secondary/20 transition-all duration-300">
                                                    <Icon className="w-8 h-8 text-brand-primary" />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-300 mb-4">
                                                    {t(i18n.language === 'fr' ? course.name_fr : course.name_en)}
                                                </h3>

                                                <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end items-center">
                                                    <button className="text-brand-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
                                                        {t('learn_more')} <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </RevealOnScroll>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Programs;
