import { addSubCategorySchema } from "../../../validation/subCategory.validator.ts";
import * as React from "react";
import useMutationHook from "../../../hooks/useMutationHook.tsx";
import { AddItem } from "../../../components/admin/index.ts";

const AddSubCategory = () => {

  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: addSubCategory, isPending } = useMutationHook({
    url:"/subCategory",
   method: "POST",
   message: "Sub Category Added Successfully.",
    setSnack,
   } );


  return (
    <AddItem
      addItem={addSubCategory}
      isPending={isPending}
      name="Sub Category"
      schema={addSubCategorySchema}
      setSnack={setSnack}
      snack={snack}
      key={"dij"}
      enabled={true}
    />
  );
}

export default AddSubCategory;
