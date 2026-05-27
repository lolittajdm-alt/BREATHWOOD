import { About } from "@/components/sections/About";
import { FruitFlavors } from "@/components/sections/FruitFlavors";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { TableOfContent } from "@/components/sections/TableOfContent";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="relative">
      {/* Original portfolio sections */}
      {/*
        NOTE: This project is structured as a single-page portfolio composed of section components.
      */}
      <Hero />
      <Testimonials />
      <About />
      <FruitFlavors />
      <TableOfContent />
      <Services />
      <ContactForm />
      <Footer />
    </main>
  );
}
