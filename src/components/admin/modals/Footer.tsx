import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import { MouseEventHandler } from 'react';

const Footer = ({
  onClickFn,
  isPending,
}: {
  onClickFn: MouseEventHandler<HTMLButtonElement>;
  isPending: boolean;
}) => {
  return (
    <Stack flexDirection="row" justifyContent="flex-end" mt={2}>
      <Button variant="text" onClick={onClickFn} color={"error"}>
        Cancel
      </Button>
      <LoadingButton
        type="submit"
        loading={isPending}
        variant="contained"
        color="primary"
        sx={{ ml: 1 }}
      >
        Update
      </LoadingButton>
    </Stack>
  );
};

export default Footer