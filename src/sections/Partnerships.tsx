import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { partners as staticPartners } from '../data';
import { Globe2, MapPin } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import api, { Partner } from '../services/api';

const Partnerships: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [partners, setPartners] = useState<{ international: Partner[], national: Partner[] }>({
        international: [],
        national: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await api.getPartners();
                const international = data.filter(p => p.type === 'International');
                const national = data.filter(p => p.type === 'National');
                setPartners({ international, national });
            } catch (error) {
                console.error('Failed to fetch partners:', error);
                // Fallback to static data
                setPartners({
                    international: staticPartners.international.map((p, i) => ({ id: i, name_en: p.name, name_fr: p.name, country_en: p.country, country_fr: p.country, type: 'International', logo: null })),
                    national: staticPartners.national.map((p, i) => ({ id: i, name_en: p.name, name_fr: p.name, country_en: p.country, country_fr: p.country, type: 'National', logo: null }))
                });
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
    }, []);

    return (
        <div id="partnerships" className="py-24 bg-slate-50 border-y border-brand-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll direction="down" className="text-center mb-16">
                    <h2 className="text-sm font-semibold text-brand-secondary tracking-widest uppercase mb-2">{t('partnerships')}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t('partnerships_desc')}</h3>
                </RevealOnScroll>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* International Partners */}
                        <RevealOnScroll direction="right" className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-brand-primary/40 transition-all duration-300 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-brand-secondary/10">
                                    <Globe2 className="w-6 h-6 text-brand-secondary" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">{t('international_partners')}</h4>
                            </div>
                            <div className="space-y-4">
                                {partners.international.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-brand-primary/5 transition-all duration-300 group border border-slate-100"
                                    >
                                        <span className="text-slate-700 font-medium group-hover:text-brand-primary transition-colors">
                                            {i18n.language === 'fr' ? partner.name_fr : partner.name_en}
                                        </span>
                                        <span className="text-xs text-brand-secondary uppercase tracking-wider bg-brand-secondary/10 px-3 py-1 rounded-full">
                                            {i18n.language === 'fr' ? partner.country_fr : partner.country_en}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>

                        {/* National Partners */}
                        <RevealOnScroll direction="left" className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-brand-secondary/40 transition-all duration-300 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-brand-primary/10">
                                    <MapPin className="w-6 h-6 text-brand-primary" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">{t('national_partners')}</h4>
                            </div>
                            <div className="space-y-4">
                                {partners.national.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-brand-secondary/10 transition-all duration-300 group border border-slate-100"
                                    >
                                        <span className="text-slate-700 font-medium group-hover:text-brand-primary transition-colors">
                                            {i18n.language === 'fr' ? partner.name_fr : partner.name_en}
                                        </span>
                                        <span className="text-xs text-brand-primary uppercase tracking-wider bg-brand-primary/10 px-3 py-1 rounded-full">
                                            {i18n.language === 'fr' ? partner.country_fr : partner.country_en}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                )}

                {/* Goals */}
                <RevealOnScroll direction="up" delay={0.3} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: t('student_exchange'), desc: "Opportunities for students to learn abroad." },
                        { title: t('joint_research'), desc: "Collaborative research projects solving regional issues." },
                        { title: t('faculty_development'), desc: "Continuous training and exchange for our professors." }
                    ].map((goal, idx) => (
                        <div
                            key={idx}
                            className="text-center p-6 rounded-xl bg-white border border-slate-200 hover:border-brand-secondary/30 transition-all duration-300 shadow-sm"
                        >
                            <h5 className="text-lg font-bold text-brand-primary mb-2">{goal.title}</h5>
                            <p className="text-slate-600 text-sm">{goal.desc}</p>
                        </div>
                    ))}
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default Partnerships;
