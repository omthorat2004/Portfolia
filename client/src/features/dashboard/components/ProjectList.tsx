import { useEffect, useRef, useState } from 'react';
import LoadingIcons from 'react-loading-icons';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { fetchUserProjects, selectProjects, selectProjectsLoading } from '../../projects/projectSlice';
import DashboardProjectCard from './DashboardProjectCard';


const ITEMS_PER_LOAD = 9

const ProjectList = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectProjects);
    const loading = useAppSelector(selectProjectsLoading);

    const [visibleCount, setVisibleCount] = useState(9);
    const ref = useRef(null)

    useEffect(() => {
        dispatch(fetchUserProjects());
    }, [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + ITEMS_PER_LOAD)
                    }, 2000)
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <div className='max-w-5xl px-4 my-10 flex flex-col gap-4  mx-auto'>
            <h1 className='text-2xl font-bold'>My Projects</h1>
            {loading && <div className='flex justify-center'><LoadingIcons.Bars stroke="#ea580c" /></div>}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 '>
                {projects.slice(0, visibleCount).map((project) => {
                    return <DashboardProjectCard id={project._id} github={project.githubLink ?? ''} title={project.intro ?? ''} description={project.intro ?? ''} techStack={project.teckStack ?? []} demo={project.liveLink ?? ''} />
                })}
            </div>
            {visibleCount < projects.length && <div ref={ref} className='flex justify-center'>
                <LoadingIcons.Bars stroke="#ea580c" />
            </div>}
        </div>
    );
}

export default ProjectList;
