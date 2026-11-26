import { forwardRef, useId } from "react";
import type { HTMLAttributes } from "react";
import { Button } from "../Button";
import "./ReservationSummary.css";

export interface ReservationSummaryProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "children"> {
  /** 103×103 stay photo (Figma 812:12285). The page passes it with `imageUrl()`. */
  imageSrc?: string;
  /** Photo description. Default "" — the stay name is the heading right next to it. */
  imageAlt?: string;
  /** Stay name, drawn as `<h2>` (Figma "Heading 2" 812:12287). */
  title: string;
  /** Rating with the star icon ("4.98 (487)"). */
  rating?: string;
  /** Badge with the laurel icon ("Guest favourite"). */
  badge?: string;
  cancellationTitle?: string;
  cancellationText?: string;
  /** The text button after the cancellation text. */
  policyLabel?: string;
  onPolicyClick?: () => void;
  dates: string;
  onChangeDates?: () => void;
  guests: string;
  onChangeGuests?: () => void;
  priceLine: string;
  priceAmount: string;
  total: string;
  currency?: string;
  /** Accessible name of the currency button (Figma layer "Button - Current currency: GBP. Change payment currency"). */
  currencyLabel?: string;
  onCurrencyClick?: () => void;
  breakdownLabel?: string;
  onBreakdownClick?: () => void;
}

/** Star from the current page asset `checkout-icon-star.svg` (Figma 812:12293). */
function StarIcon() {
  return (
    <svg className="ds-reservationsummary__badge-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M5.6625 0.5925L4.11375 3.9225L0.41625 4.39875C0.344717 4.40769 0.277277 4.43706 0.222005 4.48334C0.166734 4.52962 0.125974 4.59086 0.104606 4.65971C0.0832391 4.72856 0.08217 4.80211 0.101527 4.87155C0.120884 4.94099 0.159847 5.00338 0.21375 5.05125L2.95125 7.515L2.2125 11.2087C2.19859 11.2794 2.20529 11.3525 2.23181 11.4194C2.25833 11.4863 2.30355 11.5442 2.36207 11.5861C2.42059 11.628 2.48994 11.6522 2.56183 11.6558C2.63372 11.6594 2.70512 11.6422 2.7675 11.6062L6 9.73125L9.23625 11.6062C9.29863 11.6422 9.37003 11.6594 9.44192 11.6558C9.51382 11.6522 9.58316 11.628 9.64168 11.5861C9.7002 11.5442 9.74542 11.4863 9.77194 11.4194C9.79846 11.3525 9.80517 11.2794 9.79125 11.2087L9.0525 7.515L11.79 5.05125C11.8428 5.00293 11.8807 4.9405 11.8992 4.87134C11.9177 4.80217 11.9159 4.72917 11.8943 4.66094C11.8726 4.59272 11.8318 4.53213 11.7768 4.48633C11.7218 4.44054 11.6548 4.41145 11.5838 4.4025L7.88625 3.9225L6.34125 0.5925C6.31142 0.527029 6.26339 0.471522 6.20288 0.432598C6.14237 0.393674 6.07195 0.372978 6 0.372978C5.92805 0.372978 5.85763 0.393674 5.79712 0.432598C5.73661 0.471522 5.68858 0.527029 5.65875 0.5925H5.6625Z"
      />
    </svg>
  );
}

/** Laurel from the current page asset `checkout-icon-guest-favourite.svg` (Figma 812:12299). */
function LaurelIcon() {
  return (
    <svg className="ds-reservationsummary__badge-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M2.41263 4.77616C2.93228 5.25111 3.13072 5.92979 3.00794 6.8122C2.04263 6.9245 1.30016 6.74321 0.780511 6.26827C0.260856 5.7933 0.0624195 5.11463 0.185197 4.23223C1.15049 4.11989 1.89298 4.3012 2.41263 4.77616ZM2.4263 0.5625C3.194 1.12 3.58163 1.73812 3.58917 2.41685C3.59672 3.09558 3.22275 3.70641 2.46728 4.24936C1.6996 3.69182 1.31197 3.07372 1.30442 2.395C1.29688 1.71626 1.67084 1.10544 2.4263 0.5625ZM0.533218 7.97518C1.309 7.42753 2.04915 7.2381 2.75368 7.40697C3.22673 7.52034 3.62358 7.78086 3.94424 8.18847L3.88557 8.17238C4.92956 8.44849 5.54147 8.97737 5.53374 9.78426C5.52636 10.5521 4.97497 11.1123 4.0177 11.4767L3.61745 10.4253C4.18907 10.2077 4.40674 9.98658 4.40879 9.77347C4.41038 9.60786 4.22218 9.43718 3.68238 9.28318C3.14955 9.52082 2.63581 9.57959 2.13972 9.46071C1.43519 9.29181 0.899693 8.79666 0.533218 7.97518ZM11.8604 4.23223C11.9831 5.11463 11.7847 5.7933 11.2651 6.26827C10.7454 6.74321 10.0029 6.9245 9.03766 6.8122C8.91488 5.92979 9.11333 5.25111 9.63293 4.77616C10.1526 4.3012 10.8951 4.11989 11.8604 4.23223ZM9.61928 0.5625C10.3748 1.10544 10.7487 1.71626 10.7411 2.395C10.7336 3.07372 10.346 3.69182 9.57826 4.24936C8.82286 3.70641 8.44883 3.09558 8.45641 2.41685C8.46398 1.73812 8.85158 1.12 9.61928 0.5625ZM11.5122 7.97518C11.1457 8.79666 10.6102 9.29181 9.90563 9.46071C9.40958 9.57959 8.89583 9.52082 8.3644 9.28445L8.44767 9.25999C7.84288 9.41993 7.63512 9.59949 7.63679 9.77347C7.63883 9.98658 7.85651 10.2077 8.42815 10.4253L8.02792 11.4767C7.07061 11.1123 6.5192 10.5521 6.51184 9.78425C6.50425 8.99291 7.09268 8.46896 8.10018 8.18862C8.42182 7.78086 8.81866 7.52034 9.29168 7.40697C9.99623 7.2381 10.7364 7.42753 11.5122 7.97518Z"
      />
    </svg>
  );
}

