import { useEffect, useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLink,
  FaUser,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { registerProfile, getUserEmail, verifyUser } from "../features/authentication/authenticationSlice"; // Import actions

type AdditionalLink = {
  label: string;
  value: string;
};

const Register = () => {
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState({
    github: "",
    twitter: "",
    portfolio: "",
  });
  
  const token = useAppSelector((state) => state.auth.token);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const isProfileComplete = useAppSelector((state) => state.auth.isProfileComplete);
  const user = useAppSelector((state) => state.auth.user);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [additionalLinks, setAdditionalLinks] = useState<AdditionalLink[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* ---------- Skills ---------- */
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (skills.length === 0) {
      toast.error("At least one skill is required");
      return;
    }

    // Validate social links
    if (!social.github || !social.twitter || !social.portfolio) {
      toast.error("All social links are required");
      return;
    }

    if (!bio.trim()) {
      toast.error("Bio is required");
      return;
    }

    const payload = {
      email,
      bio,
      social,
      skills,
      additionalLinks,
    };


    await dispatch(registerProfile(payload));
  };

  /* ---------- Fetch User Email ---------- */
  const fetchUserEmailUsingToken = async () => {
    if (token) {
      try {
        const result = await dispatch(getUserEmail()).unwrap();
        setEmail(result);
      } catch (err) {
        console.error("Failed to fetch email:", err);
        // If token is invalid, redirect to login
        navigate('/login');
      }
    }
  };

  /* ---------- Effects ---------- */
  useEffect(() => {
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      // Verify token and get user info
      dispatch(verifyUser());
      fetchUserEmailUsingToken();
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (isProfileComplete) {
      navigate('/dashboard');
    }
  }, [isProfileComplete, navigate]);

  // Pre-fill form if user data exists
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setSocial(user.social || { github: "", twitter: "", portfolio: "" });
      setSkills(user.skills || []);
      setAdditionalLinks(user.additionalLinks || []);
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(()=>{
    toast.success("Please register yourself first!")
  },[])

  return (
    <div className="flex mt-10 min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 w-[420px] space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-foreground">
          Complete Your Profile
        </h2>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Email (read-only) */}
        <div className="relative">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full border border-border rounded-md p-3 pr-10 bg-gray-100 cursor-not-allowed"
          />
          <FaUser className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Bio */}
        <div className="relative">
          <textarea
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short bio about yourself"
            className="w-full border border-border rounded-md p-3 pr-10 resize-none"
            rows={3}
          />
          <FaUser className="absolute right-3 top-3 text-muted" />
        </div>

        {/* GitHub */}
        <div className="relative">
          <input
            type="url"
            placeholder="GitHub profile URL"
            value={social.github}
            required
            onChange={(e) => setSocial({ ...social, github: e.target.value })}
            className="w-full border border-border rounded-md p-3 pr-10"
          />
          <FaGithub className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Twitter / X */}
        <div className="relative">
          <input
            type="url"
            placeholder="X (Twitter) profile URL"
            value={social.twitter}
            required
            onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
            className="w-full border border-border rounded-md p-3 pr-10"
          />
          <FaTwitter className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Portfolio */}
        <div className="relative">
          <input
            type="url"
            placeholder="Portfolio website URL"
            value={social.portfolio}
            onChange={(e) => setSocial({ ...social, portfolio: e.target.value })}
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill (e.g. React)"
              className="flex-1 border border-border rounded-md p-2"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-accent text-accent-text px-3 rounded-md hover:bg-accent-hover"
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
                  className="cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill(skill)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Additional Links */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            Additional Links (Optional)
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
                className="text-destructive hover:text-destructive-hover"
              >
                <FaTimes />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addAdditionalLink}
            className="flex items-center gap-2 text-sm text-accent hover:text-accent-hover"
          >
            <FaPlus /> Add another link
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover text-accent-text py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
};

export default Register;