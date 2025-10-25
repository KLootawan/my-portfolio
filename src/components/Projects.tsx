'use client'

import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useDarkMode } from '@/contexts/DarkModeContext'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const { isDarkMode } = useDarkMode()
  const { ref: projectsRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true)
    }
  }, [isIntersecting])

  const projects: Project[] = [
    {
      id: 1,
      title: 'HealthTech Dashboard',
      description: 'A comprehensive healthcare dashboard for physiotherapists to track patient progress, manage appointments, and analyze treatment outcomes using modern web technologies.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'AI-Powered Exercise App',
      description: 'An intelligent exercise recommendation app that uses AI to suggest personalized rehabilitation exercises based on patient conditions and progress tracking.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Python', 'TensorFlow', 'OpenAI API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'PhysioConnect Platform',
      description: 'A patient-therapist communication platform with video consultations, exercise demonstrations, and progress monitoring features for remote physiotherapy sessions.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'WebRTC', 'MongoDB', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    }
  ]

  const filters = ['All', 'Featured', 'Web App', 'Mobile', 'AI/ML']

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Featured') return project.featured
    return project.technologies.some(tech => 
      activeFilter.toLowerCase().includes(tech.toLowerCase())
    )
  })

  return (
    <section ref={projectsRef} id="projects" className={`pt-24 pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Here are some of my recent projects that showcase my skills and experience
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl sm:text-6xl font-bold text-gray-400 dark:text-gray-500">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                      <a
                        href={project.liveUrl}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors duration-300"
                        aria-label="View Project"
                      >
                        <span className="text-lg">🔗</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-teal-500 hover:text-white transition-colors duration-300"
                        aria-label="View Source Code"
                      >
                        <span className="text-lg">📁</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <a
                      href={project.liveUrl}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      View Project
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex-1 border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 text-center py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
