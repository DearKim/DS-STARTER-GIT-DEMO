import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { Button } from "./Button";
import type {
  ButtonFigmaProps,
  ButtonFigmaVariant,
  ButtonGhostSize,
  ButtonProps,
  ButtonSize,
  ButtonTextSize,
  ButtonTone,
  ButtonVariant,
} from "./Button";

/* Figma: Primary Buttons 238:2153 · Secondary Buttons 238:2188 · Tertiary Buttons 238:2256
   (plan: docs/plans/components/Buttons.md revision 1).
   Shared site looks ghost · text: same plan, revision 2 §12 (measured on the current site, no Figma set). */
const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2153";

/** Figma "Camera alt" (238:2204), 16×16, original paths. Shown in Secondary · Full Width · Icon=On. */
function CameraAlt() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M8 10.1333C9.17821 10.1333 10.1333 9.17821 10.1333 8C10.1333 6.82179 9.17821 5.86667 8 5.86667C6.82179 5.86667 5.86667 6.82179 5.86667 8C5.86667 9.17821 6.82179 10.1333 8 10.1333Z"
        fill="currentColor"
      />
      <path
        d="M6 1.33333L4.78 2.66667H2.66667C1.93333 2.66667 1.33333 3.26667 1.33333 4V12C1.33333 12.7333 1.93333 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667H11.22L10 1.33333H6ZM8 11.3333C6.16 11.3333 4.66667 9.84 4.66667 8C4.66667 6.16 6.16 4.66667 8 4.66667C9.84 4.66667 11.3333 6.16 11.3333 8C11.3333 9.84 9.84 11.3333 8 11.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Figma "icons" (245:3539): the multi-color PNG from Figma (my-assets/images/button-icon-google.png),
 *  cropped like the Figma image fill (153.85 % size, −26.92 % offset). Shown in Tertiary · Full Width · Icon=On. */
function GoogleG() {
  return (
    <img
      src={imageUrl("button-icon-google") ?? ""}
      alt=""
      width={24}
      height={24}
      style={{ width: "153.85%", height: "153.85%", margin: "-26.92%", maxWidth: "none" }}
    />
  );
}

/* Icons for the ghost · text samples: the exact paths of the current site assets
   (my-assets/images/detail-icon-*.svg), single color → currentColor. The Button only sizes and colors the slot. */

