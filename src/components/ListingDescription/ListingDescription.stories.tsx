import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ListingDescription } from "./ListingDescription";

/** Same column width as on the Detail page (653). */
const column: Decorator = (Story) => (
  <div style={{ width: 653 }}>
    <Story />
  </div>
);

const meta = {
  title: "Components/ListingDescription",
  component: ListingDescription,
  tags: ["autodocs"],
  decorators: [column],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-11223" },
    docs: {
      description: {
        component:
          "The Detail page description section: a top line, the gray translation note with \"Show original\" (Button text), the description cut at 176px and \"Show more\" (Button ghost). Both buttons only call their callbacks.",
      },
    },
  },
  args: {
    onShowOriginalClick: fn(),
    onShowMoreClick: fn(),
  },
} satisfies Meta<typeof ListingDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The current Detail page words. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-listing-description");
    await expect(within(root).getByTestId("ds-text")).toHaveTextContent("Some info has been automatically translated.");
    await expect(canvas.getByText(/Inbyulgram \| @stay_2572/)).toBeInTheDocument();
    const buttons = within(root).getAllByTestId("ds-button");
    await expect(buttons).toHaveLength(2);
    const showOriginal = within(root).getByRole("button", { name: "Show original" });
    const showMore = within(root).getByRole("button", { name: "Show more" });
    await expect(buttons).toEqual([showOriginal, showMore]);
    await expect(showOriginal).toHaveAccessibleName("Show original");
    await expect(showMore).toHaveAccessibleName("Show more");
    // Tab order: "Show original" → "Show more".
    await userEvent.tab();
    await expect(showOriginal).toHaveFocus();
    await userEvent.tab();
    await expect(showMore).toHaveFocus();
    // Each button only calls its callback; the page does not move.
    const url = window.location.href;
    await userEvent.click(showOriginal);
    await expect(args.onShowOriginalClick).toHaveBeenCalledTimes(1);
    await expect(window.location.href).toBe(url);
    await userEvent.click(showMore);
    await expect(args.onShowMoreClick).toHaveBeenCalledTimes(1);
  },
};
