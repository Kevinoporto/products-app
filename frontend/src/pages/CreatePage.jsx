import React, { useState } from 'react'
import { Container, VStack, Heading, Box, Input, InputGroup, Button } from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from '../components/ui/toaster';
import { IoMdClose } from "react-icons/io";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const {success, message } = await createProduct(newProduct);
    if(!success){
      console.log(message);
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
        action: {
          label: <IoMdClose />,
          onClick: () => toaster.dismiss()
        }
      });
    }else{
      toaster.create({
        title: "Success",
        description: message,
        type:"success",
        duration: 5000,
        action: {
          label: <IoMdClose />,
          onClick: () => toaster.dismiss()
        }
      });
    };
    setNewProduct({name: "", price: "", image: ""});
  }
  return (
    <Container maxW={"md"}>
      <VStack padding={8}>
        <Heading as={"h1"} textAlign={"center"} mb={8} size={"3xl"}>
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack padding={4}> 
            <Input 
              placeholder='Product Name'
              variant="subtle"
              colorPalette={"teal"}
              name='name'
              value={newProduct.name}
              onChange={(e) => { setNewProduct({...newProduct, name: e.target.value })}} />
            <InputGroup startElement="$">
              <Input 
                placeholder='Price'
                variant="subtle"
                colorPalette={"teal"}
                name='price'
                type='number'
                value={newProduct.price}
                onChange={(e) => { setNewProduct({...newProduct, price: e.target.value })}} />
            </InputGroup>
            <Input 
              placeholder='Image URL'
              variant="subtle"
              colorPalette={"teal"}
              name='image'
              value={newProduct.image}
              onChange={(e) => { setNewProduct({...newProduct, image: e.target.value })}} />

            <Button colorPalette={"teal"} onClick={handleAddProduct}> Add Product </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage