import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { type RootState } from '../../../store/store';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_API;

const CreateProject: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [techStack, setTechStack] = useState<string[]>([]);
    const [techInput, setTechInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [image, setImage] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [demo, setDemo] = useState('');
    const [presentationPdf, setPresentationPdf] = useState('');
    const [uniqueness, setUniqueness] = useState('');
    const [portfolioOn, setPortfolioOn] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error('You must be logged in to create a project');
            return;
        }

        const body = {
            name,
            intro,
            description,
            githubLink,
            liveLink,
            teckStack: techStack,
            image,
            problemStatement,
            demo,
            presentationPdf,
            uniqueness,
            portfolioOn,
            tags,
        };

        try {
            const res = await fetch(`${BACKEND_URL}/projects/add-project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to create project');

            toast.success('Project created successfully');
            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Error creating project');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="my-20 mx-5 max-w-4xl md:mx-auto card p-8 text-sm"
        >
            <h2 className="section-headline mb-6 text-xl sm:text-2xl">Create New Project</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="mb-4">
                    <label className="form-label">Name*</label>
                    <input
                        className="form-field mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">GitHub Link*</label>
                    <input
                        className="form-field mt-1"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2 mb-4">
                    <label className="form-label">Intro*</label>
                    <textarea
                        className="form-field mt-1 max-h-24"
                        rows={3}
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        required
                    />
                </div>

                <div className="md:col-span-2 mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-field mt-1 max-h-24"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2 mb-4">
                    <label className="form-label">Problem Statement*</label>
                    <textarea
                        className="form-field mt-1 max-h-24"
                        rows={3}
                        value={problemStatement}
                        onChange={(e) => setProblemStatement(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Live/Demo Link</label>
                    <input
                        className="form-field mt-1"
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Demo Link</label>
                    <input
                        className="form-field mt-1"
                        value={demo}
                        onChange={(e) => setDemo(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Image URL</label>
                    <input
                        className="form-field mt-1"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Presentation PDF URL</label>
                    <input
                        className="form-field mt-1"
                        value={presentationPdf}
                        onChange={(e) => setPresentationPdf(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2 mb-4">
                    <label className="form-label">Tech Stack</label>
                    <div className="flex gap-2 flex-wrap mt-1">
                        {techStack.map((t, idx) => (
                            <span
                                key={idx}
                                className="chip chip-tech"
                            >
                                {t} <button type="button" onClick={() => setTechStack(prev => prev.filter((_, i) => i !== idx))} className="ml-1">×</button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-1">
                        <input
                            className="flex-1"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            placeholder="Add technology and press Enter"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && techInput.trim()) {
                                    e.preventDefault();
                                    setTechStack(prev => [...prev, techInput.trim()]);
                                    setTechInput('');
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="button"
                            onClick={() => {
                                if (techInput.trim()) {
                                    setTechStack(prev => [...prev, techInput.trim()]);
                                    setTechInput('');
                                }
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2 mb-4">
                    <label className="form-label">Tags</label>
                    <div className="flex gap-2 flex-wrap mt-1">
                        {tags.map((t, idx) => (
                            <span
                                key={idx}
                                className="chip chip-tag"
                            >
                                {t} <button type="button" onClick={() => setTags(prev => prev.filter((_, i) => i !== idx))} className="ml-1">×</button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-1">
                        <input
                            className="flex-1"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add tag and press Enter"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && tagInput.trim()) {
                                    e.preventDefault();
                                    setTags(prev => [...prev, tagInput.trim()]);
                                    setTagInput('');
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="button"
                            onClick={() => {
                                if (tagInput.trim()) {
                                    setTags(prev => [...prev, tagInput.trim()]);
                                    setTagInput('');
                                }
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium">What makes it unique</label>
                    <textarea
                        className="w-full mt-1 max-h-24"
                        rows={3}
                        value={uniqueness}
                        onChange={(e) => setUniqueness(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2 flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        checked={portfolioOn}
                        onChange={(e) => setPortfolioOn(e.target.checked)}
                    />
                    <label className="font-medium">Show on portfolio</label>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button
                    type="submit"
                    className="button px-8"
                >
                    Create
                </button>
            </div>
        </form>
    );
};

export default CreateProject;
