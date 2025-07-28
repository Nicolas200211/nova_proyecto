import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    // Parallax effect for the image
    gsap.to(image, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Text animation
    gsap.fromTo(text.children, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const { personal } = portfolioData;

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-75 animate-pulse" />
              <img
                src={personal.avatar}
                alt={personal.name}
                className="relative w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-80 animate-bounce delay-500" />
            </div>
          </motion.div>

          {/* Text Section */}
          <div ref={textRef} className="text-white">
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {personal.bio}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: '📍', title: 'Location', value: personal.location },
                { 
                  icon: '📧', 
                  title: 'Email', 
                  value: personal.email,
                  isLink: true,
                  href: `mailto:${personal.email}`
                },
                { icon: '📱', title: 'Phone', value: personal.phone },
                { 
                  icon: '💼', 
                  title: 'LinkedIn', 
                  value: 'Ver perfil',
                  isLink: true,
                  href: personal.social.linkedin
                },
              ].map((detail, index: number) => (
                <motion.div
                  key={index}
                  className={`flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 ${
                    detail.isLink 
                      ? 'hover:bg-slate-800/50 hover:ring-1 hover:ring-cyan-400/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                      : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <span className="text-cyan-400 text-2xl">
                    {detail.icon}
                  </span>
                  <div>
                    <h4 className="text-gray-200 text-sm">{detail.title}</h4>
                    {detail.isLink ? (
                      <a 
                        href={detail.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-white">{detail.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-cyan-500/30"
              >
                Contact Me
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
