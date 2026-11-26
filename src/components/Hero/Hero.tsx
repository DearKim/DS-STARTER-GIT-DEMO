import { forwardRef, useState } from "react";
import type { ChangeEvent, HTMLAttributes, MouseEventHandler } from "react";
import { Navigation } from "../Navigation";
import type { NavigationField } from "../Navigation";
import { ServiceTab } from "../ServiceTab";
import "./Hero.css";

/** One icon tab of the hero row. */
export interface HeroService {
  /** Value passed to `onServiceChange`, for example "all". */
  value: string;
  /** Words under the icon, for example "All". */
  label: string;
  /** Picture address, for example `imageUrl("icon-all")`. */
  iconSrc: string;
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  /** Page heading (Figma text 418:3120). */
  title?: string;
  /** Background photo address, for example `imageUrl("bg")`. Decorative. */
  backgroundSrc: string;
  /** The icon tabs from left to right (Figma Tab group 418:8303). */
  services: HeroService[];
  /** The tab chosen at first. Defaults to the first tab. */
  defaultService?: string;
  /** Called with the tab's `value` when another tab is chosen. Only one tab is chosen at a time. */
  onServiceChange?: (value: string) => void;
  /** Called with the field name and the typed words when a search box changes. Nothing else happens. */
  onFieldChange?: (field: NavigationField, value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Called when the red search button is pressed. */
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Home hero section (Figma frame 418:8305 "Start Your Trip with Airbnb"), current site look
 * (approved plan docs/plans/components/Hero.md revision 1). Uses ServiceTab ×N and Navigation (expanded, stretch, editable).
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    title = "Start Your Trip with Airbnb",
    backgroundSrc,
    services,
    defaultService,
    onServiceChange,
    onFieldChange,
    onSearchClick,
    className,
    ...rest
  },
  ref,
) {
  const [chosen, setChosen] = useState(defaultService ?? services[0]?.value);
  const classes = ["ds-hero", className].filter(Boolean).join(" ");

  return (
    <section ref={ref} className={classes} data-testid="ds-hero" {...rest}>
      <img className="ds-hero__image" src={backgroundSrc} alt="" draggable={false} />
      <span className="ds-hero__scrim" aria-hidden="true" />
      <div className="ds-hero__content">
        <h1 className="ds-hero__title">{title}</h1>
        <div className="ds-hero__services">
          {services.map((service) => (
            <ServiceTab
              key={service.value}
              label={service.label}
              iconSrc={service.iconSrc}
              selected={service.value === chosen}
              onClick={() => {
                if (service.value === chosen) return;
                setChosen(service.value);
                onServiceChange?.(service.value);
              }}
            />
          ))}
        </div>
        <div className="ds-hero__search">
          <Navigation type="expanded" stretch editable onFieldChange={onFieldChange} onSearchClick={onSearchClick} />
        </div>
      </div>
    </section>
  );
});
