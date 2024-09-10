import { addBrandSchema } from "../../../validation/brand.validator.ts";
import * as React from "react";
import useMutationHook from "../../../hooks/useMutationHook.tsx";
import { AddItem } from "../../../components/admin/index.ts";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const AddBrand = () => {
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: addBrand, isPending } = useMutationHook({
    url: "/brand",
    method: "POST",
    message: "Brand Added Successfully.",
    setSnack,
  });

  return (
    <AddItem
      addItem={
        addBrand as UseMutateFunction<
          AxiosResponse<any, any>,
          unknown,
          FormData,
          unknown
        >
      }
      isPending={isPending}
      name="Brand"
      schema={addBrandSchema}
      setSnack={setSnack}
      snack={snack}
      key={"Dij"}
    />
  );
};

export default AddBrand;
