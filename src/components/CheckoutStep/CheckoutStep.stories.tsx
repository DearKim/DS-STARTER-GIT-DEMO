import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { CheckoutStep } from "./CheckoutStep";
import type { CheckoutStepOption } from "./CheckoutStep";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-12227";

/** The current Checkout page's choices (PRD wording). */
const NOW: CheckoutStepOption = { value: "now", label: "Pay £340.91 now" };
const ZERO: CheckoutStepOption = {
  value: "zero",
  label: "Pay £0 now",
  subtext: "£340.91 charged on 13 Jan 2027. No extra fees.",
  actionLabel: "More info",
};
const KLARNA: CheckoutStepOption = {
  value: "klarna",
  label: "Pay in 3 payments with Klarna",
  subtext: "3 payments of £113.63 each (0% APR). 18+, T&C apply, Credit subject to status.",
  actionLabel: "More info",
};
const PAY_OPTIONS = [NOW, ZERO, KLARNA];

const meta = {
  title: "Components/CheckoutStep",
  component: CheckoutStep,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
  },
  args: {
    title: "1. Choose when to pay",
    open: true,
    name: "pay-when",
    options: PAY_OPTIONS,
    nextLabel: "Next",
    onValueChange: fn(),
    onOptionAction: fn(),
    onNext: fn(),
  },
  argTypes: {
    title: { control: "text" },
    open: { control: "boolean" },
    nextLabel: { control: "text" },
  },
  // The step column on the page is 540 wide.
  decorators: [
    (Story) => (
      <div style={{ width: 540 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutStep>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma 812:12228 — the open step: three choices (RadioButton list) and Next (Button secondary · small). Nothing is chosen at first. */
export const Open: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-checkoutstep");
    await expect(within(root).getAllByTestId("ds-radiobutton")).toHaveLength(3);
    // ds-button: More info × 2 (inside the rows) + Next.
    const buttons = within(root).getAllByTestId("ds-button");
    await expect(buttons).toHaveLength(3);
    await expect(canvas.getByRole("heading", { level: 2, name: "1. Choose when to pay" })).toBeInTheDocument();
    await expect(canvas.getByRole("radiogroup", { name: "1. Choose when to pay" })).toBeInTheDocument();
    await expect(canvas.queryAllByRole("radio", { checked: true })).toHaveLength(0);

    const next = canvas.getByRole("button", { name: "Next" });
    await userEvent.click(next);
    await expect(args.onNext).toHaveBeenCalledTimes(1);

    await userEvent.click(buttons[0] as HTMLElement);
    await expect(args.onOptionAction).toHaveBeenCalledWith("zero");
    await expect(args.onValueChange).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByText(ZERO.label));
    await expect(args.onValueChange).toHaveBeenCalledWith("zero");
    await expect(canvas.getByRole("radio", { name: ZERO.label })).toBeChecked();
  },
};

/** Keyboard order as on the current page: the radio group (one stop) → More info → More info → Next. */
export const FocusOrder: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: NOW.label })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    const zero = canvas.getByRole("radio", { name: ZERO.label });
    await expect(zero).toHaveFocus();
    await expect(zero).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith("zero");
    const [firstInfo, secondInfo] = canvas.getAllByRole("button", { name: ZERO.actionLabel });
    await userEvent.tab();
    await expect(secondInfo).toHaveFocus();
    await userEvent.tab({ shift: true });
    await userEvent.tab({ shift: true });
    await expect(firstInfo).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await expect(secondInfo).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Next" })).toHaveFocus();
  },
};

/** Figma 812:12274 — a closed step: bordered panel with its title only. Nothing to press. */
export const Closed: Story = {
  args: { title: "2. Add a payment method", open: false, options: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-checkoutstep");
    await expect(root).toHaveClass("ds-checkoutstep--closed");
    await expect(canvas.getByRole("heading", { level: 2, name: "2. Add a payment method" })).toBeInTheDocument();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
    await expect(canvas.queryAllByRole("radio")).toHaveLength(0);
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.tab();
    await expect(root.contains(document.activeElement)).toBe(false);
  },
};

/** The three steps as on the current Checkout page (24 apart — that gap is page layout). */
export const Steps: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <CheckoutStep {...args} />
      <CheckoutStep title="2. Add a payment method" />
      <CheckoutStep title="3. Review your reservation" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId("ds-checkoutstep")).toHaveLength(3);
    await expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(3);
  },
};
