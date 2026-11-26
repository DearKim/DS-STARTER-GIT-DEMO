import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent } from "@storybook/test";
import { Link } from "./Link";

/* Figma: Links 238:2309 (plan: docs/plans/components/Buttons.md revision 1). */
const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2309";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
    docs: { description: { component: "A text link. Use it only to go to another page — to run an action, use Button. Focus is a real keyboard state." } },
  },
  args: { href: "#", children: "Cleaning fee" },
  argTypes: {
    variant: { control: "inline-radio", options: ["subtle", "legal"] },
    size: { control: "inline-radio", options: ["medium", "small"] },
    hasIcon: { control: "boolean" },
    href: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Subtle · Medium · Icon=Off (238:2325). */
export const Subtle: Story = {
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId("ds-link");
    await expect(link).toHaveTextContent("Cleaning fee");
    await expect(link).toHaveAttribute("href", "#");
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};

/** Subtle · Medium · Icon=On (238:2314): the arrow after the text. */
export const SubtleWithIcon: Story = {
  args: { hasIcon: true, children: "Show more" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId("ds-link");
    await expect(link).toHaveTextContent("Show more");
    await expect(link.querySelector("svg")).not.toBeNull();
  },
};

/** Subtle · Small (238:2310). */
export const SubtleSmall: Story = {
  args: { size: "small", children: "Show" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId("ds-link")).toHaveClass("ds-link--small");
  },
};

/** Legal · Small (238:2329). */
export const Legal: Story = {
  args: { variant: "legal", size: "small", children: "Terms of Service" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId("ds-link");
    await expect(link).toHaveClass("ds-link--legal");
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};

/** The four Figma combinations side by side. Focus is a real keyboard state — press Tab to see it. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gap: 24, justifyItems: "start" }}>
      <Link href="#">Cleaning fee</Link>
      <Link href="#" hasIcon>Show more</Link>
      <Link href="#" size="small">Show</Link>
      <Link href="#" variant="legal" size="small">Terms of Service</Link>
    </div>
  ),
};
