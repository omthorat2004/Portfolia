import FAQs from "../components/FAQs";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";


const Home = () => {
  return (
    <div className="bg-background flex flex-col space-y-16">
        <HeroSection/>
        <Features/>
        <FAQs/>
        <Footer/>
    </div>
  );
}

export default Home;
