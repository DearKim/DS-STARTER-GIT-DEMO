import figma from "@figma/code-connect";
import { Callout } from "./Callout";

figma.connect(Callout, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=235-2641", {
  props: {
    type: figma.enum("Property 1", {
      "Property Highlight": "highlight",
      Cancelation: "cancelation",
    }),
  },
  example: ({ type }) => <Callout type={type} />,
});
