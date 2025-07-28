import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';


gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  index: number;
  isActive: boolean;
}

function TestimonialCard({ testimonial, index, isActive }: TestimonialCardProps) {
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
        {/* Testimonial Content */}
        <div className="mb-6">
          <svg className="h-12 w-12 text-cyan-400 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.552-7.104 6.624-9.024L25.864 4z" />
          </svg>
          <p className="text-gray-300 text-lg italic mb-6">"{testimonial.content}"</p>
        </div>
        
        {/* Author Info */}
        <div className="mt-auto flex items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-0.5">
            <div className="h-full w-full rounded-full bg-slate-800 p-0.5">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
            <p className="text-cyan-400 text-sm">{testimonial.role} at {testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
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

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (testimonialsData.length || 1));
    }, 5000);

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Mock testimonials data - replace with your actual data
  const testimonialsData: TestimonialItem[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp",
      content: "Working with this team was an absolute pleasure. Their attention to detail and creative solutions helped us achieve our goals faster than we expected.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateX",
      content: "The level of professionalism and expertise brought to our project was outstanding. We saw immediate results after implementing their solutions.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Marketing Director",
      company: "BrandVision",
      content: "Exceptional work! They understood our vision and delivered beyond our expectations. Looking forward to future collaborations.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

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
          Testimonials
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          What people say about working with me
        </motion.p>
        
        <div className="max-w-6xl mx-auto">
          {/* Testimonials display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isActive={index === activeIndex}
              />
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-4 mb-12">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
