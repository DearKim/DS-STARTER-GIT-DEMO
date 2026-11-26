import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Inspiration } from "./Inspiration";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=389-7517";

const meta = {
  title: "Components/Inspiration",
  component: Inspiration,
  tags: ["autodocs"],
  parameters: {
    // The section spans the page width (1440 on the Figma frames).
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    onTabChange: fn(),
    onDestinationClick: fn(),
    onShowMoreClick: fn(),
  },
} satisfies Meta<typeof Inspiration>;

export default meta;
type Story = StoryObj<typeof meta>;

/** "Inspiration for future getaways" of the Home, Detail and Checkout pages (389:7517 · 812:433 · 10613:12104). */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-inspiration");
    // The kit Tabs is used through its public API, inside this section.
    await expect(within(root).getByTestId("ds-tabs")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 2, name: "Inspiration for future getaways" })).toBeInTheDocument();
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs).toHaveLength(8);
    await expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    // Choosing a tab moves the bar; the list of places stays the same.
    await userEvent.click(tabs[1]!);
    await expect(args.onTabChange).toHaveBeenCalledTimes(1);
    await expect(args.onTabChange).toHaveBeenCalledWith("arts-culture");
    await expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Washington");
    await userEvent.click(canvas.getByRole("button", { name: /Washington/ }));
    await expect(args.onDestinationClick).toHaveBeenCalledWith(0);
    await userEvent.click(canvas.getByRole("button", { name: "Show more" }));
    await expect(args.onShowMoreClick).toHaveBeenCalledTimes(1);
  },
};

/** Keyboard: one Tab press enters the tab list, ← → choose, then the panel, the 17 places and "Show more". */
export const KeyboardOrder: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");
    await userEvent.tab();
    await expect(tabs[0]).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(tabs[1]).toHaveFocus();
    await expect(args.onTabChange).toHaveBeenCalledWith("arts-culture");
    await userEvent.tab();
    await expect(canvas.getByRole("tabpanel")).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: /Washington/ })).toHaveFocus();
    for (let i = 1; i < 18; i += 1) await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Show more" })).toHaveFocus();
  },
};
