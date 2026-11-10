// The five moods. Only semantic colors change between them —
// structure, type and motion stay identical.
export type Mood = {
  id: string;
  name: string;
  background: string;
  foreground: string;
  accent: string;
  surface: string;
  accentForeground: string;
};

export const MOODS: Mood[] = [
  {
    id: "paper-ink",
    name: "Paper & Ink",
    background: "#F4F0E8",
    foreground: "#202019",
    accent: "#E05237",
    surface: "#E1D9CB",
    accentForeground: "#202019",
  },
  {
    id: "electric-lime",
    name: "Electric Lime",
    background: "#DFFF68",
    foreground: "#242619",
    accent: "#6543B5",
    surface: "#C5E655",
    accentForeground: "#F4F7E4",
  },
  {
    id: "lavender-haze",
    name: "Lavender Haze",
    background: "#D6C7FA",
    foreground: "#2A2043",
    accent: "#9E2956",
    surface: "#BEA8F1",
    accentForeground: "#FBF1F4",
  },
  {
    id: "coral-punch",
    name: "Coral Punch",
    background: "#F68C70",
    foreground: "#361C31",
    accent: "#542F9B",
    surface: "#E97462",
    accentForeground: "#FFF1EA",
  },
  {
    id: "midnight-acid",
    name: "Midnight Acid",
    background: "#171B31",
    foreground: "#F3F0E8",
    accent: "#D6F36B",
    surface: "#2B3150",
    accentForeground: "#171B31",
  },
];

export const STORAGE_KEY = "asib-mood";

// Runs in <head> before first paint so the saved mood never flashes.
export const themeBootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var ids=${JSON.stringify(
  MOODS.map((m) => m.id)
)};var s=localStorage.getItem("${STORAGE_KEY}");if(s&&ids.indexOf(s)>-1){d.setAttribute("data-theme",s)}}catch(e){}try{if(!sessionStorage.getItem("asib-loaded")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.loading="1"}}catch(e){}})();`;
