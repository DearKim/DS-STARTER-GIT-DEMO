import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { ListingOverview } from "./ListingOverview";
import type { ListingOverviewProps } from "./ListingOverview";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-11134";

const src = (name: string) => imageUrl(name) ?? "";

/** The Detail page summary (my-docs/inbox/website-plan.md, Detail 4; pictures in my-assets/images). */
const HIGHLIGHTS: ListingOverviewProps["highlights"] = [
  {
    imageSrc: src("detail-highlight-top"),
    imageLook: "inset",
    title: "Top 10% of homes",
    description: "This home is highly ranked based on ratings, reviews and reliability.",
  },
  {
    imageSrc: src("detail-highlight-near"),
    imageLook: "framed",
    title: "Near Anmok Beach",
    description: "Anmok Beach is about an 8-min walk away, with the coast close by for a seaside outing.",
  },
  {
    imageSrc: src("detail-highlight-kitchen"),
    imageLook: "full",
    title: "Roomy home with a full kitchen",
    description: "A roomy private home with a full kitchen gives your group space to cook and settle in.",
  },
  {
    imageSrc: src("detail-highlight-cleanliness"),
    imageLook: "full",
    title: "Guests praise the cleanliness",
    description: "Guests repeatedly praise the spotless rooms and thoughtful upkeep throughout the home.",
  },
];

const meta = {
  title: "Components/ListingOverview",
  component: ListingOverview,
  tags: ["autodocs"],
  parameters: {
    // Same column as on the 1440 Detail page: 653 wide, 160 from the left edge.
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 653, marginLeft: 160 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Entire home in Gangneung-si, South Korea",
    details: "4 guests · 2 bedrooms · 2 beds · 2 bathrooms",
    guestFavourite: {
      labelLines: ["Guest", "favourite"],
      description: "One of the most loved homes on Airbnb, according to guests",
      rating: "4.98",
      reviewCount: "487",
      reviewLabel: "Reviews",
      laurelLeftSrc: src("detail-laurel-left"),
      laurelRightSrc: src("detail-laurel-right"),
    },
    highlights: HIGHLIGHTS,
    host: {
      avatarSrc: src("detail-host-avatar"),
      badgeSrc: src("detail-icon-superhost"),
      title: "Hosted by 준구",
      description: "Superhost · 6 years hosting",
    },
    learnMoreLabel: "Learn more about summaries",
    onLearnMoreClick: fn(),
  },
} satisfies Meta<typeof ListingOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Detail page summary (812:11135 · 812:11144 · 812:11171). */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-listing-overview");
    await expect(canvas.getByRole("heading", { level: 2, name: "Entire home in Gangneung-si, South Korea" })).toBeInTheDocument();
    await expect(canvas.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "Top 10% of homes",
      "Near Anmok Beach",
      "Roomy home with a full kitchen",
      "Guests praise the cleanliness",
      "Hosted by 준구",
    ]);
    // The rooms line is the Text part; "Learn more" is the shared Button part.
    const text = within(root).getByTestId("ds-text");
    await expect(text).toHaveTextContent("4 guests · 2 bedrooms · 2 beds · 2 bathrooms");
    await expect(within(root).getAllByTestId("ds-button")).toHaveLength(1);
    // Only "Learn more" can be clicked (Guest favourite box and host photo just show).
    await expect(within(root).getAllByRole("button")).toHaveLength(1);
    const learnMore = canvas.getByRole("button", { name: "Learn more about summaries" });
    await expect(learnMore).toHaveAttribute("type", "button");
    const before = window.location.href;
    await userEvent.click(learnMore);
    await expect(args.onLearnMoreClick).toHaveBeenCalledTimes(1);
    await expect(window.location.href).toBe(before);
  },
};

/** Keyboard: "Learn more about summaries" is the only Tab stop; Enter runs the callback. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Learn more about summaries" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onLearnMoreClick).toHaveBeenCalledTimes(1);
  },
};
