import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./ServiceTab.css";

export interface ServiceTabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> {
  /** Words under the icon, for example "All" or "Experience". They are also the button's name. */
  label: string;
  /** Address of the Figma "Service Icon" picture, for example `imageUrl("icon-all")`. Decorative (`alt=""`). */
  iconSrc: string;
  /** Figma `Status=Selected`: the chosen tab. Only one tab of a group is chosen; the parent moves it. */
  selected?: boolean;
}

/**
 * One icon tab from the Figma "Service tab" set (418:3150), drawn with the current Home page look
 * (approved plan docs/plans/components/ServiceTab.md revision 1). Hover is CSS `:hover`, not a prop.
 */
export const ServiceTab = forwardRef<HTMLButtonElement, ServiceTabProps>(function ServiceTab(
  { label, iconSrc, selected = false, className, ...rest },
  ref,
) {
  const classes = ["ds-service-tab", selected && "ds-service-tab--selected", className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type="button" className={classes} data-testid="ds-service-tab" aria-pressed={selected} {...rest}>
      <img className="ds-service-tab__icon" src={iconSrc} alt="" draggable={false} />
      <span className="ds-service-tab__label">{label}</span>
    </button>
  );
});
