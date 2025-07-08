import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import WhySubscribeSection from "../components/sections/WhySubscribeSection";
import CoursesSection from "../components/sections/Courses/CoursesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import TeamSection from "../components/sections/Team/TeamPage";
import ContactSection from "../components/sections/ContactSection";
import WorkshopsSection from "../components/sections/Workshops/WorkshopsSection";
import Footer from "../components/sections/Footer";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <AboutSection />
        <WhySubscribeSection />
        <CoursesSection />
        <WorkshopsSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
