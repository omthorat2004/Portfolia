import React, { useEffect, useState, useRef } from 'react';
import { 
    FaArrowLeft, 
    FaCheck, 
    FaExternalLinkAlt, 
    FaGithub, 
    FaLink,
    FaTwitter,
    FaShare,
    FaCode,
    FaLightbulb,
    FaTags,
    FaPlay,
    FaFilePdf,
    FaGithubAlt,
    FaLinkedin,
    FaGlobe,
    FaHeart,
    FaStar,
    FaEye,
    FaClock,
    FaCalendarAlt,
    FaBars,
    FaTimes,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import '../style.css';

interface IProject {
    _id: string;
    name: string;
    intro: string;
    description?: string;
    githubLink: string;
    liveLink?: string;
    teckStack: string[];
    image: string;
    problemStatement: string;
    demo?: string;
    presentationPdf?: string;
    uniqueness?: string;
    portfolioOn: boolean;
    tags?: string[];
    userId: string;
}

interface ProjectPortfolioData {
    user: {
        _id: string;
        name: string;
        email: string;
        bio?: string;
        social?: {
            github?: string;
            twitter?: string;
            portfolio?: string;
            linkedin?: string;
        };
    };
    project: IProject;
}

const ProjectPortfolio: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState<ProjectPortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('problem');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [liked, setLiked] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Scroll animations
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Check for dark mode
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
    }, []);

    // Show scroll to top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const copyPortfolioLink = () => {
        const portfolioUrl = `${window.location.origin}/portfolio/project/${projectId}`;
        navigator.clipboard.writeText(portfolioUrl);
        setCopied(true);
        toast.success('✨ Portfolio link copied to clipboard!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: isDarkMode ? "dark" : "light",
            icon: <FaLink className="text-accent" />
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(sectionId);
            setShowMobileMenu(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const fetchProjectPortfolio = async () => {
            try {
                setLoading(true);
                const backendUrl = import.meta.env.VITE_APP_BACKEND_API;
                const response = await fetch(`${backendUrl}/projects/portfolio/${projectId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to load project portfolio');
                }

                setPortfolio(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to load project portfolio');
                toast.error(err.message || 'Failed to load project portfolio', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: isDarkMode ? "dark" : "light",
                });
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProjectPortfolio();
        }
    }, [projectId, isDarkMode]);

    // Intersection Observer for active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-100px 0px" }
        );

        const sections = ['problem', 'solution', 'tech', 'uniqueness', 'links'];
        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [portfolio]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-secondary/20 animate-ping animation-delay-200"></div>
                    <div className="relative w-32 h-32">
                        <div className="absolute inset-0 rounded-full border-t-4 border-accent animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-r-4 border-secondary animate-spin animation-delay-150"></div>
                        <div className="absolute inset-4 rounded-full border-b-4 border-accent animate-spin animation-delay-300"></div>
                    </div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-foreground font-medium">Loading masterpiece...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-background flex items-center justify-center p-6"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="max-w-md w-full text-center"
                >
                    <div className="relative mb-8">
                        <div className="text-9xl opacity-10">404</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaEye className="text-6xl text-destructive animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
                    <p className="text-muted mb-8 text-lg">{error || 'The project you\'re looking for doesn\'t exist or has been removed.'}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="group relative px-8 py-4 bg-accent text-accent-text rounded-2xl font-semibold overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Return to Home
                        </span>
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-accent-hover to-secondary"
                            initial={{ x: "100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    const { user, project } = portfolio;

    const navItems = [
        { id: 'problem', label: 'Problem', icon: <FaLightbulb />, color: 'from-yellow-500 to-orange-500' },
        { id: 'solution', label: 'Solution', icon: <FaCode />, color: 'from-blue-500 to-cyan-500' },
        { id: 'tech', label: 'Tech Stack', icon: <FaGithubAlt />, color: 'from-purple-500 to-pink-500' },
        { id: 'uniqueness', label: 'Uniqueness', icon: <FaStar />, color: 'from-green-500 to-emerald-500' },
        { id: 'links', label: 'Links', icon: <FaLink />, color: 'from-red-500 to-rose-500' },
    ];

    return (
        <div className="bg-background min-h-screen" ref={mainRef}>
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 animate-gradient"></div>
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="fixed bottom-6 right-6 z-50 lg:hidden bg-accent text-white p-4 rounded-full shadow-2xl"
            >
                {showMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-24 right-6 z-50 lg:hidden"
                    >
                        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-2xl">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                                        activeSection === item.id 
                                            ? `bg-gradient-to-r ${item.color} text-white` 
                                            : 'hover:bg-card text-muted hover:text-foreground'
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Progress Bar Navigation */}
            <div className="fixed top-0 left-0 right-0 z-40 hidden lg:block">
                <div className="bg-card/80 backdrop-blur-xl border-b border-border/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between h-16">
                            {/* Progress Indicators */}
                            <div className="flex items-center gap-1 flex-1">
                                {navItems.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => scrollToSection(item.id)}
                                            className={`relative flex-1 h-2 rounded-full transition-all duration-300 ${
                                                activeSection === item.id 
                                                    ? `bg-gradient-to-r ${item.color} h-3` 
                                                    : 'bg-border hover:bg-muted'
                                            }`}
                                        >
                                            <motion.div 
                                                className="absolute inset-0 rounded-full bg-white/20"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.button>
                                        {index < navItems.length - 1 && (
                                            <span className="text-border mx-1">•</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Section Labels */}
                            <div className="flex items-center gap-4 ml-8">
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-sm font-medium transition-colors ${
                                            activeSection === item.id 
                                                ? `text-transparent bg-clip-text bg-gradient-to-r ${item.color}` 
                                                : 'text-muted hover:text-foreground'
                                        }`}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-30 bg-card/70 backdrop-blur-xl border-b border-border/50"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={copyPortfolioLink}
                            className="group relative px-6 py-3 rounded-xl font-semibold overflow-hidden"
                        >
                            <motion.div 
                                className={`absolute inset-0 ${
                                    copied 
                                        ? 'bg-success' 
                                        : 'bg-gradient-to-r from-accent to-secondary'
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 flex items-center gap-3 text-white">
                                {copied ? (
                                    <>
                                        <FaCheck className="animate-bounce" />
                                        <span>Link Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <FaLink />
                                        <span className="hidden sm:inline">Share Portfolio</span>
                                        <FaShare className="sm:hidden" />
                                    </>
                                )}
                            </span>
                        </motion.button>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setLiked(!liked)}
                                className="relative"
                            >
                                <FaHeart 
                                    className={`text-2xl transition-all duration-300 ${
                                        liked ? 'text-red-500 scale-110' : 'text-muted'
                                    }`}
                                />
                                {liked && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50"
                                    />
                                )}
                            </motion.button>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-secondary p-[2px]">
                                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                                        <span className="text-lg font-bold text-foreground">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm text-muted">Created by</p>
                                    <p className="font-semibold text-foreground">{user.name}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 left-6 z-50 bg-accent text-white p-4 rounded-full shadow-2xl"
                    >
                        <FaChevronUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <motion.div 
                ref={heroRef}
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="relative pt-32 pb-20 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
                                Featured Project
                            </span>
                        </motion.div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                                {project.name}
                            </span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                            {project.intro}
                        </p>

                        {/* Stats */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-6 mt-8"
                        >
                            <div className="flex items-center gap-2">
                                <FaClock className="text-accent" />
                                <span className="text-muted text-sm">Updated 2024</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCode className="text-secondary" />
                                <span className="text-muted text-sm">{project.teckStack.length} Technologies</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEye className="text-success" />
                                <span className="text-muted text-sm">Public Project</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Project Image */}
            {project.image && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto px-6 mb-12"
                >
                    <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            src={project.image}
                            alt={project.name}
                            className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </motion.div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Problem Statement */}
                <motion.section 
                    id="problem"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 scroll-mt-24"
                >
                    <div className="card bg-card/80 backdrop-blur border border-border/50 p-8 md:p-12 rounded-2xl shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                            <FaLightbulb className="text-accent" />
                            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                                Problem Statement
                            </span>
                        </h2>
                        <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">
                            {project.problemStatement}
                        </p>
                    </div>
                </motion.section>

                {/* Solution */}
                {project.description && (
                    <motion.section 
                        id="solution"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 scroll-mt-24"
                    >
                        <div className="card bg-card/80 backdrop-blur border border-border/50 p-8 md:p-12 rounded-2xl shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                                <FaCode className="text-blue-500" />
                                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                    Solution
                                </span>
                            </h2>
                            <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">
                                {project.description}
                            </p>
                        </div>
                    </motion.section>
                )}

                {/* Tech Stack */}
                <motion.section 
                    id="tech"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 scroll-mt-24"
                >
                    <div className="card bg-card/80 backdrop-blur border border-border/50 p-8 md:p-12 rounded-2xl shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                            <FaGithubAlt className="text-purple-500" />
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Tech Stack
                            </span>
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.teckStack.map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Uniqueness */}
                {project.uniqueness && (
                    <motion.section 
                        id="uniqueness"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 scroll-mt-24"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
                            <div className="relative card bg-card/80 backdrop-blur border-2 border-accent/30 p-8 md:p-12 rounded-2xl shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                                    <FaStar className="text-yellow-500" />
                                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                        What Makes It Unique
                                    </span>
                                </h2>
                                <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">
                                    {project.uniqueness}
                                </p>
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <motion.section 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <div className="card bg-card/50 backdrop-blur border border-border/50 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <FaTags className="text-accent" />
                                Tags
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.03 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 bg-border/50 text-foreground rounded-full text-sm font-medium border border-border/50 hover:border-accent hover:bg-accent/10 transition-all cursor-default"
                                    >
                                        #{tag}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* Links Section */}
                <motion.section 
                    id="links"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 scroll-mt-24"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* GitHub Link */}
                        {project.githubLink && (
                            <motion.a
                                whileHover={{ scale: 1.02, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-xl"
                            >
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <FaGithub className="text-3xl text-white" />
                                        <div>
                                            <h3 className="text-xl font-bold text-white">GitHub</h3>
                                            <p className="text-white/70 text-sm">View Source Code</p>
                                        </div>
                                    </div>
                                    <FaExternalLinkAlt className="text-white/50 group-hover:text-white group-hover:rotate-45 transition-all" />
                                </div>
                            </motion.a>
                        )}

                        {/* Live Demo Link */}
                        {project.liveLink && (
                            <motion.a
                                whileHover={{ scale: 1.02, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent to-secondary p-6 shadow-xl"
                            >
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <FaExternalLinkAlt className="text-3xl text-white" />
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Live Demo</h3>
                                            <p className="text-white/70 text-sm">Try it yourself</p>
                                        </div>
                                    </div>
                                    <FaExternalLinkAlt className="text-white/50 group-hover:text-white group-hover:rotate-45 transition-all" />
                                </div>
                            </motion.a>
                        )}
                    </div>

                    {/* Additional Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {project.demo && (
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl hover:border-accent transition-all"
                            >
                                <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                                    <FaPlay className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Video Demo</h3>
                                    <p className="text-muted text-sm truncate max-w-xs">{project.demo}</p>
                                </div>
                            </motion.a>
                        )}

                        {project.presentationPdf && (
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                href={project.presentationPdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl hover:border-destructive transition-all"
                            >
                                <div className="p-3 bg-destructive/10 rounded-xl group-hover:bg-destructive/20 transition-colors">
                                    <FaFilePdf className="text-destructive" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Presentation</h3>
                                    <p className="text-muted text-sm truncate max-w-xs">{project.presentationPdf}</p>
                                </div>
                            </motion.a>
                        )}
                    </div>
                </motion.section>

                {/* About Creator */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="card bg-gradient-to-br from-card to-card/50 border border-border/50 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-foreground mb-6">About the Creator</h2>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent to-secondary p-[2px]">
                                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                                        <span className="text-2xl font-bold text-foreground">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-foreground mb-1">{user.name}</h3>
                                <p className="text-muted mb-3">{user.bio || 'Passionate developer creating amazing projects'}</p>
                                <div className="flex gap-3 justify-center md:justify-start">
                                    {user.social?.github && (
                                        <motion.a whileHover={{ scale: 1.1 }} href={user.social.github} target="_blank" className="text-muted hover:text-accent">
                                            <FaGithub size={18} />
                                        </motion.a>
                                    )}
                                    {user.social?.twitter && (
                                        <motion.a whileHover={{ scale: 1.1 }} href={user.social.twitter} target="_blank" className="text-muted hover:text-accent">
                                            <FaTwitter size={18} />
                                        </motion.a>
                                    )}
                                    {user.social?.linkedin && (
                                        <motion.a whileHover={{ scale: 1.1 }} href={user.social.linkedin} target="_blank" className="text-muted hover:text-accent">
                                            <FaLinkedin size={18} />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Footer */}
            <footer className="relative mt-12">
                <div className="bg-card/80 backdrop-blur border-t border-border/50 py-8">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                            <p className="text-muted">© {new Date().getFullYear()} • Created by {user.name}</p>
                            <div className="flex items-center gap-2">
                                <FaHeart className="text-red-500 animate-pulse" />
                                <span className="text-muted">Powered by</span>
                                <span className="text-accent font-semibold">Portfolia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProjectPortfolio;