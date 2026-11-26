import { Fragment, forwardRef, useId } from "react";
import type { HTMLAttributes } from "react";
import "./Footer.css";

export interface FooterLink {
  id: string;
  label: string;
}

export interface FooterColumn {
  id: string;
  heading: string;
  links: FooterLink[];
}

export type FooterSocialId = "facebook" | "x" | "instagram";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** The three link columns (Figma 389:7363 · 389:7385 · 389:7416). */
  columns?: FooterColumn[];
  /** "© 2026 Airbnb, Inc." (389:7439) */
  copyright?: string;
  /** Privacy · Terms · Your Privacy Choices (389:7448 · 389:7454 · 389:7463) */
  legalLinks?: FooterLink[];
  /** Address of the two-color "Your Privacy Choices" picture (389:7465). Not drawn when empty. */
  privacyIconSrc?: string;
  /** "English (US)" (389:7481) */
  language?: string;
  /** "₩" (389:7487) */
  currencySymbol?: string;
  /** "KRW" (389:7489) */
  currencyCode?: string;
  /** Called with the link id. Nothing else happens: no navigation, no scrolling. */
  onLinkClick?: (id: string) => void;
  onLanguageClick?: () => void;
  onCurrencyClick?: () => void;
  onSocialClick?: (id: FooterSocialId) => void;
}

const slug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const links = (labels: string[]): FooterLink[] => labels.map((label) => ({ id: slug(label), label }));

/** The site's link lists (my-docs/inbox/website-plan.md, Detail 9). */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "support",
    heading: "Support",
    links: links([
      "Help Center",
      "Get help with a safety issue",
      "AirCover",
      "Travel insurance",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
      "Report neighborhood concern",
    ]),
  },
  {
    id: "hosting",
    heading: "Hosting",
    links: links([
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
    ]),
  },
  {
    id: "airbnb",
    heading: "Airbnb",
    links: links([
      "2026 Summer Release",
      "Newsroom",
      "Careers",
      "Investors",
      "Gift cards",
      "Airbnb.org emergency stays",
    ]),
  },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = links(["Privacy", "Terms", "Your Privacy Choices"]);

/* Icons: the original 16×16 paths of public/images/*-icon.svg (Figma 389:7479 · 389:7497 · 389:7503 · 389:7509), one color = currentColor. */
const icon = (d: string) => (
  <svg className="ds-footer__icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d={d} />
  </svg>
);

const GLOBE =
  "M8 0.25C10.059 0.255298 12.0317 1.07763 13.4848 2.53638C14.938 3.99512 15.7527 5.971 15.75 8.03C15.7431 10.041 14.9548 11.9706 13.5516 13.4111C12.1483 14.8516 10.2401 15.6903 8.23 15.75H7.98C5.96895 15.7458 4.03829 14.96 2.59588 13.5586C1.15347 12.1573 0.312273 10.2501 0.25 8.24V7.99C0.25265 5.93631 1.07034 3.96763 2.52345 2.51639C3.97657 1.06514 5.9463 0.249998 8 0.25ZM9.95 8.75H6.05C6.2 11.65 7.22 14.09 7.93 14.25H8C8.68 14.25 9.72 11.88 9.93 9.02L9.95 8.75ZM14.21 8.75H11.45C11.36 10.71 10.92 12.53 10.27 13.83C11.2839 13.4336 12.177 12.7795 12.8609 11.9325C13.5448 11.0855 13.9961 10.0747 14.17 9L14.21 8.75ZM4.54 8.75H1.8C1.93602 9.87388 2.37426 10.9398 3.06807 11.8344C3.76188 12.729 4.6853 13.4186 5.74 13.83C5.05294 12.3531 4.65899 10.757 4.58 9.13L4.55 8.75H4.54ZM5.74 2.17L5.62 2.22C4.59266 2.64311 3.69644 3.33201 3.02336 4.21598C2.35028 5.09995 1.92459 6.14713 1.79 7.25H4.54C4.63 5.42 5.02 3.71 5.6 2.44L5.74 2.17ZM7.99 1.75C7.29 1.75 6.21 4.26 6.05 7.25H9.95C9.8 4.35 8.77 1.91 8.06 1.75H7.99ZM10.27 2.18L10.3 2.23C11.0156 3.80947 11.4066 5.51655 11.45 7.25H14.2C14.0611 6.12971 13.6228 5.06757 12.9312 4.17536C12.2396 3.28315 11.3203 2.59385 10.27 2.18Z";

