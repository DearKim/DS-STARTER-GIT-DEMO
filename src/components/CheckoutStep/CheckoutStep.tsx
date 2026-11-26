import { forwardRef, useId, useState } from "react";
import type { HTMLAttributes } from "react";
import { Button } from "../Button";
import { RadioButton } from "../RadioButton";
import "./CheckoutStep.css";

/** One choice in the open step (Checkout "Choose when to pay" rows 812:12234 · 812:12244 · 812:12258). */
export interface CheckoutStepOption {
  value: string;
  label: string;
  /** Smaller second line under the label. */
  subtext?: string;
  /** Text button after the subtext ("More info"). Pressing it calls `onOptionAction`; it does not choose the row. */
  actionLabel?: string;
}

export interface CheckoutStepProps extends Omit<HTMLAttributes<HTMLElement>, "title" | "children" | "defaultValue" | "onChange"> {
  /** The step title with its number, drawn as `<h2>` ("1. Choose when to pay"). */
  title: string;
  /** true: the current step (shadow panel with its choices and Next). false (default): a closed step, title only. */
  open?: boolean;
  /** Open step only: the radio rows. */
  options?: CheckoutStepOption[];
  /** Name of the radio group. */
  name?: string;
  /** Chosen option value (controlled). `null` = nothing chosen. */
  value?: string | null;
  /** First chosen value when `value` is not given. Default: nothing chosen (PRD). */
  defaultValue?: string | null;
  /** Called with the option value when a row is chosen. */
  onValueChange?: (value: string) => void;
  /** Called with the option value when that row's action button ("More info") is pressed. */
  onOptionAction?: (value: string) => void;
  /** Open step only: the label of the Next button. */
  nextLabel?: string;
  /** Called when Next is pressed. */
  onNext?: () => void;
}

/**
 * A step panel of the Checkout page (Figma 812:12227: open step 812:12228, closed steps 812:12274 · 812:12277).
 *
 * The open step lists its choices with the kit RadioButton (`variant="list"`) and ends with the kit Button
 * (Secondary · Small "Next"). Closed steps show only their title and have nothing to press.
 */
export const CheckoutStep = forwardRef<HTMLElement, CheckoutStepProps>(function CheckoutStep(
  {
    title,
    open = false,
    options = [],
    name,
    value,
    defaultValue = null,
    onValueChange,
    onOptionAction,
    nextLabel = "Next",
    onNext,
    className,
    ...rest
  },
  ref,
) {
  const titleId = `${useId()}-title`;
  const groupName = name ?? `${titleId}-choice`;
  const [innerValue, setInnerValue] = useState<string | null>(defaultValue);
  const chosen = value !== undefined ? value : innerValue;
  const classes = ["ds-checkoutstep", open ? "ds-checkoutstep--open" : "ds-checkoutstep--closed", className].filter(Boolean).join(" ");

  const choose = (next: string) => {
    if (value === undefined) setInnerValue(next);
    onValueChange?.(next);
  };

  return (
    <section ref={ref} className={classes} data-testid="ds-checkoutstep" aria-labelledby={titleId} {...rest}>
      <h2 id={titleId} className="ds-checkoutstep__title">
        {title}
      </h2>
      {open ? (
        <>
          {options.length ? (
            <div className="ds-checkoutstep__options" role="radiogroup" aria-labelledby={titleId}>
              {options.map((option) => (
                <RadioButton
                  key={option.value}
                  variant="list"
                  name={groupName}
                  value={option.value}
                  label={option.label}
                  subtext={option.subtext}
                  actionLabel={option.actionLabel}
                  onActionClick={() => onOptionAction?.(option.value)}
                  checked={chosen === option.value}
                  onChange={() => choose(option.value)}
                />
              ))}
            </div>
          ) : null}
          <div className="ds-checkoutstep__actions">
            <Button variant="secondary" size="small" onClick={() => onNext?.()}>
              {nextLabel}
            </Button>
          </div>
        </>
      ) : null}
    </section>
  );
});