/** detail-icon-show-all.svg (viewBox 18.2857): "사진 모두 보기". */
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18.2857 18.2857" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M3.42857 13.1429C3.88323 13.1429 4.31926 13.3235 4.64075 13.645C4.96225 13.9665 5.14286 14.4025 5.14286 14.8572C5.14286 15.3118 4.96225 15.7479 4.64075 16.0693C4.31926 16.3908 3.88323 16.5714 3.42857 16.5714C2.97391 16.5714 2.53788 16.3908 2.21639 16.0693C1.8949 15.7479 1.71429 15.3118 1.71429 14.8572C1.71429 14.4025 1.8949 13.9665 2.21639 13.645C2.53788 13.3235 2.97391 13.1429 3.42857 13.1429ZM9.14286 13.1429C9.59751 13.1429 10.0335 13.3235 10.355 13.645C10.6765 13.9665 10.8571 14.4025 10.8571 14.8572C10.8571 15.3118 10.6765 15.7479 10.355 16.0693C10.0335 16.3908 9.59751 16.5714 9.14286 16.5714C8.6882 16.5714 8.25216 16.3908 7.93067 16.0693C7.60918 15.7479 7.42857 15.3118 7.42857 14.8572C7.42857 14.4025 7.60918 13.9665 7.93067 13.645C8.25216 13.3235 8.6882 13.1429 9.14286 13.1429ZM14.8571 13.1429C15.3118 13.1429 15.7478 13.3235 16.0693 13.645C16.3908 13.9665 16.5714 14.4025 16.5714 14.8572C16.5714 15.3118 16.3908 15.7479 16.0693 16.0693C15.7478 16.3908 15.3118 16.5714 14.8571 16.5714C14.4025 16.5714 13.9664 16.3908 13.645 16.0693C13.3235 15.7479 13.1429 15.3118 13.1429 14.8572C13.1429 14.4025 13.3235 13.9665 13.645 13.645C13.9664 13.3235 14.4025 13.1429 14.8571 13.1429ZM3.42857 7.42859C3.88323 7.42859 4.31926 7.6092 4.64075 7.93069C4.96225 8.25218 5.14286 8.68822 5.14286 9.14287C5.14286 9.59753 4.96225 10.0336 4.64075 10.3551C4.31926 10.6765 3.88323 10.8572 3.42857 10.8572C2.97391 10.8572 2.53788 10.6765 2.21639 10.3551C1.8949 10.0336 1.71429 9.59753 1.71429 9.14287C1.71429 8.68822 1.8949 8.25218 2.21639 7.93069C2.53788 7.6092 2.97391 7.42859 3.42857 7.42859ZM9.14286 7.42859C9.59751 7.42859 10.0335 7.6092 10.355 7.93069C10.6765 8.25218 10.8571 8.68822 10.8571 9.14287C10.8571 9.59753 10.6765 10.0336 10.355 10.3551C10.0335 10.6765 9.59751 10.8572 9.14286 10.8572C8.6882 10.8572 8.25216 10.6765 7.93067 10.3551C7.60918 10.0336 7.42857 9.59753 7.42857 9.14287C7.42857 8.68822 7.60918 8.25218 7.93067 7.93069C8.25216 7.6092 8.6882 7.42859 9.14286 7.42859ZM14.8571 7.42859C15.3118 7.42859 15.7478 7.6092 16.0693 7.93069C16.3908 8.25218 16.5714 8.68822 16.5714 9.14287C16.5714 9.59753 16.3908 10.0336 16.0693 10.3551C15.7478 10.6765 15.3118 10.8572 14.8571 10.8572C14.4025 10.8572 13.9664 10.6765 13.645 10.3551C13.3235 10.0336 13.1429 9.59753 13.1429 9.14287C13.1429 8.68822 13.3235 8.25218 13.645 7.93069C13.9664 7.6092 14.4025 7.42859 14.8571 7.42859ZM3.42857 1.7143C3.88323 1.7143 4.31926 1.89491 4.64075 2.21641C4.96225 2.5379 5.14286 2.97393 5.14286 3.42859C5.14286 3.88325 4.96225 4.31928 4.64075 4.64077C4.31926 4.96226 3.88323 5.14287 3.42857 5.14287C2.97391 5.14287 2.53788 4.96226 2.21639 4.64077C1.8949 4.31928 1.71429 3.88325 1.71429 3.42859C1.71429 2.97393 1.8949 2.5379 2.21639 2.21641C2.53788 1.89491 2.97391 1.7143 3.42857 1.7143ZM9.14286 1.7143C9.59751 1.7143 10.0335 1.89491 10.355 2.21641C10.6765 2.5379 10.8571 2.97393 10.8571 3.42859C10.8571 3.88325 10.6765 4.31928 10.355 4.64077C10.0335 4.96226 9.59751 5.14287 9.14286 5.14287C8.6882 5.14287 8.25216 4.96226 7.93067 4.64077C7.60918 4.31928 7.42857 3.88325 7.42857 3.42859C7.42857 2.97393 7.60918 2.5379 7.93067 2.21641C8.25216 1.89491 8.6882 1.7143 9.14286 1.7143ZM14.8571 1.7143C15.3118 1.7143 15.7478 1.89491 16.0693 2.21641C16.3908 2.5379 16.5714 2.97393 16.5714 3.42859C16.5714 3.88325 16.3908 4.31928 16.0693 4.64077C15.7478 4.96226 15.3118 5.14287 14.8571 5.14287C14.4025 5.14287 13.9664 4.96226 13.645 4.64077C13.3235 4.31928 13.1429 3.88325 13.1429 3.42859C13.1429 2.97393 13.3235 2.5379 13.645 2.21641C13.9664 1.89491 14.4025 1.7143 14.8571 1.7143Z"
      />
    </svg>
  );
}

