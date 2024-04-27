"use client";
import { Gi } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type SecteurRowProps = {
  secteurId: number;
  secteur: any;
  index: number;
};

const SecteurRow = ({ secteurId, secteur, index }: SecteurRowProps) => {
  const router = useRouter();
  return (
    <div
      className={
        secteur.gis.filter((gii: Gi) => gii.statut == "ACTIF").length < 1
          ? "pointer-events-none border text-red-600 border-white m-1 p-2 rounded-lg flex justify-between"
          : "hover:cursor-pointer hover:bg-black/10 border text-green-700 font-semibold bg-white border-neutral-600   m-1 p-2 rounded-lg flex justify-between"
      }
      onClick={() => router.push(`/secteurs/${secteurId}`)}
    >
      <span>
        <strong className="pr-2">{index + 1}</strong>
        {secteur.name}
      </span>
      <span>
        {" "}
        {secteur.gis.filter((gii: Gi) => gii.statut == "ACTIF").length}{" "}
        {"cellule(s) d'impact"}
      </span>
    </div>
  );
};

export default SecteurRow;
