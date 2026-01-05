import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Organization from '../sections/Organization';
import Programs from '../sections/Programs';
import Partnerships from '../sections/Partnerships';
import News from '../sections/News';
import Tenders from '../sections/Tenders';
import Contact from '../sections/Contact';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Organization />
            <Programs />
            <Partnerships />
            <News />
            <Tenders />
            <Contact />
        </>
    );
};

export default Home;
