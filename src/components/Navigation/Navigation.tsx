import { Fragment, forwardRef, useId } from "react";
import type { ForwardedRef, HTMLAttributes, MouseEvent, MouseEventHandler, Ref } from "react";
import logoUrl from "./logo.png";
import "./Navigation.css";

/** Figma "Navigation" set (235:2441), axis `Type`. */
export type NavigationType = "main" | "stays" | "expanded";

/** Which search field was pressed. The pill (Main / Stays) has where·when·who; the expanded bar has where·checkIn·checkOut·who. */
export type NavigationField = "where" | "when" | "who" | "checkIn" | "checkOut";

/** Value lines of the expanded bar. Figma defaults: "Search destinations", "Add dates", "Add dates", "Add guests". */
export interface NavigationExpandedValues {
  where?: string;
  checkIn?: string;
  checkOut?: string;
  who?: string;
}

export interface NavigationProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Figma `Type`: Main Navigation (bar), Stays Navigation (search pill), Expanded Stays Navigation (search bar). */
  type?: NavigationType;
  /** Main only. Address of the logo link. */
  logoHref?: string;
  /** Main only. Address of the "Become a Host" link. */
  hostHref?: string;
  /** Main only. Called when the globe button is pressed. No language menu is built. */
  onLanguageClick?: MouseEventHandler<HTMLButtonElement>;
  /** Main only. Called when the menu/avatar pill is pressed. No menu is built. */
  onMenuClick?: MouseEventHandler<HTMLButtonElement>;
  /** Called with the field name when one search field is pressed. */
  onFieldClick?: (field: NavigationField, event: MouseEvent<HTMLButtonElement>) => void;
  /** Called when the red search button is pressed. */
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
  /** Expanded only. Value lines under Where / Check-in / Check-out / Who. */
  values?: NavigationExpandedValues;
}

const DEFAULT_VALUES: Required<NavigationExpandedValues> = {
  where: "Search destinations",
  checkIn: "Add dates",
  checkOut: "Add dates",
  who: "Add guests",
};

/** Figma Group 2 235:2436 (32×32) and 234:4356 (48×48): red circle with a white magnifier. */
function SearchIcon({ large }: { large: boolean }) {
  return large ? (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <circle className="ds-navigation__search-circle" cx="24" cy="24" r="24" />
      <circle className="ds-navigation__search-glass" cx="22.5" cy="22.5" r="5.98611" strokeWidth="2.97222" />
      <line className="ds-navigation__search-glass" x1="31.9492" y1="32.5508" x2="25.5852" y2="26.1869" strokeWidth="2.97222" />
    </svg>
  ) : (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <circle className="ds-navigation__search-circle" cx="16" cy="16" r="16" />
      <circle className="ds-navigation__search-glass" cx="15" cy="15" r="4" strokeWidth="2" />
      <line className="ds-navigation__search-glass" x1="21.2929" y1="21.7071" x2="17.0503" y2="17.4645" strokeWidth="2" />
    </svg>
  );
}

/** Search pill: Stays Navigation 235:2440, also drawn inside Main as "Drop down" 27:9260. */
function SearchPill({ onFieldClick, onSearchClick }: Pick<NavigationProps, "onFieldClick" | "onSearchClick">) {
  const field = (name: NavigationField) => (event: MouseEvent<HTMLButtonElement>) => onFieldClick?.(name, event);
  return (
    <div className="ds-navigation__search" role="search">
      <div className="ds-navigation__fields">
        <button type="button" className="ds-navigation__field" onClick={field("where")}>
          Anywhere
        </button>
        <span className="ds-navigation__divider" aria-hidden="true" />
        <button type="button" className="ds-navigation__field" onClick={field("when")}>
          Any week
        </button>
        <span className="ds-navigation__divider" aria-hidden="true" />
        <button type="button" className="ds-navigation__field ds-navigation__field--muted" onClick={field("who")}>
          Add guests
        </button>
      </div>
      <button type="button" className="ds-navigation__search-button" aria-label="Search" onClick={onSearchClick}>
        <SearchIcon large={false} />
      </button>
    </div>
  );
}

