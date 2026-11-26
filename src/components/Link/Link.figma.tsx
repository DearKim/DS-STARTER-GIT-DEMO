import figma from "@figma/code-connect";
import { Link } from "./Link";

/* Figma: Links 238:2309. State Focus is a CSS state, so it is not a prop. */
const URL = "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=238-2309";

figma.connect(Link, URL, {
  variant: { Type: "Subtle Link", Size: "Medium" },
  props: { hasIcon: figma.enum("Icon", { On: true, Off: false }) },
  example: ({ hasIcon }) => (
    <Link href="#" hasIcon={hasIcon}>Cleaning fee</Link>
  ),
});

figma.connect(Link, URL, {
  variant: { Type: "Subtle Link", Size: "Small" },
  example: () => (
    <Link href="#" size="small">Show</Link>
  ),
});

figma.connect(Link, URL, {
  variant: { Type: "Legal Link" },
  example: () => (
    <Link href="#" variant="legal" size="small">Terms of Service</Link>
  ),
});
