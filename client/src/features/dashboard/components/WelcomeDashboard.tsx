import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";

const WelcomeDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card text-center">
          <p className="text-muted text-lg">No user data available</p>
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const projectCountFromUser = user.projects?.length || 0; // kept for backwards compatibility
  const projectCount = useAppSelector((state) => state.projects.projects.length);
  const portfolioVisits = user.portfolioVisits || 0; // add this field in backend later

  // Profile Completion Logic
  const profileCompletion = useMemo(() => {
    let totalFields = 6;
    let completed = 0;

    if (user.name) completed++;
    if (user.email) completed++;
    if (user.bio) completed++;
    if (user.skills?.length) completed++;
    if (user.social?.github || user.social?.twitter || user.social?.portfolio)
      completed++;
    if (user.additionalLinks?.length) completed++;

    return Math.round((completed / totalFields) * 100);
  }, [user]);

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto card space-y-6">
        {/* Greeting */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, <span className="text-accent">{user.name}</span> 👋
            </h1>
            <p className="text-muted mt-1">
              Here’s a quick overview of your profile.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate('/create-project')}
              className="cursor-pointer text-accent-text bg-accent hover:bg-accent-hover px-3 py-2 rounded-md"
            >
              + Create Project
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card text-center">
            <p className="text-muted">Portfolio Visits</p>
            <h2 className="text-2xl font-bold">{portfolioVisits}</h2>
          </div>

          <div className="card text-center">
            <p className="text-muted">Projects</p>
            <h2 className="text-2xl font-bold">{projectCount}</h2>
          </div>

          <div className="card text-center">
            <p className="text-muted">Skills</p>
            <h2 className="text-2xl font-bold">
              {user.skills?.length || 0}
            </h2>
          </div>
        </div>

        {/* Skills Preview */}
        {user.skills && user.skills.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    background: "var(--color-secondary)",
                    color: "var(--foreground)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Profile Completion */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Profile Completion</span>
            <span className="font-semibold">{profileCompletion}%</span>
          </div>

          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${profileCompletion}%`,
                background: "var(--color-success)",
              }}
            />
          </div>

          {profileCompletion < 100 && (
            <div className="mt-4">
              <button
                className="button"
                onClick={() => navigate("/edit-profile")}
              >
                Complete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;