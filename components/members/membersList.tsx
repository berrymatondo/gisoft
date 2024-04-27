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
import AddMemberForm from "./addMemberForm";
import MemberRow from "./memberRow";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import Image from "next/image";
import bgImage from "../../public/listmembers.png";

type MembersListProps = {
  members: any;
  gis: any;
};

const MembersList = ({ members, gis }: MembersListProps) => {
  const form = useForm();
  const reg = form.watch("giId");
  let newMeets = members;
  let pilotes = [];

  if (reg != "0" && reg) {
    //console.log("REG;", reg);
    newMeets = members.filter((meet: Person) => meet.giId == reg);
    pilotes = members.filter(
      (meet: Person) => meet.giId == reg && meet.isPilote == true
    );
    //console.log("newMeets:", newMeets);
    //console.log("meetings after:", meetings);
  }
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
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-4xl md:text-5xl">
            {"Liste des membres ("}
            {newMeets.length}
            {")"}
          </CardTitle>
        </div>
        <CardDescription className="text-yellow-200 md:text-lg">
          {
            "Cette transaction affiche la liste de tous les membres des groupes d'impact"
          }
        </CardDescription>
      </CardHeader>
      {/*       <CardContent>
       */}{" "}
      <>
        <div className="grid w-full items-center gap-4 bg-white rounded-lg">
          <div className=" text-end">
            <AddMemberForm openDialog={false} />
          </div>
          <div className="p-2 max-w-[200px]">
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="giId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Choisir un groupe d'impact"} </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Choisir un groupe d'impact" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {reg != 0 && (
                              <SelectItem key={0} value={"0"}>
                                {"Effacer filtre"}
                              </SelectItem>
                            )}
                            {gis.map((secteur: Secteur) => (
                              <SelectItem
                                key={secteur.id}
                                value={secteur.id.toString()}
                              >
                                {secteur.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
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
                  <TableHead className=" text-blue-600 ">{"Membre"}</TableHead>
                  <TableHead className=" text-blue-600   max-md:hidden">
                    {"Téléphone"}
                  </TableHead>
                  <TableHead className=" text-blue-600  max-md:hidden">
                    {"Ville"}
                  </TableHead>
                  <TableHead className=" text-blue-600 ">{"Groupe"}</TableHead>

                  <TableHead className="text-right text-blue-600 "></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newMeets.map((member: Person) => (
                  <MemberRow key={member.id} member={member} />
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

export default MembersList;
