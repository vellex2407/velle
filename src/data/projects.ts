export type ProjectCategory =
  | "All Projects"
  | "Full-Stack Applications"
  | "Academic Research"
  | "Database Systems"
  | "Hardware & IoT"
  | "Web Development";

export interface ProjectScreenshot {
  title: string;
  caption: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  type: string;
  category: ProjectCategory;
  secondaryCategories: ProjectCategory[];
  year: string;
  tagline: string;
  overview: string;
  problem: string;
  contribution: string;
  technologies: string[];
  features: string[];
  highlights: string[];
  image?: string;
  githubUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  isDeployed: boolean;
  screenshots: ProjectScreenshot[];
  architectureNotes?: string[];
  previewKind?: "foundit" | "dual-node" | "orale";
}

export const projectCategories: ProjectCategory[] = [
  "All Projects",
  "Full-Stack Applications",
  "Academic Research",
  "Database Systems",
  "Hardware & IoT",
  "Web Development"
];

export const projectsData: Project[] = [
  {
    id: "orale-dental-clinic",
    number: "01",
    title: "Orale’ Dental Clinic Booking Website",
    type: "Full-Stack Project",
    category: "Full-Stack Applications",
    secondaryCategories: ["Web Development"],
    year: "2024",
    tagline: "Responsive dental clinic web application with patient-facing and staff-facing workflows.",
    overview: "Designed and developed a responsive dental clinic web application coordinating patient appointments and staff administration, featuring appointment scheduling logic, patient account authentication, and relational MySQL database operations.",
    problem: "Dental clinics need an automated, conflict-free system to manage patient appointments, track dentist availability, handle operational hours, and preserve patient consultation records without scheduling clashes.",
    contribution: "Built frontend interfaces using React, TypeScript, Vite, and Tailwind CSS. Developed and integrated a Node.js and Express REST API with a MySQL database for patient accounts, profiles, appointment records, and clinic data.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express",
      "MySQL",
      "REST APIs"
    ],
    features: [
      "Patient-facing & Staff-facing Workflows: Dedicated operational dashboards for appointment booking and clinical management.",
      "Frontend Architecture: Built clean, responsive interfaces with React, TypeScript, Vite, and Tailwind CSS.",
      "Node.js & Express REST API: Connected backend endpoints to MySQL database for patient accounts, profiles, and appointment records.",
      "Authentication & Session Handling: Server-side validation for patient registration, login, session security, and appointment actions.",
      "Dynamic Appointment Logic: Intelligent scheduling engine checking dentist availability, working hours, time off, service durations, and buffers.",
      "Comprehensive Testing: Tested API endpoints, database connectivity, authentication behavior, and application workflows during development."
    ],
    highlights: [
      "Structured transactional SQL reservation queries preventing double-booking during peak reservation periods.",
      "Engineered flexible scheduling buffers that calculate dentist shift hours and procedure durations.",
      "Built clean TypeScript interfaces ensuring type safety between backend REST payloads and client view models."
    ],
    image: "/assets/orale/hero-dental.jpg",
    githubUrl: "https://github.com/novelle-deleon/orale-dental-clinic",
    demoUrl: "https://orale-frontend.onrender.com/",
    demoLabel: "Visit Live App",
    isDeployed: true,
    previewKind: "orale",
    screenshots: [
      {
        title: "Orale' Dental Studio — Booking Portal & Treatment Menu",
        caption: "Live Orale' Dental Clinic Booking System (Candaba, Pampanga) — patient slot finder, transparent treatment pricing, and dentist scheduling.",
        imageUrl: "/assets/orale/hero-dental.jpg"
      }
    ],
    architectureNotes: [
      "Frontend: React 19, TypeScript, Vite, Tailwind CSS with responsive layout architecture.",
      "Backend API: Node.js, Express REST API, server-side parameter validation.",
      "Database: MySQL relational schema storing patient accounts, profiles, appointments, and practitioner schedules."
    ]
  },
  {
    id: "dual-node-structural-health",
    number: "02",
    title: "Dual-Node Structural Health and Resonance Risk Alert System",
    type: "Computer Engineering Thesis Project",
    category: "Academic Research",
    secondaryCategories: ["Hardware & IoT"],
    year: "2024 – 2025",
    tagline: "Two-node vibration telemetry, sensor signal processing, and Wi-Fi structural response alerts.",
    overview: "An academic computer engineering capstone developing a synchronized two-node monitoring prototype for collecting seismic ground-motion and building-response acceleration data, computing structural response behavior to provide early resonance risk alerts.",
    problem: "Civil structures exposed to ground tremors can suffer critical damage when ground excitation frequencies synchronize with a building's resonant natural frequencies. Multi-point monitoring is essential to compare ground excitation against structural displacement.",
    contribution: "Developed the two-node acquisition architecture. Programmed Raspberry Pi nodes with Python for sensor data capture, implemented signal processing for structural analysis, and configured TCP/UDP network communication over Wi-Fi for multi-node telemetry.",
    technologies: [
      "Raspberry Pi",
      "Python",
      "Accelerometers",
      "Signal Processing",
      "TCP/UDP over Wi-Fi",
      "Local Dashboard"
    ],
    features: [
      "Two-Node Monitoring Concept: Synchronous collection of ground-motion excitation and building-response data.",
      "Raspberry Pi & Python Pipeline: Real-time sensor data acquisition, digital signal filtering, and local dashboard plotting.",
      "Wi-Fi Wireless Telemetry: Explored TCP/UDP communication over Wi-Fi for reliable data exchange between ground and building nodes.",
      "Resonance Risk Alert System: Integrated accelerometer-based monitoring algorithms to support structural response analysis and risk alerts.",
      "Local Engineering Display: Real-time visualization of oscillation waveforms and response thresholds."
    ],
    highlights: [
      "Engineered continuous sensor data acquisition without packet buffer drops over wireless network sockets.",
      "Computed frequency-domain transforms to isolate harmonic frequencies from raw accelerometer readouts.",
      "Validated prototype performance under simulated vibrational excitation in academic laboratory testing."
    ],
    image: "/assets/aistudio/Screenshot__125__0e4e4c5d.png",
    githubUrl: "https://github.com/novelle-deleon/dual-node-structural-health-monitoring",
    demoUrl: "",
    demoLabel: "Thesis Prototype & Technical Archive",
    isDeployed: false,
    previewKind: "dual-node",
    screenshots: [
      {
        title: "DOST-PHIVOLCS Earthquake Simulator Setup",
        caption: "Physical two-node deployment tested on the DOST-PHIVOLCS Earthquake Simulator — upper building response node and lower ground excitation node.",
        imageUrl: "/assets/aistudio/Screenshot__125__0e4e4c5d.png"
      },
      {
        title: "QuakeEscape Resonance Dashboard",
        caption: "Live two-node telemetry dashboard monitoring ground excitation frequency (Fg), building natural frequency (Fn), resonance risk percentage, and structural advisory indicator state.",
        imageUrl: "/assets/aistudio/Screenshot__123__8fc972ea.png"
      }
    ],
    architectureNotes: [
      "Hardware: Dual Raspberry Pi nodes with precision accelerometer sensors.",
      "Software: Python acquisition scripts, signal processing, and dynamic waveform graphing.",
      "Networking: Wi-Fi data exchange implementing socket protocols (TCP/UDP)."
    ]
  },
  {
    id: "foundit-lost-found",
    number: "03",
    title: "FoundIt! Lost & Found Hub",
    type: "Database Management Systems Academic Project",
    category: "Database Systems",
    secondaryCategories: ["Web Development"],
    year: "2023",
    tagline: "Web-based lost-and-found information system with item listings, claim submissions, and staff review.",
    overview: "Contributed to the development of a web-based lost-and-found information hub designed to simplify item recovery, organize system records, and manage claims through structured relational database workflows.",
    problem: "Campuses and public venues frequently misplace lost items due to unorganized manual logs, lack of proof-of-ownership verification, and delayed communication between discoverers, owners, and administrative staff.",
    contribution: "Co-developed the application workflows for item listings, claim submissions, and administrative review. Applied relational database management principles to design normalized table structures and manage system records.",
    technologies: [
      "Relational Database",
      "SQL",
      "HTML",
      "CSS",
      "JavaScript",
      "CRUD Workflows"
    ],
    features: [
      "Item Listing Catalog: Clear categorization and detailed attributes for lost and found articles.",
      "Claim Submission Workflow: Structured form enabling users to submit claims with descriptive identification and proof of ownership.",
      "Administrative Staff Review: Reviewer console to audit submitted claims, verify details, and approve returns.",
      "Database Records Management: Applied relational database concepts to maintain consistent item states and transaction logs.",
      "Status Tracking: Clear tracking of items from Reported, to Claimed, to Verified and Returned."
    ],
    highlights: [
      "Structured normalized database relations linking items, claim tickets, and user accounts with referential integrity.",
      "Designed clean form validation preventing incomplete or erroneous claim filings.",
      "Created intuitive filtering by category, date, and recovery status."
    ],
    image: "/assets/foundit-pup-seal.png",
    githubUrl: "https://github.com/novelle-deleon/foundit-lost-and-found",
    demoUrl: "https://found-it-self.vercel.app/dashboard",
    demoLabel: "Visit Live App",
    isDeployed: true,
    previewKind: "foundit",
    screenshots: [
      {
        title: "FoundIt! Activity Dashboard & Claim Review",
        caption: "Live FoundIt! Lost & Found Hub (PUP Maroon UI) — tracking lost item reports, ownership claim proofs, and approval statuses.",
        imageUrl: "/assets/foundit-pup-seal.png"
      }
    ],
    architectureNotes: [
      "Application Type: Database Management Systems (DBMS) Academic Capstone.",
      "Data Modeling: Relational SQL tables for Items, Users, Claims, and Status Audit Trails.",
      "Interface: Clean frontend forms with client-side validation and responsive grid layouts."
    ]
  },
  {
    id: "agropulse-plant-care",
    number: "04",
    title: "AgroPulse: Adaptive Plant Care System",
    type: "Microprocessors Academic Project",
    category: "Hardware & IoT",
    secondaryCategories: ["Academic Research"],
    year: "2023",
    tagline: "Sensor-based environmental monitoring, microcontroller programming, and adaptive plant care telemetry.",
    overview: "Developed an academic prototype concept for sensor-based plant health monitoring, applying microcontroller programming and sensor integration concepts to capture real-time environmental data.",
    problem: "Cultivating plants in controlled environments requires consistent monitoring of soil moisture, ambient humidity, and temperature. Irregular watering cycles and sudden environmental shifts often lead to plant deterioration without proactive detection.",
    contribution: "Engineered the microcontroller firmware, wired sensor conditioning circuits, and integrated moisture/temperature probes to read analog and digital signals, providing telemetry for automated plant care.",
    technologies: [
      "Arduino",
      "Microcontroller Programming",
      "Circuit Design",
      "Sensor Integration",
      "Actuators",
      "C/C++"
    ],
    features: [
      "Multi-Sensor Telemetry: Simultaneous capture of soil moisture levels, ambient temperature, and humidity readings.",
      "Microcontroller Firmware: Wrote efficient C/C++ control loops for sampling analog sensor voltages and debouncing inputs.",
      "Adaptive Care Logic: Programmed threshold checks to detect dehydrated soil states and trigger watering indicators.",
      "Sensor & Actuator Interfacing: Connected transducers, relays, and status LEDs on custom breadboard prototyping circuits.",
      "Data Feedback Loop: Calibrated sensor response curves against real soil moisture variations."
    ],
    highlights: [
      "Implemented analog calibration routines translating raw voltage readings into accurate percentage moisture levels.",
      "Designed low-power sleep cycles on the microcontroller to maximize energy efficiency during idle monitoring states.",
      "Integrated actuator relay triggers for automated moisture replenishment."
    ],
    githubUrl: "https://github.com/novelle-deleon/agropulse-plant-care",
    demoUrl: "",
    demoLabel: "Microprocessors Project Archive",
    isDeployed: false,
    screenshots: [],
    architectureNotes: [
      "Microcontroller: Arduino development board with ATmega architecture.",
      "Sensors: Capacitive soil moisture probe, DHT environmental temperature and humidity sensor.",
      "Software: Embedded C/C++ firmware with timed sampling loops and threshold comparator logic."
    ]
  }
];
