import { Container, Flex, Text, HStack, Button, Icon} from '@chakra-ui/react'
import { useColorMode } from './ui/color-mode';
import { FaPlus } from "react-icons/fa6";
import { LuMoon, LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';


const NavBar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        <Text
          fontSize={{base: "22", sm: "28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          style={{
            backgroundImage: "linear-gradient(to right, #00FFFF, #000FFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <Link 
            to={"/"}
          >Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <Icon as={FaPlus}></Icon>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <LuMoon/> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default NavBar