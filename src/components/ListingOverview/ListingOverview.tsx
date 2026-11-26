import { forwardRef, useId } from "react";
import type { MouseEvent } from "react";
import { Button } from "../Button";
import { Text } from "../Text";
import "./ListingOverview.css";

export interface ListingGuestFavourite {
  /** The two lines between the laurels (812:11150). */
  labelLines?: [string, string];
  /** "One of the most loved homes on Airbnb, according to guests" (812:11153) */
  description: string;
  /** "4.98" (812:11155) — shown with five stars. */
  rating: string;
  /** "487" (812:11169) */
  reviewCount: string;
  /** "Reviews" (812:11170) */
  reviewLabel?: string;
  /** Addresses of the laurel pictures (812:11148 · 812:11151). */
  laurelLeftSrc: string;
  laurelRightSrc: string;
}

/** How a highlight picture sits in its 40 column: inset = 34 in the middle, framed = white frame 40, full = 40. */
export type ListingHighlightImageLook = "inset" | "framed" | "full";

export interface ListingHighlight {
  imageSrc: string;
  imageLook: ListingHighlightImageLook;
  title: string;
  description: string;
}

export interface ListingHost {
  /** Round host photo (812:11206). */
  avatarSrc: string;
  /** Superhost badge picture (812:11208). */
  badgeSrc: string;
  /** "Hosted by 준구" (812:11213) */
  title: string;
  /** "Superhost · 6 years hosting" (812:11215) */
  description: string;
}

