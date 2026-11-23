export interface JourneyEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: "Experience";
  description: string;
  bullets: string[];
  skills: string[];
  link?: string;
  linkLabel?: string;
}

export const journeyData: JourneyEntry[] = [
  {
    id: "internship-8box",
    period: "July 2025 – September 2025",
    title: "Backend Development Intern",
    organization: "8Box Solutions Inc.",
    location: "Metro Manila, Philippines",
    type: "Experience",
    description:
      "Assisted with backend application development tasks, database management, and API validation in a production engineering environment.",
    bullets: [
      "Assisted with backend development tasks and application data management during the internship.",
      "Worked with SQL queries and database operations to support data retrieval, updates, and CRUD-related tasks.",
      "Used Postman to send API requests, inspect responses, and help validate application functionality.",
      "Supported troubleshooting and verification of backend behavior using local development tools, including WAMP and Visual Studio Code.",
    ],
    skills: [
      "Backend Development",
      "MySQL",
      "SQL Queries",
      "CRUD Operations",
      "Postman",
      "WAMP",
      "VS Code",
      "API Testing",
    ],
  },
  {
    id: "internship-uip",
    period: "August 2024 – October 2024",
    title: "Frontend Development Intern",
    organization: "Unified Internship Program, Inc.",
    location: "Philippines",
    type: "Experience",
    description:
      "Contributed to the development and user interaction design of the UIP Attendance Tracker Website.",
    bullets: [
      "Contributed to the development of the UIP Attendance Tracker Website.",
      "Implemented frontend components for the Send-Report page based on the project requirements.",
      "Applied HTML, CSS, and JavaScript to support the page layout, interface behavior, and user interaction.",
    ],
    skills: [
      "Frontend Development",
      "HTML5",
      "CSS3",
      "JavaScript",
      "UI Implementation",
      "Responsive Layouts",
    ],
  },
];
