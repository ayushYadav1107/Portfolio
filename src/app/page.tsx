import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Experience, Recognition, Toolbox } from "@/components/Sections";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Toolbox />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
