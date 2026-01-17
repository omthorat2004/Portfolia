import HIWCard from "../components/HIWCard";
import { howItWorksSteps } from "../utils/data";


const HowItWorks = () => {
    return (
        <div className="my-25 flex flex-col items-center gap-4 ">
            <div className="flex flex-col gap-4">
                <h1 className="section-headline">How It Works</h1>
                <p className="text-lg text-muted mb-12">Document your projects, share links, and showcase your portfolio — in just a few steps.</p>
            </div>
            <div className="flex flex-col max-w-2xl justify-center w-full mx-auto gap-4">
                {howItWorksSteps.map((ele) => {
                    return <HIWCard icon={ele.icon} id={ele.id} description={ele.description} title={ele.title} key={ele.id} />
                })}
            </div>
        </div>
    );
}

export default HowItWorks;
