import { Stack, Typography } from "@mui/material";
type Props = {
  title: string;
  Icon: () => JSX.Element;
};

const SectionHeader = ({title,Icon}: Props) => {
  return <Stack flexDirection={"row"}>
<Stack flexDirection={"row"} gap={2} alignItems="center" mb={2}>
    <Icon/>
    <Typography fontSize={{md:"30px",xs:"22px"}} fontWeight="bold" component="h2">
        {title}
    </Typography>
  </Stack>
  </Stack>
}

export default SectionHeader