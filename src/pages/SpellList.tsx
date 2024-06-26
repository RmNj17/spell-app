import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  SimpleGrid,
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { fetchSpells } from "../api";
import { useEffect, useState, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import PageHelmet from "../components/PageHemlet";
import view from "../assets/view.png";
interface Spell {
  index: string;
  name: string;
  level: string;
}

export default function SpellList() {
  const {
    data: spells,
    isLoading,
    isError,
  } = useQuery<Spell[]>("spells", fetchSpells, {
    staleTime: Infinity,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Spell[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const filteredSpells =
    spells &&
    spells.filter((spell) =>
      spell.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFavoriteClick = (spell: Spell) => {
    const index = favorites.findIndex(
      (favorite) => favorite.index === spell.index
    );
    if (index === -1) {
      toast.dismiss();
      toast.success("Added to the favorites list");
      const newFavorites = [...favorites, spell];
      setFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      toast.dismiss();
      toast.success("Removed from the favorites list");
      setFavorites(newFavorites);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Box>
      <PageHelmet title="All Lists" />
      <Toaster position="top-right" />
      <div className="flex mb-4 justify-center gap-3 items-center lg:flex-row md:flex-row flex-col">
        <input
          type="text"
          className="p-3 shadow-lg rounded-2xl shadow-blue-300 font-mono w-full lg:w-1/3"
          placeholder="Search spells...🔍"
          value={searchQuery}
          onChange={handleSearch}
        />

        <Link to="/favorites">
          <Button fontFamily="monospace">View Your Favorite Lists</Button>
        </Link>
      </div>
      {isLoading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : isError ? (
        <Text>Error fetching data</Text>
      ) : filteredSpells?.length === 0 ? (
        <Text fontFamily="monospace" fontSize="xl">
          Oops! No search results found.😭😭
        </Text>
      ) : (
        <SimpleGrid columns={[1, 3, 4, 6]} spacing={6}>
          {filteredSpells?.map((spell: Spell) => (
            <div
              key={spell.index}
              className="p-3 hover:bg-black hover:text-white shadow-xl rounded-lg bg-sky-200 flex flex-col justify-center font-mono items-center gap-1"
            >
              <>
                <Box fontSize="xl" fontWeight="semibold" textAlign="center">
                  {spell.name}
                </Box>
                <Box fontSize="sm" fontWeight="light" textAlign="center">
                  Level:{spell.level}
                </Box>
              </>

              <div className="flex gap-5 mt-1">
                <FaHeart
                  size={26}
                  className={`cursor-pointer ${
                    favorites.findIndex(
                      (favorite) => favorite.index === spell.index
                    ) !== -1 && "text-red-500"
                  }`}
                  onClick={() => handleFavoriteClick(spell)}
                />

                <Link to={`/spell/${spell.index}`}>
                  <Tooltip label="View more">
                    <img src={view} width={24} />
                  </Tooltip>
                </Link>
              </div>
            </div>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
