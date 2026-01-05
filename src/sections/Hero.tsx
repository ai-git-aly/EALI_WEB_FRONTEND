import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import campusMuyinga from '../images/campus_muyinga.jpg';
import campusNgozi1 from '../images/campus_ngozi_1.jpg';
import campusNgozi2 from '../images/campus_ngozi_2.jpg';
import defile from '../images/defile.jpg';

const Hero: React.FC = () => {
    const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { image: campusNgozi1, alt: "Campus Ngozi 1" },
        { image: campusNgozi2, alt: "Campus Ngozi 2" },
        { image: campusMuyinga, alt: "Campus Muyinga" },
        { image: defile, alt: "Defile" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Slider */}
            <div className="absolute top-0 left-0 w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Gradient Overlay with brand colors */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-slate-900/60 to-brand-primary/40 z-10" />
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-20 left-10 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-20 right-10 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-6 px-6 py-2 rounded-full border border-brand-secondary/50 bg-brand-secondary/10 backdrop-blur-sm"
                >
                    <span className="text-brand-secondary text-sm font-semibold tracking-widest uppercase">{t('excellence_since_2010')}</span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg"
                >
                    {t('slogan').split('/')[0]} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary">
                        EALI.BI
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-4 max-w-2xl mx-auto text-xl text-slate-200 drop-shadow-md"
                >
                    {t('leading_excellence')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <a
                        href="#programs"
                        className="group px-8 py-4 rounded-lg bg-gradient-to-r from-brand-primary to-brand-dark hover:from-brand-dark hover:to-brand-primary text-white font-bold transition-all duration-300 shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-2 hover:gap-3"
                    >
                        {t('view_programs')} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#about"
                        className="px-8 py-4 rounded-lg border-2 border-brand-secondary/50 text-brand-light hover:bg-brand-secondary/10 hover:border-brand-secondary transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                    >
                        {t('learn_more')}
                    </a>
                </motion.div>
            </div>

            {/* Slider Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-brand-primary/50 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-brand-primary/50 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-brand-primary/50"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-brand-secondary w-8'
                            : 'bg-white/40 w-2 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-brand-secondary rounded-full animate-pulse" />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
