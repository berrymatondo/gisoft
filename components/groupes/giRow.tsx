"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import DeleteGiForm from "./deleteGiForum";
import UpdateGiForm from "./updateGiForm";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type GiRowProps = {
  gi: any;
  secteurs: any;
};

const GiRow = ({ gi, secteurs }: GiRowProps) => {
  const router = useRouter();
  return (
    <TableRow key={gi.id}>
      <TableCell className="font-medium">
        <p>{gi.name}</p>
        <p className="md:hidden text-xs font-thin">{gi?.secteur?.name}</p>
      </TableCell>
      <TableCell className="max-md:hidden">{gi?.name}</TableCell>
      {/*       <TableCell>{gi.name}</TableCell>
       */}{" "}
      <TableCell className="">{gi?.id}</TableCell>
      <TableCell className="flex justify-end items-center gap-4 ">
        {/*         <Button onClick={() => router.push(`/gis/${gi.id}`)}>Consulter</Button>
         */}{" "}
        <DeleteGiForm gi={gi} />
        <UpdateGiForm gi={gi} secteurs={secteurs} />
      </TableCell>
    </TableRow>
  );
};

export default GiRow;
