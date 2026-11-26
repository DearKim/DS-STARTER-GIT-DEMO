import figma from "@figma/code-connect";
import { RadioButton } from "./RadioButton";

figma.connect(RadioButton, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=213-1943", {
  example: () => <RadioButton name="door" value="keypad" label="Keypad" subtext="Guests can open the door with a code" />,
});

figma.connect(RadioButton, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=213-1944", {
  example: () => <RadioButton name="door" value="keypad" aria-label="Keypad" />,
});
