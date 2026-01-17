
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineProject } from "react-icons/ai";

const HeroSection = () => {
  return (
    <div className="px-4 md:px-0">
        <div className="max-w-5xl mx-auto text-center py-5 flex flex-col gap-4">
            <h1 className="section-headline text-6xl">Built for Developers Who Care About Their Work</h1>
            <p className="font-semibold  mx-auto">Document projects with code links, tech stacks, and demos — without clutter.</p>
            <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                <button className="bg-accent text-accent-text hover:bg-accent-hover px-4 py-2 shadow hover:shadow-xl rounded-lg flex items-center gap-2"><span>Start Building </span><HiOutlineBuildingOffice2/></button>
                <button className="bg-accent text-accent-text hover:bg-accent-hover px-4 py-2 shadow hover:shadow-xl rounded-lg flex items-center gap-2"><span>View Projects</span> <AiOutlineProject/></button>
            </div>
        </div>
    </div>
  );
}

export default HeroSection;
