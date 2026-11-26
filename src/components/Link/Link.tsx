import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Link.css";

/** Figma Links 238:2309 — Type = Subtle Link / Legal Link */
export type LinkVariant = "subtle" | "legal";
/** Figma Links 238:2309 — Size = Medium / Small */
export type LinkSize = "medium" | "small";

type LinkBaseProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { children?: ReactNode };

/**
 * Only the four Figma combinations are allowed:
 * Subtle · Medium (with or without the arrow), Subtle · Small, Legal · Small.
 */
export type LinkProps = LinkBaseProps &
  (
    | { variant?: "subtle"; size?: "medium"; /** Figma: Icon = On — the arrow after the text */ hasIcon?: boolean }
    | { variant?: "subtle"; size: "small"; hasIcon?: false }
    | { variant: "legal"; size?: "small"; hasIcon?: false }
  );

/** Figma "Keyboard arrow right" (238:2316), 16×16, original path. */
function ArrowRight() {
  return (
    <svg className="ds-link__icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M6 12L10 8L6 4" fill="none" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A text link. Use it only to go to another page — to run an action, use Button.
 * Focus is a CSS state (`:focus-visible`), not a prop. Figma has no hover look for links.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "subtle", size, hasIcon = false, className, children, ...rest },
  ref,
) {
  const resolvedSize: LinkSize = variant === "legal" ? "small" : (size ?? "medium");
  const showIcon = hasIcon && variant === "subtle" && resolvedSize === "medium";
  const classes = ["ds-link", `ds-link--${variant}`, `ds-link--${resolvedSize}`, className].filter(Boolean).join(" ");

  return (
    <a ref={ref} className={classes} data-testid="ds-link" {...rest}>
      {children}
      {showIcon ? <ArrowRight /> : null}
    </a>
  );
});
