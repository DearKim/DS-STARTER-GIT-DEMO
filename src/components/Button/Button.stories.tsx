/* @ds-generated 40e7c3a660d685af — `pnpm ds:gen` 이 만든 파일입니다.
   Figma: Button (0:4856)
   직접 고치면 다음 생성 때 충돌로 보고되고 덮어쓰지 않습니다. */
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Button } from "./Button";

const FIGMA_URL =
  "https://www.figma.com/design/SAMPLEKEY123/?node-id=0-4856";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
    docs: { description: { component: "A button that runs the main action. Use only one Primary button per screen." } },
  },
  args: { variant: "primary", size: "m", hasIcon: false, children: "Button", onClick: fn() },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "outline", "tertiary"] },
    size: { control: "inline-radio", options: ["l", "m", "s"] },
    hasIcon: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("ds-button"));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary" },
};

export const HasIcon: Story = { args: { hasIcon: true } };

/** Every Figma variant side by side, to compare with Figma — Type × Size. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      {(["primary","secondary","outline","tertiary"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["l","m","s"] as const).map((size) => (
            <Button key={size} {...args} variant={variant} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/* Figma 의 State variant(hover, pressed, disabled)는 prop 이 아니다.
   코드에서는 CSS 의사클래스(:hover/:active/:focus-visible)와 disabled 속성이 처리한다.
   실제 상호작용과 어긋나지 않도록 story 로 고정하지 않는다. */
