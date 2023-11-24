import  { Dispatch, SetStateAction } from "react";
import {
  Box,
  Typography,
  Rating,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";


type Props = {
  selectedRatings: number[];
  setSelectedRatings:Dispatch<SetStateAction<number[]>>;
  priceValue:number[]
  setPriceValue:Dispatch<SetStateAction<number|number[]>>
};

const SearchFilters = ({selectedRatings,setSelectedRatings,priceValue,
setPriceValue}: Props) => {
    const handleCheckboxChange = (value: number) => {
      const index = selectedRatings.indexOf(value);
      if (index === -1) {
        setSelectedRatings([...selectedRatings, value]);
      } else {
        setSelectedRatings(
          selectedRatings.filter((rating: number) => rating !== value)
        );
      }
    };

     const handleChange = (event: Event, newValue: number | number[]) => {
       setPriceValue(newValue);
       console.log(event);
     };
const valuetext=(value: number)=> {
  return `${value} EGP`;
}

  return (
    <>
      <Box mb={4}>
        <Typography fontWeight="bold" fontSize="20px" mb={2}>
          Price
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={1}
          step={200}
          max={50000}
          color="secondary"
        />
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize="20px" mb={2}>
          Ratings
        </Typography>
        <FormGroup>
          {[5, 4, 3, 2, 1].map((rating) => (
            <FormControlLabel
              key={rating}
              control={
                <Checkbox
                color="secondary"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleCheckboxChange(rating)}
                />
              }
              label={<Rating readOnly value={rating} />}
            />
          ))}
        </FormGroup>
      </Box>
    </>
  );
};

export default SearchFilters;
