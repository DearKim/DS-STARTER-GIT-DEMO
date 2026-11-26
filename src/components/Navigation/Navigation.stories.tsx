import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Navigation } from "./Navigation";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=235-2441";

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    type: "main",
    logoHref: "/",
    hostHref: "#host",
    onLanguageClick: fn(),
    onMenuClick: fn(),
    onFieldClick: fn(),
    onSearchClick: fn(),
  },
  argTypes: {
    type: { control: "inline-radio", options: ["main", "stays", "expanded"] },
    logoHref: { control: "text" },
    hostHref: { control: "text" },
    values: { control: "object" },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma "Type= Main Navigation" (8:297), shown at the Figma width of 1440. */
export const Main: Story = {
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: 1440 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-navigation")).toBeInTheDocument();
    const logo = canvas.getByRole("link", { name: "Airbnb" });
    await expect(logo).toHaveAttribute("href", "/");
    await expect(canvas.getByRole("link", { name: "Become a Host" })).toHaveAttribute("href", "#host");

    await userEvent.click(canvas.getByRole("button", { name: "Anywhere" }));
    await expect(args.onFieldClick).toHaveBeenCalledWith("where", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: "Search" }));
    await expect(args.onSearchClick).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByRole("button", { name: "Language" }));
    await expect(args.onLanguageClick).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByRole("button", { name: "Menu" }));
    await expect(args.onMenuClick).toHaveBeenCalledTimes(1);

    // Tab goes left to right: logo, the three fields, search, Become a Host, globe, menu.
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(logo).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Anywhere" })).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Search" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Become a Host" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Language" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Menu" })).toHaveFocus();
  },
};

/** Figma "Type= Stays Navigation" (235:2440): the search pill. */
export const Stays: Story = {
  args: { type: "stays" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-navigation")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Anywhere" }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("where", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: "Any week" }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("when", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: "Add guests" }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("who", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: "Search" }));
    await expect(args.onSearchClick).toHaveBeenCalledTimes(1);

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Anywhere" })).toHaveFocus();
  },
};

/** Figma "Type= Expanded Stays Navigation" (234:4360): the open search bar. */
export const Expanded: Story = {
  args: { type: "expanded" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-navigation")).toBeInTheDocument();
    await expect(canvas.getByText("Search destinations")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /^Where/ }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("where", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: /^Check-in/ }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("checkIn", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: /^Check-out/ }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("checkOut", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: /^Who/ }));
    await expect(args.onFieldClick).toHaveBeenLastCalledWith("who", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: "Search" }));
    await expect(args.onSearchClick).toHaveBeenCalledTimes(1);

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: /^Where/ })).toHaveFocus();
  },
};