const SOCIAL: { id: FooterSocialId; label: string; d: string }[] = [
  {
    id: "facebook",
    label: "Facebook",
    d: "M7.98503 0.5C3.8512 0.5 0.5 3.8512 0.5 7.98503C0.5 11.4952 2.91677 14.4407 6.17695 15.2497V10.2725H4.63353V7.98503H6.17695V6.9994C6.17695 4.4518 7.32994 3.27096 9.83114 3.27096C10.3054 3.27096 11.1237 3.36407 11.4584 3.45689V5.53024C11.2817 5.51168 10.9749 5.5024 10.5937 5.5024C9.36647 5.5024 8.89222 5.96737 8.89222 7.17605V7.98503H11.3371L10.9171 10.2725H8.89222V15.4153C12.5985 14.9677 15.4704 11.812 15.4704 7.98503C15.4701 3.8512 12.1189 0.5 7.98503 0.5Z",
  },
  {
    id: "x",
    label: "X",
    d: "M9.2306 6.84822L14.6918 0.5H13.3977L8.65571 6.01207L4.86831 0.5H0.5L6.22729 8.83522L0.5 15.4923H1.79421L6.80185 9.67137L10.8016 15.4923H15.1699L9.2306 6.84822ZM7.45801 8.90866L6.87771 8.07866L2.26053 1.47426H4.24835L7.97447 6.80422L8.55477 7.63422L13.3983 14.5623H11.4105L7.45801 8.90866Z",
  },
  {
    id: "instagram",
    label: "Instagram",
    d: "M4.89381 0.552453C4.09581 0.590103 3.55086 0.717453 3.07446 0.904653C2.58141 1.0968 2.16351 1.35465 1.74771 1.77195C1.33191 2.18925 1.07586 2.60745 0.885062 3.10125C0.700412 3.5787 0.575312 4.1241 0.540062 4.92255C0.504812 5.721 0.497012 5.97765 0.500912 8.01435C0.504812 10.0511 0.513812 10.3064 0.552512 11.1065C0.590612 11.9043 0.717512 12.4491 0.904712 12.9257C1.09716 13.4187 1.35471 13.8365 1.77216 14.2524C2.18961 14.6684 2.60751 14.9238 3.10251 15.1149C3.57951 15.2993 4.12506 15.425 4.92336 15.4599C5.72166 15.4949 5.97861 15.503 8.01471 15.4991C10.0508 15.4952 10.3072 15.4862 11.1071 15.4482C11.9071 15.4103 12.449 15.2825 12.9257 15.0962C13.4188 14.9033 13.8368 14.6462 14.2525 14.2286C14.6681 13.811 14.924 13.3925 15.1147 12.8984C15.2995 12.4214 15.425 11.8758 15.4597 11.0781C15.4946 10.2776 15.5029 10.022 15.499 7.98555C15.4951 5.94915 15.4859 5.69385 15.448 4.89405C15.41 4.09425 15.283 3.5511 15.0959 3.07425C14.9032 2.5812 14.6459 2.16375 14.2286 1.7475C13.8113 1.33125 13.3925 1.0755 12.8986 0.885303C12.4213 0.700653 11.876 0.574803 11.0777 0.540303C10.2794 0.505803 10.0225 0.496953 7.98561 0.500853C5.94876 0.504753 5.69376 0.513453 4.89381 0.552453ZM4.98141 14.1107C4.25016 14.0789 3.85311 13.9574 3.58851 13.8557C3.23811 13.7207 2.98851 13.5575 2.72481 13.2963C2.46111 13.0352 2.29911 12.7847 2.16231 12.435C2.05956 12.1704 1.93581 11.7738 1.90161 11.0426C1.86441 10.2522 1.85661 10.0149 1.85226 8.01255C1.84791 6.0102 1.85556 5.7732 1.89021 4.98255C1.92141 4.2519 2.04366 3.8544 2.14521 3.58995C2.28021 3.2391 2.44281 2.98995 2.70456 2.7264C2.96631 2.46285 3.21606 2.30055 3.56601 2.16375C3.83031 2.06055 4.22691 1.93785 4.95786 1.90305C5.74881 1.86555 5.98581 1.85805 7.98786 1.8537C9.98991 1.84935 10.2275 1.85685 11.0188 1.89165C11.7494 1.92345 12.1471 2.0445 12.4112 2.14665C12.7618 2.28165 13.0112 2.4438 13.2748 2.706C13.5383 2.9682 13.7008 3.21705 13.8376 3.56775C13.9409 3.8313 14.0636 4.22775 14.0981 4.95915C14.1358 5.7501 14.1443 5.98725 14.1479 7.98915C14.1515 9.99105 14.1445 10.2288 14.1098 11.0192C14.0779 11.7504 13.9567 12.1476 13.8548 12.4125C13.7198 12.7628 13.5571 13.0125 13.2952 13.2759C13.0333 13.5393 12.7838 13.7016 12.4337 13.8384C12.1697 13.9415 11.7727 14.0645 11.0423 14.0993C10.2514 14.1365 10.0144 14.1443 8.01156 14.1486C6.00876 14.153 5.77236 14.1449 4.98141 14.1107ZM11.0956 3.9915C11.0962 4.35555 11.316 4.68337 11.6526 4.82209C11.9892 4.96082 12.3762 4.88312 12.6331 4.62523C12.8901 4.36734 12.9663 3.98006 12.8264 3.64399C12.6864 3.30793 12.3578 3.08928 11.9938 3.09C11.4968 3.091 11.0947 3.49456 11.0956 3.9915ZM4.14906 8.00745C4.15326 10.1345 5.88066 11.8548 8.00721 11.8508C10.1338 11.8467 11.8553 10.1195 11.8513 7.99245C11.8472 5.86545 10.1194 4.14465 7.99251 4.14885C5.86566 4.15305 4.14501 5.88075 4.14906 8.00745ZM5.49996 8.00475C5.49723 6.62402 6.61432 5.5025 7.99506 5.49976C9.37579 5.49703 10.4973 6.61412 10.5001 7.99486C10.5028 9.37559 9.3857 10.4971 8.00496 10.4999C7.34188 10.5012 6.70542 10.2391 6.23562 9.7712C5.76582 9.30326 5.50119 8.66783 5.49996 8.00475Z",
  },
];

