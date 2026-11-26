import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import "./Button.css";

/** Figma: Primary Buttons 238:2153 · Secondary Buttons 238:2188 · Tertiary Buttons 238:2256 */
export type ButtonVariant = "primary" | "secondary" | "tertiary";
/** Figma: Size = Full Width / Small */
export type ButtonSize = "full-width" | "small";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Figma component set: Primary / Secondary / Tertiary Buttons */
  variant?: ButtonVariant;
  /** Figma: Size. `full-width` fills its parent; `small` fits its label. */
  size?: ButtonSize;
  /**
   * Figma: State = Loading. Shows three dots instead of the label.
   * The button keeps keyboard focus and its name, but it does not run `onClick` (and drops `href`).
   */
  loading?: boolean;
  /**
   * Figma: Icon = On. Only Secondary and Tertiary at Full Width have it:
   * Secondary puts the icon before the label, Tertiary puts it at the left edge.
   * Hidden while disabled or loading (Figma shows no icon there).
   */
  icon?: ReactNode;
  /** When set, the button renders as a real link (`<a href>`) with the same look. */
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
}

/** Figma "ellipses" (36×8): three dots, the first one muted. Colors come from CSS tokens. */
function LoadingDots() {
  return (
    <svg className="ds-button__dots" width="36" height="8" viewBox="0 0 36 8" aria-hidden="true" focusable="false">
      <circle className="ds-button__dot--muted" cx="4" cy="4" r="4" />
      <circle cx="18" cy="4" r="4" fill="currentColor" />
      <circle cx="32" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}

/**
 * A button that runs an action. Use only one Primary button per screen.
 *
 * Hover, Pressed and Focus are CSS states (`:hover`, `:active`, `:focus-visible`), not props.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "small",
    loading = false,
    icon,
    href,
    target,
    rel,
    disabled = false,
    className,
    children,
    type = "button",
    onClick,
    ...rest
  },
  ref,
) {
  const showIcon = Boolean(icon) && variant !== "primary" && size === "full-width" && !loading && !disabled;
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    loading && "ds-button--loading",
    disabled && "ds-button--disabled",
    showIcon && "ds-button--with-icon",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {showIcon ? <span className="ds-button__icon" aria-hidden="true">{icon}</span> : null}
      <span className="ds-button__label">{children}</span>
      {loading ? <LoadingDots /> : null}
    </>
  );

  if (href !== undefined) {
    const inactive = disabled || loading;
    const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (inactive) {
        event.preventDefault();
        return;
      }
      (onClick as unknown as ((event: MouseEvent<HTMLAnchorElement>) => void) | undefined)?.(event);
    };
    const { form: _form, formAction: _formAction, formMethod: _formMethod, formNoValidate: _formNoValidate, formTarget: _formTarget, formEncType: _formEncType, name: _name, value: _value, ...anchorRest } = rest;
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        data-testid="ds-button"
        href={inactive ? undefined : href}
        target={target}
        rel={rel}
        role={inactive ? "link" : undefined}
        aria-disabled={inactive || undefined}
        aria-busy={loading || undefined}
        onClick={handleLinkClick}
        {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    // type 기본값이 submit 이면 form 안의 모든 버튼이 제출 버튼이 된다.
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      data-testid="ds-button"
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {content}
    </button>
  );
});
