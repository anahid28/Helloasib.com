import type { Metadata } from "next";
import About from "@/sections/About";
import Expertise from "@/sections/Expertise";
import Leadership from "@/sections/Leadership";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return (
    <>
      <div style={{ paddingTop: "4rem" }}>
        <About full />
      </div>
      <Leadership />
      <Expertise />
    </>
  );
}
