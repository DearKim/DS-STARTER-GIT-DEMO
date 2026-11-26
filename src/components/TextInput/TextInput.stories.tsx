import type { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, fn, userEvent, within } from "@storybook/test";
import { TextInput } from "./TextInput";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=208-2159";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  // Figma 상자 폭 520. 부품은 부모 폭을 채운다(Q-07 A).
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Label",
    placeholder: "Placeholder text",
    helperText: "Optional helper text",
    invalid: false,
    icon: false,
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    invalid: { control: "boolean" },
    errorMessage: { control: "text" },
    icon: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma 208:2066 (Label=on, Helper Text=on). Typing shows the Filled look while focused. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole("textbox", { name: "Label" });
    await expect(field).toHaveAccessibleDescription("Optional helper text");
    await userEvent.click(field);
    await expect(field).toHaveFocus();
    await userEvent.type(field, "Filling the input with real text");
    await expect(field).toHaveValue("Filling the input with real text");
    await expect(args.onChange).toHaveBeenCalled();
    // Tab leaves and comes back to the input.
    await userEvent.tab();
    await expect(field).not.toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(field).toHaveFocus();
  },
};

/** Figma 208:2061 (Label=off, Helper Text=off, Icon=off). */
export const NoLabel: Story = {
  args: { label: undefined, helperText: undefined, "aria-label": "Search" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole("textbox", { name: "Search" });
    // Pressing on the box itself (its padding, not the input) still focuses the input.
    const box = canvasElement.querySelector(".ds-textinput__box") as HTMLElement;
    await fireEvent.mouseDown(box);
    await expect(field).toHaveFocus();
  },
};

/** Figma 208:2065 (Label=on, Helper Text=on, Icon=on): the calendar icon at the right end. */
export const WithIcon: Story = {
  args: { icon: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svg = canvasElement.querySelector(".ds-textinput__icon");
    await expect(svg).not.toBeNull();
    await expect(svg).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.getByRole("textbox", { name: "Label" })).toBeInTheDocument();
  },
};

/** Figma 208:2059 / 208:2060 (Status=Error): red box and label, the error line replaces the helper text. */
export const Invalid: Story = {
  args: { invalid: true, errorMessage: "Error message" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole("textbox", { name: "Label" });
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(field).toHaveAccessibleDescription("Error message");
    await expect(canvas.queryByText("Optional helper text")).toBeNull();
    await userEvent.type(field, "Filling the input with real text");
    // The error line stays while typing (plan Q-03 A).
    await expect(canvas.getByText("Error message")).toBeInTheDocument();
  },
};

/** Figma's persistent combinations side by side: Label × Helper Text × Icon, and Status=Error. Focus/typing are real states. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "grid", gap: 24 }}>
      <TextInput {...args} label={undefined} helperText={undefined} aria-label="Label off" />
      <TextInput {...args} label={undefined} aria-label="Label off, helper on" />
      <TextInput {...args} label={undefined} helperText={undefined} icon aria-label="Label off, icon on" />
      <TextInput {...args} helperText={undefined} />
      <TextInput {...args} />
      <TextInput {...args} icon />
      <TextInput {...args} invalid errorMessage="Error message" />
      <TextInput {...args} invalid errorMessage="Error message" icon />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId("ds-textinput")).toHaveLength(8);
    await expect(canvas.getAllByText("Error message")).toHaveLength(2);
  },
};

/* Figma 의 State(Hover·Focus·Filled)는 prop 이 아니다. Hover 는 Figma 에서 Default 와 같고,
   Focus·Filled 는 :focus-within 이 처리하므로 story 로 고정하지 않는다.
   Disabled·ReadOnly 견본은 Figma 에 없어 story 를 만들지 않는다(네이티브 속성은 전달된다). */
