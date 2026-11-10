import RollButton from "@/components/RollButton";

export default function NotFound() {
  return (
    <section className="phero wrap" style={{ minHeight: "70svh" }}>
      <h1 className="display phero__title">Off the map.</h1>
      <p className="lede" style={{ marginTop: "2rem" }}>This page doesn&rsquo;t exist. The work does.</p>
      <div style={{ marginTop: "2rem" }}>
        <RollButton href="/" label="Back home" />
      </div>
    </section>
  );
}
