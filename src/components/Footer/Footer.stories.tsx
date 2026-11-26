import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { Footer } from "./Footer";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=389-7358";

const meta = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    // The footer spans the page width (1440 on the Figma frames).
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    privacyIconSrc: imageUrl("footer-icon-privacy"),
    onLinkClick: fn(),
    onLanguageClick: fn(),
    onCurrencyClick: fn(),
    onSocialClick: fn(),
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The footer of the Home, Detail and Checkout pages (389:7358 · 812:578 · 10613:12249). */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-footer")).toBeInTheDocument();
    await expect(canvas.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(["Support", "Hosting", "Airbnb"]);
    const before = window.location.href;
    await userEvent.click(canvas.getByRole("button", { name: "Help Center" }));
    await expect(args.onLinkClick).toHaveBeenCalledTimes(1);
    await expect(args.onLinkClick).toHaveBeenCalledWith("help-center");
    // "Nothing, just shows it": no navigation, no "#" in the address.
    await expect(window.location.href).toBe(before);
    await userEvent.click(canvas.getByRole("button", { name: "Terms" }));
    await expect(args.onLinkClick).toHaveBeenLastCalledWith("terms");
    await userEvent.click(canvas.getByRole("button", { name: "English (US)" }));
    await expect(args.onLanguageClick).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByRole("button", { name: /KRW/ }));
    await expect(args.onCurrencyClick).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByRole("button", { name: "Instagram" }));
    await expect(args.onSocialClick).toHaveBeenCalledWith("instagram");
  },
};

/** Keyboard: Tab goes through the 27 column links, the 3 legal links, language, currency and the 3 social buttons. */
export const KeyboardOrder: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(27 + 3 + 2 + 3);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Help Center" })).toHaveFocus();
    for (let i = 1; i < 30; i += 1) await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Your Privacy Choices" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "English (US)" })).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Facebook" })).toHaveFocus();
  },
};
