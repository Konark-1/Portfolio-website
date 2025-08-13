"use client";

import { 
  Database, 
  BarChart3, 
  FileSpreadsheet, 
  Code, 
  Brain, 
  TrendingUp,
  GraduationCap,
  Briefcase,
  Target,
  Award
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const skillsTimelineData = [
  {
    id: 1,
    title: "Education Foundation",
    date: "2020-2024",
    content: "Bachelor of Commerce (Honours) from Amity University. Developed strong foundation in business analytics, statistics, and financial modeling.",
    category: "Education",
    icon: GraduationCap,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Claims Analyst",
    date: "2023-2024",
    content: "Worked at Xceedance Consulting Pvt Ltd as Claims Analyst. Analyzed, modified, and updated critical data for insurance claims processing.",
    category: "Experience",
    icon: Briefcase,
    relatedIds: [1, 3, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Power BI Mastery",
    date: "2023-Present",
    content: "Creating compelling dashboards that transform raw data into visual stories, enabling stakeholders to make informed strategic decisions.",
    category: "Technical",
    icon: BarChart3,
    relatedIds: [2, 4, 5],
    status: "in-progress" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "SQL Expertise",
    date: "2023-Present",
    content: "Crafting complex queries to extract meaningful insights from large datasets, ensuring accurate and efficient data retrieval.",
    category: "Technical",
    icon: Database,
    relatedIds: [3, 5, 6],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 5,
    title: "Advanced Excel",
    date: "2022-Present",
    content: "Proficient in VLOOKUP, HLOOKUP, pivot tables, charts, and slicers for comprehensive data analysis and reporting.",
    category: "Technical",
    icon: FileSpreadsheet,
    relatedIds: [4, 6, 7],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 6,
    title: "Python Development",
    date: "2024-Present",
    content: "Developing data analysis solutions through intuitive 'vibe coding' - learning and experimenting to build analytical tools.",
    category: "Technical",
    icon: Code,
    relatedIds: [5, 7, 8],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 7,
    title: "AI Integration",
    date: "2024-Present",
    content: "Leveraging cutting-edge AI tools to accelerate analysis, identify patterns, and deliver insights faster than traditional methods.",
    category: "Innovation",
    icon: Brain,
    relatedIds: [6, 8, 9],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 8,
    title: "Business Analysis",
    date: "2023-Present",
    content: "Leveraging BCom Honours foundation to bridge the gap between data insights and business strategy.",
    category: "Business",
    icon: Target,
    relatedIds: [7, 9, 10],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 9,
    title: "Financial Analysis",
    date: "2023-Present",
    content: "Applying accounting and finance principles to evaluate business performance and support data-driven investment decisions.",
    category: "Business",
    icon: TrendingUp,
    relatedIds: [8, 10, 1],
    status: "in-progress" as const,
    energy: 82,
  },
  {
    id: 10,
    title: "Professional Growth",
    date: "2024-Present",
    content: "Currently advancing expertise through dedicated Data Analyst course at Ducat, Noida. Continuously learning and adapting.",
    category: "Development",
    icon: Award,
    relatedIds: [9, 1, 2],
    status: "in-progress" as const,
    energy: 95,
  },
];

export default function SkillsTimeline() {
  return (
    <div className="w-full">
      <RadialOrbitalTimeline timelineData={skillsTimelineData} />
    </div>
  );
}

