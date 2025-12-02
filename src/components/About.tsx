'use client'

import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const { isDarkMode } = useDarkMode()
  const { ref: aboutRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true)
    }
  }, [isIntersecting])

  const skills = [
    { name: 'Product & Frontend', technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Systems & Data', technologies: ['Node.js', 'Supabase', 'REST APIs', 'Automation'] },
    { name: 'Physiotherapy Practice', technologies: ['Orthopedic Rehab', 'Movement Analysis', 'Patient Education', 'NCD Management'] },
    { name: 'Digital Care Models', technologies: ['Hybrid Virtual Care', 'Virtual Assessments', 'Telehealth Triage', 'Healthy Aging Programs'] }
  ]

  return (
    <section ref={aboutRef} id="about" className={`pt-24 pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto border-2 border-transparent dark:border-emerald-500/20 rounded-2xl p-4 transition-all duration-300">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Get to know more about my background, skills, and passion for development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Image, Info, and Experience */}
            <div className={`space-y-6 transition-all duration-1000 delay-300 mt-8 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              {/* Profile Image */}
              <div className="relative">
                <div className={`w-full h-80 sm:h-96 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-emerald-100 to-teal-100'}`}>
                  <div className="text-center px-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl sm:text-4xl font-bold text-white">KL</span>
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kamile Lootawan</h3>
                    <p className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Physiotherapist & Entrepreneur</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Experience Stats */}
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Experience</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">3</div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">6+</div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Years as Physio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">15K-19K</div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Treatment Sessions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {/* My Story */}
              <div className={`p-6 rounded-xl min-h-[280px] flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Story</h3>
                <div className="flex-1 flex flex-col justify-center">
                  <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    I am a Physiotherapist, innovator, and lifelong learner driven by a deep passion for helping
                    people move, heal, and live fuller lives. My work blends clinical expertise with a
                    forward-thinking approach to technology, because I believe healthcare should be more—more
                    accessible, more personalized, more efficient, and more human.
                  </p>
                  <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    From early in my career, I saw the gaps that many patients face: long wait times, limited
                    follow-up, challenges accessing specialist care, and barriers created by geography, work
                    demands or finances. These experiences fueled my commitment to reimagining what Physiotherapy
                    can look like. Today, I focus on integrating digital tools, and hybrid care models to improve
                    outcomes, enhance patient experience, and increase access for underserved communities.
                  </p>
                  <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    My entrepreneurial journey is deeply rooted in this mission. I am building systems and services
                    that are not only clinically sound, but innovative, adaptable, and patient-centered. Whether
                    through virtual rehabilitation platforms, tech-enhanced movement analysis, or streamlined digital
                    workflows, my goal remains the same: to make high-quality physiotherapy available to more people,
                    in ways that truly support their daily lives.
                  </p>
                  <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Beyond my professional work, I am passionate about sustainable living, exploring nature, and
                    expressing myself creatively through art. I also care deeply about neurodivergence and hidden
                    disabilities—areas that shape how I advocate for inclusive, empathetic, and flexible healthcare
                    and work environments. These perspectives continually remind me that healing and wellbeing look
                    different for everyone, and that our systems must evolve to honour that.
                  </p>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    At the heart of everything I do is a belief in empowerment: empowering patients, empowering
                    practitioners, and empowering communities through better care, better tools, and better
                    understanding.
                  </p>
                </div>
              </div>

              {/* Skills & Technologies */}
              <div className={`p-6 rounded-xl min-h-[280px] flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills & Technologies</h3>
                <div className="flex-1 flex items-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <h4 className={`font-semibold mb-3 text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
