import figma from "@figma/code-connect";
import { Inspiration } from "./Inspiration";

/* "Container:margin" 389:7517 (Home). Detail 812:433 and Checkout 10613:12104 are the same layers. */
figma.connect(Inspiration, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=389-7517", {
  example: () => <Inspiration />,
});
