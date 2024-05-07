import React from "react";
import { VStack, Box, Text, Button } from "@chakra-ui/react";
import { Spell } from "../types";

interface SpellListProps {
  spells: Spell[];
  setSelectedSpell: (spell: Spell) => void;
  toggleFavorite: (spell: Spell) => void;
}

const SpellList: React.FC<SpellListProps> = ({
  spells,
  setSelectedSpell,
  toggleFavorite,
}) => {
  return (
    <VStack align="stretch" spacing={4}>
      {spells.map((spell) => (
        <Box
          key={spell.index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          onClick={() => setSelectedSpell(spell)}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          boxShadow="md"
        >
          <Text fontSize="xl">{spell.name}</Text>
          <Text fontSize="sm">Level: {spell?.level}</Text>
          <Button
            size="sm"
            mt={2}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(spell);
            }}
          >
            {spell?.favorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default SpellList;
