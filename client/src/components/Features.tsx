import { AiOutlineProject } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const features = [
  {
    icon: <AiOutlineProject className="text-accent text-4xl" />,
    title: "Organize Projects",
    desc: "Keep all your project details, tech stacks, and links in one place."
  },
  {
    icon: <FaLink className="text-accent text-4xl" />,
    title: "Centralized Resources",
    desc: "Attach GitHub, demos, PPT, and research papers — no scattered files."
  },
  {
    icon: <MdOutlineShare className="text-accent text-4xl" />,
    title: "Public Portfolio",
    desc: "Share your work publicly with a clean, professional portfolio page."
  },
  {
    icon: <GiConfirmed className="text-accent text-4xl" />,
    title: "Verified Contributions",
    desc: "Show who created what and get credit for your work."
  }
];

export default function Features() {
  return (
    <section className="mt-16 max-w-6xl mx-auto px-6 flex flex-col gap-10">
    <h1 className="section-headline text-center">Powerful Features for Project Portfolios</h1>
      <div className="grid md:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="bg-card rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div>{feature.icon}</div>
            <h3 className="mt-4 font-bold text-foreground text-lg">{feature.title}</h3>
            <p className="mt-2 text-muted text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
