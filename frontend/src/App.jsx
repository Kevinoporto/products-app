import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { Toaster } from "./components/ui/toaster";

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </Box>
  )
}

export default App
