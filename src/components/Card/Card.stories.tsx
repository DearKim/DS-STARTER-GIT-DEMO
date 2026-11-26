import type { MouseEvent } from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { Card } from "./Card";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2378";

/** The card fills its column; each story uses the Figma width of that card type. */
const width = (px: number): Decorator[] => [
  (Story) => (
    <div style={{ width: px }}>
      <Story />
    </div>
  ),
];

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component:
          "Cards from the Figma Card set (238:2378). `type` picks Sleep, Discount, Map, Reservation or Reservation Confirmation. The Default Card is the ListingCard component.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Callbacks are kept here so each play function can check them (args is a union of the five card types). */
const discountFavorite = fn();
const mapFavorite = fn();
const mapClose = fn();
const reserveClick = fn();
/* The Detail Reserve is a real link to /checkout; the story stops the navigation so the canvas stays. */
const detailReserveClick = fn((event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => event.preventDefault());
const detailReportClick = fn();

/** Figma "Sleep Card" (238:2379). */
export const Sleep: Story = {
  args: { type: "sleep", title: "Bedroom 2", description: "2 single beds" },
  decorators: width(319),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-card")).toHaveClass("ds-card--sleep");
    await expect(canvas.getByText("Bedroom 2")).toBeInTheDocument();
    await expect(canvas.getByText("2 single beds")).toBeInTheDocument();
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};

/** Figma "Discount Card" (238:2461). */
export const Discount: Story = {
  args: {
    type: "discount",
    badge: "Superhost",
    title: "Private room in San Francisco",
    details: ["Private Room & Balcony-Connected...", "1 queen bed", "Oct 23 - 28"],
    originalPrice: "$289",
    price: "$289",
    priceUnit: "night",
    totalPrice: "$120 total",
    rating: "4.91",
    reviewCount: "(484)",
    isFavorite: false,
    onFavoriteClick: discountFavorite,
  },
  decorators: width(324),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    discountFavorite.mockClear();
    await expect(canvas.getByTestId("ds-card")).toHaveClass("ds-card--discount");
    await expect(canvas.getByText("Superhost")).toBeInTheDocument();
    await expect(canvas.getByText("$120 total")).toBeInTheDocument();
    const heart = canvas.getByRole("button", { name: "Save to wishlist" });
    await userEvent.tab();
    await expect(heart).toHaveFocus();
    await userEvent.click(heart);
    await expect(discountFavorite).toHaveBeenCalledTimes(1);
  },
};

/** Figma "Map Card" (238:2517). */
export const Map: Story = {
  args: {
    type: "map",
    title: "Groveland, California",
    price: "$289",
    priceUnit: "night",
    dates: "Apr 17-22",
    rating: "4.91",
    isFavorite: false,
    onFavoriteClick: mapFavorite,
    onClose: mapClose,
  },
  decorators: width(327),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    mapFavorite.mockClear();
    mapClose.mockClear();
    await expect(canvas.getByTestId("ds-card")).toHaveClass("ds-card--map");
    const close = canvas.getByRole("button", { name: "Close" });
    const heart = canvas.getByRole("button", { name: "Save to wishlist" });
    await userEvent.tab();
    await expect(close).toHaveFocus();
    await userEvent.tab();
    await expect(heart).toHaveFocus();
    await userEvent.click(close);
    await expect(mapClose).toHaveBeenCalledTimes(1);
    await userEvent.click(heart);
    await expect(mapFavorite).toHaveBeenCalledTimes(1);
  },
};

/** Figma "Reservation Card" (238:2383). */
export const Reservation: Story = {
  args: {
    type: "reservation",
    originalPrice: "$500",
    price: "$440",
    priceUnit: "night",
    rating: "4.99",
    reviewCount: "337 reviews",
    checkIn: "2/6/2023",
    checkOut: "2/11/2023",
    guests: "1 guest",
    reserveLabel: "Reserve",
    onReserveClick: reserveClick,
    note: "You won’t be charged yet",
    lineItems: [
      { label: "500 x 5 nights", amount: "$2,500" },
      { label: "Long stay discount", amount: "-$300", tone: "discount" },
      { label: "Cleaning fee", amount: "$200" },
      { label: "Service fee", amount: "$0" },
    ],
    totalLabel: "Total before taxes",
    total: "$2,400",
  },
  decorators: width(373),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    reserveClick.mockClear();
    await expect(canvas.getByTestId("ds-card")).toHaveClass("ds-card--reservation");
    await expect(canvas.getByText("CHECK-IN")).toBeInTheDocument();
    await expect(canvas.getByText("-$300")).toHaveClass("ds-card__amount--discount");
    const reserve = canvas.getByRole("button", { name: "Reserve" });
    await expect(canvas.getAllByRole("button")).toHaveLength(1);
    await userEvent.tab();
    await expect(reserve).toHaveFocus();
    await userEvent.click(reserve);
    await expect(reserveClick).toHaveBeenCalledTimes(1);
  },
};

