import React, { useEffect } from 'react';
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"6xl"} py={12}>
      <VStack padding={8}> 
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          style={{
            backgroundImage: "linear-gradient(to right, #00FFFF, #000FFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Current Products
        </Text>
        
        <SimpleGrid 
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          gap={"40px"}
          w={"full"}
        >
          {products.map((product)=>(
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && 
        <Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}>
            No Products Found {" "}
            <Link to={"/create"}>
              <Text as={"span"} color={"blue.500" } _hover={{textDecoration:"underline"}}>Create Product</Text>
            </Link>
        </Text>}
      </VStack>
    </Container>
  )
}

export default HomePage