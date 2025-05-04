import { Box, Image, Heading, Text, HStack, IconButton, VStack, Input, Button, InputGroup } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from '../components/ui/toaster';
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Modal from "./Modal";

const ProductCard = ({product}) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("gray.300", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const [modalOpen, setModalOpen ] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] =useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product); 

  const handleDeleteProduct = async (productId) => {
    const {success, message} = await deleteProduct(productId);
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
        action: {
          label: <IoMdClose />,
          onClick: () => toaster.dismiss()
        }
      })
    }else{
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 5000,
        action: {
          label: <IoMdClose />,
          onClick: () => toaster.dismiss()
        }
      })
    }
  }

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const {success, message} = await updateProduct(productId, updatedProduct);
    if(!success){
      setUpdatedProduct(product);
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
        action: {
          label: <IoMdClose />,
          onClick: () => toaster.dismiss()
        }
      })
    }else{
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 5000,
        action: {
          label: <IoMdClose />,
          onClick: () => toaster.dismiss()
        }
      })
    }
    setModalOpen(false);
  }

  return(
    <>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
        >
          <Image src={product.image} alt={product.name} h={48} w={"full"} />
          <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
              {product.name}
            </Heading>
            <HStack fontSize={"xl"} mb={4}>
              <Text as={"span"} color={"gray.500"} textDecoration={"line-through"} fontSize={"lg"}>
                ${product.price}
              </Text>
              <Text fontWeight={"bold"} color={textColor}>
                ${(product.price-product.price*0.15).toFixed(2)}
              </Text>
            </HStack>
            
            <HStack padding={2}>
              <IconButton 
                bg={"blue.400"} 
                rounded={"md"} 
                _hover={{bg: "blue.600", transform: "scale(1.1)"}}
                transition={"all 0.2s ease-in-out"}
                title="Edit Product"
                onClick={()=>setModalOpen(true)}>
                <FaEdit />
              </IconButton>
              <IconButton 
                bg={"red.400"} 
                rounded={"md"}
                _hover={{bg: "red.600", transform: "scale(1.1)"}}
                transition={"all 0.2s ease-in-out"}
                title="Delete Product"
                onClick={()=>setModalDeleteOpen(true)}>
                <RiDeleteBin6Fill />
              </IconButton>
            </HStack>
          </Box>
      </Box>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={"Update Product"}>
        
          <VStack padding={4}>
            <Input 
              placeholder="Product Name" 
              name="name" 
              value={updatedProduct.name}
              variant={"subtle"}
              colorPalette={"teal"} 
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
            />
            <InputGroup startElement="$">
              <Input 
                placeholder="Price" 
                name="price" 
                type="number" 
                value={updatedProduct.price}
                variant={"subtle"}
                colorPalette={"teal"}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
              />
            </InputGroup>
            <Input 
              placeholder="Image URL" 
              name="image" 
              value={updatedProduct.image}
              variant={"subtle"}
              colorPalette={"teal"}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
            />
            <HStack mt={"8px"}>
              <Button colorPalette={"blue"} onClick={()=>handleUpdateProduct(product._id, updatedProduct)}> Update </Button>
              <Button colorPalette={"gray"} onClick={()=>setModalOpen(false)}> Cancel </Button>
            </HStack>
          </VStack>
      </Modal>
      <Modal isOpen={modalDeleteOpen} onClose={()=>setModalDeleteOpen(false)} title={"Delete Product"}>
        <VStack padding={4}>
          <Text textStyle={"md"}>Are you sure you want to delete: {" "}
            <Text as={"span"} fontWeight={"bold"} color={"blue.500"}>{product.name}</Text>?
          </Text>
          <HStack mt={"8px"}>
            <Button colorPalette={"red"} onClick={()=>handleDeleteProduct(product._id)}> Delete </Button>
            <Button colorPalette={"gray"} onClick={()=>setModalDeleteOpen(false)}> Cancel </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  )
}
export default ProductCard;