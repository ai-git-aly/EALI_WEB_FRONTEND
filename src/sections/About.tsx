import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, X, ZoomIn } from 'lucide-react';
import og from '../images/og.png';
import RevealOnScroll from '../components/RevealOnScroll';

const About: React.FC = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <RevealOnScroll direction="right" className="relative sticky top-24">
                        <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl blur-lg opacity-20"></div>
                        <div className="relative bg-white border border-brand-primary/10 p-8 rounded-2xl h-full flex flex-col justify-center shadow-xl">
                            <h3 className="text-2xl font-bold text-brand-primary mb-4">{t('our_history')}</h3>
                            <p className="text-slate-600 mb-6">
                                {t('about_eali_desc')}
                            </p>
                            <div className="flex gap-6 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-brand-secondary">2010</span>
                                    <span className="text-sm text-slate-500 uppercase tracking-wider">Founded</span>
                                </div>
                                <div className="w-px bg-brand-primary/30"></div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-brand-primary">3+</span>
                                    <span className="text-sm text-slate-500 uppercase tracking-wider">Campuses</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-brand-primary font-semibold mb-3">Organization Structure</h4>
                                <div
                                    className="relative group cursor-pointer overflow-hidden rounded-lg border border-brand-primary/10 hover:border-brand-secondary/50 transition-all duration-300 shadow-sm"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <img src={og} alt="Organigramme" className="w-full transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 w-8 h-8" />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-center italic">Click to enlarge</p>
                            </div>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll direction="left" delay={0.2}>
                        <h2 className="text-sm font-semibold text-brand-secondary tracking-widest uppercase mb-2">{t('about')}</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t('welcome_to_eali')}</h3>

                        <div
                            className="text-slate-600 text-lg mb-6 leading-relaxed space-y-4 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: t('about_eali_long') }}
                        />

                        <ul className="space-y-4 mt-8">
                            {[t('institutional_identity'), t('our_purpose'), t('our_community')].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-slate-700 group hover:text-brand-primary transition-colors duration-300"
                                >
                                    <div className="mr-3 p-1.5 rounded-full bg-brand-primary/20 text-brand-secondary group-hover:bg-brand-primary/30 transition-all duration-300">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-brand-secondary transition-colors p-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <img
                            src={og}
                            alt="Organigramme Full Size"
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
