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
import AddGroupForm from "./addGroupeForm";

const invoices = [
  {
    invoice: "Forest_1",
    paymentStatus: "Forest",
    totalAmount: "32",
    paymentMethod: "Roston",
  },
  {
    invoice: "Forest_2",
    paymentStatus: "Forest",
    totalAmount: "22",
    paymentMethod: "Marylène",
  },
  {
    invoice: "Forest_3",
    paymentStatus: "Forest",
    totalAmount: "31",
    paymentMethod: "Bery",
  },
  {
    invoice: "Forest_4",
    paymentStatus: "Forest",
    totalAmount: "26",
    paymentMethod: "Francine",
  },
  {
    invoice: "Forest_5",
    paymentStatus: "Forest",
    totalAmount: "44",
    paymentMethod: "Coco",
  },
];

const GroupesList = () => {
  return (
    <Card className="w-full bg-[#1b4c48] text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{"Les groupes d'impact"}</CardTitle>
          <AddGroupForm />
        </div>
        <CardDescription className="text-yellow-400">
          {
            "Cette transaction affiche la liste de tous les groupes d'impact connus dans le système"
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
                    <TableHead className="w-[100px]">Groupe</TableHead>
                    <TableHead>Secteur</TableHead>
                    <TableHead>Pilote</TableHead>
                    <TableHead className="text-right">Effectif</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">157</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default GroupesList;
