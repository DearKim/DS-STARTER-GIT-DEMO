import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { ListingCard } from "./ListingCard";

/** Five free Unsplash photos of one card (my-assets/images/stay-01-*.jpg, see docs/photo-credits.md). */
const PHOTOS = [1, 2, 3, 4, 5].map((n) => imageUrl(`stay-01-${n}`)).filter((url): url is string => Boolean(url));

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
    href: "#listing",
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
    images: { control: "object" },
    autoPlayMs: { control: "number" },
    isFavorite: { control: "boolean" },
    href: { control: "text" },
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
    const link = canvas.getByRole("link", { name: "Groveland, California" });
    await expect(link).toHaveAttribute("href", "#listing");
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};

/** rev 3: five photos that change by themselves. The white dot moves to the photo on screen. */
export const Photos: Story = {
  args: {
    images: PHOTOS,
    imageAlt: "Listing photo",
    autoPlayMs: 2000,
  },
  play: async ({ canvasElement }) => {
    const photos = canvasElement.querySelectorAll(".ds-listing-card__image");
    const dots = canvasElement.querySelectorAll(".ds-listing-card__dot");
    await expect(photos).toHaveLength(5);
    await expect(photos[0]).toHaveClass("ds-listing-card__image--current");
    await expect(dots[0]).toHaveClass("ds-listing-card__dot--current");
    await waitFor(() => expect(dots[1]).toHaveClass("ds-listing-card__dot--current"), { timeout: 5000 });
    await expect(photos[1]).toHaveClass("ds-listing-card__image--current");
    await expect(dots[0]).not.toHaveClass("ds-listing-card__dot--current");
  },
};
