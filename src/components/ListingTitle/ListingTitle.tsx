import { forwardRef } from "react";
import type { MouseEvent } from "react";
import { Button } from "../Button";
import "./ListingTitle.css";

export interface ListingTitleProps {
  /** The stay's name, the page's only `<h1>` (Figma 812:4793). */
  title: string;
  /** Label of the share button (812:6954). */
  shareLabel?: string;
  /** Label of the save button (812:6961). */
  saveLabel?: string;
  /** Called when "공유하기" is clicked. Nothing else happens (PRD: "nothing, just shows them"). */
  onShareClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Called when "저장" is clicked. No pressed state. */
  onSaveClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Language of the two labels, e.g. "ko" on an English page, so screen readers read them correctly. */
  labelLang?: string;
}

/** Share icon — exact path of my-assets/images/detail-icon-share.svg (Figma 812:6952, 16×16). */
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M13.5 9V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H3.5C2.94771 14.5 2.5 14.0523 2.5 13.5V9M8 1.5V12M3 6.5L7.64645 1.85355C7.8417 1.65829 8.1583 1.65829 8.35355 1.85355L13 6.5"
        stroke="currentColor"
      />
    </svg>
  );
}

/** Heart icon — exact path of my-assets/images/detail-icon-save.svg (Figma 812:6959, 16×16). */
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M7.9999 14.3334C11.5832 11.891 15.1666 8.8912 15.1666 5.279C15.1666 4.35424 14.8169 3.43003 14.1172 2.72462C13.4174 2.01972 12.5006 1.66675 11.5832 1.66675C10.6664 1.66675 9.7491 2.01972 9.04985 2.72462L7.9999 3.783L6.9505 2.72462C6.25075 2.01972 5.3339 1.66675 4.41658 1.66675C3.49976 1.66675 2.58243 2.01972 1.88317 2.72462C1.1834 3.43003 0.83325 4.35424 0.83325 5.279C0.83325 8.8912 4.41658 11.891 7.9999 14.3334Z"
        stroke="currentColor"
      />
    </svg>
  );
}

/**
 * The title row at the top of a stay's page: the stay's name and the "공유하기" · "저장" buttons.
 * The buttons are the shared `Button variant="text" size="xlarge"` look.
 * Approved plan: docs/plans/components/ListingTitle.md revision 1.
 */
export const ListingTitle = forwardRef<HTMLDivElement, ListingTitleProps>(function ListingTitle(
  { title, shareLabel = "공유하기", saveLabel = "저장", onShareClick, onSaveClick, labelLang },
  ref,
) {
  return (
    <div ref={ref} className="ds-listing-title" data-testid="ds-listing-title">
      <h1 className="ds-listing-title__title">{title}</h1>
      <div className="ds-listing-title__actions">
        <Button variant="text" size="xlarge" icon={<ShareIcon />} onClick={onShareClick}>
          <span lang={labelLang}>{shareLabel}</span>
        </Button>
        <Button variant="text" size="xlarge" icon={<HeartIcon />} onClick={onSaveClick}>
          <span lang={labelLang}>{saveLabel}</span>
        </Button>
      </div>
    </div>
  );
});
