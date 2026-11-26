import { imageUrl } from "@/assets/images";
import { Card } from "@/components/Card";
import { Footer, FOOTER_COLUMNS } from "@/components/Footer";
import { Inspiration, INSPIRATION_DESTINATIONS, INSPIRATION_TABS } from "@/components/Inspiration";
import { ListingDescription } from "@/components/ListingDescription";
import { ListingOverview } from "@/components/ListingOverview";
import type { ListingHighlight } from "@/components/ListingOverview";
import { ListingTitle } from "@/components/ListingTitle";
import { Navigation } from "@/components/Navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import type { PhotoGalleryProps } from "@/components/PhotoGallery";
import { SleepSection } from "@/components/SleepSection";
import "./DetailPage.css";

/** my-website pictures (my-assets/images). */
const img = (name: string) => imageUrl(name) ?? "";

/* ── Page data (my-docs/inbox/website-plan.md, Detail) ── */

/** Photo alt text: plan PhotoGallery Q-03 (photo 1 from the page plan, 2–5 the Figma layer names). */
const PHOTOS: PhotoGalleryProps["photos"] = [
  { src: img("detail-photo-1"), alt: "Dining room" },
  { src: img("detail-photo-2"), alt: "Kalani’s guesthouse TAHAA 이미지 2" },
  { src: img("detail-photo-3"), alt: "Kalani’s guesthouse TAHAA 이미지 3" },
  { src: img("detail-photo-4"), alt: "Kalani’s guesthouse TAHAA 이미지 4" },
  { src: img("detail-photo-5"), alt: "Kalani’s guesthouse TAHAA 이미지 5" },
];

const HIGHLIGHTS: ListingHighlight[] = [
  {
    imageSrc: img("detail-highlight-top"),
    imageLook: "inset",
    title: "Top 10% of homes",
    description: "This home is highly ranked based on ratings, reviews and reliability.",
  },
  {
    imageSrc: img("detail-highlight-near"),
    imageLook: "framed",
    title: "Near Anmok Beach",
    description: "Anmok Beach is about an 8-min walk away, with the coast close by for a seaside outing.",
  },
  {
    imageSrc: img("detail-highlight-kitchen"),
    imageLook: "full",
    title: "Roomy home with a full kitchen",
    description: "A roomy private home with a full kitchen gives your group space to cook and settle in.",
  },
  {
    imageSrc: img("detail-highlight-cleanliness"),
    imageLook: "full",
    title: "Guests praise the cleanliness",
    description: "Guests repeatedly praise the spotless rooms and thoughtful upkeep throughout the home.",
  },
];

const DESCRIPTION = [
  "Inbyulgram | @stay_2572",
  "This is' stay 2572 ', located on the way to Anmok Coffee Street.",
  "We will try to provide a complete 'rest' for our guests.",
  "",
  "",
  "Stay 2572 provides a 40-pyeong space used by the host as a private house.",
  "(This is for 4 people)",
].join("\n");

const BEDROOMS = [1, 2].map((i) => ({
  imageSrc: img(`detail-bedroom-${i}`),
  imageAlt: `Bedroom ${i}`,
  title: `Bedroom ${i}`,
  description: "1 queen bed",
}));

/* PRD §4: everything below except the logo and "Reserve" is "nothing, just shows it" —
   the components render real buttons, and the page passes no action. */
export default function DetailPage() {
  return (
    <div className="page-Detail">
      <Navigation look="site" logoHref="/" />

      <main>
        <div className="page-Detail__title" data-section="title">
          <ListingTitle title="Kalani’s guesthouse TAHAA" shareLabel="공유하기" saveLabel="저장" labelLang="ko" />
        </div>

        <div className="page-Detail__gallery" data-section="gallery">
          <PhotoGallery photos={PHOTOS} showAllLabel="사진 모두 보기" labelLang="ko" />
        </div>

        <div className="page-Detail__content" data-section="content">
          <div className="page-Detail__info">
            <ListingOverview
              title="Entire home in Gangneung-si, South Korea"
              details="4 guests · 2 bedrooms · 2 beds · 2 bathrooms"
              guestFavourite={{
                labelLines: ["Guest", "favourite"],
                description: "One of the most loved homes on Airbnb, according to guests",
                rating: "4.98",
                reviewCount: "487",
                reviewLabel: "Reviews",
                laurelLeftSrc: img("detail-laurel-left"),
                laurelRightSrc: img("detail-laurel-right"),
              }}
              highlights={HIGHLIGHTS}
              host={{
                avatarSrc: img("detail-host-avatar"),
                badgeSrc: img("detail-icon-superhost"),
                title: "Hosted by 준구",
                description: "Superhost · 6 years hosting",
              }}
              learnMoreLabel="Learn more about summaries"
            />
          </div>
          <div className="page-Detail__booking">
            <Card
              type="reservation"
              layout="detail"
              originalPrice="$500"
              price="$440"
              priceUnit="night"
              rating="4.99"
              reviewCount="337 reviews"
              checkIn="2/6/2023"
              checkOut="2/11/2023"
              guests="1 guest"
              reserveLabel="Reserve"
              reserveHref="/checkout"
              note="You won't be charged yet"
              lineItems={[
                { label: "500 x 5 nights", amount: "$2,500" },
                { label: "Long stay discount", amount: "-$300", tone: "discount" },
                { label: "Cleaning fee", amount: "$200" },
                { label: "Service fee", amount: "$0" },
              ]}
              totalLabel="Total before taxes"
              total="$2,400"
              reportLabel="리스팅 신고하기"
            />
          </div>
        </div>

        <div className="page-Detail__description" data-section="description">
          <ListingDescription
            noticeText="Some info has been automatically translated."
            showOriginalLabel="Show original"
            text={DESCRIPTION}
            showMoreLabel="Show more"
          />
        </div>

        <div className="page-Detail__sleep" data-section="sleep">
          <SleepSection heading="Where you'll sleep" rooms={BEDROOMS} />
        </div>

        <div className="page-Detail__inspiration" data-section="inspiration">
          <Inspiration
            heading="Inspiration for future getaways"
            tabs={INSPIRATION_TABS}
            defaultTab="popular"
            destinations={INSPIRATION_DESTINATIONS}
            showMoreLabel="Show more"
          />
        </div>
      </main>

      <Footer data-section="footer" columns={FOOTER_COLUMNS} privacyIconSrc={img("footer-icon-privacy")} />
    </div>
  );
}
