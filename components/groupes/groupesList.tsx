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
};

const GroupesList = ({ gis, secteurs }: GroupesListProps) => {
  noStore();
  // const gisr = getGis();

  //console.log("GIS secteurs av  :", secteurs);
  // console.log("GIS  av  :", gis);

  return (
    <Card className="w-full bg-[#1b4c48] text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {"Les groupes d'impact ("}
            {gis.length}
            {")"}
          </CardTitle>
          <AddGroupForm />
        </div>
        <CardDescription className="text-yellow-400">
          {
            "Cette transaction affiche la liste de tous les groupes d'impact connus dans le système"
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
                  <TableHead className=" text-teal-200 ">
                    {"Grp d'Impact"}
                  </TableHead>
                  <TableHead className=" text-teal-200 max-md:hidden">
                    Pilote
                  </TableHead>
                  {/*                   <TableHead className=" text-teal-200 ">Pilote</TableHead>
                   */}{" "}
                  <TableHead className=" text-teal-200 ">Effectif</TableHead>
                  <TableHead className="text-right text-teal-200">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gis.map((gi: any) => (
                  <GiRow key={gi.id} gi={gi} secteurs={secteurs} />
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
