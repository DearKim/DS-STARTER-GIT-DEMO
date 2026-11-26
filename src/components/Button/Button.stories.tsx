import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { Button } from "./Button";
import type { ButtonSize, ButtonVariant } from "./Button";

/* Figma: Primary Buttons 238:2153 · Secondary Buttons 238:2188 · Tertiary Buttons 238:2256
   (plan: docs/plans/components/Buttons.md revision 1). */
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

const meta = {
  title: "Components/Button",
  component: Button,
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
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    size: { control: "inline-radio", options: ["full-width", "small"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    href: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "tertiary"];
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
