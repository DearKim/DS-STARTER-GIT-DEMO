import figma from "@figma/code-connect";
import { Navigation } from "./Navigation";

figma.connect(Navigation, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=235-2441", {
  props: {
    type: figma.enum("Type", {
      "Main Navigation": "main",
      "Stays Navigation": "stays",
      "Expanded Stays Navigation": "expanded",
    }),
  },
  example: ({ type }) => <Navigation type={type} logoHref="/" hostHref="/host" />,
});
