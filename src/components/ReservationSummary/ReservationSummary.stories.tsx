import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { ReservationSummary } from "./ReservationSummary";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-12281";

const meta = {
  title: "Components/ReservationSummary",
  component: ReservationSummary,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  // The current Checkout page's words and picture (PRD).
  args: {
    imageSrc: imageUrl("checkout-stay-thumb"),
    imageAlt: "",
    title: "STAY 2572",
    rating: "4.98 (487)",
    badge: "Guest favourite",
    cancellationTitle: "Free cancellation",
    cancellationText: "Cancel before 21 January for a full refund.",
    policyLabel: "Full policy",
    dates: "22–24 Jan 2027",
    guests: "1 adult",
    priceLine: "2 nights x £170.46",
    priceAmount: "£340.91",
    total: "£340.91",
    currency: "GBP",
    breakdownLabel: "Price breakdown",
    onPolicyClick: fn(),
    onChangeDates: fn(),
    onChangeGuests: fn(),
    onCurrencyClick: fn(),
    onBreakdownClick: fn(),
  },
  // The summary column on the page is 390 wide.
  decorators: [
    (Story) => (
      <div style={{ width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReservationSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma 812:12281 as on the current Checkout page. Every button only calls its callback. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-reservationsummary");
    // Five kit buttons: Full policy, Change × 2 (ghost), GBP, Price breakdown (text).
    const buttons = within(root).getAllByTestId("ds-button");
    await expect(buttons).toHaveLength(5);
    await expect(canvas.queryAllByRole("link")).toHaveLength(0);
    await expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(2);
    await expect(root.querySelector("img")?.getAttribute("alt")).toBe("");

    await userEvent.click(buttons[0] as HTMLElement);
    await expect(args.onPolicyClick).toHaveBeenCalledTimes(1);
    await userEvent.click(buttons[1] as HTMLElement);
    await expect(args.onChangeDates).toHaveBeenCalledTimes(1);
    await userEvent.click(buttons[2] as HTMLElement);
    await expect(args.onChangeGuests).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByRole("button", { name: "Current currency: GBP. Change payment currency" }));
    await expect(args.onCurrencyClick).toHaveBeenCalledTimes(1);
    await userEvent.click(buttons[4] as HTMLElement);
    await expect(args.onBreakdownClick).toHaveBeenCalledTimes(1);
  },
};

/** Keyboard order as on the current page: Full policy → Change → Change → GBP → Price breakdown. */
export const FocusOrder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = within(canvas.getByTestId("ds-reservationsummary")).getAllByTestId("ds-button");
    (document.activeElement as HTMLElement | null)?.blur();
    for (const button of buttons) {
      await userEvent.tab();
      await expect(button).toHaveFocus();
    }
  },
};
