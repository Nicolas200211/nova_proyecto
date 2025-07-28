import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

type ExperienceType = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  logoUrl?: string;
  type: 'full-time' | 'part-time' | 'freelance' | 'internship';
  achievements?: string[];
};

interface ExperienceCardProps {
  experience: ExperienceType;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Función para obtener el color según el tipo de empleo
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'part-time':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'freelance':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'internship':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Función para obtener el ícono según el tipo de empleo
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full-time':
        return '💼';
      case 'part-time':
        return '🕒';
      case 'freelance':
        return '🚀';
      case 'internship':
        return '🎓';
      default:
        return '💼';
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    const line = lineRef.current;

    if (!card || !line) return;

    gsap.fromTo(card, {
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.fromTo(line, {
      height: 0
    }, {
      height: "100%",
      duration: 1,
      ease: "power2.out",
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
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 to-purple-600 h-full">
        <div ref={lineRef} className="w-full bg-gradient-to-b from-cyan-500 to-purple-600" />
      </div>

      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full z-10 top-8" />

      <motion.div
        ref={cardRef}
        className={`relative ${index % 2 === 0 ? 'pr-8 md:pr-16' : 'pl-8 md:pl-16'} ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <div className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
          {/* Encabezado */}
          <div className="flex items-start gap-4 mb-4">
            {experience.logoUrl ? (
              <img 
                src={experience.logoUrl} 
                alt={`${experience.company} logo`}
                className="w-12 h-12 rounded-lg object-contain bg-white/5 p-1"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">{getTypeIcon(experience.type)}</span>
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                  <p className="text-cyan-400 font-semibold">{experience.company}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${getTypeColor(experience.type)} border`}>
                  {experience.type.charAt(0).toUpperCase() + experience.type.slice(1).replace('-', ' ')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <span>📍 {experience.location}</span>
                <span>•</span>
                <span>{experience.period}</span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Responsabilidades:</h4>
            <ul className="space-y-2">
              {experience.description.slice(0, isExpanded ? experience.description.length : 2).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {experience.description.length > 2 && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 mt-1"
                >
                  {isExpanded ? 'Mostrar menos' : `Ver ${experience.description.length - 2} más`}
                  <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </button>
              )}
            </ul>
          </div>

          {/* Logros destacados */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Logros destacados:</h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-yellow-400 mt-1">★</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tecnologías */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Tecnologías utilizadas:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="text-xs bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const { experience } = portfolioData;

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <motion.p
          className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          My professional journey through innovative companies and challenging projects
        </motion.p>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to know more?
          </h3>
          <p className="text-gray-300 mb-8">
            Download my complete resume for detailed information
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-300">
            Download Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
}
