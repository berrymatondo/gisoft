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
import AddSecteurForm from "./addSecteurForm";

const invoices = [
  {
    invoice: "Forest_1",
    secteur: "Forest",
    totalAmount: "32",
    referent: "Roston",
  },
  {
    invoice: "Forest_2",
    secteur: "Anderlecht",
    totalAmount: "22",
    referent: "Marylène",
  },
  {
    invoice: "Forest_3",
    secteur: "Woluwe",
    totalAmount: "31",
    referent: "Bery",
  },
  {
    invoice: "Forest_4",
    secteur: "Saint-Giles",
    totalAmount: "26",
    referent: "Francine",
  },
  {
    invoice: "Forest_5",
    secteur: "Ganshoren",
    totalAmount: "44",
    referent: "Coco",
  },
];

const SecteursList = () => {
  return (
    <Card className="w-full bg-[#1b4c48] text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{"Liste des secteurs"}</CardTitle>
          <AddSecteurForm />
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
                    <TableHead>Secteur</TableHead>
                    <TableHead>{"Référent"}</TableHead>
                    <TableHead className="text-right">Groupes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.secteur}
                      </TableCell>
                      <TableCell>{invoice.referent}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
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

export default SecteursList;
