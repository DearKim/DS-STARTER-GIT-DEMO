/* @ds-generated ac8399c960d7381a — `pnpm ds:gen` 이 만든 파일입니다.
   Figma: Button (0:4856)
   직접 고치면 다음 생성 때 충돌로 보고되고 덮어쓰지 않습니다. */
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "https://www.figma.com/design/SAMPLEKEY123/?node-id=0-4856", {
  props: {
    variant: figma.enum("Type", {
      "Primary": "primary",
      "Secondary": "secondary",
      "Outline": "outline",
      "Tertiary": "tertiary",
    }),
    size: figma.enum("Size", {
      "L": "l",
      "M": "m",
      "S": "s",
    }),
    hasIcon: figma.boolean("Has icon"),
    children: figma.string("Label"),
  },
  example: ({ variant, size, hasIcon, children }) => (
    <Button variant={variant} size={size} hasIcon={hasIcon}>{children}</Button>
  ),
});
