import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ListingCard } from "./ListingCard";

const FIGMA_URL =
  "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2494";

const meta = {
  title: "Components/ListingCard",
  component: ListingCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 303 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Groveland, California",
    location: "Yosemite National Park",
    dates: "Oct 23 - 28",
    price: "$289",
    priceUnit: "night",
    rating: "4.91",
    isFavorite: false,
    onFavoriteClick: fn(),
  },
  argTypes: {
    title: { control: "text" },
    location: { control: "text" },
    dates: { control: "text" },
    price: { control: "text" },
    priceUnit: { control: "text" },
    rating: { control: "text" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
    isFavorite: { control: "boolean" },
  },
} satisfies Meta<typeof ListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Default Card" (238:2494). */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-listing-card")).toBeInTheDocument();
    await expect(canvas.getByText("Groveland, California")).toBeInTheDocument();
    const heart = canvas.getByRole("button", { name: "Save to wishlist" });
    await userEvent.tab();
    await expect(heart).toHaveFocus();
    await userEvent.click(heart);
    await expect(args.onFavoriteClick).toHaveBeenCalledTimes(1);
  },
};
