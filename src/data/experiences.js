const experiences = [
  {
    id: 1,
    company: "Stealth Startup",
    role: "ML Software Engineer",
    current: true,
    period: "Feb 2026 – Present",
    location: "San Francisco, California (Remote)",
    description:
      "Building the next-generation AI-native video infrastructures.",
    highlights: [],
  },
  {
    id: 2,
    company: "Siemens Technology",
    role: "Research Engineer (Contract)",
    period: "July 2025 – Feb 2026",
    location: "Bangalore, India",
    description:
      "Working in the Data & AI – Research (DAI-R), Collective Intelligence Systems (CIS) group on visual memory and cognitive architectures for intelligent agents.",
    highlights: [
      "Developing a dual-tier visual memory architecture (short-term and long-term) for AI agents",
      "Using CLIP embeddings, vector databases, and Neo4j-based temporal graph reasoning",
      "Designing intelligent memory decay mechanisms to support episodic and procedural memory",
      "Researching robotic foundation models and physical AI use cases integrated with visual memory",
    ],
  },
  {
    id: 3,
    company: "Siemens Technology",
    role: "Technical Intern – Data & AI",
    period: "May 2024 – Aug 2024, Jan 2025 – Jun 2025",
    location: "Bangalore, India",
    description:
      "Worked on real-time computer vision systems for industrial safety monitoring and video analytics.",
    highlights: [
      "Built a real-time object detection pipeline using YOLOX with FastAPI backend and React.js frontend",
      "Improved inference performance from ~2 FPS to ~26 FPS using DLStreamer",
      "Implemented multi-stream video processing with layered detection models",
      "Added user anonymisation using GStreamer for privacy-preserving video analytics",
      "Developed restricted zone detection with real-time alerts and a centralized violations dashboard",
    ],
  },
  {
    id: 4,
    company: "Jio Platforms Limited",
    role: "AI / Analytics Intern",
    period: "July 2023 – Sept 2023",
    location: "Mumbai, India",
    description:
      "Worked on applied machine learning and analytics for customer behavior and operational insights.",
    highlights: [
      "Analyzed and visualized customer churn data using Python-based data science tools",
      "Built a classification model achieving 90%+ accuracy to auto-categorize support tickets",
      "Developed data-driven APIs using FastAPI",
      "Implemented ML-based time-series baselining for anomaly detection",
    ],
  },
  {
    id: 5,
    company: "Google Developer Student Clubs (GDSC)",
    role: "Lead",
    period: "July 2023 – July 2024",
    location: "Jaypee Institute of Information Technology, Noida",
    description:
      "Led the official Google-backed student developer community, focusing on AI/ML education, hackathons, and inclusive technical culture.",
    highlights: [
      "Directed large-scale hackathons including Smart India Hackathon with 600+ participants",
      "Organized hands-on technical workshops attended by 400+ students",
      "Managed the core organizing team and end-to-end execution of events",
      "Mentored students on AI/ML projects, hackathons, and early career development",
    ],
  },
];

export default experiences;