/** Figma "Reservation Confirmation Card" (238:2420). */
export const ReservationConfirmation: Story = {
  args: {
    type: "reservation-confirmation",
    propertyType: "Entire cabin",
    title: "Glacier Pines Cabin (New Hot Tub Installed!)",
    rating: "4.66",
    reviewCount: "(110 reviews)",
    badge: "Superhost",
    protectionText: "Your booking is protected by",
    heading: "Price details",
    lineItems: [
      { label: "500 x 5 nights", amount: "$2,500" },
      { label: "Long stay discount", amount: "$2,500" },
      { label: "Cleaning fee", amount: "$200" },
      { label: "Service fee", amount: "$0" },
    ],
    totalLabel: "Total (USD)",
    total: "$2,400",
  },
  decorators: width(477),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-card")).toHaveClass("ds-card--reservation-confirmation");
    await expect(canvas.getByRole("heading", { name: "Price details" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "AirCover" })).toBeInTheDocument();
    await expect(canvas.getByText("Total (USD)")).toBeInTheDocument();
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};

/** Detail page booking box (Figma Card instance 812:8724 and the "리스팅 신고하기" button 812:7557 under it). */
export const ReservationDetail: Story = {
  name: "Reservation (Detail page)",
  args: {
    type: "reservation",
    layout: "detail",
    originalPrice: "$500",
    price: "$440",
    priceUnit: "night",
    rating: "4.99",
    reviewCount: "337 reviews",
    checkIn: "2/6/2023",
    checkOut: "2/11/2023",
    guests: "1 guest",
    reserveLabel: "Reserve",
    reserveHref: "/checkout",
    onReserveClick: detailReserveClick,
    note: "You won't be charged yet",
    lineItems: [
      { label: "500 x 5 nights", amount: "$2,500" },
      { label: "Long stay discount", amount: "-$300", tone: "discount" },
      { label: "Cleaning fee", amount: "$200" },
      { label: "Service fee", amount: "$0" },
    ],
    totalLabel: "Total before taxes",
    total: "$2,400",
    reportLabel: "리스팅 신고하기",
    onReportClick: detailReportClick,
  },
  decorators: width(373),
  play: async ({ canvasElement, args }) => {
    if (args.type !== "reservation") throw new Error("This story renders the reservation card.");
    const canvas = within(canvasElement);
    detailReserveClick.mockClear();
    detailReportClick.mockClear();
    const root = canvas.getByTestId("ds-card");
    await expect(root).toHaveClass("ds-card--reservation", "ds-card--layout-detail", "ds-card--with-report");
    // The dates and guests are text, not inputs (PRD: you can't change them).
    await expect(canvas.queryByRole("textbox")).toBeNull();
    const reserve = canvas.getByRole("link", { name: "Reserve" });
    await expect(reserve).toHaveAttribute("href", "/checkout");
    // The report line is the shared Button (text look) inside the card root.
    const report = within(root).getByTestId("ds-button");
    await expect(report).toHaveAccessibleName("리스팅 신고하기");
    await userEvent.tab();
    await expect(reserve).toHaveFocus();
    await userEvent.tab();
    await expect(report).toHaveFocus();
    await userEvent.click(reserve);
    await expect(args.onReserveClick).toHaveBeenCalledTimes(1);
    await userEvent.click(report);
    await expect(args.onReportClick).toHaveBeenCalledTimes(1);
  },
};

/** Detail page bedroom card (frame 812:11249 in "Where you'll sleep"). */
export const SleepDetail: Story = {
  name: "Sleep (Detail page)",
  args: {
    type: "sleep",
    layout: "detail",
    imageSrc: imageUrl("detail-bedroom-1"),
    imageAlt: "Bedroom 1",
    title: "Bedroom 1",
    description: "1 queen bed",
  },
  decorators: width(318.7),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-card")).toHaveClass("ds-card--sleep", "ds-card--layout-detail");
    await expect(canvas.getByRole("img", { name: "Bedroom 1" })).toBeInTheDocument();
    await expect(canvas.getByText("1 queen bed")).toBeInTheDocument();
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};
