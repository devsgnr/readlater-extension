import { type InferType, object, string } from "yup";

const CreateCollectionSchema = object().shape({
  name: string().required("Please provide collection name"),
  emoji: string(),
  visibility: string().required(),
});

type CreateCollectionSchemaType = InferType<typeof CreateCollectionSchema>;

export type { CreateCollectionSchemaType };
export { CreateCollectionSchema };
