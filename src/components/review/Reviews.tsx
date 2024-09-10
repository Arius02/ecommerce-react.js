import {
  Box,
  Stack,
  Typography,
  Rating,
  Pagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import ProductReviewsSkeleton from "../skeleton/product/ProductReviewsSkeleton";
import AddReview from "./AddReview";
import SortIcon from "@mui/icons-material/Sort";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppContext } from "../../context/AppContext";
import { DeleteModal } from "../admin";
import EditReview from "../dailogs/EditReview";

type Props = {
  id: string;
};

const Reviews = ({ id }: Props) => {
  const [reviewPage, setReviewPage] = useState(1);
  const [sort, setSort] = useState<string>("");
  const [openDelete, setOpenDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [openEdit, setOpenEdit] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState<any | null>(null);

  const {
    data: reviewsData,
    isPending,
    refetch,
  } = useMultiQueryHook({
    queries: [`getProductReviews-${id}`, reviewPage, sort],
    url: `/review/${id}?size=5&page=${reviewPage}${
      sort ? `&sort=${sort}` : ""
    }`,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setReviewPage(value);
  };

  const handleSort = () => {
    setSort((prevSort) => (prevSort === "-rating" ? "rating" : "-rating"));
  };

  const handleDelete = (reviewId: string) => {
    setIdToDelete(reviewId);
    setOpenDelete(true);
  };

  const handleEdit = (review: any) => {
    setReviewToEdit(review);
    setOpenEdit(true);
  };

  const { auth } = useContext(AppContext);

  return (
    <Box mt={5}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={1}
        justifyContent="space-between"
        mb={3}
      >
        <Typography fontWeight="bold" fontSize={{ md: "30px", xs: "22px" }}>
          Product Reviews
        </Typography>
        <Tooltip title="Sort">
          <IconButton onClick={handleSort}>
            <SortIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {reviewsData ? (
        <>
          {reviewsData.reviews.length ? (
            <>
              {reviewsData.reviews.map((review: any) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  auth={auth}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              <Pagination
                count={reviewsData.totalPages}
                page={reviewPage}
                variant="outlined"
                color="primary"
                onChange={handleChange}
                sx={{ width: "fit-content", m: "auto", mt: 2 }}
              />
            </>
          ) : (
            <Typography color="grey" textAlign="center" py={5}>
              There are no reviews yet.
            </Typography>
          )}
        </>
      ) : (
        <ProductReviewsSkeleton />
      )}

      {!isPending && <AddReview productId={id} refetch={refetch} />}
      <DeleteModal
        name="Review"
        open={openDelete}
        setOpen={setOpenDelete}
        refetch={refetch}
        title="Delete Review"
        url={`/review/${id}/${idToDelete}`}
      />
      {reviewToEdit && (
        <EditReview
          data={reviewToEdit}
          open={openEdit}
          setOpen={setOpenEdit}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

type ReviewCardProps = {
  review: any;
  auth: any; // Define proper type for auth
  onEdit: (review: any) => void;
  onDelete: (reviewId: string) => void;
};

const ReviewCard = ({ review, auth, onEdit, onDelete }: ReviewCardProps) => (
  <Box mb={3}>
    <Stack flexDirection="row" gap={2} position="relative">
      <Stack
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "grey",
          color: "white",
          textTransform: "capitalize",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {review.userId?.name?.charAt(0)}
      </Stack>
      <Box>
        <Typography fontWeight="bold">{review.userId?.name}</Typography>
        <Rating value={review.rating} readOnly />
      </Box>
      {auth._id === review.userId?._id && (
        <Stack
          flexDirection="row"
          alignItems="center"
          position="absolute"
          right={0}
        >
          <IconButton onClick={() => onEdit(review)}>
            <EditIcon sx={{ fontSize: "20px" }} color="primary" />
          </IconButton>
          <IconButton onClick={() => onDelete(review._id)}>
            <DeleteIcon sx={{ fontSize: "20px" }} color="error" />
          </IconButton>
        </Stack>
      )}
    </Stack>
    <Typography variant="body2" mt={2} px={2}>
      {review.reviewDisc}
    </Typography>
  </Box>
);

export default Reviews;
