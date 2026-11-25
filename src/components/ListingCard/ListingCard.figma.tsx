import figma from "@figma/code-connect";
import { ListingCard } from "./ListingCard";

figma.connect(ListingCard, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2494", {
  example: () => (
    <ListingCard
      title="Groveland, California"
      location="Yosemite National Park"
      dates="Oct 23 - 28"
      price="$289"
      priceUnit="night"
      rating="4.91"
    />
  ),
});
