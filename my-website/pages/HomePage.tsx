// ds-page-plan: docs/plans/pages/Airbnb.md 1b0731a49ae670b1bb1cb555cebb43bcdf8ab2f02b45b89cab74e8eff3124884
import { useState } from "react";
import { Callout } from "@/components/Callout";
import { Chip } from "@/components/Chip";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Inspiration } from "@/components/Inspiration";
import { ListingCard } from "@/components/ListingCard";
import { Navigation } from "@/components/Navigation";
import { Text } from "@/components/Text";
import { imageUrl } from "@/assets/images";
import "./HomePage.css";

/** Hero tabs (website plan, Home 2). "All" is chosen at first. */
const SERVICES = [
  { value: "all", label: "All", iconSrc: imageUrl("icon-all") ?? "" },
  { value: "homes", label: "Homes", iconSrc: imageUrl("icon-homes") ?? "" },
  { value: "hotels", label: "Hotels", iconSrc: imageUrl("icon-hotels") ?? "" },
  { value: "experience", label: "Experience", iconSrc: imageUrl("icon-experiences") ?? "" },
  { value: "services", label: "Services", iconSrc: imageUrl("icon-services") ?? "" },
];

/** Stay in Seoul chips (website plan, Home 4). "Hotels" is chosen at first. */
const CHIPS = ["Hotels", "Motel", "Guesthouse", "Resort"];

/** Free Unsplash photos (docs/photo-credits.md): stay-<card>-<1..5>.jpg, one set of five per card. */
const stayPhotos = (card: number) =>
  [1, 2, 3, 4, 5]
    .map((n) => imageUrl(`stay-${String(card).padStart(2, "0")}-${n}`))
    .filter((url): url is string => Boolean(url));

export default function HomePage() {
  const [chip, setChip] = useState("Hotels");

  return (
    <div className="page-Home">
      <Navigation data-section="navigation" look="site" search={false} />

      <main>
        <Hero data-section="hero" backgroundSrc={imageUrl("bg") ?? ""} services={SERVICES} defaultService="all" />

        {/* Reservations: six Cancelation callouts in a row that scrolls sideways. */}
        <section className="page-Home__reservations" data-section="reservations">
          <div className="page-Home__reservations-scroll" role="region" aria-label="Reservations" tabIndex={0}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`reservation-${i}`} className="page-Home__reservation">
                <Callout
                  type="cancelation"
                  title="Your reservation"
                  imageSrc={imageUrl(`reservation-${i}`)}
                  imageAlt=""
                  status="CANCELED"
                  name="tiny house, tiny farm"
                  code="Reservation code: XMPQKAPZ6D"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Stay in Seoul: heading, four chips (one chosen), twelve stay cards that open /detail. */}
        <section className="page-Home__featured-listings" data-section="featured-listings" aria-labelledby="home-stay-in-seoul">
          <Text as="h2" variant="heading" id="home-stay-in-seoul">
            Stay in Seoul
          </Text>
          <div className="page-Home__chips">
            {CHIPS.map((label) => (
              <Chip key={label} selected={chip === label} onClick={() => setChip(label)}>
                {label}
              </Chip>
            ))}
          </div>
          <div className="page-Home__listings-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <ListingCard
                key={`listing-card-${i + 1}`}
                href="/detail"
                images={stayPhotos(i + 1)}
                imageAlt="Listing photo"
                autoPlayMs={3000 + (i % 4) * 400}
              />
            ))}
          </div>
        </section>

        <Inspiration data-section="inspiration" />
      </main>

      <Footer data-section="footer" privacyIconSrc={imageUrl("footer-icon-privacy")} />
    </div>
  );
}
