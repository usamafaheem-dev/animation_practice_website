"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoSection from "./components/LogoSection";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoSection />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
