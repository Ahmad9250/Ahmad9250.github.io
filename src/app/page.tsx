import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import SelectedWork from "@/components/SelectedWork";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <Navigation />
      <main id="main-content">
        <Hero />
        <Impact />
        <SelectedWork />
        <About />
        <Expertise />
        <Experience />
        <TechStack />
        <Education />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
