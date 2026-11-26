import figma from "@figma/code-connect";
import { ListingOverview } from "./ListingOverview";

/* Detail left column 812:11134 — first three children (812:11135 · 812:11144 · 812:11171). Not a Figma component. */
figma.connect(ListingOverview, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-11134", {
  example: () => (
    <ListingOverview
      title="Entire home in Gangneung-si, South Korea"
      details="4 guests · 2 bedrooms · 2 beds · 2 bathrooms"
      guestFavourite={{
        description: "One of the most loved homes on Airbnb, according to guests",
        rating: "4.98",
        reviewCount: "487",
        laurelLeftSrc: "detail-laurel-left.png",
        laurelRightSrc: "detail-laurel-right.png",
      }}
      highlights={[
        {
          imageSrc: "detail-highlight-top.png",
          imageLook: "inset",
          title: "Top 10% of homes",
          description: "This home is highly ranked based on ratings, reviews and reliability.",
        },
      ]}
      host={{
        avatarSrc: "detail-host-avatar.png",
        badgeSrc: "detail-icon-superhost.svg",
        title: "Hosted by 준구",
        description: "Superhost · 6 years hosting",
      }}
    />
  ),
});
