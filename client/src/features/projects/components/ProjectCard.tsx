import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface projectCardProps {
  title: string;
  description: string;
  techStack: string[];
  authorName: string;
  github: string;
  demo: string;
}

const ProjectCard: React.FC<projectCardProps> = ({
  title,
  description,
  techStack,
  authorName,
  github,
  demo,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      
      {/* Top section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted line-clamp-2">
          {description}
        </p>
      </div>

      {/* Middle section */}
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Bottom section */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-muted">
          by <span className="text-foreground font-medium">{authorName}</span>
        </span>

        <div className="flex items-center gap-3">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground"
            aria-label="GitHub Repository"
          >
            <FaGithub size={18} />
          </a>

          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground"
            aria-label="Live Demo"
          >
            <FaExternalLinkAlt size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
