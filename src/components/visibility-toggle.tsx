import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

interface Props {
  defaultChecked: string;
  onToggle: (v: string) => void;
}

const VisibilityToggle = ({ onToggle, defaultChecked }: Props) => {
  const handleToggle = (check: boolean) => {
    if (!check) onToggle("public");
    if (check) onToggle("private");
  };

  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent className="gap-1">
        <FieldLabel htmlFor="collection-visibility" className="text-sm">
          Make collection private
        </FieldLabel>
        <FieldDescription className="text-xs font-medium">
          Only you can set your collection and content of your collection
        </FieldDescription>
      </FieldContent>

      <Switch
        id="collection-visibility"
        defaultChecked={defaultChecked === "private"}
        onCheckedChange={(b) => handleToggle(b)}
      />
    </Field>
  );
};

export default VisibilityToggle;
