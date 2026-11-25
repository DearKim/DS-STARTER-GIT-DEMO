// ds-page-plan: docs/plans/pages/Airbnb.md 1b0731a49ae670b1bb1cb555cebb43bcdf8ab2f02b45b89cab74e8eff3124884
import { Card } from "@/components/Card";
import { Link } from "@/components/Link";
import { ListingCard } from "@/components/ListingCard";
import { Search } from "@/components/Search";
import { Text } from "@/components/Text";
import "./HomePage.css";

export default function HomePage() {
  // Data
  const listingCards = Array.from({ length: 12 }, (_, i) => `listing-card-${i + 1}`);

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
    <main className="page-Home">
      {/* Navigation */}
      <section className="page-Home__navigation" data-section="navigation">
        <div className="page-Home__navigation-left">
          <a href="/" className="page-Home__logo-link"><img src="/my-assets/images/logo.png" alt="Airbnb" className="page-Home__logo" /></a>
        </div>
        <div className="page-Home__navigation-right">
          <Link key="become-host-link" className="page-Home__become-host">{"Become a Host"}</Link>
          <button className="page-Home__globe-button" aria-label="Language">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </button>
          <div className="page-Home__user-card">
            <button className="page-Home__menu-button" aria-label="Menu">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
            <button className="page-Home__avatar-button" aria-label="User menu">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="page-Home__hero" data-section="hero">
        <h1 className="page-Home__hero-heading">{"Start Your Trip with Airbnb"}</h1>
        <div className="page-Home__service-tabs-hero">
          <div className="page-Home__service-tab page-Home__service-tab--selected">
            <img src="/my-assets/images/icon-all.png" alt="All" className="page-Home__service-icon" />
            <span>All</span>
          </div>
          <div className="page-Home__service-tab">
            <img src="/my-assets/images/icon-homes.png" alt="Homes" className="page-Home__service-icon" />
            <span>Homes</span>
          </div>
          <div className="page-Home__service-tab">
            <img src="/my-assets/images/icon-hotels.png" alt="Hotels" className="page-Home__service-icon" />
            <span>Hotels</span>
          </div>
          <div className="page-Home__service-tab">
            <img src="/my-assets/images/icon-experiences.png" alt="Experience" className="page-Home__service-icon" />
            <span>Experience</span>
          </div>
          <div className="page-Home__service-tab">
            <img src="/my-assets/images/icon-services.png" alt="Services" className="page-Home__service-icon" />
            <span>Services</span>
          </div>
        </div>
        <div className="page-Home__search-bar">
          <div className="page-Home__search-field">
            <label>Where</label>
            <input type="text" placeholder="Search destinations" />
          </div>
          <div className="page-Home__search-divider"></div>
          <div className="page-Home__search-field">
            <label>Check-in</label>
            <input type="text" placeholder="Add dates" />
          </div>
          <div className="page-Home__search-divider"></div>
          <div className="page-Home__search-field">
            <label>Check-out</label>
            <input type="text" placeholder="Add dates" />
          </div>
          <div className="page-Home__search-divider"></div>
          <div className="page-Home__search-field">
            <label>Who</label>
            <input type="text" placeholder="Add guests" />
          </div>
          <button className="page-Home__search-button" aria-label="Search">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Reservations */}
      <section className="page-Home__reservations" data-section="reservations">
        <div className="page-Home__reservations-scroll">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`reservation-card-${i}`} className="page-Home__reservation-card">
              <div className="page-Home__reservation-card-title">Your reservation</div>
              <div className="page-Home__reservation-card-inner">
                <div className="page-Home__reservation-card-image"></div>
                <div className="page-Home__reservation-card-content">
                  <div className="page-Home__reservation-status">CANCELED</div>
                  <div className="page-Home__reservation-title">tiny house, tiny farm</div>
                  <div className="page-Home__reservation-code">Reservation code: XMPQKAPZ6D</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="page-Home__featured-listings" data-section="featured-listings">
        <h2 className="page-Home__section-heading">{"Stay in Seoul"}</h2>
        <div className="page-Home__category-tabs">
          <div className="page-Home__filter-tabs">
            <button type="button" className="page-Home__chip page-Home__chip--active">Hotels</button>
            <button type="button" className="page-Home__chip">Motel</button>
            <button type="button" className="page-Home__chip">Guesthouse</button>
            <button type="button" className="page-Home__chip">Resort</button>
          </div>
        </div>
        <div className="page-Home__listings-grid">
          {listingCards.map((id) => (
            <ListingCard key={id} href="/detail" />
          ))}
        </div>
      </section>

      {/* Inspiration */}
      <section className="page-Home__inspiration" data-section="inspiration">
        <h2 className="page-Home__inspiration-heading">{"Inspiration for future getaways"}</h2>
        <div className="page-Home__inspiration-tabs">
          <div className="page-Home__inspiration-tab-list">
            <button className="page-Home__inspiration-tab page-Home__inspiration-tab--active">Popular</button>
            <button className="page-Home__inspiration-tab">Arts &amp; culture</button>
            <button className="page-Home__inspiration-tab">Beach</button>
            <button className="page-Home__inspiration-tab">Mountains</button>
            <button className="page-Home__inspiration-tab">Outdoors</button>
            <button className="page-Home__inspiration-tab">Things to do</button>
            <button className="page-Home__inspiration-tab">Travel tips &amp; inspiration</button>
            <button className="page-Home__inspiration-tab">Airbnb-friendly apartments</button>
            <div className="page-Home__inspiration-tab-underline"></div>
          </div>
          <div className="page-Home__inspiration-divider"></div>
        </div>
        <div className="page-Home__destination-grid">
          {destinations.map((dest, i) => (
            <div key={`dest-${i}`} className="page-Home__destination-link">
              <div className="page-Home__destination-link-title">{dest.title}</div>
              <div className="page-Home__destination-link-subtitle">{dest.subtitle}</div>
            </div>
          ))}
          <div className="page-Home__destination-link page-Home__show-more">
            <span>Show more</span>
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="page-Home__footer" data-section="footer">
        <div className="page-Home__footer-container">
          <div className="page-Home__footer-grid">
            <div className="page-Home__footer-section">
              <h3 className="page-Home__footer-section-heading">Support</h3>
              <ul className="page-Home__footer-list">
                {footerLinks.support.map((link, i) => (
                  <li key={`support-${i}`}>
                    <a className="page-Home__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="page-Home__footer-section">
              <h3 className="page-Home__footer-section-heading">Hosting</h3>
              <ul className="page-Home__footer-list">
                {footerLinks.hosting.map((link, i) => (
                  <li key={`hosting-${i}`}>
                    <a className="page-Home__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="page-Home__footer-section">
              <h3 className="page-Home__footer-section-heading">Airbnb</h3>
              <ul className="page-Home__footer-list">
                {footerLinks.about.map((link, i) => (
                  <li key={`about-${i}`}>
                    <a className="page-Home__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="page-Home__footer-bottom">
          <div className="page-Home__footer-bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="page-Home__footer-sep">·</span>
            <a className="page-Home__footer-link" href="#">Privacy</a>
            <span className="page-Home__footer-sep">·</span>
            <a className="page-Home__footer-link" href="#">Terms</a>
            <span className="page-Home__footer-sep">·</span>
            <a className="page-Home__footer-link" href="#">Your Privacy Choices</a>
            <img src="/images/privacy-icon.svg" alt="" className="page-Home__footer-privacy-icon" />
          </div>
          <div className="page-Home__footer-bottom-right">
            <button className="page-Home__footer-btn" type="button">
              <img src="/images/globe-icon.svg" alt="" className="page-Home__footer-btn-icon" />
              <span>English (US)</span>
            </button>
            <button className="page-Home__footer-btn page-Home__footer-btn--currency" type="button">
              <span>₩</span>
              <span>KRW</span>
            </button>
            <div className="page-Home__footer-social">
              <a className="page-Home__footer-social-link" href="#" aria-label="Facebook">
                <img src="/images/facebook-icon.svg" alt="" className="page-Home__footer-social-icon" />
              </a>
              <a className="page-Home__footer-social-link" href="#" aria-label="X">
                <img src="/images/x-icon.svg" alt="" className="page-Home__footer-social-icon" />
              </a>
              <a className="page-Home__footer-social-link" href="#" aria-label="Instagram">
                <img src="/images/instagram-icon.svg" alt="" className="page-Home__footer-social-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
