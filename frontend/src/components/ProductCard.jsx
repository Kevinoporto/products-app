import { Box, Image, Heading, Text, HStack, IconButton, VStack, Input, Button } from "@chakra-ui/react";
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
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const [modalOpen, setModalOpen ] = useState(false);
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
    await updateProduct(productId, updatedProduct);
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
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
              ${product.price}
            </Text>
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
                onClick={()=>handleDeleteProduct(product._id)}>
                <RiDeleteBin6Fill />
              </IconButton>
            </HStack>
          </Box>
      </Box>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Editar Producto: ${product.name}`}>
        <VStack>
          <Input placeholder="Product Name" name="name" value={updatedProduct.name} 
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
          />
          <Input placeholder="Price" name="price" type="number" value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
          />
          <Input placeholder="Image URL" name="image" value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
          />
          <HStack mt={"8px"}>
            <Button colorPalette={"teal"} onClick={()=>handleUpdateProduct(product._id, updatedProduct)}> Update </Button>
            <Button colorPalette={"red"} onClick={()=>setModalOpen(false)}> Cancel </Button>
          </HStack>
        </VStack> 
      </Modal>
    </>
  )
}
export default ProductCard;