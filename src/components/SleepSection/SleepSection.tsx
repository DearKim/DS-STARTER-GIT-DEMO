import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { Card } from "../Card";
import "./SleepSection.css";

/** One bedroom card. */
export interface SleepRoom {
  /** Photo address (pages pass `imageUrl("detail-bedroom-1")`). Without it the card shows the placeholder color. */
  imageSrc?: string;
  imageAlt?: string;
  /** For example "Bedroom 1". */
  title: string;
  /** For example "1 queen bed". */
  description: string;
}

export interface SleepSectionProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The `<h2>` title (Figma 812:11244). */
  heading?: string;
  /** The bedrooms side by side (PRD and Figma: two). */
  rooms?: SleepRoom[];
}

const DEFAULT_ROOMS: SleepRoom[] = [
  { title: "Bedroom 1", description: "1 queen bed" },
  { title: "Bedroom 2", description: "1 queen bed" },
];

/**
 * The Detail page "Where you'll sleep" section: a top line, the title and one bedroom Card per room.
 * Each bedroom is the shared `Card type="sleep" layout="detail"`.
 * Approved plan: docs/plans/components/SleepSection.md revision 1.
 */
export const SleepSection = forwardRef<HTMLElement, SleepSectionProps>(function SleepSection(
  { heading = "Where you'll sleep", rooms = DEFAULT_ROOMS, className, ...rest },
  ref,
) {
  const classes = ["ds-sleep-section", className].filter(Boolean).join(" ");
  return (
    <section ref={ref} className={classes} data-testid="ds-sleep-section" {...rest}>
      <h2 className="ds-sleep-section__heading">{heading}</h2>
      <div className="ds-sleep-section__rooms">
        {rooms.map((room, index) => (
          <div key={`${index}-${room.title}`} className="ds-sleep-section__item">
            <Card
              type="sleep"
              layout="detail"
              imageSrc={room.imageSrc}
              imageAlt={room.imageAlt}
              title={room.title}
              description={room.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
});
