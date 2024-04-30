import React, { use, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AddGroupForm from "./addGroupeForm";
import AddGroup from "./addGroup";
import { getGis } from "@/lib/gis";
import { Gi } from "@prisma/client";
import DeleteGiForm from "./deleteGiForum";
import UpdateGiForm from "./updateGiForm";
import { unstable_noStore as noStore } from "next/cache";
import GiRow from "./giRow";

type GroupesListProps = {
  gis: any;
  secteurs: any;
  addresses: any;
};

const GroupesList = ({ gis, secteurs, addresses }: GroupesListProps) => {
  noStore();
  // const gisr = getGis();

  //console.log("GIS secteurs av  :", secteurs);
  // console.log("GIS  av  :", gis);

  return (
    <Card className="w-full ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-600 text-4xl">
            {"Les cellules d'impact ("}
            {gis.length}
            {")"}
          </CardTitle>
          <AddGroupForm />
        </div>
        <CardDescription className="text-neutral-600">
          {
            "Cette transaction affiche la liste de toutes les cellules d'impact connues dans le système"
          }
        </CardDescription>
      </CardHeader>
      {/*       <CardContent>
       */}{" "}
      <>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Table>
              <TableHeader className="px-0">
                <TableRow>
                  <TableHead className=" text-blue-600 font-semibold">
                    {"Cellule"}
                  </TableHead>
                  {/*                   <TableHead className=" text-teal-200 ">Pilote</TableHead>
                   */}{" "}
                  <TableHead className=" text-blue-600 font-semibold ">
                    Effectif
                  </TableHead>
                  <TableHead className=" text-blue-600 font-semibold ">
                    Adresse hôte
                  </TableHead>
                  <TableHead className=" text-blue-600 font-semibold max-md:hidden">
                    Secteur
                  </TableHead>
                  <TableHead className=" text-blue-600 font-semibold max-md:hidden">
                    Statut
                  </TableHead>
                  <TableHead className="text-right text-blue-600 font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gis.map((gi: any) => (
                  <GiRow
                    key={gi.id}
                    gi={gi}
                    secteurs={secteurs}
                    addresses={addresses}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
      {/*       </CardContent>
       */}{" "}
    </Card>
  );
};

export default GroupesList;
