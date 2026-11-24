import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";


export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, children, ...rest },
  ref,
) {
  const classes = [
    "ds-card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} data-testid="ds-card" {...rest}>
      {children}
    </div>
  );
});
