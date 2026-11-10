import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Work from "@/sections/Work";
import Expertise from "@/sections/Expertise";
import Leadership from "@/sections/Leadership";
import Playground from "@/sections/Playground";
import About from "@/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Work limit={4} />
      <Expertise />
      <Leadership />
      <Playground />
      <About />
    </>
  );
}
