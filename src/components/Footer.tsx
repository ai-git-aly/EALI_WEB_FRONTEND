import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../images/logo.png';
import RevealOnScroll from './RevealOnScroll';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-primary border-t border-brand-secondary/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll direction="up">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-4 group">
                                <img src={logo} alt="EALI Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                                <span className="text-2xl font-bold text-white tracking-wider">EALI<span className="text-brand-secondary">.BI</span></span>
                            </div>
                            <p className="mt-4 text-brand-light/80 max-w-sm leading-relaxed">
                                {t('building_future_leaders')}
                            </p>
                            <div className="flex space-x-3 mt-6">
                                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all duration-300">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all duration-300">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all duration-300">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all duration-300">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">{t('quick_links')}</h4>
                            <ul className="space-y-3 text-brand-light/80">
                                <li><a href="#about" className="hover:text-white transition-colors duration-300">{t('about')}</a></li>
                                <li><a href="#programs" className="hover:text-white transition-colors duration-300">{t('programs')}</a></li>
                                <li><a href="#admissions" className="hover:text-white transition-colors duration-300">{t('admissions')}</a></li>
                                <li><a href="#news" className="hover:text-white transition-colors duration-300">{t('news')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h4>
                            <ul className="space-y-3 text-brand-light/80">
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-secondary">📍</span>
                                    <span>Muyinga-Kibogoye, Burundi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-secondary">📞</span>
                                    <span>+257 22 30 63 01</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-secondary">✉️</span>
                                    <span className="text-white">info@eali.bi</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-brand-light/60 text-sm">© {currentYear} East African Leadership Institute. {t('all_rights_reserved')}</p>
                        <div className="flex gap-6 text-sm text-brand-light/60">
                            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </footer>
    );
};

export default Footer;
