import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import "./CheckoutHeading.css";

export interface CheckoutHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** The page title, drawn as `<h1>` (Figma 812:12225 "Confirm and pay"). */
  title: string;
  /** Where the round back link goes (PRD: "/detail"). It is a real link, not a button. */
  backHref: string;
  /** The back link's accessible name (it shows only an arrow). */
  backLabel?: string;
}

/**
 * Back arrow from the current page asset `checkout-icon-back.svg` (Figma 812:12220). Stroke uses currentColor.
 * The svg is the Figma 16×16 icon frame (812:12219, at 14,14 in the 44 circle), so it sits on whole pixels.
 * The original path is moved by (0.85355, 1.29289) to the centre of that frame — the same place the page's
 * 14.29×13.41 picture had — which puts the 2px horizontal line exactly on pixel rows (crisp, like the reference).
 */
function BackArrow() {
  return (
    <svg className="ds-checkoutheading__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        transform="translate(0.85355 1.29289)"
        d="M1.29293 6.70711H14.2929M6.79293 12.7071L1.14293 7.05711C1.05132 6.96364 1 6.83798 1 6.70711C1 6.57623 1.05132 6.45057 1.14293 6.35711L6.79293 0.707107"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * The Checkout title row (Figma "Section" 812:12216): a round back link outside the left edge and the page `<h1>`.
 * The back link sits 68px left of the title, like Figma — leave that room in the page layout.
 * Figma has no hover or focus look; focus shows the browser's own ring.
 */
export const CheckoutHeading = forwardRef<HTMLDivElement, CheckoutHeadingProps>(function CheckoutHeading(
  { title, backHref, backLabel = "Back", className, ...rest },
  ref,
) {
  const classes = ["ds-checkoutheading", className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} data-testid="ds-checkoutheading" {...rest}>
      <a className="ds-checkoutheading__back" href={backHref} aria-label={backLabel}>
        <BackArrow />
      </a>
      <h1 className="ds-checkoutheading__title">{title}</h1>
    </div>
  );
});
