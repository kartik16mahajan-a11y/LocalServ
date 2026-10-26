import HeroSection from './sections/HeroSection';
import ServicesPreview from './sections/ServicesPreview';
import HowItWorksSection from './sections/HowItWorksSection';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import './Home.css';

function HomePage() {
  return (
    <div className="home-page-view">
      <HeroSection />
      <ServicesPreview />
      <HowItWorksSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

export default HomePage;
