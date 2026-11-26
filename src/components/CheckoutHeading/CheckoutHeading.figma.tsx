import figma from "@figma/code-connect";
import { CheckoutHeading } from "./CheckoutHeading";

/* Checkout "Section" 812:12216: back link 812:12217 + "Heading 1" 812:12224 (h1Tq copy 10613:12374). */
figma.connect(CheckoutHeading, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-12216", {
  example: () => <CheckoutHeading title="Confirm and pay" backHref="/detail" backLabel="Back" />,
});
