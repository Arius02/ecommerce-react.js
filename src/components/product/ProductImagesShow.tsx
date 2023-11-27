import { Dispatch, SetStateAction } from "react";
import { Stack } from "@mui/material";

type Props = {
  coverImage: { secure_url: string };
  images: {
    secure_url: string;
    public_id: string;
  }[];
  imgToShow: string;
  setImgToshow: Dispatch<SetStateAction<string>>;
};

const ProductImagesShow = ({
  coverImage,
  images,
  imgToShow,
  setImgToshow,
}: Props) => {
  return (
    <Stack flexDirection={{ md: "row", xs: "column-reverse" }}>
      <Stack
        gap={5}
        flexDirection={{ md: "column", xs: "row" }}
        justifyContent={"center"}
      >
        <Stack
          justifyContent={"center"}
          alignItems="center"
          sx={{
            width: "70px",
            height: "70px",
            overflow: "hidden",
            borderRadius: "5px",
            cursor: "pointer",
            border: imgToShow == coverImage.secure_url ? "1px pink solid" : 0,
          }}
          onClick={() => setImgToshow(coverImage.secure_url || "")}
        >
          <img
            src={coverImage.secure_url}
            style={{ width: "70%", height: "90%" }}
          />
        </Stack>
        {images.map((image: any) => (
          <Stack
            key={image.public_id}
            justifyContent={"center"}
            alignItems="center"
            sx={{
              width: "70px",
              height: "70px",
              overflow: "hidden",
              borderRadius: "5px",
              cursor: "pointer",
              border: imgToShow == image.secure_url ? "1px pink solid " : 0,
            }}
            border={1}
            borderColor={"pink"}
            onClick={() => {
              console.log(imgToShow);
              setImgToshow(image.secure_url);
            }}
          >
            <img
              src={image.secure_url}
              style={{ width: "50%", height: "90%" }}
            />
          </Stack>
        ))}
      </Stack>
      <Stack
        justifyContent={"center"}
        alignItems="center"
        width={"300px"}
        maxHeight="500px"
        mx="auto"
        mb={4}
      >
        <img
          src={imgToShow}
          style={{ width: "80%" }}
          loading="lazy"
        />
      </Stack>
    </Stack>
  );
};

export default ProductImagesShow;
