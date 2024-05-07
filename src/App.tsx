import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import SpellList from "./pages/SpellList";
import SpellDetail from "./components/SpellDetails";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Header />
        <Box p={5}>
          <Routes>
            <Route path="/" element={<SpellList />} />
            <Route path="/spell/:spellIndex" element={<SpellDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}
