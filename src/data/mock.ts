// Types for the portfolio data
type SocialLinks = {
  linkedin: string
  github: string
  twitter: string
  dribbble: string
}

type PersonalInfo = {
  name: string
  title: string
  subtitle: string
  bio: string
  location: string
  email: string
  phone: string
  website: string
  avatar: string
  social: SocialLinks
}

type SkillItem = {
  name: string
  level: number
  icon: string
}

type SkillCategory = {
  category: string
  items: SkillItem[]
}

type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  link: string
  github: string
}

type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'full-time' | 'part-time' | 'freelance' | 'internship';
  description: string[];
  technologies: string[];
  achievements?: string[];
  logoUrl?: string;
}

type EducationItem = {
  id: number
  degree: string
  institution: string
  period: string
  description: string
  logoUrl: string
}

type PortfolioData = {
  personal: PersonalInfo
  skills: SkillCategory[]
  projects: Project[]
  experience: ExperienceItem[]
  education: EducationItem[]
}

// Mock data for the futuristic portfolio
export const portfolioData: PortfolioData = {
  personal: {
    name: "Mariano Nicolás Reymundez Retamozo",
    title: "Ingeniero de Sistemas",
    subtitle: "Desarrollador Full Stack",
    bio: "Apasionado desarrollador Full Stack con experiencia en el desarrollo de aplicaciones web modernas y sistemas escalables. Me especializo en crear soluciones tecnológicas innovadoras y de alto rendimiento.",
    location: "Ayacucho, Perú",
    email: "nico_e123@outlook.com",
    phone: "+51 919 733 906",
    website: "https://67fd2a3c09dbc5d7a533f6b8--effulgent-daffodil-56ea38.netlify.app/",
    avatar: "/src/assets/photo.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/mariano-nicolas-reymundez-retamozo-15b57a265/",
      github: "https://github.com/Nicolas200211",
      twitter: "#",
      dribbble: "#"
    }
  },
  
  skills: [
    {
      category: "Frontend Development",
      items: [
        { name: "React", level: 90, icon: "⚛️" },
        { name: "Angular", level: 50, icon: "🅰️" },
        { name: "Next.js", level: 70, icon: "🔼" },
        { name: "TypeScript", level: 90, icon: "📝" },
        { name: "JavaScript", level: 90, icon: "📜" },
        { name: "HTML5", level: 95, icon: "🔡" },
        { name: "CSS3", level: 93, icon: "🎨" },
        { name: "Tailwind", level: 90, icon: "🎯" },
        { name: "React Native", level: 70, icon: "📱" }
      ]
    },
    {
      category: "Backend Development",
      items: [
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Express", level: 83, icon: "🚀" },
        { name: "PHP", level: 80, icon: "🐘" },
        { name: "Laravel", level: 62, icon: "🔧" },
        { name: "MySQL", level: 88, icon: "💾" },
        { name: "PostgreSQL", level: 85, icon: "🐘" },
        { name: "SQL Server", level: 80, icon: "💾" },
        { name: "RESTful APIs", level: 88, icon: "🔌" },
        { name: "GraphQL", level: 60, icon: "📊" }
      ]
    },
    {
      category: "Testing & DevOps",
      items: [
        { name: "Jest", level: 65, icon: "🧪" },
        { name: "Vitest", level: 50, icon: "⚡" },
        { name: "Testing Library", level: 75, icon: "🔍" },
        { name: "Cypress", level: 52, icon: "🔄" },
        { name: "Postman", level: 78, icon: "📬" },
        { name: "Git", level: 80, icon: "🔀" },
        { name: "GitHub", level: 80, icon: "🐙" },
        { name: "CI/CD", level: 50, icon: "🔄" },
        { name: "Docker", level: 75, icon: "🐳" }
      ]
    }
  ],
  
  projects: [
    {
      id: 1,
      title: "Plent Agriculture",
      description: "Sistema de monitoreo agrícola que permite a los agricultores realizar un seguimiento y gestión de sus cultivos de manera eficiente.",
      tags: ["React", "Node.js", "MongoDB", "IoT"],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format", // Imagen de agricultura
      link: "https://plant.cjtech.me/",
      github: "https://github.com/Nicolas200211/plent-agriculture"
    },
    {
      id: 2,
      title: "Gestión Académica",
      description: "Sistema académico completo con autenticación, gestión de asignaturas, estudiantes y control de asistencia.",
      tags: ["React", "Node.js", "MongoDB", "JWT"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format", // Imagen de gestión académica
      link: "#",
      github: "https://github.com/Nicolas200211/front-elp1"
    },
    {
      id: 3,
      title: "Aprendo Ayacucho",
      description: "Aplicación móvil educativa desarrollada en React Native para facilitar el aprendizaje en la región de Ayacucho.",
      tags: ["React Native", "JavaScript", "Mobile"],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format", // Imagen de educación
      link: "#",
      github: "https://github.com/Nicolas200211/front-end-aprendo-ayacucho1"
    },
    {
      id: 4,
      title: "Horarios ELP",
      description: "Sistema de planificación de horarios para docentes con interfaz intuitiva y funcionalidades avanzadas de programación.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format", // Imagen de horario escolar
      link: "#",
      github: "https://github.com/Nicolas200211/frontend_horarios"
    },
    {
      id: 5,
      title: "Entidad Prestamista",
      description: "Sistema financiero para la gestión de préstamos con seguimiento de pagos, intereses y clientes.",
      tags: ["React", "Laravel", "MySQL", "REST API"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format", // Imagen de finanzas
      link: "#",
      github: "https://github.com/Nicolas200211/proyecto-financiero-frontend"
    },
    {
      id: 6,
      title: "Turismo Ayacucho",
      description: "Página web de promoción turística de la región de Ayacucho, mostrando sus principales atractivos turísticos.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive"],
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&auto=format", // Imagen de turismo en Ayacucho
      link: "#",
      github: "https://github.com/Nicolas200211/repo-frontend-turismo"
    }
  ],
  
  experience: [
    {
      id: 1,
      role: "Desarrollador Full Stack",
      company: "JuarezCorporation",
      location: "Ayacucho, Perú (Remoto)",
      period: "Enero 2024 - Presente",
      type: "full-time",
      description: [
        "Desarrollo de aplicaciones web completas utilizando React, Next.js y Tailwind CSS para el frontend.",
        "Implementación de APIs RESTful con Laravel y MySQL para el backend.",
        "Diseño e implementación de bases de datos relacionales y no relacionales.",
        "Colaboración en el diseño de arquitecturas escalables y mantenibles.",
        "Implementación de autenticación y autorización segura.",
        "Optimización del rendimiento de aplicaciones web."
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Laravel", "MySQL", "RESTful APIs", "Git", "Docker"],
      achievements: [
        "Lideré el rediseño de la interfaz de usuario, mejorando la experiencia del usuario en un 40%.",
        "Implementé un sistema de caché que redujo los tiempos de carga en un 60%.",
        "Automaticé procesos manuales, ahorrando más de 20 horas de trabajo semanales."
      ],
      logoUrl: "https://juarextech.com/assets/img/logo.png"
    },
    {
      id: 2,
      role: "Docente de Desarrollo Web",
      company: "Colegio Cybernet",
      location: "Ayacucho, Perú",
      period: "Marzo 2023 - Diciembre 2024",
      type: "part-time",
      description: [
        "Diseño e implementación de planes de estudio para desarrollo web.",
        "Enseñanza de HTML5, CSS3 y JavaScript a estudiantes de nivel secundario.",
        "Desarrollo de proyectos prácticos para reforzar el aprendizaje.",
        "Mentoría personalizada para estudiantes con diferentes niveles de habilidad.",
        "Organización de talleres de programación y hackathons."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git", "Bootstrap"],
      achievements: [
        "El 90% de mis estudiantes aprobaron con éxito el curso.",
        "Varios estudiantes ganaron competencias locales de programación.",
        "Implementé un sistema de aprendizaje basado en proyectos que mejoró la participación."
      ],
      logoUrl: "https://static.wixstatic.com/media/bb5ba9_1b274438e62a44228ff9023f9a34ae3d~mv2.png"
    },
    {
      id: 3,
      role: "Desarrollador Frontend",
      company: "La Pontificia",
      location: "Ayacucho, Perú",
      period: "Enero 2023 - Diciembre 2023",
      type: "full-time",
      description: [
        "Desarrollo de interfaces de usuario con React.js y estilos con CSS moderno.",
        "Colaboración con diseñadores para implementar diseños responsivos.",
        "Integración con APIs RESTful para consumo de datos.",
        "Mantenimiento y mejora de código existente.",
        "Participación en revisiones de código y pair programming.",
        "Implementación de pruebas unitarias y de integración."
      ],
      technologies: ["React.js", "JavaScript", "CSS3", "Git", "Jest", "REST APIs"],
      achievements: [
        "Refactoricé componentes clave, mejorando el rendimiento en un 30%.",
        "Implementé un sistema de temas que redujo el tiempo de desarrollo de nuevas pantallas.",
        "Fui reconocido como empleado destacado del trimestre."
      ],
      logoUrl: "https://lapontificia.hiringroom.com/data/accounts/lapontificia/microsite/458c700c9449744142441cd562947480.jpg"
    }
  ],
  
  education: [
    {
      id: 1,
      degree: "Ingeniería de Sistemas",
      institution: "Escuela Superior La Pontificia",
      period: "2021 - 2025",
      description: "Formación en desarrollo de software, bases de datos, redes y gestión de proyectos tecnológicos.",
      logoUrl: "https://pontisis.elp.edu.pe/logo_uni"
    },
    {
      id: 2,
      degree: "Especialización Avanzada Full Stack",
      institution: "Platzi",
      period: "2024 - actualidad",
      description: "Enfoque en desarrollo web full stack con tecnologías modernas.",
      logoUrl: "https://yt3.googleusercontent.com/jSVrx7B9DIXfx7-Mh16nzdqXcBFoa-FV3fgItxePwv17Dst-U-JuC3_TR6rLq0quRjJPpHy5RQ=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: 3,
      degree: "Desarrollo Web Frontend/Backend",
      institution: "Alura Latam",
      period: "2023 - 2025",
      description: "Programa intensivo de desarrollo web full stack.",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEX-HY8btG6ccSdB_3oUIOg9QO1tRKnliIQ&s"
    },
    {
      id: 4,
      degree: "Inglés (Básico/Intermedio)",
      institution: "Platzi",
      period: "2024 - actualidad",
      description: "Estudios de inglés para desarrollo profesional.",
      logoUrl: "https://yt3.googleusercontent.com/jSVrx7B9DIXfx7-Mh16nzdqXcBFoa-FV3fgItxePwv17Dst-U-JuC3_TR6rLq0quRjJPpHy5RQ=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: 5,
      degree: "Educación Secundaria",
      institution: "Colegio Mariscal Cáceres",
      logoUrl: "https://www.siempremc.edu.pe/img/iconomc.png",
      period: "2013 - 2018",
      description: "Educación secundaria completa."
    }
  ]
}

export default portfolioData
