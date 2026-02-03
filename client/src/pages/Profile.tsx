import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import {
  FaUser,
  FaEnvelope,
  FaInfoCircle,
  FaTools,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaEdit,
  FaKey,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="text-center mt-20 text-destructive font-semibold">
        No user data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex justify-center pt-16 px-4">
      <div className="card w-full max-w-3xl p-8 shadow-lg rounded-2xl">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-10">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaUser className="text-accent" />
              Basic Information
            </h2>

            <ProfileItem icon={<FaUser />} label="Name" value={user.name} />
            <ProfileItem icon={<FaEnvelope />} label="Email" value={user.email} />
            <ProfileItem
              icon={<FaInfoCircle />}
              label="Bio"
              value={user.bio || "Not added"}
            />
          </div>

          {/* Skills & Social */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaTools className="text-accent" />
              Skills & Social
            </h2>

            <ProfileItem
              icon={<FaTools />}
              label="Skills"
              value={
                user.skills?.length
                  ? user.skills.join(", ")
                  : "No skills added"
              }
            />

            <div className="mt-6 space-y-3">
              <SocialLink
                icon={<FaGithub />}
                label="GitHub"
                link={user.social?.github}
              />
              <SocialLink
                icon={<FaTwitter />}
                label="Twitter"
                link={user.social?.twitter}
              />
              <SocialLink
                icon={<FaGlobe />}
                label="Portfolio"
                link={user.social?.portfolio}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register?editProfile=true")}
            className="button flex items-center gap-2 px-6 py-2 text-lg font-medium"
          >
            <FaEdit />
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="button-destructive flex items-center gap-2 px-6 py-2 text-lg font-medium"
          >
            <FaKey />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* ---------- Reusable Components ---------- */

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="mb-4">
    <p className="text-sm text-muted flex items-center gap-2">
      {icon}
      {label}
    </p>
    <p className="font-medium mt-1">{value}</p>
  </div>
);

const SocialLink = ({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link?: string;
}) => {
  if (!link) {
    return (
      <p className="text-sm text-muted flex items-center gap-2">
        {icon}
        {label}: Not added
      </p>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-accent hover:underline font-medium"
    >
      {icon}
      {label}
    </a>
  );
};
