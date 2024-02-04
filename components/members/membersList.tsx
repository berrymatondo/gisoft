"use client";
import React, { useState } from "react";
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
import { Person, Secteur } from "@prisma/client";

type MembersListProps = {
  members: any;
};

const MembersList = ({ members }: MembersListProps) => {
  return (
    <Card className="w-full bg-[#1b4c48] text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {"Liste des membres ("}
            {members.length}
            {")"}
          </CardTitle>
          {/*           <AddSecteurForm />
           */}{" "}
        </div>
        <CardDescription className="text-yellow-400">
          {
            "Cette transaction affiche la liste de tous les secteurs des groupes d'impact"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Table>
                {/*                   <TableCaption>A list of your recent invoices.</TableCaption>
                 */}{" "}
                <TableHeader>
                  <TableRow>
                    <TableHead className=" text-teal-200">Secteur</TableHead>
                    <TableHead className=" text-teal-200">
                      {"Référent"}
                    </TableHead>

                    <TableHead className="text-right text-teal-200">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member: Person) => (
                    <TableRow
                      key={member.id}
                      onClick={() => console.log("ici:")}
                    >
                      <TableCell className="font-medium">
                        {member.firstname}
                      </TableCell>
                      <TableCell>{member.lastname}</TableCell>
                      <TableCell className="flex justify-end items-center gap-4 ">
                        {/*                         <DeleteSecteurForm secteur={secteur} />

                        <UpdateSecteurForm secteur={secteur} /> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/*                 <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">157</TableCell>
                  </TableRow>
                </TableFooter> */}
              </Table>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default MembersList;
