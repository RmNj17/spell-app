import React from "react";
import HomePage from "./pages/HomePage";
import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  );
};

export default App;