/**
 * The reservation summary card of the Checkout page (Figma 812:12281): stay photo and name, cancellation note,
 * dates and guests with "Change", and the price. Every press only calls its callback (PRD: "nothing, just shows them").
 * "Change" is the kit Button ghost · small; "Full policy", "GBP" and "Price breakdown" are the kit Button text · small.
 */
export const ReservationSummary = forwardRef<HTMLElement, ReservationSummaryProps>(function ReservationSummary(
  {
    imageSrc,
    imageAlt = "",
    title,
    rating,
    badge,
    cancellationTitle = "Free cancellation",
    cancellationText,
    policyLabel = "Full policy",
    onPolicyClick,
    dates,
    onChangeDates,
    guests,
    onChangeGuests,
    priceLine,
    priceAmount,
    total,
    currency = "GBP",
    currencyLabel,
    onCurrencyClick,
    breakdownLabel = "Price breakdown",
    onBreakdownClick,
    className,
    ...rest
  },
  ref,
) {
  const titleId = `${useId()}-title`;
  const classes = ["ds-reservationsummary", className].filter(Boolean).join(" ");

  return (
    <section ref={ref} className={classes} data-testid="ds-reservationsummary" aria-labelledby={titleId} {...rest}>
      <div className="ds-reservationsummary__stay">
        <div className="ds-reservationsummary__photo">
          {imageSrc ? <img className="ds-reservationsummary__photo-img" src={imageSrc} alt={imageAlt} draggable={false} /> : null}
        </div>
        <div className="ds-reservationsummary__stay-info">
          <h2 id={titleId} className="ds-reservationsummary__title">
            {title}
          </h2>
          {rating || badge ? (
            <div className="ds-reservationsummary__badges">
              {rating ? (
                <span className="ds-reservationsummary__badge">
                  <StarIcon />
                  {rating}
                </span>
              ) : null}
              {badge ? (
                <span className="ds-reservationsummary__badge">
                  <LaurelIcon />
                  {badge}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="ds-reservationsummary__cancellation">
        <p className="ds-reservationsummary__strong">{cancellationTitle}</p>
        <p className="ds-reservationsummary__text">
          {cancellationText ? `${cancellationText} ` : null}
          <Button variant="text" size="small" onClick={() => onPolicyClick?.()}>
            {policyLabel}
          </Button>
        </p>
      </div>

      <div className="ds-reservationsummary__divider" aria-hidden="true" />

      <div className="ds-reservationsummary__info-row">
        <div className="ds-reservationsummary__info">
          <p className="ds-reservationsummary__strong">Dates</p>
          <p className="ds-reservationsummary__value">{dates}</p>
        </div>
        <Button variant="ghost" size="small" onClick={() => onChangeDates?.()}>
          Change
        </Button>
      </div>

      <div className="ds-reservationsummary__divider" aria-hidden="true" />

      <div className="ds-reservationsummary__info-row">
        <div className="ds-reservationsummary__info">
          <p className="ds-reservationsummary__strong">Guests</p>
          <p className="ds-reservationsummary__value">{guests}</p>
        </div>
        <Button variant="ghost" size="small" onClick={() => onChangeGuests?.()}>
          Change
        </Button>
      </div>

      <div className="ds-reservationsummary__divider" aria-hidden="true" />

      <div className="ds-reservationsummary__price">
        <h2 className="ds-reservationsummary__strong">Price details</h2>
        <div className="ds-reservationsummary__price-line">
          <span>{priceLine}</span>
          <span>{priceAmount}</span>
        </div>
        <div className="ds-reservationsummary__price-divider" aria-hidden="true" />
        <div className="ds-reservationsummary__price-line ds-reservationsummary__price-line--total">
          <span className="ds-reservationsummary__total-label">
            Total
            <Button variant="text" size="small" aria-label={currencyLabel ?? `Current currency: ${currency}. Change payment currency`} onClick={() => onCurrencyClick?.()}>
              {currency}
            </Button>
          </span>
          <span>{total}</span>
        </div>
        <div className="ds-reservationsummary__breakdown">
          <Button variant="text" size="small" onClick={() => onBreakdownClick?.()}>
            {breakdownLabel}
          </Button>
        </div>
      </div>
    </section>
  );
});
