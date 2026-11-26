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

/** Plan revision 2 — one `variant="list"` row with its "More info" button (the kit Button text · small · secondary), 492 wide. */
export const ListRow: Story = {
  args: {
    variant: "list",
    name: "pay-when",
    value: "zero",
    label: "Pay £0 now",
    subtext: "£340.91 charged on 13 Jan 2027. No extra fees.",
    actionLabel: "More info",
    onActionClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 492 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-radiobutton");
    const radio = canvas.getByRole("radio", { name: "Pay £0 now" });
    await expect(root).toHaveClass("ds-radiobutton--list");
    await userEvent.click(within(root).getByTestId("ds-button"));
    await expect(args.onActionClick).toHaveBeenCalledTimes(1);
    await expect(radio).not.toBeChecked();
    await userEvent.click(canvas.getByText("Pay £0 now"));
    await expect(radio).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

/**
 * Plan revision 2 — `variant="list"`: the Checkout "Choose when to pay" rows at their page width (492).
 * Text on the left, circle on the right, a thin line between rows, "More info" is the kit Button (text · small · secondary).
 */
export const List: Story = {
  args: { onActionClick: fn() },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div role="radiogroup" aria-label="Choose when to pay" style={{ width: 492 }}>
      <RadioButton variant="list" name="pay-when" value="now" label="Pay £340.91 now" onChange={args.onChange} />
      <RadioButton
        variant="list"
        name="pay-when"
        value="zero"
        label="Pay £0 now"
        subtext="£340.91 charged on 13 Jan 2027. No extra fees."
        actionLabel="More info"
        onActionClick={args.onActionClick}
        onChange={args.onChange}
      />
      <RadioButton
        variant="list"
        name="pay-when"
        value="klarna"
        label="Pay in 3 payments with Klarna"
        subtext="3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status."
        actionLabel="More info"
        onActionClick={args.onActionClick}
        onChange={args.onChange}
      />
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const now = canvas.getByRole("radio", { name: "Pay £340.91 now" });
    const zero = canvas.getByRole("radio", { name: "Pay £0 now" });
    const klarna = canvas.getByRole("radio", { name: "Pay in 3 payments with Klarna" });
    const [firstInfo, secondInfo] = canvas.getAllByTestId("ds-button");
    await expect(canvas.getAllByTestId("ds-radiobutton")).toHaveLength(3);
    await expect(canvas.getAllByTestId("ds-button")).toHaveLength(2);
    // Nothing is chosen at first (PRD). No button sits inside a label element (HTML rule, plan Q-13 A).
    await expect(canvas.queryAllByRole("radio", { checked: true })).toHaveLength(0);
    await expect(canvasElement.querySelector("label button")).toBeNull();
    // Tab enters the group at the first radio.
    await userEvent.tab();
    await expect(now).toHaveFocus();
    (document.activeElement as HTMLElement | null)?.blur();
    // "More info" only calls its callback; it does not choose the row.
    await userEvent.click(canvas.getAllByTestId("ds-button")[0] as HTMLElement);
    await expect(args.onActionClick).toHaveBeenCalledTimes(1);
    await expect(zero).not.toBeChecked();
    await expect(args.onChange).not.toHaveBeenCalled();
    // The words choose the row.
    await userEvent.click(canvas.getByText("Pay £0 now"));
    await expect(zero).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    // With a row chosen the group is one Tab stop: chosen radio → next "More info"; Shift+Tab goes back past the group.
    await userEvent.tab({ shift: true });
    await expect(firstInfo).toHaveFocus();
    await userEvent.tab();
    await expect(zero).toHaveFocus();
    await userEvent.tab();
    await expect(secondInfo).toHaveFocus();
    await userEvent.click(canvas.getByText(/3 payments of £113.63 each/));
    await expect(klarna).toBeChecked();
    // Name = label only, description = subtext only.
    await expect(zero).toHaveAccessibleDescription("£340.91 charged on 13 Jan 2027. No extra fees.");
  },
};

/* Figma 의 State(Hover·Focus)는 prop 이 아니다. CSS(:hover·:focus-visible)가 처리하므로 story 로 고정하지 않는다.
   Disabled 견본은 Figma 에 없어 story 를 만들지 않는다(네이티브 disabled 는 전달된다). */
