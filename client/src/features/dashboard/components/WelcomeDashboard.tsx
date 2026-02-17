import React from "react";
import { useAppSelector } from "../../../store/hook";

const WelcomeDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">No user data available</p>
      </div>
    );
  }

  // Function to get greeting based on current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const projectCount = user.projects?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6 flex flex-col items-center">
      {/* Welcome Header */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl mb-8 text-center transform transition-transform hover:scale-105">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
          {getGreeting()}, {user.name}!
        </h1>
        <p className="text-gray-600 text-lg">
          You have {projectCount} project{projectCount !== 1 ? "s" : ""} in your portfolio.
        </p>
      </div>

      {/* Stats / Quick Overview */}
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Count */}
        <div className="col-span-1 bg-orange-50 p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Portfolio Projects</h2>
          <p className="text-4xl font-bold text-orange-600">{projectCount}</p>
        </div>

        {/* Skills */}
        <div className="col-span-1 bg-orange-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Skills</h2>
          {user.skills?.length ? (
            <ul className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
        </div>

        {/* Bio */}
        <div className="col-span-1 bg-orange-50 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Bio</h2>
          <p className="text-gray-800">{user.bio || "No bio added yet."}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 w-full max-w-4xl flex flex-col md:flex-row justify-center gap-4">
        <button className="w-full md:w-auto bg-orange-600 text-white py-3 px-8 rounded-2xl hover:bg-orange-700 transition font-semibold shadow-lg">
          Add New Project
        </button>
        <button className="w-full md:w-auto bg-gray-700 text-white py-3 px-8 rounded-2xl hover:bg-gray-800 transition font-semibold shadow-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default WelcomeDashboard;
