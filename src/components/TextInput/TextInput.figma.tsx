import figma from "@figma/code-connect";
import { TextInput } from "./TextInput";

figma.connect(TextInput, "https://www.figma.com/design/Q5QDGE5WoXefOxgm5fziH3/?node-id=208-2159", {
  example: () => <TextInput label="Label" placeholder="Placeholder text" helperText="Optional helper text" />,
});
