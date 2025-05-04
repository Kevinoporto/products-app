import { Box, Heading, Container, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  const bg = useColorModeValue("white", "gray.700");
  return (
    <Box 
      position="fixed" top="0" left="0" w="100vw" h="100vh" 
      bg="rgba(0, 0, 0, 0.5)" display="flex" alignItems="center" justifyContent="center"
      zIndex="9999"
      onClick={onClose}
    >
      <Container maxW={"md"} onClick={(e)=>e.stopPropagation()}>
        <VStack padding={8}>
          <Box w={"full"} bg={bg} p={6} rounded={"lg"} shadow={"md"}> 
            <Heading as={"h1"} textAlign={"center"} mb={4} size={"3xl"}>
              {title}
            </Heading>
            {children}
          </Box>
        </VStack>
      </Container>
    </Box> 
    

  );
};

export default Modal;


