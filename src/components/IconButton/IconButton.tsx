import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./IconButton.css";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Variant */
  variant?: IconButtonVariant;
  /** Figma: Size */
  size?: IconButtonSize;
  /** Figma: Icon — if not given, `children` is used as the icon. */
  icon?: ReactNode;
  /**
   * What the button does. The button has no visible text, so this becomes its accessible name (aria-label) and its tooltip (title).
   * If you leave it out, a screen reader only says "button".
   */
  label: string;
  children?: ReactNode;
}

/** A button that shows only an icon. It is square, and `label` is its accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = "primary", size = "md", icon, label, className, children, type = "button", ...rest },
  ref,
) {
  const classes = ["ds-iconbutton", `ds-iconbutton--${variant}`, `ds-iconbutton--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} type={type} className={classes} data-testid="ds-iconbutton" aria-label={label} title={label} {...rest}>
      <span className="ds-iconbutton__icon" aria-hidden>
        {icon ?? children}
      </span>
    </button>
  );
});
