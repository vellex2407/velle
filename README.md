# VERDANT — Personal Portfolio

> "Rooted in curiosity. Built with purpose."

VERDANT is a personal portfolio website engineered for a Computer Engineering graduate from the Polytechnic University of the Philippines, specializing in full-stack web development, software engineering, and IoT embedded systems.

The visual direction combines an atmospheric dark forest identity with modern editorial typography and developer-centric project case studies.

---

## 🌲 Design System & Tokens

- **Primary Backgrounds**:
  - Deep Soil: `#171F19`
  - Forest Canopy: `#243D30`
- **Secondary Surfaces**:
  - Dark Moss: `#304A39`
  - Mossy Green: `#71866A`
  - Pale Jade: `#DCE8DA`
- **Supporting Accents**:
  - Muted Sage: `#A6B59D`
  - Warm Ivory: `#F4F1E8`
  - Soft Amber: `#D49A61`
- **Typography (3 Minimal Fonts)**:
  - Headings: `Cormorant Garamond` (editorial serif)
  - Body: `DM Sans`
  - Technical labels & metadata: `JetBrains Mono`

---

## 🛠️ Content Management & Personalization

All personal details, case studies, technical competencies, and career milestones are completely decoupled from presentation components and centralized in `src/data/`:

### 1. Personal Profile (`src/data/profile.ts`)
Edit this file to update:
- `name`: Your full name
- `title`: Professional headline
- `university`: Degree & institution (e.g. PUP Manila)
- `email`: Primary contact address
- `github` & `linkedin`: Social profile links
- `avatarImage`: Personal portrait file path
- `bio` & `longBio`: First-person narrative paragraphs
- `interests`: Core engineering domains

### 2. Adding & Editing Projects (`src/data/projects.ts`)
To add a new project, add an entry to the `projectsData` array in `src/data/projects.ts`:
```typescript
{
  id: "your-project-id",
  number: "05",
  title: "Project Title",
  type: "Full-Stack Web Application",
  category: "Full-Stack Applications",
  secondaryCategories: ["Web Development"],
  year: "2025",
  tagline: "Brief 1-sentence punchy summary.",
  overview: "Comprehensive explanation of the system.",
  problem: "The technical or operational problem solved.",
  contribution: "Your specific architectural contribution.",
  technologies: ["React", "TypeScript", "Node.js", "MySQL"],
  features: ["Feature 1", "Feature 2", "Feature 3"],
  highlights: ["Engineering highlight 1", "Engineering highlight 2"],
  image: "/src/assets/images/your_preview.jpg",
  githubUrl: "https://github.com/...",
  demoUrl: "https://...",
  isDeployed: true,
  screenshots: [...]
}
```

### 3. Updating Technical Skills (`src/data/skills.ts`)
The 5 engineering pillars are structured in `skillCategories`:
1. `Programming` (Python, C, C++)
2. `Web Development` (HTML, CSS, JavaScript, Tailwind CSS, Laravel Blade, Node.js)
3. `Database & Backend` (MySQL, SQL, Database Design, CRUD, REST APIs, Postman)
4. `Networking & Systems` (Cisco Packet Tracer, Networking Fundamentals, System Administration)
5. `Hardware & IoT` (Raspberry Pi, Arduino, Microcontrollers, Circuit Design, Sensors, AutoCAD)

### 4. Updating Timeline & Experience (`src/data/journey.ts`)
Add or modify career and academic entries in `journeyData`.

---

## 🚀 Building & Deploying to Vercel

The application is built on Vite + React + TypeScript and is ready for Vercel deployment with zero configuration.

### Local Development:
```bash
npm install
npm run dev
```

### Production Build:
```bash
npm run build
```

### Vercel Deployment Instructions:
1. Push this repository to your GitHub account (`git push origin main`).
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New Project"** and select your GitHub repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**. Your portfolio is live in under 60 seconds!
