import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { CheckoutHeading } from "./CheckoutHeading";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-12216";

const meta = {
  title: "Components/CheckoutHeading",
  component: CheckoutHeading,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    title: "Confirm and pay",
    backHref: "/detail",
    backLabel: "Back",
  },
  argTypes: {
    title: { control: "text" },
    backHref: { control: "text" },
    backLabel: { control: "text" },
  },
  // The page column is 1010 wide and starts 215 from the left at 1440; the back link sits 68 outside it.
  decorators: [
    (Story) => (
      <div style={{ padding: "32px 0 32px 215px" }}>
        <div style={{ width: 1010 }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Checkout title row as on the current site: round back link to /detail + "Confirm and pay". */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-checkoutheading")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1, name: "Confirm and pay" })).toBeInTheDocument();
    const back = canvas.getByRole("link", { name: "Back" });
    await expect(back).toHaveAttribute("href", "/detail");
    await expect(back.querySelector("svg")).not.toBeNull();
  },
};

/** Keyboard: Tab reaches the back link (browser focus ring — Figma has no focus look). */
export const FocusBackLink: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Back" })).toHaveFocus();
  },
};
