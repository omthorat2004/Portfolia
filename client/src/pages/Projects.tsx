import { FaSearch } from 'react-icons/fa';
import ProjectsPageHeader from '../features/projects/components/ProjectsPageHeader';
import ProjectCard from '../features/projects/components/ProjectCard';
import { useEffect, useRef, useState } from 'react';

export const projects = [
    {
        title: "Smart Portfolio Builder",
        description: "Create and share professional developer portfolios with ease.",
        techStack: ["React", "Node.js", "MongoDB"],
        authorName: "Aditi Sharma",
        github: "https://github.com/aditi/smart-portfolio",
        demo: "https://smartportfolio.dev",
    },
    {
        title: "Campus Event Tracker",
        description: "Manage and discover college events with reminders and RSVPs.",
        techStack: ["Next.js", "Express", "PostgreSQL"],
        authorName: "Rohan Gupta",
        github: "https://github.com/rohan/campus-events",
        demo: "https://campusevents.app",
    },
    {
        title: "AI Chat Assistant",
        description: "An intelligent chatbot that answers questions contextually.",
        techStack: ["React", "Python", "Flask"],
        authorName: "Meera Joshi",
        github: "https://github.com/meera/ai-chat",
        demo: "https://aichat.app",
    },
    {
        title: "E-Commerce Store",
        description: "A complete e-commerce platform with cart and checkout.",
        techStack: ["React", "Node.js", "MySQL"],
        authorName: "Karan Patel",
        github: "https://github.com/karan/ecommerce-store",
        demo: "https://shopnow.app",
    },
    {
        title: "Task Manager Pro",
        description: "Organize tasks with priorities, deadlines, and labels.",
        techStack: ["Angular", "Firebase"],
        authorName: "Sneha Reddy",
        github: "https://github.com/sneha/task-manager",
        demo: "https://taskmanager.pro",
    },
    {
        title: "Recipe Finder",
        description: "Find recipes based on ingredients you already have.",
        techStack: ["React Native", "Node.js", "MongoDB"],
        authorName: "Vikas Singh",
        github: "https://github.com/vikas/recipe-finder",
        demo: "https://recipefinder.app",
    },
    {
        title: "Budget Tracker",
        description: "Track expenses and income with clean visual charts.",
        techStack: ["Next.js", "Node.js", "Chart.js"],
        authorName: "Priya Nair",
        github: "https://github.com/priya/budget-tracker",
        demo: "https://budgetwise.app",
    },
    {
        title: "Study Planner",
        description: "Plan study sessions and track daily learning goals.",
        techStack: ["Svelte", "Go", "SQLite"],
        authorName: "Ankit Verma",
        github: "https://github.com/ankit/study-planner",
        demo: "https://studyplanner.dev",
    },
    {
        title: "Fitness Buddy",
        description: "Track workouts, calories, and fitness goals easily.",
        techStack: ["Flutter", "Firebase"],
        authorName: "Nisha Kulkarni",
        github: "https://github.com/nisha/fitness-buddy",
        demo: "https://fitnessbuddy.app",
    },
    {
        title: "Travel Journal",
        description: "Document your trips with photos, notes, and locations.",
        techStack: ["React", "Node.js", "PostgreSQL"],
        authorName: "Yash Desai",
        github: "https://github.com/yash/travel-journal",
        demo: "https://traveljournal.app",
    },
    {
        title: "Smart Portfolio Builder",
        description: "Create and share professional developer portfolios with ease.",
        techStack: ["React", "Node.js", "MongoDB"],
        authorName: "Aditi Sharma",
        github: "https://github.com/aditi/smart-portfolio",
        demo: "https://smartportfolio.dev",
    },
    {
        title: "Campus Event Tracker",
        description: "Manage and discover college events with reminders and RSVPs.",
        techStack: ["Next.js", "Express", "PostgreSQL"],
        authorName: "Rohan Gupta",
        github: "https://github.com/rohan/campus-events",
        demo: "https://campusevents.app",
    },
    {
        title: "AI Chat Assistant",
        description: "An intelligent chatbot that answers questions contextually.",
        techStack: ["React", "Python", "Flask"],
        authorName: "Meera Joshi",
        github: "https://github.com/meera/ai-chat",
        demo: "https://aichat.app",
    },
    {
        title: "E-Commerce Store",
        description: "A complete e-commerce platform with cart and checkout.",
        techStack: ["React", "Node.js", "MySQL"],
        authorName: "Karan Patel",
        github: "https://github.com/karan/ecommerce-store",
        demo: "https://shopnow.app",
    },
    {
        title: "Task Manager Pro",
        description: "Organize tasks with priorities, deadlines, and labels.",
        techStack: ["Angular", "Firebase"],
        authorName: "Sneha Reddy",
        github: "https://github.com/sneha/task-manager",
        demo: "https://taskmanager.pro",
    },
    {
        title: "Recipe Finder",
        description: "Find recipes based on ingredients you already have.",
        techStack: ["React Native", "Node.js", "MongoDB"],
        authorName: "Vikas Singh",
        github: "https://github.com/vikas/recipe-finder",
        demo: "https://recipefinder.app",
    },
    {
        title: "Budget Tracker",
        description: "Track expenses and income with clean visual charts.",
        techStack: ["Next.js", "Node.js", "Chart.js"],
        authorName: "Priya Nair",
        github: "https://github.com/priya/budget-tracker",
        demo: "https://budgetwise.app",
    },
    {
        title: "Study Planner",
        description: "Plan study sessions and track daily learning goals.",
        techStack: ["Svelte", "Go", "SQLite"],
        authorName: "Ankit Verma",
        github: "https://github.com/ankit/study-planner",
        demo: "https://studyplanner.dev",
    },
    {
        title: "Fitness Buddy",
        description: "Track workouts, calories, and fitness goals easily.",
        techStack: ["Flutter", "Firebase"],
        authorName: "Nisha Kulkarni",
        github: "https://github.com/nisha/fitness-buddy",
        demo: "https://fitnessbuddy.app",
    },
    {
        title: "Travel Journal",
        description: "Document your trips with photos, notes, and locations.",
        techStack: ["React", "Node.js", "PostgreSQL"],
        authorName: "Yash Desai",
        github: "https://github.com/yash/travel-journal",
        demo: "https://traveljournal.app",
    },
];

const ITEMS_PER_LOAD = 6;

const Projects = () => {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="my-20 space-y-16 px-4 max-w-5xl mx-auto">
            <ProjectsPageHeader />

            <div className="relative flex max-w-4xl mx-auto">
                <FaSearch className="absolute top-1/2 -translate-y-1/2 left-2" />
                <input
                    type="text"
                    placeholder="Search for Projects"
                    className="w-full !pl-8"
                    name="search"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.slice(0, visibleCount).map((ele, index) => (
                    <ProjectCard
                        key={index}
                        title={ele.title}
                        techStack={ele.techStack}
                        demo={ele.demo}
                        description={ele.description}
                        authorName={ele.authorName}
                        github={ele.github}
                    />
                ))}
            </div>


            {visibleCount < projects.length && (
                <div
                    ref={loaderRef}
                    className="text-center py-6 text-gray-500"
                >
                    Loading more projects...
                </div>
            )}
        </div>
    );
};

export default Projects;