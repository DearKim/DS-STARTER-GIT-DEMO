import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Chip } from "./Chip";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=234-2568";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  // Figma 세트 견본 글자 "1" (169:1567).
  args: { children: "1", selected: false, onClick: fn() },
  argTypes: {
    children: { control: "text" },
    selected: { control: "boolean" },
    // Figma 에 Disabled 모양은 없다 — 네이티브 disabled 전달만 확인할 수 있게 control 로만 둔다(스토리 없음).
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma State=Default (234:2567). Hover and Pressed are real pointer states of this story. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId("ds-chip");
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Figma State=Select (234:2564) — the chosen chip. */
export const Select: Story = {
  args: { selected: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId("ds-chip");
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Figma State=Focus (234:2563) — move focus with the keyboard, then Enter and Space press the chip. */
export const Focus: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId("ds-chip");
    await userEvent.tab();
    await expect(chip).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

const HOME_FILTERS = ["Hotels", "Motel", "Guesthouse", "Resort"];

/** Home "Stay in Seoul" (Figma 424:10614): one chip is chosen at a time. The parent keeps the choice. */
export const HomeFilters: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [chosen, setChosen] = useState(HOME_FILTERS[0]);
    return (
      <div role="group" aria-label="Stay type" style={{ display: "flex", gap: 20 }}>
        {HOME_FILTERS.map((label) => (
          <Chip
            key={label}
            selected={chosen === label}
            onClick={(event) => {
              setChosen(label);
              args.onClick?.(event);
            }}
          >
            {label}
          </Chip>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const [hotels, motel] = canvas.getAllByTestId("ds-chip");
    await expect(hotels).toHaveTextContent(HOME_FILTERS[0]!);
    await expect(hotels).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(motel!);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(motel).toHaveAttribute("aria-pressed", "true");
    await expect(hotels).toHaveAttribute("aria-pressed", "false");
  },
};
