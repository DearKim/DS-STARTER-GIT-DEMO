import figma from "@figma/code-connect";
import { SleepSection } from "./SleepSection";

/* Detail "Where you'll sleep" container 812:11238 (line, title 812:11244, bedroom frames 812:11249 · 812:11256). Not a Figma component. */
figma.connect(SleepSection, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-11238", {
  example: () => (
    <SleepSection
      rooms={[
        { title: "Bedroom 1", description: "1 queen bed" },
        { title: "Bedroom 2", description: "1 queen bed" },
      ]}
    />
  ),
});
