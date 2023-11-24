import { Skeleton } from "@mui/lab";

const AddressesSkeleton = () => {
  return [343, 43, 54].map((address: number) => (
    <Skeleton
      key={address}
      width={"100%"}
      height="90px"
      sx={{ borderRadius: "8px" }}
    />
  ));
};
export default AddressesSkeleton;
