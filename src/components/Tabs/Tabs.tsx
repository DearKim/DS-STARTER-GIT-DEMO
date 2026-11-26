import { forwardRef, useId, useRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import "./Tabs.css";
import { useText } from "../../lib/i18n";

/** Figma: "Underline Tabs" (229:2214) = line, "Pill Tabs" (237:2219) = pill. */
export type TabsVariant = "line" | "pill";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  /** Figma Underline Tabs Icon=On: a 24×24 icon above the label. It takes the tab's text color (currentColor). Only the line variant shows it. */
  icon?: ReactNode;
  /** Figma has no Disabled tab, so this only turns the native button off (no new look). Arrow keys skip it. */
  disabled?: boolean;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Underline Tabs (line) or Pill Tabs (pill) */
  variant?: TabsVariant;
  items?: TabItem[];
  defaultTab?: string;
  /** Called with the tab's id when the selected tab changes. It isn't named onChange because that name belongs to the native DOM event. */
  onTabChange?: (id: string) => void;
  label?: string;
  children?: ReactNode;
}

/**
 * A row of tabs that switches between panels of content.
 *
 * Follows the WAI-ARIA tabs pattern and uses a **roving tabindex**: one press of the Tab key moves
 * into the whole tab list, and inside it ← → move between tabs and select them (Home/End jump to the ends).
 * The selected tab is `aria-selected` — Figma's Line=On (line) or the white segment (pill).
 * Hover, Pressed and Focus come from CSS, not from props.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { variant = "line", items = [], defaultTab, onTabChange, label: labelProp, className, children, ...rest },
  ref,
) {
  const t = useText();
  const label = labelProp ?? t.tabs;
  const base = useId();
  const first = items.find((t) => !t.disabled)?.id ?? "";
  const [active, setActive] = useState(defaultTab ?? first);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    setActive(id);
    onTabChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const usable = items.map((_, i) => i).filter((i) => !items[i]?.disabled);
    if (!usable.length) return;
    const at = usable.indexOf(index);
    let target: number | undefined;
    if (e.key === "ArrowRight") target = usable[(at + 1) % usable.length];
    else if (e.key === "ArrowLeft") target = usable[(at - 1 + usable.length) % usable.length];
    else if (e.key === "Home") target = usable[0];
    else if (e.key === "End") target = usable[usable.length - 1];
    if (target === undefined) return;
    e.preventDefault();
    const item = items[target];
    if (!item) return;
    // 이동하면 바로 선택한다(automatic activation, 계획 Q-04).
    select(item.id);
    tabs.current[target]?.focus();
  };

  const classes = ["ds-tabs", `ds-tabs--${variant}`, className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes} data-testid="ds-tabs" {...rest}>
      <div role="tablist" aria-label={label} className="ds-tabs__list">
        {items.map((item, i) => {
          const selected = item.id === active;
          const withIcon = variant === "line" && item.icon != null;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${base}-t-${item.id}`}
              ref={(node) => {
                tabs.current[i] = node;
              }}
              className={withIcon ? "ds-tabs__tab ds-tabs__tab--icon" : "ds-tabs__tab"}
              aria-selected={selected}
              aria-controls={`${base}-p-${item.id}`}
              // roving tabindex: 선택된 탭만 Tab 키로 들어온다.
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {withIcon ? (
                <span className="ds-tabs__icon" aria-hidden>
                  {item.icon}
                </span>
              ) : null}
              <span className="ds-tabs__label">{item.label}</span>
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${base}-p-${item.id}`}
          aria-labelledby={`${base}-t-${item.id}`}
          className="ds-tabs__panel"
          hidden={item.id !== active}
          // 패널 자체가 포커스를 받아야 탭에서 내용으로 넘어갈 수 있다.
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
      {children}
    </div>
  );
});
