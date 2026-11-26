import figma from "@figma/code-connect";
import { ListingTitle } from "./ListingTitle";

/* Detail title row: text 812:4793 with the share (812:6948) and save (812:6955) frames. Not a Figma component. */
figma.connect(ListingTitle, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-4793", {
  example: () => <ListingTitle title="Kalani’s guesthouse TAHAA" labelLang="ko" />,
});
