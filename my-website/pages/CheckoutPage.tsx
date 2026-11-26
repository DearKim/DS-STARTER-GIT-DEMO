import { useState } from "react";
import { imageUrl } from "@/assets/images";
import { Callout } from "@/components/Callout";
import { CheckoutHeading } from "@/components/CheckoutHeading";
import { CheckoutStep } from "@/components/CheckoutStep";
import type { CheckoutStepOption } from "@/components/CheckoutStep";
import { Footer, FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from "@/components/Footer";
import { Inspiration, INSPIRATION_DESTINATIONS, INSPIRATION_TABS } from "@/components/Inspiration";
import { Navigation } from "@/components/Navigation";
import { ReservationSummary } from "@/components/ReservationSummary";
import "./CheckoutPage.css";

/** "1. Choose when to pay" — the three choices of the website plan (Checkout 3). */
const PAY_OPTIONS: CheckoutStepOption[] = [
  { value: "now", label: "Pay £340.91 now" },
  { value: "zero", label: "Pay £0 now", subtext: "£340.91 charged on 13 Jan 2027. No extra fees.", actionLabel: "More info" },
  {
    value: "klarna",
    label: "Pay in 3 payments with Klarna",
    subtext: "3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status.",
    actionLabel: "More info",
  },
];

export default function CheckoutPage() {
  // Nothing is chosen at first; clicking a choice (its words or its radio) chooses it (website plan, Checkout 4).
  const [payWhen, setPayWhen] = useState<string | null>(null);

  return (
    <div className="page-Checkout">
      <Navigation type="main" look="site" search={false} logoHref="/" />

      <main className="page-Checkout__main">
        <div className="page-Checkout__heading-wrapper">
          <CheckoutHeading title="Confirm and pay" backHref="/detail" backLabel="Back" />
        </div>

        <div className="page-Checkout__content-wrapper">
          <div className="page-Checkout__steps">
            <CheckoutStep
              open
              title="1. Choose when to pay"
              name="pay-when"
              options={PAY_OPTIONS}
              value={payWhen}
              onValueChange={setPayWhen}
              nextLabel="Next"
            />
            <CheckoutStep title="2. Add a payment method" />
            <CheckoutStep title="3. Review your reservation" />
          </div>

          <aside className="page-Checkout__summary" aria-label="Reservation summary">
            <ReservationSummary
              imageSrc={imageUrl("checkout-stay-thumb")}
              imageAlt=""
              title="STAY 2572"
              rating="4.98 (487)"
              badge="Guest favourite"
              cancellationTitle="Free cancellation"
              cancellationText="Cancel before 21 January for a full refund."
              policyLabel="Full policy"
              dates="22–24 Jan 2027"
              guests="1 adult"
              priceLine="2 nights x £170.46"
              priceAmount="£340.91"
              total="£340.91"
              currency="GBP"
              breakdownLabel="Price breakdown"
            />
            <Callout type="banner" iconSrc={imageUrl("checkout-icon-rare-find")}>
              Rare find! This place is usually booked
            </Callout>
          </aside>
        </div>

        <div className="page-Checkout__inspiration">
          <Inspiration
            heading="Inspiration for future getaways"
            tabs={INSPIRATION_TABS}
            defaultTab="popular"
            destinations={INSPIRATION_DESTINATIONS}
            showMoreLabel="Show more"
          />
        </div>
      </main>

      <Footer columns={FOOTER_COLUMNS} legalLinks={FOOTER_LEGAL_LINKS} privacyIconSrc={imageUrl("footer-icon-privacy")} />
    </div>
  );
}
