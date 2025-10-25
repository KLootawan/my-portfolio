# My Portfolio

A modern, responsive personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 💎 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📱 **Fully Responsive** design
- ⚡ **Fast Performance** with optimized images and code splitting
- 🌙 **Dark Mode** support
- ✨ **Smooth Animations** and transitions
- 📧 **Contact Form** with validation
- 🎯 **SEO Optimized**

## Sections

- **Hero Section** - Introduction with call-to-action buttons
- **About Me** - Personal story, skills, and experience
- **Projects** - Showcase of featured projects with filtering
- **Contact** - Contact form and social links
- **Footer** - Additional links and information

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information
Update the following files with your personal information:
- `src/components/Hero.tsx` - Name, title, and description
- `src/components/About.tsx` - Personal story and skills
- `src/components/Projects.tsx` - Your projects
- `src/components/Contact.tsx` - Contact information
- `src/app/layout.tsx` - SEO metadata

### Styling
- Modify `tailwind.config.ts` for custom colors and animations
- Update `src/app/globals.css` for global styles
- Customize component styles in individual component files

### Projects
Add your projects in `src/components/Projects.tsx` by updating the `projects` array with:
- Title and description
- Technologies used
- Live demo and GitHub links
- Featured status

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Emoji and custom SVG
- **Animations**: CSS transitions and Tailwind animations
- **Deployment**: Vercel (recommended)

## License

This project is open source and available under the [MIT License](LICENSE).
