import figma from "@figma/code-connect";
import { Card } from "./Card";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2378";

/* Figma Card set 238:2378. "Default Card" is connected to ListingCard. */
figma.connect(Card, FIGMA_URL, {
  variant: { "Card type": "Sleep Card" },
  example: () => <Card type="sleep" title="Bedroom 2" description="2 single beds" />,
});

figma.connect(Card, FIGMA_URL, {
  variant: { "Card type": "Discount Card" },
  example: () => <Card type="discount" title="Private room in San Francisco" />,
});

figma.connect(Card, FIGMA_URL, {
  variant: { "Card type": "Map Card" },
  example: () => <Card type="map" title="Groveland, California" />,
});

figma.connect(Card, FIGMA_URL, {
  variant: { "Card type": "Reservation Card" },
  example: () => <Card type="reservation" />,
});

figma.connect(Card, FIGMA_URL, {
  variant: { "Card type": "Reservation Confirmation Card" },
  example: () => <Card type="reservation-confirmation" />,
});
