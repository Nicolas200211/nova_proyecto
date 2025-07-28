import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

interface SkillType {
  name: string;
  level: number;
  icon: string;
}

interface SkillBarProps {
  skill: SkillType;
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const percent = percentRef.current;

    if (!bar || !percent) return;

    gsap.set(bar, { width: 0 });
    gsap.set(percent, { opacity: 0 });

    ScrollTrigger.create({
      trigger: bar,
      start: "top 80%",
      onEnter: () => {
        gsap.to(bar, {
          width: `${skill.level}%`,
          duration: 1.5,
          ease: "power3.out",
          delay: index * 0.1
        });
        gsap.to(percent, {
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1 + 0.5
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [skill.level, index]);

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-lg font-semibold text-white">{skill.name}</span>
        </div>
        <span ref={percentRef} className="text-cyan-400 font-semibold">
          {skill.level}%
        </span>
      </div>
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <div 
          ref={barRef}
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-pulse opacity-75" />
        </div>
      </div>
    </motion.div>
  );
}

interface SkillsCategory {
  category: string;
  items: SkillType[];
}

export default function Skills() {
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

  const { skills } = portfolioData as { skills: SkillsCategory[] };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 transform rotate-12 scale-150" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skill.name} 
                    skill={skill} 
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>
    </section>
  );
}
