import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./IconButton.css";

export type IconButtonVariant = "primary" | "secondary";
export type IconButtonSize = "l" | "s";
export type IconButtonType =
  | "services"
  | "experiences"
  | "hotels"
  | "homes"
  | "all"
  | "profile"
  | "menu"
  | "search"
  | "redirect"
  | "previous"
  | "next";
export type IconButtonStatus = "default" | "hover" | "selected";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Type (Primary/Secondary) */
  variant?: IconButtonVariant;
  /** Figma: Size (L/S) */
  size?: IconButtonSize;
  /** Figma: Icon type */
  iconType?: IconButtonType;
  /** Figma: Status (Default/Hover/Selected) */
  status?: IconButtonStatus;
  /** Accessible name */
  label: string;
  children?: ReactNode;
}

/** Icon button with variants, sizes, and icon types from Figma design */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = "secondary",
    size = "l",
    iconType,
    status = "default",
    label,
    className,
    children,
    type = "button",
    disabled,
    ...rest
  },
  ref,
) {
  const classes = [
    "ds-iconbutton",
    `ds-iconbutton--${variant}`,
    `ds-iconbutton--${size}`,
    `ds-iconbutton--${status}`,
    iconType && `ds-iconbutton--type-${iconType}`,
    disabled && "ds-iconbutton--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      data-testid="ds-iconbutton"
      aria-label={label}
      title={label}
      disabled={disabled}
      {...rest}
    >
      <span className="ds-iconbutton__icon" aria-hidden>
        {children}
      </span>
    </button>
  );
});
