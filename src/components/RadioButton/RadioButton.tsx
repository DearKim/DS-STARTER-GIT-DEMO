import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, MouseEventHandler } from "react";
import { Button } from "../Button";
import "./RadioButton.css";

/** `default` = Figma 213:1943 (circle first). `list` = the Checkout list row (text first, circle at the end, lines between rows). */
export type RadioButtonVariant = "default" | "list";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children"> {
  /** Figma: the text next to the circle ("Keypad"). Without it, give `aria-label` or `aria-labelledby`. */
  label?: string;
  /** Figma: Subtext — a smaller second line under the label ("Guests can open the door with a code"). */
  subtext?: string;
  /**
   * `list` (plan revision 2): the label on the left and the circle on the right, filling the parent's width.
   * Rows that follow each other draw a thin line between them. The first row has no space above it.
   */
  variant?: RadioButtonVariant;
  /** `list` only: a text button after the subtext ("More info"). It does not choose the radio. */
  actionLabel?: string;
  /** `list` only: called when the `actionLabel` button is pressed. */
  onActionClick?: MouseEventHandler<HTMLButtonElement>;
}

/** Figma 213:1944: circle r 11.5 with a 1px stroke (24×24) and a center dot r 4. Colors come from CSS tokens. */
function RadioCircle() {
  return (
    <svg className="ds-radiobutton__svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle className="ds-radiobutton__circle" cx="12" cy="12" r="11.5" />
      <circle className="ds-radiobutton__dot" cx="12" cy="12" r="4" />
    </svg>
  );
}

/**
 * A radio button for choosing one option from a set (Figma "Radio Buttons with Labels" 213:1943 / "Radio Button" 213:1944).
 *
 * It is one native `input[type=radio]`. Make a group by giving several radios the same `name`:
 * Tab moves into the group and the arrow keys move the choice (native behavior).
 * Hover, focus and checked are drawn by CSS (`:hover`, `:focus-visible`, `:checked`) — there is no `state` prop.
 * The ref points to the input. `className` goes on the outer element (layout only).
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  {
    label,
    subtext,
    variant = "default",
    actionLabel,
    onActionClick,
    className,
    id: idProp,
    "aria-describedby": describedBy,
    "aria-labelledby": labelledBy,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const labelId = label ? `${id}-label` : undefined;
  const subtextId = subtext ? `${id}-subtext` : undefined;
  // 이름은 라벨 글자만, 보조 글은 설명으로 읽히게 한다(<label> 안의 글자가 모두 이름에 합쳐지지 않도록).
  const labelled = labelledBy ?? (rest["aria-label"] ? undefined : labelId);
  const described = [describedBy, subtextId].filter(Boolean).join(" ") || undefined;

  const control = (
    <span className="ds-radiobutton__control">
      <input ref={ref} id={id} type="radio" className="ds-radiobutton__input" aria-labelledby={labelled} aria-describedby={described} {...rest} />
      <RadioCircle />
      <span className="ds-radiobutton__ring" aria-hidden="true" />
    </span>
  );

  if (variant === "list") {
    // revision 2 (Q-13 A): label 요소 안에 버튼을 넣지 않는다. 글자는 각각 label(for) 로 input 과 잇고,
    // "More info" 는 label 밖의 키트 Button(text · small · secondary)이다.
    const classes = ["ds-radiobutton", "ds-radiobutton--list", className].filter(Boolean).join(" ");
    return (
      <div className={classes} data-testid="ds-radiobutton">
        <div className="ds-radiobutton__text">
          {label ? (
            <label id={labelId} htmlFor={id} className="ds-radiobutton__label">
              {label}
            </label>
          ) : null}
          {subtext || actionLabel ? (
            <p className="ds-radiobutton__subtext">
              {subtext ? (
                <label id={subtextId} htmlFor={id} className="ds-radiobutton__subtext-label">
                  {subtext}
                </label>
              ) : null}
              {subtext && actionLabel ? " " : null}
              {actionLabel ? (
                <Button variant="text" size="small" tone="secondary" onClick={onActionClick}>
                  {actionLabel}
                </Button>
              ) : null}
            </p>
          ) : null}
        </div>
        {control}
      </div>
    );
  }

  const classes = ["ds-radiobutton", subtext ? "ds-radiobutton--subtext" : null, className].filter(Boolean).join(" ");
  return (
    <label className={classes} htmlFor={id} data-testid="ds-radiobutton">
      {control}
      {label || subtext ? (
        <span className="ds-radiobutton__text">
          {label ? (
            <span id={labelId} className="ds-radiobutton__label">
              {label}
            </span>
          ) : null}
          {subtext ? (
            <span id={subtextId} className="ds-radiobutton__subtext">
              {subtext}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
});
