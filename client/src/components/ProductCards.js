import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export default function ProductCards({
  chosenShop,
  products,
  ordersInCart,
  setOrdersInCart,
}) {
  const [productCards, setProducttCards] = useState([]);

  useEffect(() => {
    if (productCards.length === 0) {
      let productsCards = [];
      products.map(fastfood => {
        productsCards = [...productsCards, ...fastfood.products];
        return fastfood;
      });

      setProducttCards(productsCards);
    }

    if (chosenShop && productCards.length !== 0) {
      const productsCards = products.find(
        fastfood => fastfood.title === chosenShop,
      );

      setProducttCards(productsCards.products);
    }
  }, [products, productCards.length, chosenShop]);

  return (
    <Container maxWidth="md" component="div">
      <Grid container spacing={5} alignItems="flex-end">
        {productCards.map(product => (
          // Enterprise card is full width at sm breakpoint
          <Grid item key={product.title} xs={12} sm={6} md={4} lg={6}>
            <Card>
              <CardContent>
                <CardMedia component="img" image={product.img} alt="random" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h4" color="text.primary">
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${product.price}
                  </Typography>
                </Box>
              </CardContent>
              <CardAction>
                <Button
                  variant="contained"
                  align="center"
                  onClick={() => setOrdersInCart([...ordersInCart, product])}
                >
                  Add to Cart
                </Button>
              </CardAction>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const CardAction = styled(CardActions)({
  justifyContent: 'flex-end',
});