/** Expanded Stays Navigation 234:4360: four fields and a 48px search button. */
function SearchBar({ onFieldClick, onSearchClick, values }: Pick<NavigationProps, "onFieldClick" | "onSearchClick" | "values">) {
  const v = { ...DEFAULT_VALUES, ...values };
  const segments: { name: NavigationField; label: string; value: string; wide: boolean }[] = [
    { name: "where", label: "Where", value: v.where, wide: true },
    { name: "checkIn", label: "Check-in", value: v.checkIn, wide: false },
    { name: "checkOut", label: "Check-out", value: v.checkOut, wide: false },
    { name: "who", label: "Who", value: v.who, wide: true },
  ];
  return (
    <div className="ds-navigation__bar" role="search">
      {segments.map((segment, i) => (
        <Fragment key={segment.name}>
          {i > 0 && <span className="ds-navigation__divider ds-navigation__divider--tall" aria-hidden="true" />}
          <button
            type="button"
            className={`ds-navigation__segment${segment.wide ? " ds-navigation__segment--wide" : ""}`}
            onClick={(event) => onFieldClick?.(segment.name, event)}
          >
            <span className="ds-navigation__segment-label">{segment.label}</span>
            <span className="ds-navigation__segment-value">{segment.value}</span>
          </button>
        </Fragment>
      ))}
      <button type="button" className="ds-navigation__search-button ds-navigation__search-button--large" aria-label="Search" onClick={onSearchClick}>
        <SearchIcon large />
      </button>
    </div>
  );
}

/** Figma "Login" 8:189: Become a Host, globe, and the menu/avatar pill. */
function Actions({ hostHref, onLanguageClick, onMenuClick }: Pick<NavigationProps, "hostHref" | "onLanguageClick" | "onMenuClick">) {
  const clipId = `${useId()}-avatar`;
  return (
    <div className="ds-navigation__actions">
      <a className="ds-navigation__host" href={hostHref}>
        Become a Host
      </a>
      <button type="button" className="ds-navigation__language" aria-label="Language" onClick={onLanguageClick}>
        {/* Globe 6:807: circle, meridian and equator, stroke 1.5 */}
        <svg className="ds-navigation__globe" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="8" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="8" cy="8" rx="3" ry="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="8.25" x2="16" y2="8.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button type="button" className="ds-navigation__menu" aria-label="Menu" onClick={onMenuClick}>
        {/* Frame 17 6:761: three lines 14 wide, stroke 1.5 */}
        <svg className="ds-navigation__menu-lines" width="14" height="9.5" viewBox="0 0 14 9.5" fill="none" aria-hidden="true" focusable="false">
          <line x1="0" y1="0.75" x2="14" y2="0.75" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="4.75" x2="14" y2="4.75" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="8.75" x2="14" y2="8.75" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {/* Frame 18 6:789 (32×34): avatar circle, person clipped to a circle, notification dot */}
        <svg className="ds-navigation__avatar" width="32" height="34" viewBox="0 0 32 34" fill="none" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId}>
              <circle cx="17" cy="17" r="12.1875" />
            </clipPath>
          </defs>
          <circle className="ds-navigation__avatar-circle" cx="17" cy="17" r="15" />
          <g className="ds-navigation__avatar-person" clipPath={`url(#${clipId})`}>
            <circle cx="17" cy="15.1225" r="6.5625" />
            <circle cx="17" cy="31.06" r="11.25" />
          </g>
          <circle className="ds-navigation__avatar-dot" cx="28" cy="4" r="5.5" strokeWidth="1" />
        </svg>
      </button>
    </div>
  );
}

/** Top navigation from the Figma "Navigation" set (235:2441): the Main bar, the Stays search pill, and the Expanded search bar. */
export const Navigation = forwardRef<HTMLElement, NavigationProps>(function Navigation(
  { type = "main", logoHref = "/", hostHref, onLanguageClick, onMenuClick, onFieldClick, onSearchClick, values, className, ...rest },
  ref: ForwardedRef<HTMLElement>,
) {
  const classes = ["ds-navigation", `ds-navigation--${type}`, className].filter(Boolean).join(" ");

  if (type === "main") {
    return (
      <header ref={ref} className={classes} data-testid="ds-navigation" {...rest}>
        <a className="ds-navigation__logo" href={logoHref}>
          <img className="ds-navigation__logo-image" src={logoUrl} alt="Airbnb" width={102} height={32} draggable={false} />
        </a>
        <div className="ds-navigation__center">
          <SearchPill onFieldClick={onFieldClick} onSearchClick={onSearchClick} />
        </div>
        <Actions hostHref={hostHref} onLanguageClick={onLanguageClick} onMenuClick={onMenuClick} />
      </header>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={classes} data-testid="ds-navigation" {...rest}>
      {type === "stays" ? (
        <SearchPill onFieldClick={onFieldClick} onSearchClick={onSearchClick} />
      ) : (
        <SearchBar onFieldClick={onFieldClick} onSearchClick={onSearchClick} values={values} />
      )}
    </div>
  );
});
