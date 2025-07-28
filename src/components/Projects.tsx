import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

interface ProjectCardProps {
  project: ProjectType;
  index?: number;
}

function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const card = cardRef.current;
    const img = card?.querySelector('img');
    
    if (!card || !img) return;

    // Animación de entrada
    gsap.fromTo(card, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Efecto de hover en la imagen
    const handleMouseEnter = () => {
      gsap.to(img, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      setIsHovered(false);
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
        {/* Project Image */}
        <div className="relative overflow-hidden h-48 md:h-56">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Hover overlay */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.85) 0%, rgba(147, 51, 234, 0.85) 100%)'
            }}
          >
            <div className="flex flex-wrap justify-center gap-3 p-4">
              <a
                href={project.link}
                className="px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              <a
                href={project.github}
                className="px-5 py-2.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.39-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code
              </a>
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>
          
          {/* Tecnologías */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-2.5 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="mb-4">
            <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
              {project.description}
            </p>
            {project.description.length > 150 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium mt-2 flex items-center"
              >
                {isExpanded ? 'Mostrar menos' : 'Leer más'}
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-700/50">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 text-xs font-medium rounded-md bg-slate-800/80 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-xs text-slate-400 flex items-center">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <a
                  href={project.link}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Ver demo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={project.github}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-purple-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Ver código"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.39-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reset styles
    gsap.set('.project-card', { 
      y: 80, 
      opacity: 0,
      scale: 0.95
    });

    // Animate title and subtitle
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo('.section-title', 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out" 
      }
    );

    tl.fromTo('.section-subtitle',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 0.8, 
        duration: 0.7, 
        ease: "power2.out" 
      },
      "-=0.4"
    );

    // Animate filter buttons
    tl.fromTo('.filter-btn',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    // Animate project cards with staggered delay
    tl.to('.project-card', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: "random"
      },
      ease: "back.out(1.4)",
      onComplete: () => {
        // Add hover effect after initial animation
        gsap.to('.project-card', {
          '--tw-shadow': '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          '--tw-shadow-colored': '0 10px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)',
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    }, "-=0.4");

    // Add hover effect
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [portfolioData.projects]);

  const projects = portfolioData.projects;
  const filteredProjects = projects; // For now, we'll show all projects

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="section-title text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <p className="section-subtitle text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Aquí puedes ver algunos de mis proyectos más recientes. Cada uno representa un desafío único y una oportunidad para aprender y crecer como desarrollador.
        </p>
        
        <motion.p 
          className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Explore my latest work in 3D development, interactive experiences, and cutting-edge web applications
        </motion.p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'web', 'mobile', 'fullstack'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-btn px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
                filter === filterType
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {filterType === 'all' 
                ? 'All Projects' 
                : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project: ProjectType, index: number) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Like what you see?
          </h3>
          <p className="text-gray-300 mb-8">
            Let's collaborate on your next project
          </p>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-300"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start a Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
