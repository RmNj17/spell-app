import React, { useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

interface Favorite {
  index: string;
  level: string;
}

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState<Favorite[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const sortFavoritesAlphabetically = () => {
    const sortedFavorites = [...favorites].sort((a, b) =>
      a.index.localeCompare(b.index)
    );
    setFavorites(sortedFavorites);
  };

  useEffect(() => {
    sortFavoritesAlphabetically();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleDelete = (indexToDelete: string) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.index !== indexToDelete
    );
    setFavorites(updatedFavorites);
    toast.success("Removed from the favorites list");
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Toaster position="top-right" />
      <span className="text-3xl text-center flex justify-center items-center gap-10">
        <FaLongArrowAltLeft
          onClick={goBack}
          className="cursor-pointer text-blue-800"
          size={36}
        />
        Favorites List
      </span>
      {favorites.length === 0 ? (
        <p className="mt-4">Oops! No favorites list found...</p>
      ) : (
        <SimpleGrid columns={[1, 3, 4, 6]} spacing={6} marginTop={4}>
          {favorites.map((favorite: Favorite) => {
            return (
              <div
                key={favorite.index}
                className="p-3 hover:bg-black hover:text-white shadow-xl rounded-lg bg-sky-200 flex flex-col justify-center font-mono items-center gap-2"
              >
                <li className="list-none" key={favorite.index}>
                  <Link to={`/spell/${favorite.index}`}>
                    <Box fontSize="xl" fontWeight="semibold" textAlign="center">
                      {favorite.index}
                    </Box>
                    <Box fontSize="sm" fontWeight="light" textAlign="center">
                      Level: {favorite?.level}
                    </Box>
                  </Link>
                </li>
                <MdDelete
                  size={26}
                  className="hover:text-red-800 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(favorite.index)}
                />
              </div>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default Favorites;
