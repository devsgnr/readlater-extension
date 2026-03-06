import { type InferType, object, string } from "yup";

const CreateCollectionSchema = object().shape({
  name: string()
    .required("Please provide collection name")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  emoji: string(),
  visibility: string().required(),
});

type CreateCollectionSchemaType = InferType<typeof CreateCollectionSchema>;

export type { CreateCollectionSchemaType };
export { CreateCollectionSchema };
