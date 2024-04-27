"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import DeleteGiForm from "./deleteGiForum";
import UpdateGiForm from "./updateGiForm";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

type GiRowProps = {
  gi: any;
  secteurs: any;
  addresses: any;
};

const GiRow = ({ gi, secteurs, addresses }: GiRowProps) => {
  console.log("GI:", gi);

  const router = useRouter();
  return (
    <TableRow key={gi.id}>
      <TableCell className="font-medium">
        <p>{gi.name}</p>
        <p className="md:hidden text-xs font-thin">{gi?.secteur?.name}</p>
      </TableCell>
      {/*       <TableCell>{gi.name}</TableCell>
       */}{" "}
      <TableCell className="">{gi?.id}</TableCell>
      {gi?.address ? (
        <TableCell className="">
          {gi?.address.street}, {gi?.address.number} {gi?.address.postalCode}{" "}
          {gi?.address.city}
        </TableCell>
      ) : (
        <TableCell className=""></TableCell>
      )}
      <TableCell className="max-md:hidden">{gi?.secteur?.name}</TableCell>
      <TableCell className="max-md:hidden ">
        <span
          className={
            gi.statut == "ACTIF"
              ? "bg-green-600 text-white rounded-lg p-2 text-xs"
              : gi.statut == "INACTIF"
              ? "bg-red-600 text-white rounded-lg p-2 text-xs"
              : "bg-orange-600 text-white rounded-lg p-2 text-xs"
          }
        >
          {gi.statut}
        </span>
      </TableCell>
      <TableCell className="flex justify-end items-center gap-4 ">
        {/*         <Button onClick={() => router.push(`/gis/${gi.id}`)}>Consulter</Button>
         */}{" "}
        <DeleteGiForm gi={gi} />
        <UpdateGiForm gi={gi} secteurs={secteurs} addresses={addresses} />
        {/*         <Link href={`/new/${gi.id}`}>
          <Button>Rejoindre</Button>
        </Link> */}
      </TableCell>
    </TableRow>
  );
};

export default GiRow;
