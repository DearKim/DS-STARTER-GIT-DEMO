import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Chip.css";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Figma: State=Select (234:2564) — this chip is the chosen one. Sent to screen readers as aria-pressed.
   * The chip does not change it by itself: the parent sets it, so only one chip in a row is chosen.
   */
  selected?: boolean;
  /** The chip's text, e.g. "Hotels". */
  children: ReactNode;
}

/**
 * Chip — one pill-shaped filter button (Figma "Chips" 234:2568).
 *
 * Hover, Pressed and Focus come from CSS (:hover, :active, :focus-visible), not from props.
 * Figma has no Disabled chip, so `disabled` is passed to the native button without a new look.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { selected = false, type = "button", className, children, ...rest },
  ref,
) {
  const classes = ["ds-chip", selected && "ds-chip--selected", className].filter(Boolean).join(" ");

  return (
    <button ref={ref} type={type} className={classes} data-testid="ds-chip" aria-pressed={selected} {...rest}>
      {children}
    </button>
  );
});
