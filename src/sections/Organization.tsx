import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Users, GraduationCap, Wallet, Lightbulb, ShieldCheck, UserCircle, Calculator } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const Organization: React.FC = () => {
    const { t } = useTranslation();

    const directions = [
        { key: 'direction_generale', icon: Building2 },
        { key: 'direction_academique', icon: GraduationCap },
        { key: 'direction_admin_finance', icon: Wallet },
        { key: 'direction_recherche', icon: Lightbulb },
        { key: 'direction_qualite', icon: ShieldCheck },
    ];

    const services = [
        { key: 'service_etudiants', icon: UserCircle },
        { key: 'service_comptabilite', icon: Calculator },
    ];

    return (
        <section id="organization" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-semibold text-brand-secondary tracking-widest uppercase mb-2">
                            {t('about')}
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                            {t('organisation_generale')}
                        </h3>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2">
                        <RevealOnScroll direction="right">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                <div
                                    className="prose prose-slate max-w-none prose-headings:text-brand-primary prose-a:text-brand-secondary hover:prose-a:text-brand-primary"
                                    dangerouslySetInnerHTML={{ __html: t('org_content') }}
                                />
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Sidebar / Management Structure */}
                    <div className="lg:col-span-1 space-y-8">
                        <RevealOnScroll direction="left" delay={0.2}>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                                <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-brand-primary" />
                                    {t('direction_et_service')}
                                </h4>

                                <div className="space-y-6">
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                            {t('direction_title')}
                                        </h5>
                                        <div className="space-y-3">
                                            {directions.map((item) => (
                                                <div key={item.key} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-brand-primary/5 transition-colors group">
                                                    <div className="p-2 rounded-md bg-white text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-slate-700 font-medium text-sm group-hover:text-brand-primary transition-colors">
                                                        {t(item.key)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-100" />

                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                            {t('service_title')}
                                        </h5>
                                        <div className="space-y-3">
                                            {services.map((item) => (
                                                <div key={item.key} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-brand-primary/5 transition-colors group">
                                                    <div className="p-2 rounded-md bg-white text-brand-secondary shadow-sm group-hover:scale-110 transition-transform">
                                                        <item.icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-slate-700 font-medium text-sm group-hover:text-brand-secondary transition-colors">
                                                        {t(item.key)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Organization;
