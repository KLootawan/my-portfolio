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
  buttonText?: string
  videoUrl?: string
}

interface Certificate {
  id: number
  title: string
  image: string
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Featured')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false)
  const [zoomedCertificate, setZoomedCertificate] = useState<Certificate | null>(null)
  const { isDarkMode } = useDarkMode()

  // Add your certificates: put image files in public/certificates/, then add entries below.
  // Image path: /certificates/your-filename.jpg (PNG, WebP also work).
  const certificates: Certificate[] = [
    { id: 1, title: 'Strength and Conditioning for Physios (2023)', image: '/certificates/cert-1.png' },
    { id: 2, title: 'IASTM Certification', image: '/certificates/cert-2.png' },
    { id: 3, title: 'Low Back Pain (2023)', image: '/certificates/cert-3.png' },
    { id: 4, title: 'Triple Threats to Aging (2025)', image: '/certificates/cert-4.png' },
    { id: 5, title: 'PT Practice Certificate', image: '/certificates/cert-5.png' },
    { id: 6, title: 'IDF Diabetes Educators Course', image: '/certificates/cert-6.png' },
  ]
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
      title: 'Quick Stress Check',
      description: 'A wellness tool with quick grounding activities designed to help with stress awareness and emotional regulation.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      buttonText: 'In Progress'
    },
    {
      id: 2,
      title: 'AI Assisted Diabetes Risk Screening',
      description: 'This tool promotes early detection and prevention of diabetes through accessible online screening. It supports individuals in recognizing risk factors early and encourages healthy lifestyle changes.',
      image: '/api/placeholder/400/300',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
      liveUrl: 'https://innspire-pt-diabetes-risk-screening.vercel.app',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Innspire Health',
      description: 'A virtual platform to allow faster access to Physiotherapy within 24-48 hrs using Physio-led rehabilitation plans.',
      image: '/api/placeholder/400/300',
      technologies: [
        'Next.js',
        'React (App Router)',
        'TypeScript',
        'Tailwind CSS',
        'TensorFlow.js',
        'Pose Detection (MoveNet)',
        'face-api.js',
        'Supabase (Auth + Storage)',
        'getUserMedia',
        'MediaRecorder',
        'Canvas (captureStream)',
        'ESLint'
      ],
      liveUrl: 'https://innspirehealth.vercel.app/welcome',
      githubUrl: '#',
      featured: true,
      buttonText: 'In Progress',
      videoUrl: 'https://www.loom.com/embed/your-video-id' // Replace with your Loom embed URL (from Share > Embed)
    },
    {
      id: 4,
      title: 'Digital Credentials',
      description: 'A portfolio section where my digital credentials, certificates, and badges are displayed and can be viewed in one place.',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: '#credentials',
      githubUrl: '#',
      featured: true,
      buttonText: 'View Credentials'
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
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
                        rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors duration-300"
                        aria-label="Try Now"
                      >
                        <span className="text-lg">🔗</span>
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
                  <div className={`flex ${project.videoUrl ? 'flex-col sm:flex-row gap-2 sm:gap-4' : ''}`}>
                    {project.id === 4 ? (
                      <button
                        onClick={() => setCredentialsModalOpen(true)}
                        className={`${project.videoUrl ? 'flex-1' : 'w-full'} bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5`}
                      >
                        {project.buttonText || 'View Credentials'}
                      </button>
                    ) : (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
                        rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`${project.videoUrl ? 'flex-1' : 'w-full'} bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5`}
                      >
                        {project.buttonText || 'Try Now'}
                      </a>
                    )}
                    {project.videoUrl &&
                      (project.id === 3 ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 text-center py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                        >
                          View Project
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedVideo(project.videoUrl || null)}
                          className="flex-1 border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 py-2 px-4 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                        >
                          View Project
                        </button>
                      ))}
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

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-900 dark:bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo}
                title="Project Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {credentialsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => {
            setZoomedCertificate(null)
            setCredentialsModalOpen(false)
          }}
        >
          <div
            className={`relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {zoomedCertificate ? zoomedCertificate.title : 'My Digital Credentials'}
              </h3>
              <button
                onClick={() => {
                  if (zoomedCertificate) setZoomedCertificate(null)
                  else {
                    setCredentialsModalOpen(false)
                    setZoomedCertificate(null)
                  }
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label={zoomedCertificate ? 'Back to wall' : 'Close'}
              >
                {zoomedCertificate ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              {zoomedCertificate ? (
                /* Zoomed certificate view */
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Click outside or use the back arrow to return to the wall</p>
                  <div className="relative w-full max-w-2xl rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
                    <img
                      src={zoomedCertificate.image}
                      alt={zoomedCertificate.title}
                      className="w-full h-auto object-contain max-h-[70vh]"
                    />
                  </div>
                </div>
              ) : (
                /* Virtual wall of credentials - scrollable grid */
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                    Scroll to browse, or click a certificate to zoom in
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh] pr-2">
                    {certificates.map((cert) => (
                      <button
                        key={cert.id}
                        onClick={() => setZoomedCertificate(cert)}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-700 dark:to-gray-600 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                          <span className="text-white text-sm font-medium truncate block">{cert.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
