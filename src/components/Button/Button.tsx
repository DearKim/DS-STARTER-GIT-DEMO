import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import "./Button.css";

/** Figma: Primary Buttons 238:2153 · Secondary Buttons 238:2188 · Tertiary Buttons 238:2256 */
export type ButtonFigmaVariant = "primary" | "secondary" | "tertiary";
/** All looks: the three Figma sets plus the shared site looks `ghost` and `text` (plan revision 2). */
export type ButtonVariant = ButtonFigmaVariant | "ghost" | "text";
/** Figma: Size = Full Width / Small (primary · secondary · tertiary) */
export type ButtonSize = "full-width" | "small";
/** `ghost` sizes by box height: small 32 ("Change") · medium 37 ("사진 모두 보기") · large 48 ("Show more"). */
export type ButtonGhostSize = "small" | "medium" | "large";
/**
 * `text` sizes by box height: xsmall 16 ("Learn more about summaries") · small 18 ("Full policy", "More info") ·
 * medium 21 ("리스팅 신고하기") · large 24 ("Show original") · xlarge 34 ("공유하기", "저장").
 */
export type ButtonTextSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
/** `text` color role: default = `text`, secondary = `text-secondary`. */
export type ButtonTone = "default" | "secondary";

interface ButtonCommonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Leading icon (`<svg>` with `currentColor`). Shown only where the look has one:
   * secondary · tertiary at Full Width (Figma Icon = On), ghost medium, text xsmall · medium · xlarge.
   * Primary · secondary · tertiary hide it while disabled or loading (Figma shows no icon there).
   */
  icon?: ReactNode;
  /** When set, the button renders as a real link (`<a href>`) with the same look. */
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
}

export interface ButtonFigmaProps extends ButtonCommonProps {
  /** Figma component set: Primary / Secondary / Tertiary Buttons */
  variant?: ButtonFigmaVariant;
  /** Figma: Size. `full-width` fills its parent; `small` fits its label. */
  size?: ButtonSize;
  /**
   * Figma: State = Loading. Shows three dots instead of the label.
   * The button keeps keyboard focus and its name, but it does not run `onClick` (and drops `href`).
   */
  loading?: boolean;
  tone?: never;
}

export interface ButtonGhostProps extends ButtonCommonProps {
  /** Gray #F2F2F2 rounded button (shared site look, no Figma set). Hover = `control-bg-subtle-hover`. */
  variant: "ghost";
  size?: ButtonGhostSize;
  loading?: never;
  tone?: never;
}

export interface ButtonTextProps extends ButtonCommonProps {
  /** Text button without a box (xlarge has a hover background). Underline depends on the size. */
  variant: "text";
  size?: ButtonTextSize;
  tone?: ButtonTone;
  loading?: never;
}

export type ButtonProps = ButtonFigmaProps | ButtonGhostProps | ButtonTextProps;

/** Sizes that have a measured leading icon in the shared looks. */
const ICON_SIZES: Record<"ghost" | "text", readonly string[]> = {
  ghost: ["medium"],
  text: ["xsmall", "medium", "xlarge"],
};

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
    loading: loadingProp = false,
    tone = "default",
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
  const shared = variant === "ghost" || variant === "text";
  // ghost·text have no Loading look (plan Q-20 A): `loading` only works for the Figma sets.
  const loading = !shared && Boolean(loadingProp);
  const showIcon = shared
    ? Boolean(icon) && ICON_SIZES[variant].includes(size)
    : Boolean(icon) && variant !== "primary" && size === "full-width" && !loading && !disabled;
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    variant === "text" && tone === "secondary" && "ds-button--tone-secondary",
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
