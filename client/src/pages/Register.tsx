import { useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLink,
  FaUser,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

type AdditionalLink = {
  label: string;
  value: string;
};

const Register = () => {

  const [bio, setBio] = useState("");

  const [social, setSocial] = useState({
    github: "",
    twitter: "",
    portfolio: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [additionalLinks, setAdditionalLinks] = useState<AdditionalLink[]>([]);

 
  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  /* ---------- Additional Links ---------- */
  const addAdditionalLink = () => {
    setAdditionalLinks([...additionalLinks, { label: "", value: "" }]);
  };

  const updateAdditionalLink = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const updated = [...additionalLinks];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalLinks(updated);
  };

  const removeAdditionalLink = (index: number) => {
    setAdditionalLinks(additionalLinks.filter((_, i) => i !== index));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      bio,
      social,
      skills,
      additionalLinks,
    };

    if(skills.length==0){
      toast.error("Skills required")
    }

    console.log("REGISTER DATA:", payload);
  };

  return (
    <div className="flex mt-10 min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 w-[420px] space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-foreground">
          User Profile Setup
        </h2>

        {/* Bio */}
        <div className="relative">
          <textarea
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short bio about yourself"
            className="w-full border border-border rounded-md p-3 pr-10 resize-none"
          />
          <FaUser className="absolute right-3 top-3 text-muted" />
        </div>

        {/* GitHub */}
        <div className="relative">
          <input
            type="url"
            placeholder="GitHub profile"
            value={social.github}
            required
            onChange={(e) =>
              setSocial({ ...social, github: e.target.value })
            }
            className="w-full border border-border rounded-md p-3 pr-10"
          />
          <FaGithub className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Twitter / X */}
        <div className="relative">
          <input
            type="url"
            placeholder="X (Twitter) profile"
            value={social.twitter}
            required
            onChange={(e) =>
              setSocial({ ...social, twitter: e.target.value })
            }
            className="w-full border border-border rounded-md p-3 pr-10"
          />
          <FaTwitter className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Portfolio */}
        <div className="relative">
          <input
            type="url"
            placeholder="Portfolio website"
            value={social.portfolio}
            onChange={(e) =>
              setSocial({ ...social, portfolio: e.target.value })
            }
            required
            className="w-full border border-border rounded-md p-3 pr-10"
          />
          <FaLink className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Skills */}
        <div>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill (e.g. React)"
              className="flex-1 border border-border rounded-md p-2"

            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-accent text-accent-text px-3 rounded-md"
            >
              <FaPlus />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Additional Links */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Additional Links
          </p>

          {additionalLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder="Label"
                value={link.label}
                onChange={(e) =>
                  updateAdditionalLink(index, "label", e.target.value)
                }
                className="w-1/3 border border-border rounded-md p-2"
              />
              <input
                placeholder="URL"
                value={link.value}
                onChange={(e) =>
                  updateAdditionalLink(index, "value", e.target.value)
                }
                className="flex-1 border border-border rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => removeAdditionalLink(index)}
                className="text-destructive"
              >
                <FaTimes />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addAdditionalLink}
            className="flex items-center gap-2 text-sm text-accent"
          >
            <FaPlus /> Add another link
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-hover text-accent-text py-2 rounded-md font-medium"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default Register;
