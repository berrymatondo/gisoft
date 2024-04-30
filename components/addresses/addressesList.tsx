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
import { Address, Person, Secteur } from "@prisma/client";

import { useForm } from "react-hook-form";
import AddressRow from "./addressRow";
import AddAddressForm from "./addAddressForm";
import Image from "next/image";
import bgImage from "../../public/add.png";

type AddressesListProps = {
  addresses: any;
};

const AddressesList = ({ addresses }: AddressesListProps) => {
  /*     <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
    <CardHeader className="bg-gradient-to-br  from-black/60 to-black/10 h-[200px] relative max-sm:p-2  m-1 rounded-md overflow-hidden">
      <div className=" absolute top-0 left-0 -z-10">
        <Image
          src={bgImage}
          alt="background"
          placeholder="blur"
          quality={100}

 
        />
      </div>

      <div className="flex justify-between items-center">
        <CardTitle className="text-white text-2xl font-semibold">
          {"Trouver une cellule d'impact"}
        </CardTitle>
      </div>
      <CardDescription className="text-yellow-200 font-normal">
        {
          "Cette transaction permet de trouver une cellule d'impact sur base de son secteur (commune, ville, ...)"
        }
      </CardDescription>
    </CardHeader> */

  return (
    <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
      <CardHeader className="bg-gradient-to-br  from-black/90 to-black/5 h-[200px] relative max-sm:p-2  m-1 rounded-md overflow-hidden">
        <div className=" absolute top-0 left-0 -z-10">
          <Image
            src={bgImage}
            alt="background"
            placeholder="blur"
            quality={100}
            /*           style={{
            width: "100px",
          }} */
            /*           className="absolute right-0 rounded-lg"
             */
          />
        </div>
        <div className="flex justify-between items-center ">
          <CardTitle className="text-white text-4xl md:text-5xl">
            {"Liste des adresses hôtes ("}
            {addresses.length}
            {")"}
          </CardTitle>
        </div>
        <CardDescription className="text-yellow-200 md:text-lg">
          {
            "Cette transaction affiche la liste de toutes les adresdes hôtes des cellules d'impact"
          }
        </CardDescription>
      </CardHeader>
      {/*       <CardContent>
       */}{" "}
      <>
        <div className="grid w-full items-center gap-4 bg-white rounded-lg">
          <div className=" text-end">
            <AddAddressForm openDialog={false} />
          </div>
          <div className="flex flex-col space-y-1.5">
            {/*             <div>
              {reg != "0" &&
                reg &&
                pilotes.map((pil: Person) => <p>{pil.firstname}</p>)}
            </div> */}
            <Table>
              {/*                   <TableCaption>A list of your recent invoices.</TableCaption>
               */}{" "}
              <TableHeader>
                <TableRow>
                  <TableHead className=" text-blue-600 ">{"Adresse"}</TableHead>

                  <TableHead className=" text-blue-600  max-md:hidden">
                    {"Commune"}
                  </TableHead>

                  <TableHead className=" text-blue-600  max-md:hidden">
                    {"GeoLoc"}
                  </TableHead>

                  <TableHead className="text-right text-blue-600 ">
                    {"Actions"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map((address: Address) => (
                  <AddressRow key={address.id} address={address} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
      {/*       </CardContent>
       */}{" "}
    </div>
  );
};

export default AddressesList;
