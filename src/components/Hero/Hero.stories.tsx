import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { Hero } from "./Hero";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=418-8305";

/** The current Home page content (website plan, Home 2). */
const SERVICES = [
  { value: "all", label: "All", iconSrc: imageUrl("icon-all") ?? "" },
  { value: "homes", label: "Homes", iconSrc: imageUrl("icon-homes") ?? "" },
  { value: "hotels", label: "Hotels", iconSrc: imageUrl("icon-hotels") ?? "" },
  { value: "experience", label: "Experience", iconSrc: imageUrl("icon-experiences") ?? "" },
  { value: "services", label: "Services", iconSrc: imageUrl("icon-services") ?? "" },
];

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1440 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Start Your Trip with Airbnb",
    backgroundSrc: imageUrl("bg") ?? "",
    services: SERVICES,
    defaultService: "all",
    onServiceChange: fn(),
    onFieldChange: fn(),
    onSearchClick: fn(),
  },
  argTypes: {
    title: { control: "text" },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Home hero at 1440: "All" is chosen at first; a click moves the choice; the four boxes take typing. */
export const Home: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const hero = canvas.getByTestId("ds-hero");
    await expect(within(hero).getAllByTestId("ds-service-tab")).toHaveLength(5);
    await expect(within(hero).getByTestId("ds-navigation")).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent("Start Your Trip with Airbnb");

    const [all, homes] = canvas.getAllByTestId("ds-service-tab") as [HTMLElement, HTMLElement];
    await expect(all).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(homes);
    await expect(args.onServiceChange).toHaveBeenCalledWith("homes");
    await expect(homes).toHaveAttribute("aria-pressed", "true");
    await expect(all).toHaveAttribute("aria-pressed", "false");

    // The four search boxes belong to Navigation (expanded); the first is "Where".
    const [where] = within(hero).getAllByRole("textbox") as [HTMLInputElement];
    await expect(where).toHaveAccessibleName("Where");
    await userEvent.type(where, "Seoul");
    await expect(where).toHaveValue("Seoul");
    await expect(args.onFieldChange).toHaveBeenLastCalledWith("where", "Seoul", expect.anything());
    await userEvent.click(canvas.getByRole("button", { name: "Search" }));
    await expect(args.onSearchClick).toHaveBeenCalledTimes(1);

    // Tab: five tabs, four boxes, search.
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(all).toHaveFocus();
    for (let i = 0; i < 4; i += 1) await userEvent.tab();
    await userEvent.tab();
    await expect(where).toHaveFocus();
    for (let i = 0; i < 3; i += 1) await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Search" })).toHaveFocus();
  },
};
