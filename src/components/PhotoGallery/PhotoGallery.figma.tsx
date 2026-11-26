import figma from "@figma/code-connect";
import { PhotoGallery } from "./PhotoGallery";

/* Detail photos 812:4767 (five photo frames + "사진 모두 보기" 812:4787). Not a Figma component. */
figma.connect(PhotoGallery, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-4767", {
  example: () => (
    <PhotoGallery
      photos={[
        { src: "detail-photo-1.png", alt: "Dining room" },
        { src: "detail-photo-2.png", alt: "Kalani’s guesthouse TAHAA 이미지 2" },
        { src: "detail-photo-3.png", alt: "Kalani’s guesthouse TAHAA 이미지 3" },
        { src: "detail-photo-4.png", alt: "Kalani’s guesthouse TAHAA 이미지 4" },
        { src: "detail-photo-5.png", alt: "Kalani’s guesthouse TAHAA 이미지 5" },
      ]}
      labelLang="ko"
    />
  ),
});
