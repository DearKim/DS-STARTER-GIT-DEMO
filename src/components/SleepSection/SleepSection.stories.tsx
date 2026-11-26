import type { Decorator, Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { SleepSection } from "./SleepSection";

/** Same column width as on the Detail page (653). */
const column: Decorator = (Story) => (
  <div style={{ width: 653 }}>
    <Story />
  </div>
);

const meta = {
  title: "Components/SleepSection",
  component: SleepSection,
  tags: ["autodocs"],
  decorators: [column],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-11238" },
    docs: {
      description: {
        component:
          "The Detail page \"Where you'll sleep\" section: a top line, the `<h2>` title and one bedroom Card (`type=\"sleep\" layout=\"detail\"`) per room. Nothing in it can be pressed.",
      },
    },
  },
} satisfies Meta<typeof SleepSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The current Detail page: two bedrooms with their photos. */
export const Default: Story = {
  args: {
    heading: "Where you'll sleep",
    rooms: [1, 2].map((i) => ({
      imageSrc: imageUrl(`detail-bedroom-${i}`),
      imageAlt: `Bedroom ${i}`,
      title: `Bedroom ${i}`,
      description: "1 queen bed",
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-sleep-section");
    await expect(canvas.getByRole("heading", { level: 2, name: "Where you'll sleep" })).toBeInTheDocument();
    const cards = within(root).getAllByTestId("ds-card");
    await expect(cards).toHaveLength(2);
    for (const card of cards) await expect(card).toHaveClass("ds-card--sleep", "ds-card--layout-detail");
    await expect(canvas.getByRole("img", { name: "Bedroom 1" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Bedroom 2" })).toBeInTheDocument();
    // Nothing in the section takes keyboard focus.
    await expect(canvas.queryByRole("button")).toBeNull();
    await expect(canvas.queryByRole("link")).toBeNull();
  },
};
