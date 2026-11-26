import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { ServiceTab } from "./ServiceTab";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=418-3150";

/** The five tabs of the Home hero (website plan, Home 2): words and pictures from the current site. */
const ALL_ICON = imageUrl("icon-all") ?? "";
const HOMES_ICON = imageUrl("icon-homes") ?? "";
const SERVICES = [
  { label: "All", iconSrc: ALL_ICON },
  { label: "Homes", iconSrc: HOMES_ICON },
  { label: "Hotels", iconSrc: imageUrl("icon-hotels") ?? "" },
  { label: "Experience", iconSrc: imageUrl("icon-experiences") ?? "" },
  { label: "Services", iconSrc: imageUrl("icon-services") ?? "" },
];

/** Preview only: the tabs sit on the hero photo on the page (white words). Not part of the component. */
const heroBackdrop = {
  padding: 24,
  backgroundImage: `url(${imageUrl("bg") ?? ""})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const meta = {
  title: "Components/ServiceTab",
  component: ServiceTab,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={heroBackdrop}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Homes",
    iconSrc: HOMES_ICON,
    selected: false,
    onClick: fn(),
  },
  argTypes: {
    label: { control: "text" },
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof ServiceTab>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Status=Default (418:3148). Hover (418:3147) is the real pointer look (CSS :hover). */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByTestId("ds-service-tab");
    await expect(tab).toHaveAccessibleName(args.label);
    await expect(tab).toHaveAttribute("type", "button");
    await expect(tab).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(tab);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(tab).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/** Figma Status=Selected (418:3149): the chosen tab. */
export const Selected: Story = {
  args: { label: "All", iconSrc: ALL_ICON, selected: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByTestId("ds-service-tab");
    await expect(tab).toHaveAccessibleName("All");
    await expect(tab).toHaveAttribute("aria-pressed", "true");
  },
};

/** The Home hero row: "All" is chosen at first and a click moves the choice (only one at a time). */
export const HeroRow: Story = {
  render: function Render(args) {
    const [chosen, setChosen] = useState("All");
    return (
      <div style={{ display: "flex", gap: 80 }}>
        {SERVICES.map((s) => (
          <ServiceTab
            key={s.label}
            label={s.label}
            iconSrc={s.iconSrc}
            selected={chosen === s.label}
            onClick={(event) => {
              setChosen(s.label);
              args.onClick?.(event);
            }}
          />
        ))}
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByTestId("ds-service-tab");
    await expect(tabs).toHaveLength(5);
    const [all, homes, hotels] = tabs as [HTMLElement, HTMLElement, HTMLElement];
    await expect(all).toHaveAccessibleName("All");
    await expect(all).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(hotels);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(hotels).toHaveAttribute("aria-pressed", "true");
    await expect(all).toHaveAttribute("aria-pressed", "false");

    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(all).toHaveFocus();
    await userEvent.tab();
    await expect(homes).toHaveFocus();
  },
};
