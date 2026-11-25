/* @ds-generated cdb47e7dc12c5b50 — `pnpm ds:gen` 이 만든 파일입니다.
   기준선: IconButton (Figma 389:7765)
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
  args: {
    label: "Search",
    variant: "secondary",
    size: "l",
    status: "default",
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary"] },
    size: { control: "inline-radio", options: ["l", "s"] },
    status: { control: "inline-radio", options: ["default", "hover", "selected"] },
    iconType: {
      control: "select",
      options: [
        "services",
        "experiences",
        "hotels",
        "homes",
        "all",
        "profile",
        "menu",
        "search",
        "redirect",
        "previous",
        "next",
      ],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {
  args: { variant: "secondary" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId("ds-iconbutton"));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Small: Story = {
  args: { size: "s" },
};

export const WithIconType: Story = {
  args: { iconType: "search" },
};

/** All Figma variants: Variant × Size × Status */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "grid", gap: 24 }}>
      {(["secondary", "primary"] as const).map((variant) => (
        <div key={variant}>
          <h3 style={{ marginBottom: 12 }}>{variant}</h3>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {(["l", "s"] as const).map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#666" }}>{size}</span>
                {(["default", "hover", "selected"] as const).map((status) => (
                  <IconButton
                    key={status}
                    {...args}
                    variant={variant}
                    size={size}
                    status={status}
                    label={`${variant} ${size} ${status}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Icon types from Figma */
export const IconTypes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(["services", "experiences", "hotels", "homes", "all", "profile", "menu", "search", "redirect", "previous", "next"] as const).map(
        (iconType) => (
          <div key={iconType} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <IconButton {...args} iconType={iconType} label={iconType} />
            <span style={{ fontSize: 11, color: "#666" }}>{iconType}</span>
          </div>
        ),
      )}
    </div>
  ),
};
