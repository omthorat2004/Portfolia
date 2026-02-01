import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hook";

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
    <div className="min-h-screen bg-background flex justify-center items-start pt-16 px-4">
      <div className="card w-full max-w-3xl p-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-foreground text-center mb-8 section-headline">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold text-accent mb-4">
              Basic Information
            </h2>
            <ProfileItem label="Name" value={user.name} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Bio" value={user.bio || "Not added"} />
          </div>

          {/* Skills & Social */}
          <div>
            <h2 className="text-xl font-semibold text-accent mb-4">
              Skills & Social
            </h2>
            <ProfileItem
              label="Skills"
              value={user.skills?.length ? user.skills.join(", ") : "No skills added"}
            />

            <div className="mt-4 space-y-2">
              <SocialLink label="GitHub" link={user.social?.github} />
              <SocialLink label="Twitter" link={user.social?.twitter} />
              <SocialLink label="Portfolio" link={user.social?.portfolio} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register?editProfile=true")}
            className="button w-full md:w-auto px-6 py-2 text-lg font-medium"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="button-destructive w-full md:w-auto px-6 py-2 text-lg font-medium"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-3">
    <p className="text-muted text-sm">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

const SocialLink = ({ label, link }: { label: string; link?: string }) => {
  if (!link) {
    return (
      <p className="text-muted text-sm">{label}: Not added</p>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:text-accent-hover transition font-medium block"
    >
      {label}: {link}
    </a>
  );
};
