import figma from "@figma/code-connect";
import { Tabs } from "./Tabs";

/* Underline Tabs (229:2214): one Figma variant is one tab; Line=On is the selected tab (aria-selected). */
figma.connect(Tabs, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=229-2214", {
  example: () => (
    <Tabs
      variant="line"
      items={[
        { id: "popular", label: "Popular", content: "Popular destinations" },
        { id: "arts", label: "Arts & culture", content: "Arts & culture destinations" },
      ]}
    />
  ),
});

/* Pill Tabs (237:2219): the white segment is the selected tab. */
figma.connect(Tabs, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=237-2219", {
  example: () => (
    <Tabs
      variant="pill"
      defaultTab="flexible"
      items={[
        { id: "dates", label: "Choose dates", content: "Pick your dates." },
        { id: "flexible", label: "I’m flexible", content: "Stay for a weekend, a week or a month." },
      ]}
    />
  ),
});
