import figma from "@figma/code-connect";
import { ListingDescription } from "./ListingDescription";

/* Detail description section: containers 812:11223 (line + translation note) and 812:11231 (text + "Show more"). Not a Figma component. */
figma.connect(ListingDescription, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=812-11223", {
  example: () => <ListingDescription />,
});
