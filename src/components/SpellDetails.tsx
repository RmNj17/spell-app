import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchSpellDetail } from "../api";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Spell {
  name: string;
  desc: string[];
  higher_level?: string[];
  range: string;
  components: string[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: string;
  attack_type?: string;
  school?: { name: string };
  classes: { name: string }[];
  subclasses: { name: string }[];
}

export default function SpellDetail() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { spellIndex = "" } = useParams<{ spellIndex?: string }>();
  const {
    data: spell,
    isLoading,
    isError,
  } = useQuery<Spell>(
    ["spell", spellIndex],
    () => fetchSpellDetail(spellIndex),
    {
      enabled: !!spellIndex,
      staleTime: Infinity,
    }
  );

  if (!spellIndex || isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Flex>
    );
  }

  if (isError || !spell) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box className="flex justify-center" fontFamily="monospace">
      <div className="text-center shadow-2xl p-3 rounded-md flex flex-col max-w-[600px]">
        <span className="text-3xl font-extrabold">
          <FaLongArrowAltLeft
            onClick={goBack}
            className="cursor-pointer text-blue-800"
            size={36}
          />
          {spell.name}
        </span>
        <p className="border shadow-xl rounded-md p-2 mb-2">
          <strong>Description:</strong> {spell?.desc.join("\n\n")}
        </p>
        <div className="shadow-xl rounded-2xl bg-black text-white font-medium px-8 w-fit mx-auto ">
          <p>
            <strong>Higher Levels:</strong>{" "}
            {spell?.higher_level?.join("\n\n") || "N/A"}
          </p>
          <p>
            <strong>Range:</strong> {spell?.range}
          </p>
          <p>
            <strong>Components:</strong> {spell?.components.join(", ")}
          </p>
          <p>
            <strong>Material:</strong> {spell?.material}
          </p>
          <p>
            <strong>Ritual:</strong> {spell?.ritual ? "Yes" : "No"}
          </p>
          <p>
            <strong>Duration:</strong> {spell?.duration}
          </p>
          <p>
            <strong>Concentration:</strong> {spell?.concentration ? "Yes" : "No"}
          </p>
          <p>
            <strong>Casting Time:</strong> {spell?.casting_time}
          </p>
          <p>
            <strong>Level:</strong> {spell?.level}
          </p>
          <p>
            <strong>Attack Type:</strong> {spell?.attack_type || "N/A"}
          </p>
          <p>
            <strong>School:</strong> {spell?.school?.name || "N/A"}
          </p>
          <p>
            <strong>Classes:</strong>{" "}
            {spell.classes.map((cls) => cls?.name).join(", ")}
          </p>
          <p>
            <strong>Subclasses:</strong>{" "}
            {spell.subclasses.map((subclass) => subclass?.name).join(", ")}
          </p>
        </div>
      </div>
    </Box>
  );
}
