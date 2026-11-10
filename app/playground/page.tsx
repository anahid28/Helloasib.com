import type { Metadata } from "next";
import Playground from "@/sections/Playground";

export const metadata: Metadata = { title: "Playground", alternates: { canonical: "/playground/" } };

export default function PlaygroundPage() {
  return (
    <div style={{ paddingTop: "3rem" }}>
      <Playground />
    </div>
  );
}
