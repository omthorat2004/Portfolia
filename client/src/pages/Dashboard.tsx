import { useEffect } from 'react';
import ProjectList from "../features/dashboard/components/ProjectList";
import WelcomeDashboard from "../features/dashboard/components/WelcomeDashboard";
import { fetchUserProjects } from '../features/projects/projectSlice';
import { useAppDispatch } from '../store/hook';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProjects());
  }, [dispatch]);

  return (
    <div className='mt-25'>
      <WelcomeDashboard />
      <ProjectList />
    </div>
  );
}

export default Dashboard;
