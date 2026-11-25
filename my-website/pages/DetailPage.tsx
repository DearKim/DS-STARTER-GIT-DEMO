import { Link } from "@/components/Link";
import { imageUrl } from "@/assets/images";
import "./DetailPage.css";

export default function DetailPage() {
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

  const photos = [1, 2, 3, 4, 5].map((i) => `detail-photo-${i}`);

  return (
    <main className="page-Detail">
      {/* Navigation */}
      <section className="page-Detail__navigation" data-section="navigation">
        <div className="page-Detail__navigation-left">
          <a href="/" className="page-Detail__logo-link"><img src={imageUrl("detail-nav-logo") ?? ""} alt="Airbnb" className="page-Detail__logo" /></a>
        </div>
        <div className="page-Detail__search-bar-center">
          <div className="page-Detail__search-bar">
            <button className="page-Detail__search-item page-Detail__search-item--bold">Anywhere</button>
            <div className="page-Detail__search-divider"></div>
            <button className="page-Detail__search-item page-Detail__search-item--bold">Any week</button>
            <div className="page-Detail__search-divider"></div>
            <button className="page-Detail__search-item">Add guests</button>
            <button className="page-Detail__search-icon-button" aria-label="Search">
              <img src={imageUrl("detail-icon-search") ?? ""} alt="" className="page-Detail__search-icon" />
            </button>
          </div>
        </div>
        <div className="page-Detail__navigation-right">
          <Link key="become-host-link" className="page-Detail__become-host">{"Become a Host"}</Link>
          <button className="page-Detail__globe-button" aria-label="Language">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </button>
          <div className="page-Detail__user-card">
            <button className="page-Detail__menu-button" aria-label="Menu">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
            <button className="page-Detail__avatar-button" aria-label="User menu">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Title */}
      <section className="page-Detail__title-section" data-section="title">
        <h1 className="page-Detail__title">{"서면/전포역5분/최대8인/프라이빗독채/계단없음/조용한숙소/사잇길"}</h1>
        <div className="page-Detail__title-actions">
          <button className="page-Detail__action-button">
            <img src={imageUrl("detail-icon-share") ?? ""} alt="" className="page-Detail__action-icon" />
            <span>{"공유하기"}</span>
          </button>
          <button className="page-Detail__action-button">
            <img src={imageUrl("detail-icon-save") ?? ""} alt="" className="page-Detail__action-icon" />
            <span>{"저장"}</span>
          </button>
        </div>
      </section>

      {/* Gallery */}
      <section className="page-Detail__gallery" data-section="gallery">
        <div className="page-Detail__gallery-grid">
          <div className="page-Detail__gallery-main">
            <img src={imageUrl("detail-photo-1") ?? ""} alt="Dining room" className="page-Detail__gallery-img" />
          </div>
          <div className="page-Detail__gallery-column">
            <img src={imageUrl("detail-photo-2") ?? ""} alt="Photo 2" className="page-Detail__gallery-img page-Detail__gallery-img--top" />
            <img src={imageUrl("detail-photo-3") ?? ""} alt="Photo 3" className="page-Detail__gallery-img page-Detail__gallery-img--bottom" />
          </div>
          <div className="page-Detail__gallery-column">
            <img src={imageUrl("detail-photo-4") ?? ""} alt="Photo 4" className="page-Detail__gallery-img page-Detail__gallery-img--top" />
            <img src={imageUrl("detail-photo-5") ?? ""} alt="Photo 5" className="page-Detail__gallery-img page-Detail__gallery-img--bottom" />
          </div>
          <button className="page-Detail__show-all-button">
            <img src={imageUrl("detail-icon-show-all") ?? ""} alt="" className="page-Detail__show-all-icon" />
            <span>{"사진 모두 보기"}</span>
          </button>
        </div>
      </section>

      {/* Content: left info + right booking card */}
      <section className="page-Detail__content" data-section="content">
        <div className="page-Detail__info">
          <div className="page-Detail__info-header">
            <h2 className="page-Detail__info-title">{"Entire home in Gangneung-si, South Korea"}</h2>
            <span className="page-Detail__info-guests">{"4 guests · 2 bedrooms · 2 beds · 2 bathrooms"}</span>
          </div>
          <div className="page-Detail__guest-favourite">
            <div className="page-Detail__guest-favourite-left">
              <div className="page-Detail__laurel-container">
                <img src={imageUrl("detail-laurel-left") ?? ""} alt="" className="page-Detail__laurel" />
                <span className="page-Detail__guest-favourite-text">{"Guest favourite"}</span>
                <img src={imageUrl("detail-laurel-right") ?? ""} alt="" className="page-Detail__laurel" />
              </div>
              <p className="page-Detail__guest-favourite-desc">{"One of the most loved homes on Airbnb, according to guests"}</p>
            </div>
            <div className="page-Detail__guest-favourite-stats">
              <div className="page-Detail__stat-block">
                <span className="page-Detail__stat-number">{"4.98"}</span>
                <div className="page-Detail__stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img key={i} src={imageUrl("detail-icon-star-small") ?? ""} alt="" className="page-Detail__star" />
                  ))}
                </div>
              </div>
              <div className="page-Detail__stat-divider"></div>
              <div className="page-Detail__stat-block">
                <span className="page-Detail__stat-number">{"487"}</span>
                <span className="page-Detail__stat-label">{"Reviews"}</span>
              </div>
            </div>
          </div>
          <div className="page-Detail__info-highlights">
            <div className="page-Detail__highlight">
              <img src={imageUrl("detail-highlight-top")} alt="" className="page-Detail__highlight-icon" />
              <div>
                <div className="page-Detail__highlight-title">{"Top 10% of homes"}</div>
                <div className="page-Detail__highlight-desc">{"This home is highly ranked based on ratings, reviews, and reliability"}</div>
              </div>
            </div>
            <div className="page-Detail__highlight">
              <img src={imageUrl("detail-highlight-near")} alt="" className="page-Detail__highlight-icon page-Detail__highlight-icon--near" />
              <div>
                <div className="page-Detail__highlight-title">{"Near Anmok Beach"}</div>
                <div className="page-Detail__highlight-desc">{"Anmok Beach is about an 8-min walk away, with the ocean visible from the stay"}</div>
              </div>
            </div>
            <div className="page-Detail__highlight">
              <img src={imageUrl("detail-highlight-kitchen")} alt="" className="page-Detail__highlight-icon" />
              <div>
                <div className="page-Detail__highlight-title">{"Roomy home with a full kitchen"}</div>
                <div className="page-Detail__highlight-desc">{"A roomy private home with a full kitchen gives you space to settle in"}</div>
              </div>
            </div>
            <div className="page-Detail__highlight">
              <img src={imageUrl("detail-highlight-cleanliness")} alt="" className="page-Detail__highlight-icon" />
              <div>
                <div className="page-Detail__highlight-title">{"Guests praise the cleanliness"}</div>
                <div className="page-Detail__highlight-desc">{"Guests repeatedly praise the spotless rooms and the attention to detail"}</div>
              </div>
            </div>
            <div className="page-Detail__highlight">
              <div className="page-Detail__host-avatar-container">
                <img src={imageUrl("detail-host-avatar")} alt="" className="page-Detail__highlight-icon page-Detail__highlight-icon--host" />
                <img src={imageUrl("detail-icon-superhost")} alt="" className="page-Detail__superhost-badge" />
              </div>
              <div>
                <div className="page-Detail__highlight-title">{"Hosted by 준구"}</div>
                <div className="page-Detail__highlight-desc">{"Superhost · 6 years hosting"}</div>
              </div>
            </div>
            <div className="page-Detail__highlight">
              <img src={imageUrl("detail-icon-info")} alt="" className="page-Detail__highlight-icon page-Detail__highlight-icon--info" />
              <div>
                <div className="page-Detail__highlight-title page-Detail__highlight-title--link">{"Learn more about summaries"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-Detail__booking-wrapper">
          <div className="page-Detail__booking-card">
            <div className="page-Detail__booking-price-row">
              <div className="page-Detail__booking-price-left">
                <span className="page-Detail__booking-original-price">{"$500"}</span>
                <span className="page-Detail__booking-price">{"$440"}</span>
                <span className="page-Detail__booking-night">{" night"}</span>
              </div>
              <div className="page-Detail__booking-rating">
                <img src={imageUrl("detail-icon-star") ?? ""} alt="" className="page-Detail__booking-star" />
                <span className="page-Detail__booking-rating-value">{"4.99"}</span>
                <span className="page-Detail__booking-reviews">{"· 337 reviews"}</span>
              </div>
            </div>
            <div className="page-Detail__booking-form">
              <div className="page-Detail__booking-dates">
                <div className="page-Detail__booking-field">
                  <label>CHECK-IN</label>
                  <input type="text" placeholder="Add date" />
                </div>
                <div className="page-Detail__booking-field">
                  <label>CHECK-OUT</label>
                  <input type="text" placeholder="Add date" />
                </div>
              </div>
              <div className="page-Detail__booking-guests">
                <label>GUESTS</label>
                <input type="text" placeholder="1 guest" />
              </div>
              <button className="page-Detail__booking-reserve">{"Reserve"}</button>
              <p className="page-Detail__booking-note">{"You won't be charged yet"}</p>
            </div>
            <div className="page-Detail__booking-fees">
              <div className="page-Detail__booking-fee-row">
                <span className="page-Detail__booking-fee-label">{"$440 x 5 nights"}</span>
                <span className="page-Detail__booking-fee-amount">{"$2,200"}</span>
              </div>
              <div className="page-Detail__booking-fee-row">
                <span className="page-Detail__booking-fee-label">{"Weekly stay discount"}</span>
                <span className="page-Detail__booking-fee-amount page-Detail__booking-fee-amount--discount">{"-$300"}</span>
              </div>
              <div className="page-Detail__booking-fee-row">
                <span className="page-Detail__booking-fee-label">{"Cleaning fee"}</span>
                <span className="page-Detail__booking-fee-amount">{"$150"}</span>
              </div>
              <div className="page-Detail__booking-fee-row">
                <span className="page-Detail__booking-fee-label">{"Service fee"}</span>
                <span className="page-Detail__booking-fee-amount">{"$350"}</span>
              </div>
              <div className="page-Detail__booking-fee-divider"></div>
              <div className="page-Detail__booking-fee-row page-Detail__booking-fee-row--total">
                <span className="page-Detail__booking-fee-label">{"Total before taxes"}</span>
                <span className="page-Detail__booking-fee-amount">{"$2,400"}</span>
              </div>
            </div>
          </div>
          <div className="page-Detail__report-listing">
            <img src={imageUrl("detail-icon-flag") ?? ""} alt="" className="page-Detail__report-icon" />
            <span>{"리스팅 신고하기"}</span>
          </div>
        </div>
      </section>

      {/* Where you'll sleep */}
      <section className="page-Detail__sleep" data-section="sleep">
        <h2 className="page-Detail__sleep-heading">{"Where you'll sleep"}</h2>
        <div className="page-Detail__sleep-grid">
          {[1, 2, 3].map((i) => (
            <div key={`bedroom-${i}`} className="page-Detail__sleep-card">
              <img
                src={imageUrl(`detail-bedroom-${i <= 2 ? i : 1}`) ?? ""}
                alt={`Bedroom ${i}`}
                className="page-Detail__sleep-img"
              />
              <div className="page-Detail__sleep-label">{"Bedroom "}{i}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Inspiration — copied from HomePage */}
      <section className="page-Detail__inspiration" data-section="inspiration">
        <h2 className="page-Detail__inspiration-heading">{"Inspiration for future getaways"}</h2>
        <div className="page-Detail__inspiration-tabs">
          <div className="page-Detail__inspiration-tab-list">
            <button className="page-Detail__inspiration-tab page-Detail__inspiration-tab--active">Popular</button>
            <button className="page-Detail__inspiration-tab">Arts &amp; culture</button>
            <button className="page-Detail__inspiration-tab">Beach</button>
            <button className="page-Detail__inspiration-tab">Mountains</button>
            <button className="page-Detail__inspiration-tab">Outdoors</button>
            <button className="page-Detail__inspiration-tab">Things to do</button>
            <button className="page-Detail__inspiration-tab">Travel tips &amp; inspiration</button>
            <button className="page-Detail__inspiration-tab">Airbnb-friendly apartments</button>
            <div className="page-Detail__inspiration-tab-underline"></div>
          </div>
          <div className="page-Detail__inspiration-divider"></div>
        </div>
        <div className="page-Detail__destination-grid">
          {destinations.map((dest, i) => (
            <div key={`dest-${i}`} className="page-Detail__destination-link">
              <div className="page-Detail__destination-link-title">{dest.title}</div>
              <div className="page-Detail__destination-link-subtitle">{dest.subtitle}</div>
            </div>
          ))}
          <div className="page-Detail__destination-link page-Detail__show-more">
            <span>Show more</span>
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </div>
        </div>
      </section>

      {/* Footer — copied from HomePage */}
      <section className="page-Detail__footer" data-section="footer">
        <div className="page-Detail__footer-container">
          <div className="page-Detail__footer-grid">
            <div className="page-Detail__footer-section">
              <h3 className="page-Detail__footer-section-heading">Support</h3>
              <ul className="page-Detail__footer-list">
                {footerLinks.support.map((link, i) => (
                  <li key={`support-${i}`}>
                    <a className="page-Detail__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="page-Detail__footer-section">
              <h3 className="page-Detail__footer-section-heading">Hosting</h3>
              <ul className="page-Detail__footer-list">
                {footerLinks.hosting.map((link, i) => (
                  <li key={`hosting-${i}`}>
                    <a className="page-Detail__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="page-Detail__footer-section">
              <h3 className="page-Detail__footer-section-heading">Airbnb</h3>
              <ul className="page-Detail__footer-list">
                {footerLinks.about.map((link, i) => (
                  <li key={`about-${i}`}>
                    <a className="page-Detail__footer-link" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="page-Detail__footer-bottom">
          <div className="page-Detail__footer-bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="page-Detail__footer-sep">·</span>
            <a className="page-Detail__footer-link" href="#">Privacy</a>
            <span className="page-Detail__footer-sep">·</span>
            <a className="page-Detail__footer-link" href="#">Terms</a>
            <span className="page-Detail__footer-sep">·</span>
            <a className="page-Detail__footer-link" href="#">Your Privacy Choices</a>
            <img src="/images/privacy-icon.svg" alt="" className="page-Detail__footer-privacy-icon" />
          </div>
          <div className="page-Detail__footer-bottom-right">
            <button className="page-Detail__footer-btn" type="button">
              <img src="/images/globe-icon.svg" alt="" className="page-Detail__footer-btn-icon" />
              <span>English (US)</span>
            </button>
            <button className="page-Detail__footer-btn page-Detail__footer-btn--currency" type="button">
              <span>₩</span>
              <span>KRW</span>
            </button>
            <div className="page-Detail__footer-social">
              <a className="page-Detail__footer-social-link" href="#" aria-label="Facebook">
                <img src="/images/facebook-icon.svg" alt="" className="page-Detail__footer-social-icon" />
              </a>
              <a className="page-Detail__footer-social-link" href="#" aria-label="X">
                <img src="/images/x-icon.svg" alt="" className="page-Detail__footer-social-icon" />
              </a>
              <a className="page-Detail__footer-social-link" href="#" aria-label="Instagram">
                <img src="/images/instagram-icon.svg" alt="" className="page-Detail__footer-social-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
