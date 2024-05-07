import React from "react";
import { VStack, Box, Text, Button } from "@chakra-ui/react";
import { Spell } from "../types";

interface FavoritesProps {
  favorites: Spell[];
  setSelectedSpell: (spell: Spell) => void;
  toggleFavorite: (spell: Spell) => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  setSelectedSpell,
  toggleFavorite,
}) => {
  return (
    <VStack align="stretch" spacing={4}>
      <Text fontWeight="bold">Favorites</Text>
      {favorites.map((spell) => (
        <Box
          key={spell.index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          onClick={() => setSelectedSpell(spell)}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
        >
          <Text fontSize="xl">{spell?.name}</Text>
          <Text fontSize="sm">Level: {spell?.level}</Text>
          <Button
            size="sm"
            mt={2}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(spell);
            }}
          >
            Remove from Favorites
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Favorites;
