import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { RadioButton } from "./RadioButton";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=213-1943";

const meta = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    label: "Keypad",
    name: "door",
    value: "keypad",
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    subtext: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma 213:1934 (State=Default, Status=Unchecked, Subtext=off). Hover and focus are real pointer/keyboard states. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Keypad" });
    await expect(canvas.getByTestId("ds-radiobutton")).toBeInTheDocument();
    await expect(radio).not.toBeChecked();
    // Clicking the label text selects the radio and calls onChange.
    await userEvent.click(canvas.getByText("Keypad"));
    await expect(radio).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    // Tab reaches the radio.
    (radio as HTMLInputElement).blur();
    await userEvent.tab();
    await expect(radio).toHaveFocus();
  },
};

/** Figma 213:1939 layout (Subtext=on) with the radio circle from 213:1944 (plan Q-02 A). */
export const WithSubtext: Story = {
  args: { subtext: "Guests can open the door with a code" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Keypad" });
    await expect(radio).toHaveAccessibleDescription("Guests can open the door with a code");
    await userEvent.click(canvas.getByText("Guests can open the door with a code"));
    await expect(radio).toBeChecked();
  },
};

/** Figma "Radio Button" 213:1944 — the circle alone. It needs an accessible name. */
export const RadioOnly: Story = {
  args: { label: undefined, "aria-label": "Keypad" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Keypad" });
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

/** Several radios with the same `name` make one group: Tab enters it, the arrow keys move the choice. */
export const Group: Story = {
  render: (args) => (
    <div role="radiogroup" aria-label="Check-in method" style={{ display: "grid", gap: 16 }}>
      <RadioButton {...args} label="Keypad" value="keypad" defaultChecked />
      <RadioButton {...args} label="Lockbox" value="lockbox" />
      <RadioButton {...args} label="Building staff" value="staff" />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "Keypad" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    const lockbox = canvas.getByRole("radio", { name: "Lockbox" });
    await expect(lockbox).toHaveFocus();
    await expect(lockbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/** Figma's persistent states side by side: Status Unchecked/Checked × Subtext off/on, and the circle alone. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: 24, alignItems: "start" }}>
      <RadioButton {...args} name="m1" aria-label="Unchecked" label={undefined} />
      <RadioButton {...args} name="m2" label="Keypad" />
      <RadioButton {...args} name="m3" label="Keypad" subtext="Guests can open the door with a code" />
      <RadioButton {...args} name="m4" aria-label="Checked" label={undefined} defaultChecked />
      <RadioButton {...args} name="m5" label="Keypad" defaultChecked />
      <RadioButton {...args} name="m6" label="Keypad" subtext="Guests can open the door with a code" defaultChecked />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId("ds-radiobutton")).toHaveLength(6);
    await expect(canvas.getAllByRole("radio", { checked: true })).toHaveLength(3);
  },
};

/* Figma 의 State(Hover·Focus)는 prop 이 아니다. CSS(:hover·:focus-visible)가 처리하므로 story 로 고정하지 않는다.
   Disabled 견본은 Figma 에 없어 story 를 만들지 않는다(네이티브 disabled 는 전달된다). */
