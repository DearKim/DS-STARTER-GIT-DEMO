import figma from "@figma/code-connect";
import { Button } from "./Button";

/* Figma: Primary Buttons 238:2153 · Secondary Buttons 238:2188 · Tertiary Buttons 238:2256.
   State Hover/Pressed/Focus are CSS states, so only Loading and Disabled map to props. */
const FILE = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/";

const props = {
  size: figma.enum("Size", { "Full Width": "full-width", Small: "small" }),
  loading: figma.enum("State", { Loading: true }),
  disabled: figma.enum("State", { Disabled: true }),
} as const;

figma.connect(Button, `${FILE}?node-id=238-2153`, {
  props,
  example: ({ size, loading, disabled }) => (
    <Button variant="primary" size={size} loading={loading} disabled={disabled}>Button</Button>
  ),
});

figma.connect(Button, `${FILE}?node-id=238-2188`, {
  props,
  example: ({ size, loading, disabled }) => (
    <Button variant="secondary" size={size} loading={loading} disabled={disabled}>Button</Button>
  ),
});

figma.connect(Button, `${FILE}?node-id=238-2256`, {
  props,
  example: ({ size, loading, disabled }) => (
    <Button variant="tertiary" size={size} loading={loading} disabled={disabled}>Button</Button>
  ),
});
