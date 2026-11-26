import { forwardRef, useId } from "react";
import type { HTMLAttributes } from "react";
import { Tabs } from "../Tabs";
import "./Inspiration.css";

export interface InspirationTab {
  id: string;
  label: string;
}

export interface InspirationDestination {
  title: string;
  subtitle: string;
}

export interface InspirationProps extends HTMLAttributes<HTMLElement> {
  /** "Inspiration for future getaways" (389:7209). Also names the tab list. */
  heading?: string;
  /** The tab labels (389:7214). */
  tabs?: InspirationTab[];
  /** The tab chosen at first ("popular"). */
  defaultTab?: string;
  /** Called with the tab id when the chosen tab changes. The list of places stays the same. */
  onTabChange?: (id: string) => void;
  /** The places (389:7245): a name and a kind of rental. "Show more" is drawn after the last one. */
  destinations?: InspirationDestination[];
  /** "Show more" (389:7353) */
  showMoreLabel?: string;
  /** Called with the place's index. Nothing else happens. */
  onDestinationClick?: (index: number) => void;
  /** Called when "Show more" is pressed. Nothing else happens. */
  onShowMoreClick?: () => void;
}

export const INSPIRATION_TABS: InspirationTab[] = [
  { id: "popular", label: "Popular" },
  { id: "arts-culture", label: "Arts & culture" },
  { id: "beach", label: "Beach" },
  { id: "mountains", label: "Mountains" },
  { id: "outdoors", label: "Outdoors" },
  { id: "things-to-do", label: "Things to do" },
  { id: "travel-tips", label: "Travel tips & inspiration" },
  { id: "airbnb-friendly", label: "Airbnb-friendly apartments" },
];

/** The places of the website plan (my-docs/inbox/website-plan.md, "Inspiration places"). */
export const INSPIRATION_DESTINATIONS: InspirationDestination[] = [
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

/**
 * "Inspiration for future getaways": a heading, the kit Tabs (bar look) and a six-column list of places
 * with "Show more" at the end. Figma 389:7517 on the Home, Detail and Checkout frames.
 *
 * The chosen tab only moves the bar — the list of places is the same for every tab (website plan).
 * Places and "Show more" are real buttons that only call their callbacks.
 */
export const Inspiration = forwardRef<HTMLElement, InspirationProps>(function Inspiration(
  {
    heading = "Inspiration for future getaways",
    tabs = INSPIRATION_TABS,
    defaultTab = "popular",
    onTabChange,
    destinations = INSPIRATION_DESTINATIONS,
    showMoreLabel = "Show more",
    onDestinationClick,
    onShowMoreClick,
    className,
    ...rest
  },
  ref,
) {
  const headingId = useId();

  const places = (
    <ul className="ds-inspiration__grid">
      {destinations.map((place, index) => (
        <li key={`${place.title}-${index}`} className="ds-inspiration__cell">
          <button type="button" className="ds-inspiration__destination" onClick={() => onDestinationClick?.(index)}>
            <span className="ds-inspiration__title">{place.title}</span>
            <span className="ds-inspiration__subtitle">{place.subtitle}</span>
          </button>
        </li>
      ))}
      <li className="ds-inspiration__cell">
        <button type="button" className="ds-inspiration__show-more" onClick={onShowMoreClick}>
          <span>{showMoreLabel}</span>
          {/* Figma 389:7354 (12×12): the current site's arrow path, plan Q-02 */}
          <svg
            className="ds-inspiration__chevron"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </button>
      </li>
    </ul>
  );

  return (
    <section
      ref={ref}
      className={["ds-inspiration", className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
      data-testid="ds-inspiration"
      {...rest}
    >
      <h2 id={headingId} className="ds-inspiration__heading">
        {heading}
      </h2>
      <div className="ds-inspiration__tabs">
        <Tabs
          variant="bar"
          label={heading}
          defaultTab={defaultTab}
          onTabChange={onTabChange}
          items={tabs.map((tab) => ({ id: tab.id, label: tab.label, content: places }))}
        />
      </div>
    </section>
  );
});
