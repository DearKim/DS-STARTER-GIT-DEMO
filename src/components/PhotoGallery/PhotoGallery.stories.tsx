import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { imageUrl } from "@/assets/images";
import { PhotoGallery } from "./PhotoGallery";
import type { PhotoGalleryProps } from "./PhotoGallery";

const FIGMA_URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-4767";

const photo = (n: number, alt: string) => ({ src: imageUrl(`detail-photo-${n}`) ?? "", alt });

/** The Detail page photos (my-assets/images/detail-photo-1.png … 5.png). Alt text: plan Q-03. */
const PHOTOS: PhotoGalleryProps["photos"] = [
  photo(1, "Dining room"),
  photo(2, "Kalani’s guesthouse TAHAA 이미지 2"),
  photo(3, "Kalani’s guesthouse TAHAA 이미지 3"),
  photo(4, "Kalani’s guesthouse TAHAA 이미지 4"),
  photo(5, "Kalani’s guesthouse TAHAA 이미지 5"),
];

const meta = {
  title: "Components/PhotoGallery",
  component: PhotoGallery,
  tags: ["autodocs"],
  parameters: {
    // Same place as on the 1440 Detail page: 80 side margins, 40 above the photos.
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1440, boxSizing: "border-box", padding: "40px 80px 0" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    photos: PHOTOS,
    showAllLabel: "사진 모두 보기",
    labelLang: "ko",
    onShowAllClick: fn(),
  },
} satisfies Meta<typeof PhotoGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The Detail page photos (812:4767): 1 big + 4 small, "사진 모두 보기" on the last photo. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("ds-photo-gallery");
    const images = within(root).getAllByRole("img");
    await expect(images.map((img) => img.getAttribute("alt"))).toEqual(PHOTOS.map((p) => p.alt));
    // The button is the shared Button part; the photos are not buttons.
    await expect(within(root).getAllByTestId("ds-button")).toHaveLength(1);
    await expect(within(root).getAllByRole("button")).toHaveLength(1);
    const showAll = canvas.getByRole("button", { name: "사진 모두 보기" });
    await expect(showAll).toHaveAttribute("type", "button");
    await expect(canvas.getByText("사진 모두 보기")).toHaveAttribute("lang", "ko");
    const before = window.location.href;
    await userEvent.click(showAll);
    await expect(args.onShowAllClick).toHaveBeenCalledTimes(1);
    await expect(window.location.href).toBe(before);
  },
};

/** Keyboard: the button is the only Tab stop; Enter runs the callback. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "사진 모두 보기" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onShowAllClick).toHaveBeenCalledTimes(1);
  },
};
