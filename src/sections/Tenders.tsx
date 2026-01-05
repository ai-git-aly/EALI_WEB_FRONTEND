import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Calendar, Download, ExternalLink } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import api, { Tender } from '../services/api';

const Tenders: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenders = async () => {
            try {
                const data = await api.getTenders();
                setTenders(data);
            } catch (error) {
                console.error('Failed to fetch tenders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTenders();
    }, []);

    return (
        <div id="tenders" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll direction="down" className="text-center mb-16">
                    <h2 className="text-sm font-semibold text-brand-secondary tracking-widest uppercase mb-2">
                        {t('tenders') || "Appel d'offre"}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {t('tenders_title') || "Appels d'Offres et Consultations"}
                    </h3>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        {t('tenders_description') || "Consultez nos appels d'offres en cours et téléchargez les documents associés."}
                    </p>
                </RevealOnScroll>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : tenders.length === 0 ? (
                    <div className="text-center py-20">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 text-lg">
                            {t('no_tenders') || "Aucun appel d'offre disponible pour le moment."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tenders.map((tender, index) => (
                            <RevealOnScroll
                                key={tender.id}
                                direction="up"
                                delay={index * 0.1}
                                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-brand-primary/30 transition-all duration-500 group hover:-translate-y-1 shadow-lg shadow-slate-200/50"
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-3 bg-brand-primary/10 rounded-lg">
                                            <FileText className="w-8 h-8 text-brand-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-300 line-clamp-2 mb-2">
                                                {i18n.language === 'fr' ? tender.title_fr : tender.title_en}
                                            </h4>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>{t('posted_on') || 'Publié le'}: {tender.date_posted}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                                        {i18n.language === 'fr' ? tender.description_fr : tender.description_en}
                                    </p>

                                    {tender.deadline && (
                                        <div className="flex items-center gap-2 text-brand-secondary text-sm mb-4 p-3 bg-brand-secondary/10 rounded-lg">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">{t('deadline') || 'Date limite'}: {tender.deadline}</span>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <a
                                            href={tender.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors font-medium"
                                        >
                                            <Download className="w-4 h-4" />
                                            {t('download') || 'Télécharger'}
                                        </a>
                                        <a
                                            href={tender.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-3 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary/5 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tenders;
