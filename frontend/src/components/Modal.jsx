import { Box, Heading } from "@chakra-ui/react";
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
      <Box 
        bg={bg} p="6" borderRadius="md" minW="300px" boxShadow="lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Heading size={"2xl"} mb={"24px"}>
          {title}
        </Heading>
        {children}
      </Box>
    </Box>
  );
};

export default Modal;


