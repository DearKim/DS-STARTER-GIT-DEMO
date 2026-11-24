/* @ds-generated 4650abfccde1267b — `pnpm ds:gen` 이 만든 파일입니다.
   Figma: Card (0:5400)
   직접 고치면 다음 생성 때 충돌로 보고되고 덮어쓰지 않습니다. */
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Card } from "./Card";

const FIGMA_URL =
  "https://www.figma.com/design/SAMPLEKEY123/?node-id=0-5400";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: { type: "figma", url: FIGMA_URL },
    docs: { description: { component: "A surface that groups related content." } },
  },
  args: { children: "Card" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("ds-card")).toBeInTheDocument();
  },
};
