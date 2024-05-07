import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Box mb={8} textAlign="center">
      <Text fontSize="4xl">Spell Listing App</Text>
    </Box>
  );
};

export default Header;
