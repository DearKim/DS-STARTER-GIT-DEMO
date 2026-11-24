import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "tertiary";
export type ButtonSize = "l" | "m" | "s";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Type */
  variant?: ButtonVariant;
  /** Figma: Size */
  size?: ButtonSize;
  /** Figma: Has icon */
  hasIcon?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "m", hasIcon = false, className, children, type = "button", ...rest },
  ref,
) {
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    `ds-button--${size}`,
    hasIcon && "ds-button--hasicon",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // type 기본값이 submit 이면 form 안의 모든 버튼이 제출 버튼이 된다.
    <button ref={ref} type={type} className={classes} data-testid="ds-button" {...rest}>
      {children}
    </button>
  );
});
