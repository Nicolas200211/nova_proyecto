import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  logoUrl: string; // URL del logotipo de la institución
}

interface EducationCardProps {
  education: EducationItem;
  index: number;
  isActive: boolean;
}

function EducationCard({ education, index, isActive }: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card, {
      y: 50,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.2,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 ${
        isActive ? 'ring-2 ring-cyan-500' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Logo y título */}
        <div className="flex items-center mb-4">
          {education.logoUrl && (
            <div className="w-12 h-12 rounded-lg bg-white/5 p-2 mr-4 flex-shrink-0">
              <img 
                src={education.logoUrl} 
                alt={`${education.institution} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white">{education.degree}</h3>
            <p className="text-cyan-400 font-medium">{education.institution}</p>
          </div>
        </div>
        
        {/* Period */}
        <p className="text-gray-400 text-sm mb-4">{education.period}</p>
        
        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed mb-4 flex-grow">
          {education.description}
        </p>
        
        {/* Decorative element */}
        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('h2'), {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Auto-rotate education items
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % portfolioData.education.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const { education } = portfolioData;

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          My academic journey and continuous learning path
        </motion.p>
        
        <div className="max-w-6xl mx-auto">
          {/* Education items display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {education.map((edu, index) => (
              <EducationCard
                key={edu.id}
                education={edu}
                index={index}
                isActive={index === activeIndex}
              />
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-4 mb-12">
            {education.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`View education ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-gray-300">Happy Clients</div>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-300">Projects Done</div>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
              <div className="text-gray-300">Years Experience</div>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-gray-300">Awards Won</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
