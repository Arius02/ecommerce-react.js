import { addCategorySchema } from "../../../validation/category.validator.ts";
import * as React from "react";
import useMutationHook from "../../../hooks/useMutationHook.tsx";
import { AddItem } from "../../../components/admin/index.ts";

const AddCategory = () => {
    
     const [snack, setSnack] = React.useState<SnackbarType>({
       open: false,
       message: "",
       severity: "success",
     });
     const { mutate: addCategory, isPending } = useMutationHook({
     url:  "/category",
      method: "POST",
      message: "Category Added Successfully.",
       setSnack,
       }  );
   
  return (
    <AddItem
      addItem={addCategory}
      isPending={isPending}
      name="Category"
      schema={addCategorySchema}
      setSnack={setSnack}
      snack={snack}
      key={"Dij"}
    />
  );
};

export default AddCategory;
