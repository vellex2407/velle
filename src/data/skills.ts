export interface SkillItem {
  name: string;
  category: string;
  summary: string;
  application: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  number: string;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    number: "01",
    description: "Core algorithms, low-level systems logic, and data processing.",
    skills: [
      {
        name: "Python",
        category: "Programming",
        summary: "Data processing, signal analysis, sensor acquisition, and telemetry scripts.",
        application: "Used on Raspberry Pi in thesis research for sensor data acquisition, signal processing, and local dashboard plotting."
      },
      {
        name: "C",
        category: "Programming",
        summary: "Low-level procedural programming, hardware registers, and deterministic execution.",
        application: "Applied in embedded coursework and microcontroller firmware routines for low-overhead sensor sampling."
      },
      {
        name: "C++",
        category: "Programming",
        summary: "Object-oriented systems architecture, hardware communication, and memory optimization.",
        application: "Utilized for complex hardware interface classes, Arduino libraries, and simulation models."
      }
    ]
  },
  {
    id: "frontend-development",
    name: "Frontend Development",
    number: "02",
    description: "Responsive, component-driven user interfaces built with modern web technologies.",
    skills: [
      {
        name: "React",
        category: "Frontend Development",
        summary: "Component lifecycle, hooks, state management, and declarative UI composition.",
        application: "Primary library used for the Orale' Dental Clinic booking portal and VELLE portfolio."
      },
      {
        name: "TypeScript",
        category: "Frontend Development",
        summary: "Static type safety, typed interfaces, and reliable code maintainability.",
        application: "Enforces type contracts between backend REST API models and frontend components in Orale' Dental Clinic."
      },
      {
        name: "Tailwind CSS",
        category: "Frontend Development",
        summary: "Utility-first design tokens, responsive breakpoints, and custom theme systems.",
        application: "Built responsive layouts and design tokens across all modern web projects."
      },
      {
        name: "JavaScript",
        category: "Frontend Development",
        summary: "Modern ESNext syntax, asynchronous DOM events, and client interaction behavior.",
        application: "Applied in UIP Attendance Tracker and FoundIt! Hub for dynamic layout and interaction behavior."
      },
      {
        name: "HTML5",
        category: "Frontend Development",
        summary: "Semantic document structuring, accessible forms, and SEO best practices.",
        application: "Built Send-Report pages at Unified Internship Program, Inc. and responsive forms for FoundIt! Hub."
      },
      {
        name: "CSS3",
        category: "Frontend Development",
        summary: "Modern flexbox, grid, media queries, animations, and fluid responsive styling.",
        application: "Crafted responsive page layouts and visual styling across internship and academic projects."
      },
      {
        name: "Laravel Blade",
        category: "Frontend Development",
        summary: "Server-side template inheritance, component composition, and MVC view rendering.",
        application: "Used during web development projects for structured, reusable view templates."
      }
    ]
  },
  {
    id: "backend-apis",
    name: "Backend Development & APIs",
    number: "03",
    description: "Relational database operations, REST endpoints, session handling, and API testing.",
    skills: [
      {
        name: "MySQL",
        category: "Backend Development & APIs",
        summary: "Relational database modeling, normalization, foreign keys, and ACID transactions.",
        application: "Architected patient accounts, clinic records, and appointment tables for Orale' Dental Clinic."
      },
      {
        name: "SQL Queries",
        category: "Backend Development & APIs",
        summary: "Complex joins, data retrieval, conditional updates, and transactional filtering.",
        application: "Wrote SQL queries at 8Box Solutions Inc. for data management, updates, and CRUD operations."
      },
      {
        name: "Relational Database Design",
        category: "Backend Development & APIs",
        summary: "Entity-relationship modeling, third-normal-form schema design, and referential integrity.",
        application: "Applied DBMS concepts in FoundIt! Hub and Orale' Dental Clinic for structured data integrity."
      },
      {
        name: "CRUD Operations",
        category: "Backend Development & APIs",
        summary: "Robust Create, Read, Update, and Delete lifecycles with error validation.",
        application: "Supported backend CRUD tasks at 8Box Solutions Inc. and managed claim tickets in FoundIt! Hub."
      },
      {
        name: "Node.js & Express",
        category: "Backend Development & APIs",
        summary: "Asynchronous backend runtime, REST routing, middleware, and request validation.",
        application: "Developed REST API endpoints connecting React clients to MySQL in the Orale' Dental Clinic application."
      },
      {
        name: "REST API Development",
        category: "Backend Development & APIs",
        summary: "HTTP contract specifications, endpoint security, JSON payloads, and status codes.",
        application: "Built and verified appointment scheduling endpoints and patient registration routes."
      }
    ]
  },
  {
    id: "development-tools",
    name: "Development Tools",
    number: "04",
    description: "Modern development workflows, version control, API testing, and UI design suites.",
    skills: [
      {
        name: "Postman",
        category: "Development Tools",
        summary: "Sending HTTP requests, inspecting response payloads, and validating endpoint behavior.",
        application: "Used extensively at 8Box Solutions Inc. and during Orale' Dental Clinic testing to validate API behavior."
      },
      {
        name: "Git",
        category: "Development Tools",
        summary: "Distributed version control, branch management, commit hygiene, and GitHub workflows.",
        application: "Manages source code, collaboration, and deployment pipelines across all software repositories."
      },
      {
        name: "Visual Studio Code",
        category: "Development Tools",
        summary: "Configured development environment, debugging, extensions, and code formatting.",
        application: "Primary code editor used for full-stack web development and backend troubleshooting."
      },
      {
        name: "WAMP",
        category: "Development Tools",
        summary: "Local Apache, MySQL, and PHP server stack for backend development and database testing.",
        application: "Supported troubleshooting and verification of backend behavior during 8Box Solutions Inc. internship."
      },
      {
        name: "Vite",
        category: "Development Tools",
        summary: "Next-generation frontend tooling, instant server start, and optimized production builds.",
        application: "Powers the build and bundling workflow for Orale' Dental Clinic and the VELLE portfolio."
      },
      {
        name: "Figma & Canva",
        category: "Development Tools",
        summary: "UI wireframing, component mockups, asset creation, and visual layout planning.",
        application: "Used for crafting user interface prototypes, wireframes, and digital presentation graphics."
      },
      {
        name: "Workspace & Office",
        category: "Development Tools",
        summary: "Google Workspace, Microsoft Office, and WordPress CMS management.",
        application: "Utilized for technical documentation, thesis reporting, data analysis, and content management."
      }
    ]
  },
  {
    id: "hardware-networking",
    name: "Hardware & Networking",
    number: "05",
    description: "Microcontroller systems, circuit prototyping, physical sensors, and network configurations.",
    skills: [
      {
        name: "Arduino",
        category: "Hardware & Networking",
        summary: "Microcontroller prototyping, firmware programming, I/O pin control, and PWM timing.",
        application: "Core platform for the AgroPulse Adaptive Plant Care System, reading sensor signals and driving indicators."
      },
      {
        name: "Microcontroller Programming",
        category: "Hardware & Networking",
        summary: "Embedded C/C++, interrupt handling, analog-to-digital conversion, and GPIO bus communication.",
        application: "Programmed sampling routines for environmental telemetry in AgroPulse and laboratory experiments."
      },
      {
        name: "Circuit Design",
        category: "Hardware & Networking",
        summary: "Schematic capture, breadboard prototyping, signal conditioning, and power decoupling.",
        application: "Designed sensor interface circuits connecting physical transducers to microcontrollers."
      },
      {
        name: "Sensor & Actuator Integration",
        category: "Hardware & Networking",
        summary: "Accelerometers, soil moisture probes, temperature/humidity sensors, relays, and indicators.",
        application: "Integrated physical transducers across the thesis structural health system and AgroPulse plant care project."
      },
      {
        name: "Cisco Packet Tracer",
        category: "Hardware & Networking",
        summary: "Network topology modeling, router and switch configuration, VLANs, and protocol simulation.",
        application: "Simulated campus network designs and verified routing protocols in computer networks coursework."
      },
      {
        name: "Raspberry Pi & Networking",
        category: "Hardware & Networking",
        summary: "Single-board computing, embedded Linux, and TCP/UDP communication over Wi-Fi.",
        application: "Configured dual-node wireless telemetry between ground and building nodes in thesis research."
      }
    ]
  }
];
