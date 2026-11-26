import { forwardRef } from "react";
import type { HTMLAttributes, MouseEventHandler } from "react";
import { Button } from "../Button";
import { Text } from "../Text";
import "./ListingDescription.css";

/** The Detail page description text (PRD §3 Detail 6). `\n` starts a new line; empty lines are kept. */
const DEFAULT_TEXT = [
  "Inbyulgram | @stay_2572",
  "This is' stay 2572 ', located on the way to Anmok Coffee Street.",
  "We will try to provide a complete 'rest' for our guests.",
  "",
  "",
  "Stay 2572 provides a 40-pyeong space used by the host as a private house.",
  "(This is for 4 people)",
].join("\n");

export interface ListingDescriptionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** First sentence in the gray box (Figma 812:11228). */
  noticeText?: string;
  /** Text button after the sentence (Figma 812:11229). */
  showOriginalLabel?: string;
  /** Called when "Show original" is pressed. Nothing else happens (PRD: "nothing, just shows them"). */
  onShowOriginalClick?: MouseEventHandler<HTMLButtonElement>;
  /** The description. `\n` starts a new line. Text taller than 176px is hidden (Figma 812:11232). */
  text?: string;
  /** Gray button under the text (Figma 812:11236). */
  showMoreLabel?: string;
  /** Called when "Show more" is pressed. The text does not open (PRD: "nothing, just shows them"). */
  onShowMoreClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * The Detail page description section: a top line, the gray translation note with "Show original",
 * the description (cut at 176px) and "Show more".
 * Approved plan: docs/plans/components/ListingDescription.md revision 1.
 */
export const ListingDescription = forwardRef<HTMLDivElement, ListingDescriptionProps>(function ListingDescription(
  {
    noticeText = "Some info has been automatically translated.",
    showOriginalLabel = "Show original",
    onShowOriginalClick,
    text = DEFAULT_TEXT,
    showMoreLabel = "Show more",
    onShowMoreClick,
    className,
    ...rest
  },
  ref,
) {
  const classes = ["ds-listing-description", className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes} data-testid="ds-listing-description" {...rest}>
      <div className="ds-listing-description__notice">
        <Text as="span" variant="body">
          {noticeText}
        </Text>
        <Button variant="text" size="large" onClick={onShowOriginalClick}>
          {showOriginalLabel}
        </Button>
      </div>
      <div className="ds-listing-description__body">
        <p className="ds-listing-description__text">{text}</p>
      </div>
      <div className="ds-listing-description__more">
        <Button variant="ghost" size="large" onClick={onShowMoreClick}>
          {showMoreLabel}
        </Button>
      </div>
    </div>
  );
});
