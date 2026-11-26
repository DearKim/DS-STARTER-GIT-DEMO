import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { ListingTitle } from "./ListingTitle";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-4793";

const meta = {
  title: "Components/ListingTitle",
  component: ListingTitle,
  tags: ["autodocs"],
  parameters: {
    // Same place as on the 1440 Detail page: 80 side margins, 40 above the row.
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1440, boxSizing: "border-box", padding: "40px 80px 0" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Kalani’s guesthouse TAHAA",
    shareLabel: "공유하기",
    saveLabel: "저장",
    labelLang: "ko",
    onShareClick: fn(),
    onSaveClick: fn(),
  },
} satisfies Meta<typeof ListingTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Detail page title row (812:4793 · 812:6948 · 812:6955). */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-listing-title");
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(args.title);
    // Both buttons are the shared Button part.
    await expect(within(root).getAllByTestId("ds-button")).toHaveLength(2);
    const share = canvas.getByRole("button", { name: "공유하기" });
    const save = canvas.getByRole("button", { name: "저장" });
    await expect(share).toHaveAttribute("type", "button");
    await expect(canvas.getByText("공유하기")).toHaveAttribute("lang", "ko");
    const before = window.location.href;
    await userEvent.click(share);
    await expect(args.onShareClick).toHaveBeenCalledTimes(1);
    await userEvent.click(save);
    await expect(args.onSaveClick).toHaveBeenCalledTimes(1);
    // "Nothing, just shows them": the address does not change.
    await expect(window.location.href).toBe(before);
  },
};

/** Keyboard: Tab reaches "공유하기" then "저장"; Enter and Space run the callbacks. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const share = canvas.getByRole("button", { name: "공유하기" });
    const save = canvas.getByRole("button", { name: "저장" });
    await userEvent.tab();
    await expect(share).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onShareClick).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    await expect(save).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(args.onSaveClick).toHaveBeenCalledTimes(1);
  },
};
