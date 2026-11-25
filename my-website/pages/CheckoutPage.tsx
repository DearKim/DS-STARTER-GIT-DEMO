import { useState } from "react";
import { Link } from "@/components/Link";
import { imageUrl } from "@/assets/images";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const [inspTab, setInspTab] = useState("Popular");
  const [payWhen, setPayWhen] = useState<"now" | "zero" | "klarna" | null>(null);
  const destinations = [
    { title: "Washington", subtitle: "Apartment rentals" },
    { title: "West Palm Beach", subtitle: "Cottage rentals" },
    { title: "Savannah", subtitle: "Villa rentals" },
    { title: "Manhattan", subtitle: "Vacation rentals" },
    { title: "Kansas City", subtitle: "Apartment rentals" },
    { title: "Destin", subtitle: "House rentals" },
    { title: "Amsterdam", subtitle: "Cabin rentals" },
    { title: "St. Petersburg", subtitle: "Vacation rentals" },
    { title: "Las Vegas", subtitle: "House rentals" },
    { title: "Cartagena", subtitle: "Villa rentals" },
    { title: "Milan", subtitle: "Condo rentals" },
    { title: "Pocono Mountains", subtitle: "Monthly Rentals" },
    { title: "Sacramento", subtitle: "Apartment rentals" },
    { title: "Jersey City", subtitle: "House rentals" },
    { title: "Broken Bow", subtitle: "Cottage rentals" },
    { title: "Osaka", subtitle: "House rentals" },
    { title: "Sarasota", subtitle: "House rentals" },
  ];

  const footerLinks = {
    support: [
      "Help Center",
      "Get help with a safety issue",
      "AirCover",
      "Travel insurance",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
      "Report neighborhood concern",
    ],
    hosting: [
      "Airbnb your home",
      "Airbnb your hotel",
      "Airbnb your experience",
      "Airbnb your service",
      "AirCover for Hosts",
      "Earnings Protection",
      "Hosting resources",
      "Community Center",
      "Hosting responsibly",
      "Airbnb-friendly apartments",
      "Join a free hosting class",
      "Find a co‑host",
      "Refer a host",
    ],
    about: [
      "2026 Summer Release",
      "Newsroom",
      "Careers",
      "Investors",
      "Gift cards",
      "Airbnb.org emergency stays",
    ],
  };

  return (
    <main className="page-Checkout">
      {/* Navigation */}
      <section className="page-Checkout__navigation" data-section="navigation">
        <div className="page-Checkout__navigation-left">
          <a href="/" className="page-Checkout__logo-link">
            <img src="/my-assets/images/logo.png" alt="Airbnb" className="page-Checkout__logo" />
          </a>
        </div>
        <div className="page-Checkout__navigation-right">
          <Link key="become-host-link" className="page-Checkout__become-host">{"Become a Host"}</Link>
          <button className="page-Checkout__globe-button" aria-label="Language">
            <img src={imageUrl("nav-globe") ?? ""} alt="" width={18} height={18} />
          </button>
          <div className="page-Checkout__user-card">
            <button className="page-Checkout__menu-button" aria-label="Menu">
              <img src={imageUrl("nav-menu") ?? ""} alt="" width={14} height={9.5} />
            </button>
            <button className="page-Checkout__avatar-button" aria-label="User menu">
              <img src={imageUrl("nav-avatar") ?? ""} alt="" width={34} height={36} />
            </button>
          </div>
        </div>
      </section>

      {/* Page heading */}
      <div className="page-Checkout__heading-wrapper">
        <a href="/detail" className="page-Checkout__back-link">
          <img src={imageUrl("checkout-icon-back") ?? ""} alt="" className="page-Checkout__back-icon" width={14.3} height={13.4} />
        </a>
        <h1 className="page-Checkout__title">{"Confirm and pay"}</h1>
      </div>

      {/* Content: left steps + right summary */}
      <div className="page-Checkout__content-wrapper">
        <div className="page-Checkout__content">
          <div className="page-Checkout__steps">
            {/* Card 1: Choose when to pay */}
            <div className="page-Checkout__step-card page-Checkout__step-card--primary">
              <h2 className="page-Checkout__step-title">{"1. Choose when to pay"}</h2>
              <div className="page-Checkout__options" role="radiogroup" aria-label="Choose when to pay">
                <label className="page-Checkout__option-row page-Checkout__option-row--pb16">
                  <div className="page-Checkout__option-text">
                    <span>{"Pay £340.91 now"}</span>
                  </div>
                  <input className="page-Checkout__radio-input" type="radio" name="pay-when" value="now" checked={payWhen === "now"} onChange={() => setPayWhen("now")} />
                  <span className="page-Checkout__radio" aria-hidden="true" />
                </label>
                <div className="page-Checkout__option-divider"></div>
                <label className="page-Checkout__option-row page-Checkout__option-row--py16">
                  <div className="page-Checkout__option-text">
                    <span>{"Pay £0 now"}</span>
                    <div className="page-Checkout__option-subtitle">
                      <span>{"£340.91 charged on 13 Jan 2027. No extra fees. "}</span>
                      <a className="page-Checkout__more-info" href="#">{"More info"}</a>
                    </div>
                  </div>
                  <input className="page-Checkout__radio-input" type="radio" name="pay-when" value="zero" checked={payWhen === "zero"} onChange={() => setPayWhen("zero")} />
                  <span className="page-Checkout__radio" aria-hidden="true" />
                </label>
                <div className="page-Checkout__option-divider"></div>
                <label className="page-Checkout__option-row page-Checkout__option-row--py16">
                  <div className="page-Checkout__option-text">
                    <span>{"Pay in 3 payments with Klarna"}</span>
                    <div className="page-Checkout__option-subtitle">
                      <span>{"3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status. "}</span>
                      <a className="page-Checkout__more-info" href="#">{"More info"}</a>
                    </div>
                  </div>
                  <input className="page-Checkout__radio-input" type="radio" name="pay-when" value="klarna" checked={payWhen === "klarna"} onChange={() => setPayWhen("klarna")} />
                  <span className="page-Checkout__radio" aria-hidden="true" />
                </label>
              </div>
              <div className="page-Checkout__next-row">
                <button className="page-Checkout__next-btn">{"Next"}</button>
              </div>
            </div>

            {/* Card 2: Add a payment method */}
            <div className="page-Checkout__step-card page-Checkout__step-card--bordered">
              <h2 className="page-Checkout__step-title">{"2. Add a payment method"}</h2>
            </div>

            {/* Card 3: Review your reservation */}
            <div className="page-Checkout__step-card page-Checkout__step-card--bordered">
              <h2 className="page-Checkout__step-title">{"3. Review your reservation"}</h2>
            </div>
          </div>
          <aside className="page-Checkout__summary">
            {/* Summary card */}
            <div className="page-Checkout__summary-card">
              {/* Row 1: Thumbnail + Title */}
              <div className="page-Checkout__summary-thumb-row">
                <img src={imageUrl("checkout-stay-thumb") ?? ""} alt="STAY 2572" className="page-Checkout__summary-thumb" width={103} height={103} />
                <div className="page-Checkout__summary-thumb-info">
                  <h3 className="page-Checkout__summary-stay-title">{"STAY 2572"}</h3>
                  <div className="page-Checkout__summary-badges">
                    <div className="page-Checkout__summary-badge">
                      <img src={imageUrl("checkout-icon-star") ?? ""} alt="" className="page-Checkout__badge-icon" width={12} height={12} />
                      <span>{"4.98 (487)"}</span>
                    </div>
                    <div className="page-Checkout__summary-badge">
                      <img src={imageUrl("checkout-icon-guest-favourite") ?? ""} alt="" className="page-Checkout__badge-icon" width={12} height={12} />
                      <span>{"Guest favourite"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Free cancellation */}
              <div className="page-Checkout__summary-cancellation">
                <div className="page-Checkout__summary-cancellation-title">{"Free cancellation"}</div>
                <div className="page-Checkout__summary-cancellation-desc">
                  <span>{"Cancel before 21 January for a full refund. "}</span>
                  <a className="page-Checkout__summary-link" href="#">{"Full policy"}</a>
                </div>
              </div>

              {/* Divider */}
              <div className="page-Checkout__summary-divider page-Checkout__summary-divider--light"></div>

              {/* Row 3: Dates */}
              <div className="page-Checkout__summary-info-row">
                <div className="page-Checkout__summary-info-left">
                  <div className="page-Checkout__summary-info-label">{"Dates"}</div>
                  <div className="page-Checkout__summary-info-value">{"22–24 Jan 2027"}</div>
                </div>
                <button className="page-Checkout__summary-change-btn">{"Change"}</button>
              </div>

              {/* Divider */}
              <div className="page-Checkout__summary-divider page-Checkout__summary-divider--light"></div>

              {/* Row 4: Guests */}
              <div className="page-Checkout__summary-info-row">
                <div className="page-Checkout__summary-info-left">
                  <div className="page-Checkout__summary-info-label">{"Guests"}</div>
                  <div className="page-Checkout__summary-info-value">{"1 adult"}</div>
                </div>
                <button className="page-Checkout__summary-change-btn">{"Change"}</button>
              </div>

              {/* Divider */}
              <div className="page-Checkout__summary-divider page-Checkout__summary-divider--light"></div>

              {/* Row 5: Price details */}
              <div className="page-Checkout__summary-price">
                <div className="page-Checkout__summary-price-heading">{"Price details"}</div>
                <div className="page-Checkout__summary-price-body">
                  <div className="page-Checkout__summary-price-line">
                    <span>{"2 nights x £170.46"}</span>
                    <span>{"£340.91"}</span>
                  </div>
                  <div className="page-Checkout__summary-divider page-Checkout__summary-divider--dark"></div>
                  <div className="page-Checkout__summary-price-line page-Checkout__summary-price-line--total">
                    <div className="page-Checkout__summary-total-left">
                      <span className="page-Checkout__summary-total-label">{"Total"}</span>
                      <a className="page-Checkout__summary-link page-Checkout__summary-link--inline" href="#">{"GBP"}</a>
                    </div>
                    <span className="page-Checkout__summary-total-amount">{"£340.91"}</span>
                  </div>
                  <a className="page-Checkout__summary-link page-Checkout__summary-link--breakdown" href="#">{"Price breakdown"}</a>
                </div>
              </div>
            </div>

            {/* Rare find banner */}
            <div className="page-Checkout__rare-find">
              <img src={imageUrl("checkout-icon-rare-find") ?? ""} alt="" className="page-Checkout__rare-find-icon" width={32} height={32} />
              <span>{"Rare find! This place is usually booked"}</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Inspiration */}
      <section className="page-Checkout__inspiration" data-section="inspiration">
        <h2 className="page-Checkout__inspiration-heading">{"Inspiration for future getaways"}</h2>
        <div className="page-Checkout__inspiration-tabs">
          <div className="page-Checkout__inspiration-tab-list">
            {["Popular","Arts & culture","Beach","Mountains","Outdoors","Things to do","Travel tips & inspiration","Airbnb-friendly apartments"].map((label) => (
              <button key={label} type="button" className={`page-Checkout__inspiration-tab${inspTab === label ? " page-Checkout__inspiration-tab--active" : ""}`} aria-pressed={inspTab === label} onClick={() => setInspTab(label)}>{label}</button>
            ))}
          </div>
          <div className="page-Checkout__inspiration-divider"></div>
        </div>
        <div className="page-Checkout__destination-grid">
          {destinations.map((dest, i) => (
            <div key={`dest-${i}`} className="page-Checkout__destination-link">
              <div className="page-Checkout__destination-link-title">{dest.title}</div>
              <div className="page-Checkout__destination-link-subtitle">{dest.subtitle}</div>
            </div>
          ))}
          <div className="page-Checkout__destination-link page-Checkout__show-more">
            <span>Show more</span>
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="page-Checkout__footer" data-section="footer">
        <div className="page-Checkout__footer-container">
          <div className="page-Checkout__footer-grid">
            <div className="page-Checkout__footer-section">
              <h3 className="page-Checkout__footer-section-heading">Support</h3>
              <ul className="page-Checkout__footer-list">
                {footerLinks.support.map((link, i) => (
                  <li key={`support-${i}`}>
                    <a className="page-Checkout__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="page-Checkout__footer-section">
              <h3 className="page-Checkout__footer-section-heading">Hosting</h3>
              <ul className="page-Checkout__footer-list">
                {footerLinks.hosting.map((link, i) => (
                  <li key={`hosting-${i}`}>
                    <a className="page-Checkout__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="page-Checkout__footer-section">
              <h3 className="page-Checkout__footer-section-heading">Airbnb</h3>
              <ul className="page-Checkout__footer-list">
                {footerLinks.about.map((link, i) => (
                  <li key={`about-${i}`}>
                    <a className="page-Checkout__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="page-Checkout__footer-bottom">
          <div className="page-Checkout__footer-bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="page-Checkout__footer-sep">·</span>
            <a className="page-Checkout__footer-link" href="#">Privacy</a>
            <span className="page-Checkout__footer-sep">·</span>
            <a className="page-Checkout__footer-link" href="#">Terms</a>
            <span className="page-Checkout__footer-sep">·</span>
            <a className="page-Checkout__footer-link" href="#">Your Privacy Choices</a>
            <img src="/images/privacy-icon.svg" alt="" className="page-Checkout__footer-privacy-icon" />
          </div>
          <div className="page-Checkout__footer-bottom-right">
            <button className="page-Checkout__footer-btn" type="button">
              <img src="/images/globe-icon.svg" alt="" className="page-Checkout__footer-btn-icon" />
              <span>English (US)</span>
            </button>
            <button className="page-Checkout__footer-btn page-Checkout__footer-btn--currency" type="button">
              <span>₩</span>
              <span>KRW</span>
            </button>
            <div className="page-Checkout__footer-social">
              <a className="page-Checkout__footer-social-link" href="#" aria-label="Facebook">
                <img src="/images/facebook-icon.svg" alt="" className="page-Checkout__footer-social-icon" />
              </a>
              <a className="page-Checkout__footer-social-link" href="#" aria-label="X">
                <img src="/images/x-icon.svg" alt="" className="page-Checkout__footer-social-icon" />
              </a>
              <a className="page-Checkout__footer-social-link" href="#" aria-label="Instagram">
                <img src="/images/instagram-icon.svg" alt="" className="page-Checkout__footer-social-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
