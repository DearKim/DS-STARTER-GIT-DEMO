import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { Callout } from "./Callout";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=235-2641";

const meta = {
  title: "Components/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    type: "highlight",
    icon: "diamond",
  },
  argTypes: {
    type: { control: "inline-radio", options: ["highlight", "cancelation", "banner"] },
    iconSrc: { control: "text" },
    icon: { control: "inline-radio", options: ["diamond", "tags", "clock"] },
    title: { control: "text" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
    status: { control: "text" },
    name: { control: "text" },
    code: { control: "text" },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Property 1=Property Highlight" (235:2640), Figma width 349. Nothing to press. */
export const PropertyHighlight: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 349 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-callout");
    await expect(root).toBeInTheDocument();
    await expect(canvas.getByText("This is a rare find.")).toBeInTheDocument();
    await expect(root.querySelector(".ds-callout__icon svg")).not.toBeNull();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
    await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(root.contains(document.activeElement)).toBe(false);
  },
};

/** Figma "Property 1=Cancelation" (235:2639), Figma width 361. No photo, so the placeholder shows. */
export const Cancelation: Story = {
  args: { type: "cancelation" },
  decorators: [
    (Story) => (
      <div style={{ width: 361 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-callout");
    await expect(canvas.getByText("Your reservation")).toBeInTheDocument();
    await expect(canvas.getByText("CANCELED")).toBeInTheDocument();
    await expect(canvas.getByText("tiny house, tiny farm")).toBeInTheDocument();
    await expect(canvas.getByText("Reservation code: XMPQKAPZ6D")).toBeInTheDocument();
    await expect(root.querySelector(".ds-callout__icon")).toBeNull();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
  },
};

/** Figma "Callout Icons" (235:2613): Diamond, Tags and Clock in the Property Highlight box. */
export const IconTypes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 16, width: 349 }}>
      <Callout {...args} icon="diamond" />
      <Callout {...args} icon="tags" />
      <Callout {...args} icon="clock" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const callouts = canvas.getAllByTestId("ds-callout");
    await expect(callouts).toHaveLength(3);
    for (const callout of callouts) await expect(callout.querySelector(".ds-callout__icon svg")).not.toBeNull();
  },
};

/**
 * Plan revision 2 — the Home "Your reservation" card: Cancelation with a photo (`imageSrc`), Figma width 361.
 * The photo is decorative (alt ""); the stay name next to it is text.
 */
export const CancelationWithPhoto: Story = {
  args: { type: "cancelation", imageSrc: imageUrl("reservation-1"), imageAlt: "" },
  decorators: [
    (Story) => (
      <div style={{ width: 361 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-callout");
    const photo = root.querySelector("img");
    await expect(photo).not.toBeNull();
    await expect(photo?.getAttribute("alt")).toBe("");
    await expect(canvas.getByText("CANCELED")).toBeInTheDocument();
    await expect(canvas.getByText("tiny house, tiny farm")).toBeInTheDocument();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(root.contains(document.activeElement)).toBe(false);
  },
};

/**
 * Plan revision 2 — `type="banner"`: the Checkout "Rare find!" strip at its page width (390).
 * Background follows the user decision (surface-raised #F7F7F7 instead of the page's #FBEFF8); the gem picture is the page asset.
 */
export const Banner: Story = {
  args: { type: "banner", iconSrc: imageUrl("checkout-icon-rare-find"), children: "Rare find! This place is usually booked" },
  decorators: [
    (Story) => (
      <div style={{ width: 390 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-callout");
    await expect(root).toHaveClass("ds-callout--banner");
    await expect(canvas.getByText("Rare find! This place is usually booked")).toBeInTheDocument();
    await expect(root.querySelector("img")?.getAttribute("alt")).toBe("");
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
    await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(root.contains(document.activeElement)).toBe(false);
  },
};
