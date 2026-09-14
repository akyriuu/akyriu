import { Contact, Footer } from "@/components/contact";
import { Decisions } from "@/components/decisions";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { NavBar } from "@/components/nav-bar";
import { Projects } from "@/components/projects";
import { Education, StackGrid } from "@/components/stack-grid";
import { SkipLink } from "@/components/skip-link";

export default function Home() {
  return (
    <>
      <SkipLink />
      <NavBar />
      <main id="conteudo" className="flex-1">
        <Hero />
        <Metrics />
        <Projects />
        <Experience />
        <Decisions />
        <StackGrid />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
