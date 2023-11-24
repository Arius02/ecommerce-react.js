import { Box, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import useMultiQueryHook from '../../hooks/useMultiQueryHook';
import { UseMutateFunction } from '@tanstack/react-query';

type Props = {
  subCategoryId: string;
  AddToCart: UseMutateFunction<any, any, any, unknown>;
  cart:any
};

const RelatedProducts = ({subCategoryId,AddToCart,cart}: Props) => {
      const { data: relatedProducts, isPending } =
        useMultiQueryHook({
          queries: ["getRelatedProducts"],
          url: `/product?subCategory.subCategoryId[eq]=${subCategoryId}&size=4`,
          selectedProp: "products",
        });
     
  return (
    <Box mt={3}>
      <Typography fontWeight={"bold"} fontSize={{ md: "30px", xs: "22px" }}>
        Related Products
      </Typography>
      {relatedProducts && (
        <Grid container rowGap={2} mt={2}>
          {relatedProducts.map((product: any) => (
            <Grid lg={3} md={4} sm={6} xs={12}>
              <Box px={2}>
                <ProductCard product={product} key={product._id} cart={cart} AddToCart={AddToCart}/>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default RelatedProducts