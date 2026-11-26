import { forwardRef, useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import "./Callout.css";

/** Figma "Callouts" set (235:2641), axis `Property 1`: Property Highlight / Cancelation. */
export type CalloutType = "highlight" | "cancelation";

/** Figma "Callout Icons" set (235:2613), axis `Type`: Diamond / Tags / Clock. */
export type CalloutIcon = "diamond" | "tags" | "clock";

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** Figma `Property 1`: "highlight" = Property Highlight (235:2640), "cancelation" = Cancelation (235:2639). */
  type?: CalloutType;
  /** Highlight: the bold start of the sentence ("This is a rare find."). Cancelation: the heading ("Your reservation"). */
  title?: string;
  /** Highlight only. The regular text after the bold start. */
  children?: ReactNode;
  /** Highlight only. The 32×32 icon on the right. */
  icon?: CalloutIcon;
  /** Cancelation only. Photo address. Without it the 108×72 area shows the placeholder color. */
  imageSrc?: string;
  /** Cancelation only. Description of the photo for screen readers. */
  imageAlt?: string;
  /** Cancelation only. Status line, always in the danger color. Figma: "CANCELED". */
  status?: string;
  /** Cancelation only. Name of the stay. */
  name?: string;
  /** Cancelation only. Reservation code line. */
  code?: string;
}

/** Callout Icons 235:2613. Original Figma paths; colors come from CSS tokens. Each group keeps its Figma offset in the 32×32 box. */
function CalloutIconSvg({ icon }: { icon: CalloutIcon }) {
  const maskId = `${useId()}-diamond`;
  return (
    <svg className="ds-callout__icon-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      {icon === "diamond" && (
        <g transform="translate(0.562 0.504)">
          <path className="ds-callout__icon-fill" d="M9.43586 2.57081L3.41296 10.1451L15.5663 25.7143L27.4741 10.1451L21.3296 2.57081H9.43586Z" />
          <mask className="ds-callout__icon-mask" id={maskId}>
            <path d="M15.4415 30.3859L0.0664263 9.79045L30.8082 9.79045L15.4415 30.3859Z" />
          </mask>
          <path
            className="ds-callout__icon-line"
            d="M15.4415 30.3859L0.0664257 9.79045L30.8082 9.79045L15.4415 30.3859Z"
            strokeWidth="2.38321"
            mask={`url(#${maskId})`}
          />
          <path className="ds-callout__icon-line" d="M0.452094 10.126L8.6324 0.595801H21.9103L30.435 10.13" strokeWidth="1.1916" />
          <path className="ds-callout__icon-line" d="M8.77777 0.782981L15.4484 29.542L22.1054 0.782981" strokeWidth="1.1916" />
        </g>
      )}
      {icon === "tags" && (
        <g transform="translate(-0.58 -0.156)">
          <path
            className="ds-callout__icon-paper ds-callout__icon-line"
            d="M3.02996 13.5011L5.08174 4.06446C5.43831 2.42453 7.07079 1.39605 8.70395 1.78244L18.6936 4.14589C19.6856 4.3806 20.4906 5.10305 20.8308 6.06404L23.8196 14.5056C23.8794 14.6745 23.8927 14.8564 23.8581 15.0323L22.1725 23.6042C22.0152 24.404 21.5393 25.1054 20.8541 25.547L14.2197 29.823C13.7642 30.1166 13.1578 29.9939 12.8522 29.5465L3.48415 15.8305C3.019 15.1495 2.85473 14.307 3.02996 13.5011Z"
          />
          <path
            className="ds-callout__icon-paper ds-callout__icon-line"
            d="M5.09005 13.2087V3.50001C5.09005 1.82177 6.46675 0.469928 8.14471 0.500511L18.8309 0.695276C19.6087 0.709453 20.3506 1.02525 20.9001 1.57602L32.452 13.1559C32.8414 13.5462 32.8414 14.1781 32.452 14.5684L19.5385 27.5132C19.1478 27.9049 18.5133 27.9049 18.1226 27.5132L5.96616 15.3274C5.40512 14.765 5.09005 14.003 5.09005 13.2087Z"
          />
          <path
            className="ds-callout__icon-fill"
            d="M7.05983 13.3684V2.81988C7.05983 2.54374 7.28369 2.31988 7.55983 2.31988H18.7486C19.0166 2.31988 19.2733 2.42742 19.4613 2.61839L24.8674 8.11061L30.5673 13.9013L24.6588 19.8528L18.9589 25.5866L7.35564 14.0784C7.16632 13.8906 7.05983 13.635 7.05983 13.3684Z"
          />
          <circle className="ds-callout__icon-line" cx="10.4688" cy="6.29118" r="1.30026" strokeWidth="1.25" />
        </g>
      )}
      {icon === "clock" && (
        <g>
          <circle className="ds-callout__icon-paper ds-callout__icon-line" cx="16" cy="16" r="15.25" strokeWidth="1.5" />
          <path
            className="ds-callout__icon-fill"
            d="M29 16C29 18.5712 28.2376 21.0846 26.8091 23.2224C25.3806 25.3603 23.3503 27.0265 20.9749 28.0104C18.5994 28.9944 15.9856 29.2518 13.4638 28.7502C10.9421 28.2486 8.62569 27.0105 6.80761 25.1924C4.98953 23.3743 3.7514 21.0579 3.24979 18.5362C2.74818 16.0144 3.00563 13.4006 3.98957 11.0251C4.97351 8.64968 6.63975 6.61935 8.77759 5.1909C10.9154 3.76244 13.4288 3 16 3V16H29Z"
          />
          <path className="ds-callout__icon-line" d="M15.2543 6.32246V16.3225L22.2543 23.3225" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

/** An information box from the Figma "Callouts" set (235:2641): a highlighted fact with an icon, or a canceled reservation. It has nothing to press. */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  {
    type = "highlight",
    title,
    children,
    icon = "diamond",
    imageSrc,
    imageAlt = "",
    status = "CANCELED",
    name = "tiny house, tiny farm",
    code = "Reservation code: XMPQKAPZ6D",
    className,
    ...rest
  },
  ref,
) {
  const classes = ["ds-callout", `ds-callout--${type}`, className].filter(Boolean).join(" ");

  if (type === "cancelation") {
    return (
      <div ref={ref} className={classes} data-testid="ds-callout" {...rest}>
        <div className="ds-callout__content">
          <p className="ds-callout__title">{title ?? "Your reservation"}</p>
          <div className="ds-callout__row">
            <div className="ds-callout__image">
              {imageSrc && <img className="ds-callout__image-img" src={imageSrc} alt={imageAlt} draggable={false} />}
            </div>
            <div className="ds-callout__details">
              <p className="ds-callout__status">{status}</p>
              <div className="ds-callout__names">
                <p className="ds-callout__name">{name}</p>
                <p className="ds-callout__code">{code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={classes} data-testid="ds-callout" {...rest}>
      <p className="ds-callout__text">
        <span className="ds-callout__lead">{title ?? "This is a rare find."} </span>
        {children ?? "Hope’s place on Airbnb is usually fully booked."}
      </p>
      <span className="ds-callout__icon">
        <CalloutIconSvg icon={icon} />
      </span>
    </div>
  );
});
