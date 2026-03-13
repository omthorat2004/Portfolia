import { useEffect, useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLink,
  FaUser,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  registerProfile,
  getUserEmail,
  verifyUser,
} from "../features/authentication/authenticationSlice";

type AdditionalLink = {
  label: string;
  value: string;
};

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ✅ Detect edit mode using route
  const isEditMode = location.pathname === "/edit-profile";

  const token = useAppSelector((state) => state.auth.token);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const isProfileComplete = useAppSelector(
    (state) => state.auth.isProfileComplete
  );
  const user = useAppSelector((state) => state.auth.user);

  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState({
    github: "",
    twitter: "",
    portfolio: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [additionalLinks, setAdditionalLinks] = useState<AdditionalLink[]>([]);

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

    try {
      await dispatch(registerProfile(payload)).unwrap();

      toast.success(
        isEditMode
          ? "Profile updated successfully!"
          : "Profile completed successfully!"
      );

      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ---------- Auth Check ---------- */
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(verifyUser());
      dispatch(getUserEmail())
        .unwrap()
        .then((res) => setEmail(res))
        .catch(() => navigate("/login"));
    }
  }, [token, navigate, dispatch]);

  /* ---------- Redirect if already complete ---------- */
  useEffect(() => {
    if (!isEditMode && isProfileComplete) {
      navigate("/dashboard");
    }
  }, [isProfileComplete, isEditMode, navigate]);

  /* ---------- Pre-fill form in edit mode ---------- */
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setSocial(
        user.social || { github: "", twitter: "", portfolio: "" }
      );
      setSkills(user.skills || []);
      setAdditionalLinks(user.additionalLinks || []);
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <div className="flex mt-10 min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="card w-[420px] space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center">
          {isEditMode ? "Edit Your Profile" : "Complete Your Profile"}
        </h2>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 pr-10 bg-gray-100 cursor-not-allowed"
          />
          <FaUser className="absolute right-3 top-3 text-muted" />
        </div>

        {/* Bio */}
        <textarea
          required
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Short bio about yourself"
          className="w-full p-3 resize-none"
          rows={3}
        />

        {/* GitHub */}
        <input
          type="url"
          placeholder="GitHub profile URL"
          value={social.github}
          required
          onChange={(e) =>
            setSocial({ ...social, github: e.target.value })
          }
          className="w-full p-3"
        />

        {/* Twitter */}
        <input
          type="url"
          placeholder="X (Twitter) profile URL"
          value={social.twitter}
          required
          onChange={(e) =>
            setSocial({ ...social, twitter: e.target.value })
          }
          className="w-full p-3"
        />

        {/* Portfolio */}
        <input
          type="url"
          placeholder="Portfolio website URL"
          value={social.portfolio}
          required
          onChange={(e) =>
            setSocial({ ...social, portfolio: e.target.value })
          }
          className="w-full p-3"
        />

        {/* Skills */}
        <div>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill"
              className="flex-1 p-2"
            />
            <button type="button" onClick={addSkill} className="button">
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="button w-full disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Profile"
            : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default Register;