/** detail-icon-share.svg: "공유하기" (stroke). */
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        stroke="currentColor"
        d="M13.5 9V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H3.5C2.94771 14.5 2.5 14.0523 2.5 13.5V9M8 1.5V12M3 6.5L7.64645 1.85355C7.8417 1.65829 8.1583 1.65829 8.35355 1.85355L13 6.5"
      />
    </svg>
  );
}

/** detail-icon-save.svg: "저장" (stroke). */
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        stroke="currentColor"
        d="M7.9999 14.3334C11.5832 11.891 15.1666 8.8912 15.1666 5.279C15.1666 4.35424 14.8169 3.43003 14.1172 2.72462C13.4174 2.01972 12.5006 1.66675 11.5832 1.66675C10.6664 1.66675 9.7491 2.01972 9.04985 2.72462L7.9999 3.783L6.9505 2.72462C6.25075 2.01972 5.3339 1.66675 4.41658 1.66675C3.49976 1.66675 2.58243 2.01972 1.88317 2.72462C1.1834 3.43003 0.83325 4.35424 0.83325 5.279C0.83325 8.8912 4.41658 11.891 7.9999 14.3334Z"
      />
    </svg>
  );
}

/** detail-icon-info.svg: "Learn more about summaries" (its clip path is the whole 16×16 box, so it is left out). */
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8C0.25 3.71979 3.71979 0.25 8 0.25ZM8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM8.75 7V12H7.25V7H8.75ZM8 4C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6C7.44772 6 7 5.55228 7 5C7 4.44772 7.44772 4 8 4Z"
      />
    </svg>
  );
}

/** detail-icon-flag.svg: "리스팅 신고하기". */
function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M7.5011 1C8.0283 1 8.4602 1.40794 8.49835 1.92537L8.5011 2V3H14.0011C14.3137 3 14.5446 3.28164 14.4946 3.58107L14.4819 3.63736L13.5206 7L14.4819 10.3626C14.5624 10.6445 14.3852 10.9251 14.1141 10.9873L14.0587 10.9967L14.0011 11H8.5011C7.9739 11 7.542 10.592 7.50385 10.0746L7.5011 10V9H2.5011V15H1.5011V1H7.5011ZM8.5011 4H7.5011V8H8.5011V4Z"
      />
    </svg>
  );
}

/** Storybook args: one flat shape for all looks. The component itself only accepts the valid combinations. */
type ButtonStoryArgs = Omit<ButtonFigmaProps, "variant" | "size" | "tone" | "loading"> & {
  variant?: ButtonVariant;
  size?: ButtonSize | ButtonGhostSize | ButtonTextSize;
  tone?: ButtonTone;
  loading?: boolean;
};

/** A sentence around an inline text button, in the same type as on the page (14 / 400 / 18, −0.1504px). */
const SENTENCE_STYLE = {
  margin: 0,
  fontFamily: "var(--font-type-body-copy-14pt-regular)",
  fontSize: "var(--text-type-body-copy-14pt-regular)",
  fontWeight: "var(--font-weight-type-body-copy-14pt-regular)",
  lineHeight: "calc(var(--spacing) * 4.5)",
  letterSpacing: "calc(var(--spacing) * -0.0376)",
} as const;

