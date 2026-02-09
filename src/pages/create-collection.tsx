import { Button } from "@/components/ui/button";
import { FormikProvider, useFormik } from "formik";
import DayterInput from "@/components/custom-input";
import EmojiPickerInput from "@/components/emoji-picker";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CreateCollectionSchema, type CreateCollectionSchemaType } from "@/schema";
import { useChromeRuntimeCreateCollection } from "@/api/hooks/mutations";
import { useNavigate } from "react-router";
import { ExtAppClient } from "@/api";
import VisibilityToggle from "@/components/visibility-toggle";
import { Folder } from "lucide-react";

const CreateCollection = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useChromeRuntimeCreateCollection();

  const initialValues = {
    name: "",
    visibility: "public",
    emoji: "",
  };

  const handleSubmit = (v: CreateCollectionSchemaType, resetForm: () => void) => {
    mutate(v, {
      onSuccess: () => {
        resetForm();
        ExtAppClient.invalidateQueries({ queryKey: ["collections"] });
        navigate("/");
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateCollectionSchema,
    onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),
  });

  return (
    <div className="flex flex-col gap-4 p-3">
      <TooltipProvider>
        <div className="grid gap-2">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3.5 w-full">
              <div className="w-full flex items-center gap-2">
                <DayterInput
                  LeftIcon={Folder}
                  type="text"
                  placeholder="Name"
                  name="name"
                  autoComplete="off"
                  value={formik.values.name}
                  error={formik.errors.name}
                  onChange={formik.handleChange}
                  required
                  disabled={isPending}
                  className="h-10"
                />

                <EmojiPickerInput
                  value={formik.values.emoji}
                  onEmojiSelect={(emoji) => formik.setFieldValue("emoji", emoji)}
                />
              </div>

              <div className="w-full flex flex-col items-start">
                <VisibilityToggle
                  defaultChecked={formik.values.visibility}
                  onToggle={(v) => formik.setFieldValue("visibility", v)}
                />
              </div>

              <Button
                className="rounded-4xl"
                size="lg"
                variant="outline"
                type="submit"
                disabled={isPending}
              >
                Create Collection
              </Button>
            </form>
          </FormikProvider>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default CreateCollection;
