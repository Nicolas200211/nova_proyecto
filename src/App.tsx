import React, { useEffect } from "react"
import "./App.css"
import Navigation from "./components/Navigation"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const App: React.FC = () => {
  useEffect(() => {
    // Smooth scrolling and scroll behavior
    gsap.registerPlugin(ScrollTrigger)

    // Custom cursor
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #00ffff, #ff00ff);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(cursor)

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
      cursor.style.opacity = '0.7'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeChild(cursor)
    }
  }, [])

  return (
    <div className="App bg-slate-900 text-white overflow-x-hidden">
      <Navigation />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nicolas. Crafted with ❤️ using React Three Fiber & GSAP
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
