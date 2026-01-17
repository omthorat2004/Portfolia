import FAQs from "../components/FAQs";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";


const Home = () => {
  return (
    <div className="bg-background my-25  flex flex-col space-y-16">
        <HeroSection/>
        <Features/>
        <FAQs/>
    </div>
  );
}

export default Home;
