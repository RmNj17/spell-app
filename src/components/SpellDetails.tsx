/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { Spell } from "../types";

interface SpellDetailsProps {
  spell: Spell | null;
}

const SpellDetails: React.FC<SpellDetailsProps> = ({ spell }) => {
  const [spellDetails, setSpellDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpellDetails = async () => {
      if (spell) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://www.dnd5eapi.co${spell.url}`
          );
          setSpellDetails(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching spell details:", error);
          setLoading(false);
        }
      } else {
        // If no spell is selected, reset spell details
        setSpellDetails(null);
      }
    };

    fetchSpellDetails();
  }, [spell]);

  return (
    <Box>
      {loading ? (
        <p>Loading spell details...</p>
      ) : spellDetails ? (
        <div>
          <h2>{spellDetails.name}</h2>
          <p>
            <strong>Description:</strong> {spellDetails.desc.join("\n\n")}
          </p>
          <p>
            <strong>Higher Levels:</strong>{" "}
            {spellDetails.higher_level?.join("\n\n")}
          </p>
          <p>
            <strong>Range:</strong> {spellDetails.range}
          </p>
          <p>
            <strong>Components:</strong> {spellDetails.components.join(", ")}
          </p>
          <p>
            <strong>Material:</strong> {spellDetails.material}
          </p>
          <p>
            <strong>Ritual:</strong> {spellDetails.ritual ? "Yes" : "No"}
          </p>
          <p>
            <strong>Duration:</strong> {spellDetails.duration}
          </p>
          <p>
            <strong>Concentration:</strong>{" "}
            {spellDetails.concentration ? "Yes" : "No"}
          </p>
          <p>
            <strong>Casting Time:</strong> {spellDetails.casting_time}
          </p>
          <p>
            <strong>Level:</strong> {spellDetails.level}
          </p>
          <p>
            <strong>Attack Type:</strong> {spellDetails.attack_type}
          </p>
          <p>
            <strong>School:</strong> {spellDetails.school?.name}
          </p>
          <p>
            <strong>Classes:</strong>{" "}
            {spellDetails.classes.map((cls: any) => cls.name).join(", ")}
          </p>
          <p>
            <strong>Subclasses:</strong>{" "}
            {spellDetails.subclasses
              .map((subclass: any) => subclass.name)
              .join(", ")}
          </p>
        </div>
      ) : (
        <p>Please select a spell to view details</p>
      )}
    </Box>
  );
};

export default SpellDetails;
