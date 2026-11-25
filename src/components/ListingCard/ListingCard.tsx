import { forwardRef } from "react";
import type { HTMLAttributes, MouseEventHandler } from "react";
import "./ListingCard.css";

export interface ListingCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** First line, semibold. Figma default: "Groveland, California". */
  title?: string;
  /** Second line. Figma default: "Yosemite National Park". */
  location?: string;
  /** Third line. Figma default: "Oct 23 - 28". */
  dates?: string;
  /** Price amount, semibold. Figma default: "$289". */
  price?: string;
  /** Word after the price, regular. Figma default: "night". */
  priceUnit?: string;
  /** Rating next to the star. Figma default: "4.91". */
  rating?: string;
  /** Photo address. Without it the photo area shows the placeholder color. */
  imageSrc?: string;
  /** Photo description for screen readers. */
  imageAlt?: string;
  /** Saved to the wishlist. Sent as aria-pressed; Figma has no filled heart, so the look stays the same. */
  isFavorite?: boolean;
  /** Called when the heart button is pressed. */
  onFavoriteClick?: MouseEventHandler<HTMLButtonElement>;
  /** Page address. When set, the title becomes a link and the whole card opens it; the heart still works on its own. */
  href?: string;
}

/** A listing card from the Figma Card set, "Default Card" variant (238:2494). */
export const ListingCard = forwardRef<HTMLElement, ListingCardProps>(function ListingCard(
  {
    title = "Groveland, California",
    location = "Yosemite National Park",
    dates = "Oct 23 - 28",
    price = "$289",
    priceUnit = "night",
    rating = "4.91",
    imageSrc,
    imageAlt = "",
    isFavorite = false,
    onFavoriteClick,
    href,
    className,
    ...rest
  },
  ref,
) {
  return (
    <article
      ref={ref}
      className={["ds-listing-card", className].filter(Boolean).join(" ")}
      data-testid="ds-listing-card"
      {...rest}
    >
      <div className="ds-listing-card__media">
        {imageSrc ? <img className="ds-listing-card__image" src={imageSrc} alt={imageAlt} /> : null}
        <button
          type="button"
          className="ds-listing-card__heart"
          aria-label="Save to wishlist"
          aria-pressed={isFavorite}
          onClick={onFavoriteClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path
              className="ds-listing-card__heart-shape"
              d="M7 3C4.239 3 2 5.216 2 7.95C2 10.157 2.875 15.395 11.488 20.69C11.6423 20.7839 11.8194 20.8335 12 20.8335C12.1806 20.8335 12.3577 20.7839 12.512 20.69C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3C14.239 3 12 6 12 6C12 6 9.761 3 7 3Z"
              fill="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <svg className="ds-listing-card__dots" width="49" height="6" viewBox="0 0 49 6" aria-hidden="true" focusable="false">
          <circle className="ds-listing-card__dot ds-listing-card__dot--current" cx="3" cy="3" r="3" fill="currentColor" />
          <circle className="ds-listing-card__dot" cx="14" cy="3" r="3" fill="currentColor" />
          <circle className="ds-listing-card__dot" cx="25" cy="3" r="3" fill="currentColor" />
          <circle className="ds-listing-card__dot" cx="36" cy="3" r="3" fill="currentColor" />
          <circle className="ds-listing-card__dot" cx="47" cy="3" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="ds-listing-card__body">
        <div className="ds-listing-card__info">
          <div className="ds-listing-card__lines">
            <p className="ds-listing-card__title">
              {href ? (
                <a className="ds-listing-card__link" href={href}>
                  {title}
                </a>
              ) : (
                title
              )}
            </p>
            <p className="ds-listing-card__meta">{location}</p>
            <p className="ds-listing-card__meta">{dates}</p>
          </div>
          <p className="ds-listing-card__price">
            <span className="ds-listing-card__amount">{price}</span> {priceUnit}
          </p>
        </div>
        <p className="ds-listing-card__rating">
          <span className="ds-listing-card__star" aria-hidden="true">
            <svg width="13.9913" height="13.3556" viewBox="0 0 13.9913 13.3556" fill="none" focusable="false">
              <path
                d="M6.54356 0.286448C6.72397 -0.0954823 7.26736 -0.0954828 7.44776 0.286447L9.16868 3.92971C9.24156 4.08402 9.38811 4.19049 9.55739 4.21213L13.5541 4.72298C13.9731 4.77654 14.141 5.29333 13.8335 5.58293L10.9004 8.34545C10.7762 8.46245 10.7202 8.63473 10.7519 8.8024L11.5011 12.7614C11.5797 13.1764 11.1401 13.4958 10.7696 13.2929L7.2359 11.3569C7.08623 11.2749 6.90509 11.2749 6.75543 11.3569L3.22172 13.2929C2.85127 13.4958 2.41166 13.1764 2.4902 12.7614L3.23941 8.8024C3.27114 8.63473 3.21517 8.46245 3.09094 8.34545L0.157779 5.58293C-0.149709 5.29333 0.0182067 4.77654 0.437193 4.72298L4.43394 4.21213C4.60321 4.19049 4.74976 4.08402 4.82264 3.92971L6.54356 0.286448Z"
                fill="currentColor"
              />
            </svg>
          </span>
          {rating}
        </p>
      </div>
    </article>
  );
});