/**
 * The site footer: three link columns and a bottom row (copyright and legal links, language,
 * currency, social icons). Figma "Footer" 389:7358 on the Home, Detail and Checkout frames.
 *
 * Every link and button only calls its callback — the website plan says they show and do nothing,
 * so they are real buttons (type "button"), not links to "#" (no jump to the top, no "#" in the address).
 * Put the footer outside `<main>` so it is the page's contentinfo landmark.
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  {
    columns = FOOTER_COLUMNS,
    copyright = "© 2026 Airbnb, Inc.",
    legalLinks = FOOTER_LEGAL_LINKS,
    privacyIconSrc,
    language = "English (US)",
    currencySymbol = "₩",
    currencyCode = "KRW",
    onLinkClick,
    onLanguageClick,
    onCurrencyClick,
    onSocialClick,
    className,
    ...rest
  },
  ref,
) {
  const base = useId();

  return (
    <footer ref={ref} className={["ds-footer", className].filter(Boolean).join(" ")} data-testid="ds-footer" {...rest}>
      <div className="ds-footer__top">
        <div className="ds-footer__columns">
          {columns.map((column) => (
            <div key={column.id} className="ds-footer__column">
              <h2 id={`${base}-${column.id}`} className="ds-footer__heading">
                {column.heading}
              </h2>
              <ul className="ds-footer__list" aria-labelledby={`${base}-${column.id}`}>
                {column.links.map((link) => (
                  <li key={link.id} className="ds-footer__item">
                    <button type="button" className="ds-footer__link" onClick={() => onLinkClick?.(link.id)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-footer__bottom">
        <div className="ds-footer__legal">
          <span>{copyright}</span>
          {legalLinks.map((link) => (
            <Fragment key={link.id}>
              <span className="ds-footer__separator" aria-hidden="true">
                ·
              </span>
              <button type="button" className="ds-footer__link ds-footer__link--legal" onClick={() => onLinkClick?.(link.id)}>
                {link.label}
              </button>
            </Fragment>
          ))}
          {privacyIconSrc ? <img className="ds-footer__privacy-icon" src={privacyIconSrc} alt="" width={26} height={12} /> : null}
        </div>

        <div className="ds-footer__settings">
          <button type="button" className="ds-footer__setting" onClick={onLanguageClick}>
            {icon(GLOBE)}
            <span>{language}</span>
          </button>
          <button type="button" className="ds-footer__setting ds-footer__setting--currency" onClick={onCurrencyClick}>
            <span>{currencySymbol}</span>
            <span>{currencyCode}</span>
          </button>
          <ul className="ds-footer__social">
            {SOCIAL.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="ds-footer__social-link"
                  aria-label={item.label}
                  onClick={() => onSocialClick?.(item.id)}
                >
                  {icon(item.d)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
});
