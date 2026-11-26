import figma from "@figma/code-connect";
import { ServiceTab } from "./ServiceTab";

figma.connect(ServiceTab, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=418-3150", {
  props: {
    // Status=Hover is the CSS :hover look, not a prop.
    selected: figma.enum("Status", {
      Default: false,
      Hover: false,
      Selected: true,
    }),
  },
  example: ({ selected }) => <ServiceTab label="All" iconSrc="/my-assets/images/icon-all.png" selected={selected} />,
});
