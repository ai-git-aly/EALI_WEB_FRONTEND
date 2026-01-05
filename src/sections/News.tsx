import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import api, { NewsEvent } from '../services/api';
import { newsEvents as staticNewsEvents } from '../data';

const News: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState<NewsEvent | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getNews();
                setNewsEvents(data);
            } catch (error) {
                console.error('Failed to fetch news from API, using static data:', error);
                // Fallback to static data
                setNewsEvents(staticNewsEvents.map((item) => ({
                    id: item.id,
                    title_en: item.title,
                    title_fr: item.title,
                    date: item.date,
                    description_en: item.description,
                    description_fr: item.description,
                    category: item.category,
                    created_at: item.date,
                    images: []
                })));
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleNextImage = () => {
        if (selectedNews && selectedNews.images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === selectedNews.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const handlePrevImage = () => {
        if (selectedNews && selectedNews.images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? selectedNews.images.length - 1 : prev - 1
            );
        }
    };

    const closeModal = () => {
        setSelectedNews(null);
        setCurrentImageIndex(0);
    };

    return (
        <div id="news" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll direction="down" className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-sm font-semibold text-brand-secondary tracking-widest uppercase mb-2">{t('news')}</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t('latest_news_events')}</h3>
                    </div>
                    <button className="text-brand-secondary hover:text-brand-accent font-medium transition-colors duration-300 group">
                        {t('view_all_news')} <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </button>
                </RevealOnScroll>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newsEvents.map((item, index) => (
                            <RevealOnScroll
                                key={item.id}
                                direction="up"
                                delay={index * 0.1}
                                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-brand-primary/30 transition-all duration-500 group flex flex-col h-full hover:-translate-y-1 shadow-lg shadow-slate-200/50 cursor-pointer"
                                onClick={() => setSelectedNews(item)}
                            >
                                <div className="h-48 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 relative overflow-hidden">
                                    {item.images && item.images.length > 0 ? (
                                        <img
                                            src={item.images[0].image}
                                            alt={i18n.language === 'fr' ? item.title_fr : item.title_en}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="inline-flex items-center gap-1 bg-brand-primary/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                                            <Tag className="w-3 h-3" /> {item.category}
                                        </span>
                                    </div>
                                    {item.images && item.images.length > 1 && (
                                        <div className="absolute bottom-4 right-4">
                                            <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                                +{item.images.length - 1} photos
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-brand-secondary/80 text-xs mb-3">
                                        <Calendar className="w-3 h-3" />
                                        {item.date}
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
                                        {i18n.language === 'fr' ? item.title_fr : item.title_en}
                                    </h4>
                                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                                        {i18n.language === 'fr' ? item.description_fr : item.description_en}
                                    </p>
                                    <button className="text-brand-secondary text-sm font-medium mt-auto self-start hover:text-brand-accent transition-colors duration-300">
                                        {t('read_more')} →
                                    </button>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for viewing news details with image gallery */}
            {selectedNews && (
                <div
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Gallery */}
                        {selectedNews.images && selectedNews.images.length > 0 && (
                            <div className="relative h-80 md:h-96 bg-slate-900">
                                <img
                                    src={selectedNews.images[currentImageIndex].image}
                                    alt={i18n.language === 'fr' ? selectedNews.title_fr : selectedNews.title_en}
                                    className="w-full h-full object-contain"
                                />
                                {selectedNews.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-white" />
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                                        >
                                            <ChevronRight className="w-6 h-6 text-white" />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedNews.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary text-sm px-3 py-1 rounded-full">
                                    <Tag className="w-4 h-4" /> {selectedNews.category}
                                </span>
                                <span className="flex items-center gap-2 text-slate-500 text-sm">
                                    <Calendar className="w-4 h-4" /> {selectedNews.date}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                                {i18n.language === 'fr' ? selectedNews.title_fr : selectedNews.title_en}
                            </h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                {i18n.language === 'fr' ? selectedNews.description_fr : selectedNews.description_en}
                            </p>
                            <button
                                onClick={closeModal}
                                className="mt-6 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
                            >
                                {t('close') || 'Fermer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default News;