export interface ListingOverviewProps {
  /** "Entire home in Gangneung-si, South Korea" (812:11137, Heading 2) */
  title: string;
  /** "4 guests · 2 bedrooms · 2 beds · 2 bathrooms" (812:11139) */
  details: string;
  guestFavourite: ListingGuestFavourite;
  /** The highlight rows (812:11172 · 812:11180 · 812:11188 · 812:11195). */
  highlights: ListingHighlight[];
  host: ListingHost;
  /** Label of the button under the host (812:11222). */
  learnMoreLabel?: string;
  /** Called when "Learn more about summaries" is clicked. Nothing else happens. */
  onLearnMoreClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

/** Star — exact path of my-assets/images/detail-icon-star-small.svg (Figma 812:11157, 10×10). */
function StarIcon() {
  const clipId = useId();
  return (
    <svg className="ds-listing-overview__star" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false">
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M4.71875 0.49375L3.42813 3.26875L0.346875 3.66562C0.287264 3.67308 0.231064 3.69755 0.185004 3.73612C0.138945 3.77469 0.104978 3.82571 0.087172 3.88309C0.0693659 3.94046 0.068475 4.00175 0.0846059 4.05962C0.100737 4.11749 0.133206 4.16948 0.178125 4.20938L2.45938 6.2625L1.84375 9.34063C1.83215 9.39948 1.83774 9.46042 1.85984 9.51618C1.88194 9.57195 1.91963 9.62017 1.96839 9.6551C2.01716 9.69002 2.07495 9.71018 2.13486 9.71315C2.19476 9.71613 2.25426 9.7018 2.30625 9.67188L5 8.10938L7.69687 9.67188C7.74886 9.7018 7.80836 9.71613 7.86827 9.71315C7.92818 9.71018 7.98597 9.69002 8.03473 9.6551C8.0835 9.62017 8.12118 9.57195 8.14328 9.51618C8.16538 9.46042 8.17097 9.39948 8.15938 9.34063L7.54375 6.2625L9.825 4.20938C9.86902 4.16911 9.90059 4.11708 9.91598 4.05945C9.93138 4.00181 9.92996 3.94097 9.91188 3.88412C9.89381 3.82727 9.85984 3.77678 9.81398 3.73861C9.76813 3.70045 9.71231 3.67621 9.65312 3.66875L6.57188 3.26875L5.28438 0.49375C5.25952 0.439191 5.21949 0.392935 5.16907 0.360498C5.11864 0.328062 5.05995 0.310815 5 0.310815C4.94005 0.310815 4.88136 0.328062 4.83093 0.360498C4.78051 0.392935 4.74048 0.439191 4.71563 0.49375H4.71875Z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="10" height="10" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Info — exact path of my-assets/images/detail-icon-info.svg (Figma 812:11219, 16×16). */
function InfoIcon() {
  const clipId = useId();
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8C0.25 3.71979 3.71979 0.25 8 0.25ZM8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM8.75 7V12H7.25V7H8.75ZM8 4C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6C7.44772 6 7 5.55228 7 5C7 4.44772 7.44772 4 8 4Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="16" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

const STARS = [1, 2, 3, 4, 5];

/**
 * The summary at the top of a stay's left column: the kind of stay and its rooms, the Guest favourite box,
 * the highlights, the host and "Learn more about summaries" (shared `Button variant="text" size="xsmall"`).
 * Approved plan: docs/plans/components/ListingOverview.md revision 1.
 */
export const ListingOverview = forwardRef<HTMLDivElement, ListingOverviewProps>(function ListingOverview(
  { title, details, guestFavourite, highlights, host, learnMoreLabel = "Learn more about summaries", onLearnMoreClick },
  ref,
) {
  const { labelLines = ["Guest", "favourite"], reviewLabel = "Reviews" } = guestFavourite;
  return (
    <div ref={ref} className="ds-listing-overview" data-testid="ds-listing-overview">
      <div className="ds-listing-overview__header">
        <h2 className="ds-listing-overview__title">{title}</h2>
        <Text as="p" variant="body" tone="default">
          {details}
        </Text>
      </div>

      <div className="ds-listing-overview__favourite">
        <div className="ds-listing-overview__badge">
          <img className="ds-listing-overview__laurel ds-listing-overview__laurel--left" src={guestFavourite.laurelLeftSrc} alt="" />
          <span className="ds-listing-overview__badge-text">
            {labelLines[0]}
            <br />
            {labelLines[1]}
          </span>
          <img className="ds-listing-overview__laurel ds-listing-overview__laurel--right" src={guestFavourite.laurelRightSrc} alt="" />
        </div>
        <p className="ds-listing-overview__favourite-text">{guestFavourite.description}</p>
        <div className="ds-listing-overview__stats">
          <div className="ds-listing-overview__stat">
            <span className="ds-listing-overview__stat-number">{guestFavourite.rating}</span>
            <span className="ds-listing-overview__stars" aria-hidden="true">
              {STARS.map((n) => (
                <StarIcon key={n} />
              ))}
            </span>
          </div>
          <div className="ds-listing-overview__stat-divider" aria-hidden="true" />
          <div className="ds-listing-overview__stat">
            <span className="ds-listing-overview__stat-number">{guestFavourite.reviewCount}</span>
            <span className="ds-listing-overview__stat-label">{reviewLabel}</span>
          </div>
        </div>
      </div>

      <div className="ds-listing-overview__highlights">
        {highlights.map((item) => (
          <div key={item.title} className="ds-listing-overview__row">
            <div className={`ds-listing-overview__media ds-listing-overview__media--${item.imageLook}`}>
              <img className="ds-listing-overview__media-img" src={item.imageSrc} alt="" />
            </div>
            <div>
              <h3 className="ds-listing-overview__row-title">{item.title}</h3>
              <p className="ds-listing-overview__row-text">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="ds-listing-overview__row">
          <div className="ds-listing-overview__host">
            <img className="ds-listing-overview__host-avatar" src={host.avatarSrc} alt="" />
            <img className="ds-listing-overview__host-badge" src={host.badgeSrc} alt="" />
          </div>
          <div>
            <h3 className="ds-listing-overview__row-title">{host.title}</h3>
            <p className="ds-listing-overview__row-text">{host.description}</p>
          </div>
        </div>
        <div className="ds-listing-overview__learn-more">
          <Button variant="text" size="xsmall" tone="secondary" icon={<InfoIcon />} onClick={onLearnMoreClick}>
            {learnMoreLabel}
          </Button>
        </div>
      </div>
    </div>
  );
});
