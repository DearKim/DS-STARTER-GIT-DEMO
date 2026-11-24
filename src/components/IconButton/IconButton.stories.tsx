/* @ds-generated cdb47e7dc12c5b50 — `pnpm ds:gen` 이 만든 파일입니다.
   기준선: IconButton (core)
   직접 고치면 다음 생성 때 충돌로 보고되고 덮어쓰지 않습니다. */
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: { label: "Add", icon: <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" /></svg>, variant: "primary", size: "md", onClick: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    icon: { control: false },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("ds-iconbutton"));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

/** Every Figma variant side by side, to compare with Figma — Variant × Size. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      {(["primary","secondary","ghost","danger"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["sm","md","lg"] as const).map((size) => (
            <IconButton key={size} {...args} variant={variant} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/* Figma 의 State variant(hover, active, focus)는 prop 이 아니다.
   코드에서는 CSS 의사클래스(:hover/:active/:focus-visible)와 disabled 속성이 처리한다.
   실제 상호작용과 어긋나지 않도록 story 로 고정하지 않는다. */
