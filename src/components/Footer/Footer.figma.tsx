import figma from "@figma/code-connect";
import { Footer } from "./Footer";

/* "Footer" 389:7358 (Home). Detail 812:578 and Checkout 10613:12249 are the same layers. */
figma.connect(Footer, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=389-7358", {
  example: () => <Footer />,
});
