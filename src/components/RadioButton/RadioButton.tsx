import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./RadioButton.css";

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children"> {
  /** Figma: the text to the right of the circle ("Keypad"). Without it, give `aria-label` or `aria-labelledby`. */
  label?: string;
  /** Figma: Subtext — a smaller second line under the label ("Guests can open the door with a code"). */
  subtext?: string;
}

/**
 * A radio button for choosing one option from a set (Figma "Radio Buttons with Labels" 213:1943 / "Radio Button" 213:1944).
 *
 * It is one native `input[type=radio]`. Make a group by giving several radios the same `name`:
 * Tab moves into the group and the arrow keys move the choice (native behavior).
 * Hover, focus and checked are drawn by CSS (`:hover`, `:focus-visible`, `:checked`) — there is no `state` prop.
 * The ref points to the input. `className` goes on the outer `<label>` (layout only).
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { label, subtext, className, id: idProp, "aria-describedby": describedBy, "aria-labelledby": labelledBy, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const labelId = label ? `${id}-label` : undefined;
  const subtextId = subtext ? `${id}-subtext` : undefined;
  // 이름은 라벨 글자만, 보조 글은 설명으로 읽히게 한다(<label> 안의 글자가 모두 이름에 합쳐지지 않도록).
  const labelled = labelledBy ?? (rest["aria-label"] ? undefined : labelId);
  const described = [describedBy, subtextId].filter(Boolean).join(" ") || undefined;
  const classes = ["ds-radiobutton", subtext ? "ds-radiobutton--subtext" : null, className].filter(Boolean).join(" ");

  return (
    <label className={classes} htmlFor={id} data-testid="ds-radiobutton">
      <span className="ds-radiobutton__control">
        <input ref={ref} id={id} type="radio" className="ds-radiobutton__input" aria-labelledby={labelled} aria-describedby={described} {...rest} />
        {/* Figma 213:1944: circle r 11.5 with a 1px stroke (24×24) and a center dot r 4. Colors come from CSS tokens. */}
        <svg className="ds-radiobutton__svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <circle className="ds-radiobutton__circle" cx="12" cy="12" r="11.5" />
          <circle className="ds-radiobutton__dot" cx="12" cy="12" r="4" />
        </svg>
        <span className="ds-radiobutton__ring" aria-hidden="true" />
      </span>
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
