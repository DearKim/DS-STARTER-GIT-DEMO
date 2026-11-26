import figma from "@figma/code-connect";
import { CheckoutStep } from "./CheckoutStep";

/* Checkout step column 812:12227: open step 812:12228, closed steps 812:12274 · 812:12277 (h1Tq copy 10613:12386 · 10613:12427 · 10613:12430). */
figma.connect(CheckoutStep, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-12227", {
  example: () => (
    <CheckoutStep
      open
      title="1. Choose when to pay"
      name="pay-when"
      options={[
        { value: "now", label: "Pay £340.91 now" },
        { value: "zero", label: "Pay £0 now", subtext: "£340.91 charged on 13 Jan 2027. No extra fees.", actionLabel: "More info" },
        {
          value: "klarna",
          label: "Pay in 3 payments with Klarna",
          subtext: "3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status.",
          actionLabel: "More info",
        },
      ]}
    />
  ),
});
