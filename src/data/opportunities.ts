export interface Opportunity {
  id: string;
  title: string;
  description: string;
  domain: string;
  requiredSkills: string[];
  minExperience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  teamSize: number;
  currentMembers: number;
  deadline?: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  type: 'hackathon' | 'startup' | 'research' | 'project';
}

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'AI-Powered Study Assistant Hackathon',
    description: 'Looking for passionate developers to build an AI-powered study assistant that helps students learn more effectively. We want to create a tool that can summarize notes, generate quizzes, and provide personalized learning paths.',
    domain: 'EdTech',
    requiredSkills: ['React', 'Python', 'Machine Learning', 'NLP'],
    minExperience: 'intermediate',
    teamSize: 4,
    currentMembers: 2,
    deadline: '2025-01-15',
    createdBy: { id: '1', name: 'Alex Johnson' },
    createdAt: '2024-12-20',
    type: 'hackathon',
  },
  {
    id: 'opp-2',
    title: 'FinTech Startup - Mobile Developer Needed',
    description: 'Join our fintech startup building the next generation of personal finance management. We are looking for a mobile developer experienced in React Native to help us launch our MVP.',
    domain: 'FinTech',
    requiredSkills: ['React Native', 'TypeScript', 'Redux', 'REST APIs'],
    minExperience: 'advanced',
    teamSize: 5,
    currentMembers: 3,
    createdBy: { id: '2', name: 'Sarah Chen' },
    createdAt: '2024-12-18',
    type: 'startup',
  },
  {
    id: 'opp-3',
    title: 'Climate Data Visualization Research',
    description: 'Collaborate on a research project analyzing climate data and creating interactive visualizations. Perfect for those interested in data science and environmental impact.',
    domain: 'Research',
    requiredSkills: ['Python', 'D3.js', 'Data Analysis', 'Statistics'],
    minExperience: 'beginner',
    teamSize: 3,
    currentMembers: 1,
    deadline: '2025-02-01',
    createdBy: { id: '3', name: 'Dr. Michael Roberts' },
    createdAt: '2024-12-15',
    type: 'research',
  },
  {
    id: 'opp-4',
    title: 'Open Source Healthcare Platform',
    description: 'Building an open-source platform to help healthcare providers manage patient data securely. Looking for developers passionate about healthcare and privacy.',
    domain: 'HealthTech',
    requiredSkills: ['Node.js', 'PostgreSQL', 'Docker', 'Security'],
    minExperience: 'intermediate',
    teamSize: 6,
    currentMembers: 4,
    createdBy: { id: '4', name: 'Emily Watson' },
    createdAt: '2024-12-22',
    type: 'project',
  },
  {
    id: 'opp-5',
    title: 'GameDev Jam - 2D Puzzle Game',
    description: 'Form a team for the upcoming Game Jam! We need artists, designers, and developers to create an innovative 2D puzzle game in 48 hours.',
    domain: 'GameDev',
    requiredSkills: ['Unity', 'C#', 'Pixel Art', 'Game Design'],
    minExperience: 'beginner',
    teamSize: 4,
    currentMembers: 1,
    deadline: '2025-01-20',
    createdBy: { id: '5', name: 'Jake Miller' },
    createdAt: '2024-12-23',
    type: 'hackathon',
  },
  {
    id: 'opp-6',
    title: 'E-commerce Analytics Dashboard',
    description: 'Looking for frontend developers to build a beautiful analytics dashboard for e-commerce businesses. Focus on data visualization and real-time updates.',
    domain: 'E-commerce',
    requiredSkills: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
    minExperience: 'intermediate',
    teamSize: 3,
    currentMembers: 1,
    createdBy: { id: '6', name: 'Lisa Park' },
    createdAt: '2024-12-24',
    type: 'project',
  },
];

export const domains = ['All', 'EdTech', 'FinTech', 'HealthTech', 'Research', 'GameDev', 'E-commerce'];

export const allSkills = [
  'React', 'React Native', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
  'Machine Learning', 'NLP', 'Data Analysis', 'D3.js', 'PostgreSQL', 'Docker',
  'Unity', 'C#', 'Pixel Art', 'Game Design', 'Chart.js', 'Tailwind CSS',
  'REST APIs', 'Redux', 'Security', 'Statistics', 'Figma', 'UI/UX Design'
];

export const experienceLevels = [
  { value: 'beginner', label: 'Beginner (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)' },
  { value: 'advanced', label: 'Advanced (3-5 years)' },
  { value: 'expert', label: 'Expert (5+ years)' },
];
