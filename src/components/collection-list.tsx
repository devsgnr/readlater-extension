import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { usePayloadContext } from "@/hooks";
import type { Collection } from "@/types";

interface Props {
  collections: Collection[];
}

const CollectionList = ({ collections }: Props) => {
  const { payload, handleCollectionToggle } = usePayloadContext();

  return (
    <FieldSet>
      <FieldGroup className="gap-3">
        {collections.map((collection) => (
          <Field
            orientation="horizontal"
            className="rounded-[8px] hover:bg-muted p-1 pr-2"
          >
            <FieldLabel
              key={collection.id}
              htmlFor={collection.id}
              className="flex items-start justify-between cursor-pointer"
            >
              <div className="w-full flex items-center gap-1.5">
                <div className="size-12 bg-secondary text-2xl flex items-center justify-center rounded-[8px]">
                  {collection.emoji ?? collection.name[0]}
                </div>
                <div className="flex flex-col gap-0">
                  <p className="text-sm font-semibold">{collection.name}</p>
                  <FieldDescription className="text-xs">
                    {collection.count} texts
                  </FieldDescription>
                </div>
              </div>
            </FieldLabel>

            <Checkbox
              id={collection.id}
              name={collection.id}
              checked={payload?.collections?.includes(collection.id) ?? false}
              onCheckedChange={() => handleCollectionToggle(collection.id)}
            />
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
};

export default CollectionList;
