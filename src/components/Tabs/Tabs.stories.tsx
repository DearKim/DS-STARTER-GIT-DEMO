import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Tabs } from "./Tabs";
import type { TabItem } from "./Tabs";

const UNDERLINE_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=229-2214";
const PILL_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=237-2219";

/** Figma "Dome" (235:1803, Internal Only Canvas) — story sample only, original path and 24×24 size (plan Q-07). */
const DomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
    <g transform="translate(0 0.2664)">
      <path d="M22.2857 0V5.81657C23.3451 7.57371 23.9331 9.57429 23.994 11.6246L24 12V22.2857C24 22.7186 23.8371 23.1351 23.5431 23.4523C23.2483 23.7686 22.8454 23.9631 22.4143 23.9957L22.2857 24H1.71429C1.28143 24 0.864857 23.8371 0.547714 23.5423C0.230571 23.2483 0.0368573 22.8454 0.00428581 22.4143L0 22.2857V12C0 5.37257 5.37257 0 12 0C15.3583 0 18.3943 1.38 20.5714 3.60257V0H22.2857ZM12 1.71429C6.40714 1.71429 1.85657 6.17914 1.71771 11.7386L1.71429 12V22.2857H7.71429V13.7143H6V12H18V13.7143H16.2857V22.2857H22.2857V12C22.2857 6.31971 17.6803 1.71429 12 1.71429ZM14.5714 13.7143H9.42857V22.2857H14.5714V13.7143ZM12 7.71429C12.2271 7.71429 12.4457 7.80429 12.606 7.96543C12.7671 8.12571 12.8571 8.34429 12.8571 8.57143C12.8571 8.79857 12.7671 9.01714 12.606 9.17743C12.4457 9.33857 12.2271 9.42857 12 9.42857C11.7729 9.42857 11.5543 9.33857 11.394 9.17743C11.2329 9.01714 11.1429 8.79857 11.1429 8.57143C11.1429 8.34429 11.2329 8.12571 11.394 7.96543C11.5543 7.80429 11.7729 7.71429 12 7.71429Z" />
    </g>
  </svg>
);

/** Labels of the Home "Inspiration for future getaways" tab list (Figma 389:7214). */
const INSPIRATION: TabItem[] = [
  { id: "popular", label: "Popular", content: "Popular destinations" },
  { id: "arts", label: "Arts & culture", content: "Arts & culture destinations" },
  { id: "beach", label: "Beach", content: "Beach destinations" },
  { id: "mountains", label: "Mountains", content: "Mountain destinations" },
];

/** Figma Underline Tabs Icon=On sample: the "Dome" icon and label (150:2358). */
const DOME: TabItem[] = [
  { id: "dome-1", label: "Dome", icon: <DomeIcon />, content: "Dome stays" },
  { id: "dome-2", label: "Dome", icon: <DomeIcon />, content: "Dome stays" },
  { id: "dome-3", label: "Dome", icon: <DomeIcon />, content: "Dome stays" },
];

/** Figma Pill Tabs labels (237:2208, 237:2210). The second segment is the selected one in Figma. */
const DATES: TabItem[] = [
  { id: "dates", label: "Choose dates", content: "Pick your dates." },
  { id: "flexible", label: "I’m flexible", content: "Stay for a weekend, a week or a month." },
];

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: UNDERLINE_URL },
  },
  args: { items: INSPIRATION, variant: "line", onTabChange: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["line", "pill"] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Underline Tabs, Icon=Off (229:2085 selected · 229:2086 not selected). Hover/Pressed are real pointer states. */
export const Line: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-tabs")).toBeInTheDocument();
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    await userEvent.click(tabs[1]!);
    await expect(args.onTabChange).toHaveBeenCalledTimes(1);
    await expect(args.onTabChange).toHaveBeenCalledWith("arts");
    await expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(String(INSPIRATION[1]!.content));
  },
};

/** Underline Tabs, Icon=On (150:2355 selected · 225:1692 not selected) with the Figma "Dome" sample icon. */
export const LineWithIcon: Story = {
  args: { items: DOME },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs[0]!.querySelector("svg")).not.toBeNull();
    await userEvent.click(tabs[2]!);
    await expect(args.onTabChange).toHaveBeenCalledWith("dome-3");
    await expect(tabs[2]).toHaveAttribute("aria-selected", "true");
  },
};

/** Pill Tabs (237:2217). The selected segment is white. */
export const Pill: Story = {
  args: { items: DATES, variant: "pill", defaultTab: "flexible" },
  parameters: { design: { type: "figma", url: PILL_URL } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [dates, flexible] = canvas.getAllByRole("tab");
    await expect(flexible).toHaveAttribute("aria-selected", "true");
    await userEvent.click(dates!);
    await expect(args.onTabChange).toHaveBeenCalledTimes(1);
    await expect(dates).toHaveAttribute("aria-selected", "true");
  },
};

/** Figma State=Focus (229:2083 Icon=Off). One Tab press enters the list on the selected tab; ← → move and select. */
export const Focus: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");
    await userEvent.tab();
    await expect(tabs[0]).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(tabs[1]).toHaveFocus();
    await expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    await expect(args.onTabChange).toHaveBeenCalledWith("arts");
    await userEvent.keyboard("{End}");
    await expect(tabs[3]).toHaveFocus();
  },
};

/** Figma State=Focus (225:1762 Icon=On). */
export const FocusWithIcon: Story = {
  args: { items: DOME },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getAllByRole("tab")[0]).toHaveFocus();
  },
};

/** Figma Pill Tabs State=Focus (237:2218): focus lands on the selected segment. */
export const FocusPill: Story = {
  args: { items: DATES, variant: "pill", defaultTab: "flexible" },
  parameters: { design: { type: "figma", url: PILL_URL } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getAllByRole("tab")[1]).toHaveFocus();
  },
};

/* Figma 의 State variant(Hover·Pressed·Focus)는 prop 이 아니다. CSS 의사 클래스가 처리하므로 story 로 고정하지 않는다.
   Focus story 는 키보드로 실제 포커스를 옮긴다. */
