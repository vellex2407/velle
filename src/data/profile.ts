import heroForestCanopy from "../assets/images/hero_forest_canopy_1794495238386.jpg";

export interface ProfileData {
  name: string;
  preferredName: string;
  eyebrow: string;
  tagline: string;
  subTagline: string;
  bio: string;
  longBio: string[];
  title: string;
  degree: string;
  university: string;
  universityTimeline: string;
  highSchool: string;
  highSchoolHonors: string;
  highSchoolTimeline: string;
  location: string;
  phone: string;
  phoneFormatted: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  avatarImage: string;
  heroBackground: string;
  interests: {
    title: string;
    description: string;
  }[];
  softSkills: string[];
  philosophies: {
    title: string;
    quote: string;
    description: string;
  }[];
}

export const profileData: ProfileData = {
  name: "Novelle A. De Leon",
  preferredName: "Novelle",
  eyebrow: "COMPUTER ENGINEER · FULL STACK DEVELOPER",
  tagline: "Rooted in curiosity.\nBuilt with purpose.",
  subTagline: "Bridging reliable backend architecture with intuitive user experiences.",
  bio: "Computer Engineering graduate of the Polytechnic University of the Philippines with hands-on experience in web development, backend application support, database operations, and API testing. Builds web applications using React, TypeScript, Node.js, and MySQL, with project experience in authentication, appointment workflows, and responsive user interfaces.",
  longBio: [
    "I am a Computer Engineering graduate from the Polytechnic University of the Philippines (2022 – 2026) with specialized practical experience across full-stack web development, relational database engineering, and embedded telemetry systems.",
    "My engineering journey bridges software architecture and hardware discipline. During my internships at 8Box Solutions Inc. and Unified Internship Program, Inc., I focused on database operations, SQL query optimizations, Postman API validation, and crafting responsive user interface components.",
    "Whether architecting clinical scheduling systems with MySQL transactions, investigating dual-node vibration sensor telemetry on Raspberry Pi, or creating adaptive microcontroller monitors, I take pride in building reliable, testable, and thoughtfully crafted software."
  ],
  title: "Computer Engineering Graduate & Software Developer",
  degree: "Bachelor of Science in Computer Engineering",
  university: "Polytechnic University of the Philippines, Sta. Mesa, Manila",
  universityTimeline: "2022 – 2026",
  highSchool: "Baliwag Polytechnic College, Baliwag, Bulacan (ABM Strand)",
  highSchoolHonors: "Graduated With High Honors",
  highSchoolTimeline: "2020 – 2022",
  location: "Candaba, Pampanga, Philippines",
  phone: "0966 736 1323",
  phoneFormatted: "+63 966 736 1323",
  availability: "Open to Software Development Opportunities",
  email: "deleonnovelle@gmail.com",
  github: "https://github.com/novelle-deleon",
  linkedin: "https://www.linkedin.com/in/novelle-de-leon-607101319",
  resumeUrl: "/resume.pdf",
  avatarImage: "/assets/aistudio/1359c715-7aee-4429-8477-e0e34bf50f10_965258c3.jpg",
  heroBackground: heroForestCanopy,
  interests: [
    {
      title: "Backend & Database Operations",
      description: "Writing performant SQL queries, designing third-normal-form relational schemas in MySQL, and executing atomic CRUD transactions."
    },
    {
      title: "REST API Engineering & Testing",
      description: "Developing Express/Node.js endpoints, configuring route authentication, and validating payload contracts using Postman."
    },
    {
      title: "Full-Stack Web Development",
      description: "Building responsive, component-driven client applications using React, TypeScript, Vite, and Tailwind CSS."
    },
    {
      title: "Hardware & Microcontrollers",
      description: "Interfacing Arduino and Raspberry Pi with physical sensors, programming analog-to-digital converters, and circuit prototyping."
    },
    {
      title: "Networking & Distributed Telemetry",
      description: "Configuring TCP/UDP network communication, packet routing, and simulating enterprise topologies with Cisco Packet Tracer."
    },
    {
      title: "UI/UX Prototyping & Tools",
      description: "Creating wireframes and design mockups in Figma, collaborating through Git, and testing in local WAMP and VS Code environments."
    }
  ],
  softSkills: [
    "Communication",
    "Teamwork & Collaboration",
    "Problem-Solving",
    "Analytical Thinking",
    "Adaptability",
    "Time Management",
    "Attention to Detail",
    "Leadership",
    "Willingness to Learn"
  ],
  philosophies: [
    {
      title: "Reliability & Rigor",
      quote: "Quality software begins with verified contracts and robust data integrity.",
      description: "Whether testing API payloads in Postman or crafting transactional MySQL boundaries, reliability is the true foundation of user trust."
    },
    {
      title: "Hardware-Informed Software",
      quote: "Understanding the underlying hardware elevates high-level development.",
      description: "Studying microprocessor architectures and real-time sensor cycles brings discipline to memory usage, latency budgets, and system design."
    },
    {
      title: "Continuous Craftsmanship",
      quote: "Eager curiosity drives persistent learning.",
      description: "Constantly expanding proficiency across modern frontend tools, backend services, and collaborative software engineering workflows."
    }
  ]
};