const meta = {
  title: "Components/Button",
  component: Button,
  render: (args) => <Button {...(args as ButtonProps)} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
    docs: { description: { component: "A button that runs an action. Use only one Primary button per screen. Hover, Pressed and Focus are real pointer and keyboard states." } },
  },
  decorators: [
    // Figma draws Full Width buttons 520 wide. The page decides the width; this frame is for comparison only.
    (Story) => (
      <div style={{ width: 520, display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "primary", size: "full-width", loading: false, disabled: false, children: "Button", onClick: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary", "ghost", "text"] },
    size: { control: "select", options: ["full-width", "small", "xsmall", "medium", "large", "xlarge"] },
    tone: { control: "inline-radio", options: ["default", "secondary"], if: { arg: "variant", eq: "text" } },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    href: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

/** Primary · Full Width · Default (238:2164). */
export const Primary: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/** Primary · Small · Default (238:2166). */
export const PrimarySmall: Story = {
  args: { size: "small" },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Button" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Secondary · Full Width · Icon=Off (238:2189). */
export const Secondary: Story = {
  args: { variant: "secondary" },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Button" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Secondary · Full Width · Icon=On (238:2203): Camera alt before the label. */
export const SecondaryWithIcon: Story = {
  args: { variant: "secondary", icon: <CameraAlt /> },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" });
    await expect(button.querySelector(".ds-button__icon svg")).not.toBeNull();
  },
};

/** Secondary · Small (238:2223). */
export const SecondarySmall: Story = {
  args: { variant: "secondary", size: "small" },
};

/** Tertiary · Full Width · Icon=Off (238:2271). */
export const Tertiary: Story = {
  args: { variant: "tertiary" },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Button" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Tertiary · Full Width · Icon=On (238:2285): the icon sits at the left edge, the label stays centered. */
export const TertiaryWithIcon: Story = {
  args: { variant: "tertiary", icon: <GoogleG /> },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" });
    await expect(button.querySelector(".ds-button__icon img")).not.toBeNull();
  },
};

/** Tertiary · Small (238:2273). */
export const TertiarySmall: Story = {
  args: { variant: "tertiary", size: "small" },
};

/** State=Loading (238:2168): three dots, keeps focus and its name, does not run onClick. */
export const Loading: Story = {
  args: { loading: true },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** State=Disabled (238:2186): native disabled, no click, not in the Tab order. */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
  },
};

/** With `href` the button is a real link with the same look (site: Detail "Reserve"). */
export const AsLink: Story = {
  args: { href: "#checkout", children: "Reserve" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Reserve" });
    await expect(link).toHaveAttribute("href", "#checkout");
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};

const VARIANTS: ButtonFigmaVariant[] = ["primary", "secondary", "tertiary"];
const SIZES: ButtonSize[] = ["full-width", "small"];
const STATES = ["Default", "Loading", "Disabled"] as const;
const ICONS = { secondary: <CameraAlt />, tertiary: <GoogleG /> } as const;

/** Every Figma variant that is not a pointer/keyboard state, side by side: set × size (× icon) × Default/Loading/Disabled.
 *  Hover, Pressed and Focus are real CSS states — check them with the pointer and the Tab key. */
export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {VARIANTS.map((variant) =>
        [...SIZES.map((size) => ({ size, icon: false })), ...(variant === "primary" ? [] : [{ size: "full-width" as const, icon: true }])].map(({ size, icon }) => (
          <div key={`${variant}-${size}-${icon}`} style={{ display: "grid", gridTemplateColumns: "repeat(3, 520px)", gap: 24, alignItems: "center", justifyItems: "start" }}>
            {STATES.map((state) => (
              <Button
                key={state}
                variant={variant}
                size={size}
                loading={state === "Loading"}
                disabled={state === "Disabled"}
                icon={icon && variant !== "primary" ? ICONS[variant] : undefined}
                aria-label={`${variant} ${size}${icon ? " icon" : ""} ${state}`}
              >
                Button
              </Button>
            ))}
          </div>
        )),
      )}
    </div>
  ),
};

/* ══ revision 2 — shared site looks (plan §12). Words and icons are the current site's. ══ */

/** ghost · small — "Change" (Checkout summary, ReservationSummary): 32 high, at least 76 wide. */
export const GhostSmall: Story = {
  args: { variant: "ghost", size: "small", children: "Change" },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Change" });
    await expect(button).toHaveAttribute("type", "button");
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** ghost · medium — "사진 모두 보기" (Detail gallery, PhotoGallery): 136×37, icon 18 before the label. */
export const GhostMedium: Story = {
  args: { variant: "ghost", size: "medium", icon: <GridIcon />, children: <span lang="ko">사진 모두 보기</span> },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "사진 모두 보기" });
    await expect(button.querySelector(".ds-button__icon svg")).not.toBeNull();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** ghost · large — "Show more" (Detail description, ListingDescription): 132×48. */
export const GhostLarge: Story = {
  args: { variant: "ghost", size: "large", children: "Show more" },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Show more" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** text · xsmall · secondary — "Learn more about summaries" (ListingOverview): icon 16, 36 to the label. */
export const TextXsmall: Story = {
  args: { variant: "text", size: "xsmall", tone: "secondary", icon: <InfoIcon />, children: "Learn more about summaries" },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Learn more about summaries" });
    await expect(button.querySelector(".ds-button__icon svg")).not.toBeNull();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** text · small — inside sentences, always underlined: "Full policy" (default) and "More info" (secondary). */
export const TextSmall: Story = {
  args: { variant: "text", size: "small" },
  render: (args) => (
    <div style={{ display: "grid", gap: "calc(var(--spacing) * 4)", width: 452 }}>
      <p style={{ ...SENTENCE_STYLE, color: "var(--color-text)" }}>
        {"Cancel before 21 January for a full refund. "}
        <Button onClick={args.onClick} disabled={args.disabled} variant="text" size="small" tone="default">
          Full policy
        </Button>
      </p>
      <p style={{ ...SENTENCE_STYLE, color: "var(--color-text-secondary)" }}>
        {"£340.91 charged on 13 Jan 2027. No extra fees. "}
        <Button onClick={args.onClick} disabled={args.disabled} variant="text" size="small" tone="secondary">
          More info
        </Button>
      </p>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const policy = canvas.getByRole("button", { name: "Full policy" });
    const info = canvas.getByRole("button", { name: "More info" });
    await userEvent.tab();
    await expect(policy).toHaveFocus();
    await userEvent.tab();
    await expect(info).toHaveFocus();
    await userEvent.click(policy);
    await userEvent.click(info);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/** text · medium · secondary — "리스팅 신고하기" (Card reservation): flag 16, 16 to the label, underline on hover. */
export const TextMedium: Story = {
  args: { variant: "text", size: "medium", tone: "secondary", icon: <FlagIcon />, children: <span lang="ko">리스팅 신고하기</span> },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "리스팅 신고하기" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** text · large — "Show original" (Detail translation note, ListingDescription): 16 / 400 / 24, always underlined. */
export const TextLarge: Story = {
  args: { variant: "text", size: "large", children: "Show original" },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Show original" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** text · xlarge — "공유하기" · "저장" (Detail title, ListingTitle): 34 high, hover background. */
export const TextXlarge: Story = {
  args: { variant: "text", size: "xlarge" },
  render: (args) => (
    <div style={{ display: "flex", gap: "calc(var(--spacing) * 2)" }}>
      <Button onClick={args.onClick} disabled={args.disabled} variant="text" size="xlarge" icon={<ShareIcon />}>
        <span lang="ko">공유하기</span>
      </Button>
      <Button onClick={args.onClick} disabled={args.disabled} variant="text" size="xlarge" icon={<HeartIcon />}>
        <span lang="ko">저장</span>
      </Button>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const share = canvas.getByRole("button", { name: "공유하기" });
    const save = canvas.getByRole("button", { name: "저장" });
    await userEvent.tab();
    await expect(share).toHaveFocus();
    await userEvent.tab();
    await expect(save).toHaveFocus();
    await userEvent.click(share);
    await userEvent.click(save);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
