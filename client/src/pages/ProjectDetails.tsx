import React, { useEffect, useState } from 'react';
import { FaCheck, FaLink } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectToken } from '../features/authentication/authenticationSlice';
import { fetchProjectById, selectCurrentProject, selectProjectsError, selectProjectsLoading, updateProject } from '../features/projects/projectSlice';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const project = useSelector(selectCurrentProject);
    const loading = useSelector(selectProjectsLoading);
    const error = useSelector(selectProjectsError);
    const token = useSelector(selectToken);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        intro: '',
        description: '',
        githubLink: '',
        liveLink: '',
        teckStack: [] as string[],
        image: '',
        problemStatement: '',
        demo: '',
        presentationPdf: '',
        uniqueness: '',
        portfolioOn: false,
        tags: [] as string[],
    });

    const [techInput, setTechInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [copied, setCopied] = useState(false);

    const copyPortfolioLink = () => {
        const portfolioUrl = `${window.location.origin}/portfolio/project/${id}`;
        navigator.clipboard.writeText(portfolioUrl);
        setCopied(true);
        toast.success('Portfolio link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        if (id && token) {
            dispatch(fetchProjectById(id) as any);
        }
    }, [id, token, dispatch]);

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                intro: project.intro,
                description: project.description || '',
                githubLink: project.githubLink,
                liveLink: project.liveLink || '',
                teckStack: project.teckStack,
                image: project.image,
                problemStatement: project.problemStatement,
                demo: project.demo || '',
                presentationPdf: project.presentationPdf || '',
                uniqueness: project.uniqueness || '',
                portfolioOn: project.portfolioOn,
                tags: project.tags || [],
            });
        }
    }, [project]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const addTech = () => {
        if (techInput.trim() && !formData.teckStack.includes(techInput.trim())) {
            setFormData(prev => ({ ...prev, teckStack: [...prev.teckStack, techInput.trim()] }));
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData(prev => ({ ...prev, teckStack: prev.teckStack.filter(t => t !== tech) }));
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };

    const handleSave = async () => {
        if (!id) return;
        try {
            await dispatch(updateProject({ id, updateData: formData }) as any);
            setIsEditing(false);
            toast.success('Project updated successfully');
        } catch (err) {
            toast.error('Failed to update project');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
        </div>
    );

    if (error) return (
        <div className="alert-error text-center p-4">{error}</div>
    );

    if (!project) return (
        <div className="text-center p-4 text-muted">Project not found</div>
    );

    return (
        <div className="my-20 max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                <div className="space-x-2 flex items-center">
                    <button
                        onClick={copyPortfolioLink}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-colors duration-200 ${copied
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        {copied ? <FaCheck /> : <FaLink />}
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="button"
                        >
                            Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="button bg-success hover:bg-success-hover text-white"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-muted hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => navigate('/projects')}
                        className="bg-muted hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>

            <div className="card">
                {isEditing ? (
                    <form className="space-y-6">
                        <div>
                            <label className="form-label">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-field"
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Intro</label>
                            <textarea
                                name="intro"
                                value={formData.intro}
                                onChange={handleInputChange}
                                className="form-field"
                                rows={3}
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="form-field"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="form-label">GitHub Link</label>
                            <input
                                type="url"
                                name="githubLink"
                                value={formData.githubLink}
                                onChange={handleInputChange}
                                className="form-field"
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Live Link</label>
                            <input
                                type="url"
                                name="liveLink"
                                value={formData.liveLink}
                                onChange={handleInputChange}
                                className="form-field"
                            />
                        </div>

                        <div>
                            <label className="form-label">Tech Stack</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.teckStack.map(tech => (
                                    <span key={tech} className="chip chip-tech">
                                        {tech}
                                        <button type="button" onClick={() => removeTech(tech)} className="ml-2 text-destructive hover:text-destructive-hover">×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                    placeholder="Add technology"
                                    className="form-field flex-1"
                                />
                                <button type="button" onClick={addTech} className="ml-2 button">Add</button>
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="form-field"
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Problem Statement</label>
                            <textarea
                                name="problemStatement"
                                value={formData.problemStatement}
                                onChange={handleInputChange}
                                className="form-field"
                                rows={4}
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Demo</label>
                            <input
                                type="url"
                                name="demo"
                                value={formData.demo}
                                onChange={handleInputChange}
                                className="form-field"
                            />
                        </div>

                        <div>
                            <label className="form-label">Presentation PDF</label>
                            <input
                                type="url"
                                name="presentationPdf"
                                value={formData.presentationPdf}
                                onChange={handleInputChange}
                                className="form-field"
                            />
                        </div>

                        <div>
                            <label className="form-label">Uniqueness</label>
                            <textarea
                                name="uniqueness"
                                value={formData.uniqueness}
                                onChange={handleInputChange}
                                className="form-field"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="form-label">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="chip chip-tag">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-destructive hover:text-destructive-hover">×</button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add tag"
                                    className="form-field flex-1"
                                />
                                <button type="button" onClick={addTag} className="ml-2 button">Add</button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="portfolioOn"
                                checked={formData.portfolioOn}
                                onChange={handleCheckboxChange}
                                className="mr-2 accent-accent"
                            />
                            <label className="form-label mb-0">Show on Portfolio</label>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-foreground">Intro</h2>
                            <p className="text-foreground">{project.intro}</p>
                        </div>

                        {project.description && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-foreground">Description</h2>
                                <p className="text-foreground">{project.description}</p>
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-foreground">Links</h2>
                            <p><a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">GitHub Repository</a></p>
                            {project.liveLink && <p><a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">Live Demo</a></p>}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-foreground">Tech Stack</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.teckStack.map(tech => (
                                    <span key={tech} className="chip chip-tech">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-foreground">Project Image</h2>
                            <img src={project.image} alt={project.name} className="max-w-full h-auto rounded-lg border border-border" />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-foreground">Problem Statement</h2>
                            <p className="text-foreground">{project.problemStatement}</p>
                        </div>

                        {project.demo && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-foreground">Demo Video</h2>
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">Watch Demo</a>
                            </div>
                        )}

                        {project.presentationPdf && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-foreground">Presentation</h2>
                                <a href={project.presentationPdf} target="_blank" rel="noopener noreferrer" className="text-link hover:text-link-hover">View Presentation PDF</a>
                            </div>
                        )}

                        {project.uniqueness && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-foreground">What Makes This Unique</h2>
                                <p className="text-foreground">{project.uniqueness}</p>
                            </div>
                        )}

                        {project.tags && project.tags.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-foreground">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="chip chip-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-foreground">Portfolio Status</h2>
                            <p className={project.portfolioOn ? 'text-success' : 'text-muted'}>
                                {project.portfolioOn ? '✓ Shown on Portfolio' : '○ Not shown on Portfolio'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;