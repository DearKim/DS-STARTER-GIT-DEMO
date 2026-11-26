import { forwardRef, useCallback, useId, useRef } from "react";
import type { InputHTMLAttributes, MouseEvent } from "react";
import "./TextInput.css";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "children"> {
  /** Figma: Label — small text inside the box, above the value. Without it, give `aria-label`. */
  label?: string;
  /** Figma: Helper Text — the line under the box. Hidden while an error message is shown. */
  helperText?: string;
  /** Figma: Status=Error — red box and label, `aria-invalid="true"`. */
  invalid?: boolean;
  /** Figma: "Error message" — shown with the error icon instead of the helper text while `invalid`. */
  errorMessage?: string;
  /** Figma: Icon — the calendar icon at the right end of the box (decorative). */
  icon?: boolean;
}

/**
 * Single-line text input (Figma "Inputs" 208:2159).
 *
 * The label sits inside the box, the helper or error line below it. Focus and typing ("Filled") are drawn by CSS
 * (`:focus-within`) — there is no `state` prop. Clicking anywhere in the box focuses the input.
 * The ref points to the `<input>`, so form libraries (register) and focus() work as they are.
 * `className` goes on the outer wrapper (layout only).
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, helperText, invalid = false, errorMessage, icon = false, className, id: idProp, "aria-describedby": describedBy, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const inner = useRef<HTMLInputElement | null>(null);
  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      inner.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const showError = invalid && Boolean(errorMessage);
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const described = [describedBy, showError ? errorId : helperText ? helpId : null].filter(Boolean).join(" ") || undefined;
  const classes = [
    "ds-textinput",
    label ? "ds-textinput--labelled" : null,
    invalid ? "ds-textinput--invalid" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 상자의 여백·라벨을 눌러도 입력 칸에 포커스한다(입력 칸 자체를 누르면 브라우저가 처리).
  const focusFromBox = (event: MouseEvent<HTMLDivElement>) => {
    const field = inner.current;
    if (!field || field.disabled || event.target === field) return;
    event.preventDefault();
    field.focus();
  };

  return (
    <div className={classes} data-testid="ds-textinput">
      <div className="ds-textinput__box" onMouseDown={focusFromBox}>
        {label ? (
          <label className="ds-textinput__label" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <span className="ds-textinput__row">
          <input
            ref={setRefs}
            id={id}
            className="ds-textinput__field"
            aria-invalid={invalid || undefined}
            aria-describedby={described}
            {...rest}
          />
          {icon ? (
            // Figma "Calendar today" 16×16 (asset 8b0cc0a0…)
            <svg className="ds-textinput__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M13.333 2.00008H12.6663V0.666748H11.333V2.00008H4.66634V0.666748H3.33301V2.00008H2.66634C1.93301 2.00008 1.33301 2.60008 1.33301 3.33341V14.0001C1.33301 14.7334 1.93301 15.3334 2.66634 15.3334H13.333C14.0663 15.3334 14.6663 14.7334 14.6663 14.0001V3.33341C14.6663 2.60008 14.0663 2.00008 13.333 2.00008ZM13.333 14.0001H2.66634V5.33342H13.333V14.0001Z"
                fill="currentColor"
              />
            </svg>
          ) : null}
        </span>
      </div>
      {showError ? (
        <p id={errorId} className="ds-textinput__error">
          {/* Figma error "Vector" 16×16 (asset 868c79c8…) */}
          <svg className="ds-textinput__error-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
            <path
              d="M8 0C3.58011 0 0 3.58003 0 8C0 12.42 3.58003 16 8 16C12.42 16 16 12.4197 16 8C16 3.58035 12.42 0 8 0ZM7.1161 4.0663H8.8839V9.0165H7.1161V4.0663ZM8 11.9337C7.5138 11.9337 7.1161 11.536 7.1161 11.0498C7.1161 10.5636 7.51382 10.1659 8 10.1659C8.48618 10.1659 8.8839 10.5636 8.8839 11.0498C8.8839 11.536 8.48618 11.9337 8 11.9337Z"
              fill="currentColor"
            />
          </svg>
          <span>{errorMessage}</span>
        </p>
      ) : helperText ? (
        <p id={helpId} className="ds-textinput__helper">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
