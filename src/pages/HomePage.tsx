import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Spinner,
  Input,
} from "@chakra-ui/react";
import SpellList from "../components/SpellList";
import SpellDetails from "../components/SpellDetails";
import Favorites from "../components/Favorites";
import { Spell } from "../types";
import axios from "axios";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [favorites, setFavorites] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchSpells();
    loadFavorites();
  }, []);

  const fetchSpells = async () => {
    try {
      const response = await axios.get("https://www.dnd5eapi.co/api/spells");
      setSpells(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching spells:", error);
    }
  };

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const toggleFavorite = (spell: Spell) => {
    const isFavorite = favorites.some((fav) => fav.index === spell.index);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.index !== spell.index
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, spell]);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredSpells = spells.filter((spell) =>
    spell.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Header />
      <Grid templateColumns="repeat(6, 1fr)" gap={8}>
        <GridItem colSpan={2}>
          <Input
            placeholder="Search spells..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={4}
          />
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <SpellList
              spells={filteredSpells}
              setSelectedSpell={setSelectedSpell}
              toggleFavorite={toggleFavorite}
            />
          )}
        </GridItem>
        <GridItem
          colSpan={2}
          position="sticky"
          top={0}
          maxHeight="calc(100vh - 100px)"
          overflowY="auto"
        >
          {selectedSpell ? (
            <SpellDetails spell={selectedSpell} />
          ) : (
            <Box>
              <h2>Please select a spell to view details</h2>
            </Box>
          )}
        </GridItem>
        <GridItem
          colSpan={2}
          position="sticky"
          top={0}
          maxHeight="calc(100vh - 100px)"
          overflowY="auto"
        >
          <Favorites
            favorites={favorites}
            setSelectedSpell={setSelectedSpell}
            toggleFavorite={toggleFavorite}
          />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default HomePage;
