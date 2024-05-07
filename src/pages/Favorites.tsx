import { SimpleGrid } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface Favorite {
  index: string;
}

const Favorites = () => {
  const navigate = useNavigate();
  const favorites: Favorite[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <span className="text-3xl text-center flex justify-center items-center gap-10">
        <FaLongArrowAltLeft
          onClick={goBack}
          className="cursor-pointer text-blue-800"
          size={36}
        />
        Favorites List
      </span>
      {favorites.length === 0 ? (
        <p className="mt-4">Oops ! No favorites list found...</p>
      ) : (
        <SimpleGrid columns={[1, 3, 4, 6]} spacing={6} marginTop={4}>
          {favorites.map((favorite: Favorite) => {
            return (
              <div
                key={favorite.index}
                className="p-3 hover:bg-black hover:text-white shadow-xl rounded-lg bg-sky-200 flex flex-col justify-center font-mono items-center gap-1"
              >
                <li className="list-none" key={favorite.index}>
                  <Link to={`/spell/${favorite.index}`}>{favorite.index}</Link>
                </li>
              </div>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default Favorites;
