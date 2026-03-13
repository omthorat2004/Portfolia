import React, { useEffect, useState } from 'react';
import { FaCheck, FaExternalLinkAlt, FaGithub, FaLink, FaTwitter } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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

interface PortfolioData {
    user: {
        _id: string;
        name: string;
        email: string;
        bio?: string;
        social?: {
            github?: string;
            twitter?: string;
            portfolio?: string;
        };
        skills?: string[];
        additionalLinks?: Array<{ label: string; value: string }>;
    };
    projects: IProject[];
}

const Portfolio: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const copyPortfolioLink = () => {
        const portfolioUrl = `${window.location.origin}/portfolio/${userId}`;
        navigator.clipboard.writeText(portfolioUrl);
        setCopied(true);
        toast.success('Portfolio link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                setLoading(true);
                const backendUrl = import.meta.env.VITE_APP_BACKEND_API;
                const response = await fetch(`${backendUrl}/auth/portfolio/${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to load portfolio');
                }

                setPortfolio(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to load portfolio');
                toast.error(err.message || 'Failed to load portfolio');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPortfolio();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Portfolio Not Found</h1>
                <p className="text-gray-600">{error || 'Unable to load portfolio'}</p>
            </div>
        );
    }

    const { user, projects } = portfolio;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section with User Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={copyPortfolioLink}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition ${copied
                                    ? 'bg-white/30 text-white'
                                    : 'bg-white/20 hover:bg-white/30 text-white'
                                }`}
                        >
                            {copied ? <FaCheck /> : <FaLink />}
                            {copied ? 'Copied!' : 'Copy Portfolio Link'}
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{user.name}</h1>
                            <p className="text-lg text-blue-100 mb-6">{user.email}</p>

                            {user.bio && (
                                <p className="text-base text-blue-50 mb-6 max-w-2xl leading-relaxed">
                                    {user.bio}
                                </p>
                            )}

                            {/* Social Links */}
                            <div className="flex gap-4 mb-8">
                                {user.social?.github && (
                                    <a
                                        href={user.social.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
                                    >
                                        <FaGithub size={20} />
                                        GitHub
                                    </a>
                                )}
                                {user.social?.twitter && (
                                    <a
                                        href={user.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
                                    >
                                        <FaTwitter size={20} />
                                        Twitter
                                    </a>
                                )}
                                {user.social?.portfolio && (
                                    <a
                                        href={user.social.portfolio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
                                    >
                                        <FaExternalLinkAlt size={20} />
                                        Portfolio
                                    </a>
                                )}
                            </div>

                            {/* Additional Links */}
                            {user.additionalLinks && user.additionalLinks.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {user.additionalLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm transition"
                                        >
                                            <FaExternalLinkAlt size={14} />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            {user.skills && user.skills.length > 0 && (
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {user.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-white border-2 border-blue-500 text-blue-600 px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects Section */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">
                    Featured Projects ({projects.length})
                </h2>
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No projects to display yet</p>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                        >
                            {/* Project Image */}
                            {project.image && (
                                <div className="h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover hover:scale-105 transition"
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                {/* Project Name */}
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {project.name}
                                </h3>

                                {/* Project Intro */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {project.intro}
                                </p>

                                {/* Tech Stack */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {project.teckStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Tags */}
                                {project.tags && project.tags.length > 0 && (
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Problem Statement */}
                                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                    <span className="font-semibold">Problem:</span> {project.problemStatement}
                                </p>

                                {/* Links */}
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-900 px-4 py-2 rounded transition flex-1 justify-center"
                                        >
                                            <FaGithub size={16} />
                                            GitHub
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition flex-1 justify-center"
                                        >
                                            <FaExternalLinkAlt size={16} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>

                                {/* More info links */}
                                {(project.demo || project.presentationPdf || project.description) && (
                                    <div className="mt-4 space-y-2 text-sm">
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-blue-600 hover:text-blue-800"
                                            >
                                                → View Demo
                                            </a>
                                        )}
                                        {project.presentationPdf && (
                                            <a
                                                href={project.presentationPdf}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-blue-600 hover:text-blue-800"
                                            >
                                                → View Presentation
                                            </a>
                                        )}
                                        {project.description && (
                                            <p className="text-gray-600 text-xs">
                                                {project.description.substring(0, 100)}...
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                )
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-gray-300 py-8 mt-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p>© {new Date().getFullYear()} {user.name}. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
