import figma from "@figma/code-connect";
import { Chip } from "./Chip";

figma.connect(Chip, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=234-2568", {
  props: {
    // Hover/Pressed/Focus are CSS states; only Select is a prop.
    selected: figma.enum("State", {
      Default: false,
      Hover: false,
      Pressed: false,
      Focus: false,
      Select: true,
    }),
  },
  example: ({ selected }) => <Chip selected={selected}>Hotels</Chip>,
});
