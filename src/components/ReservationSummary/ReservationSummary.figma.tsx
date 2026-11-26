import figma from "@figma/code-connect";
import { ReservationSummary } from "./ReservationSummary";

/* Checkout summary card 812:12281 (h1Tq copy 10613:12434). */
figma.connect(ReservationSummary, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-12281", {
  example: () => (
    <ReservationSummary
      title="STAY 2572"
      rating="4.98 (487)"
      badge="Guest favourite"
      cancellationText="Cancel before 21 January for a full refund."
      dates="22–24 Jan 2027"
      guests="1 adult"
      priceLine="2 nights x £170.46"
      priceAmount="£340.91"
      total="£340.91"
    />
  ),
});
