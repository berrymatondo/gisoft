"use client";
import React, { useEffect, useState } from "react";
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
import { Meeting, Person, Secteur } from "@prisma/client";
import AddMeetingForm from "./addMeetingForm";
//import { unstable_noStore as noStore } from "next/cache";

import MeetingRow from "./meetingRow";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";

type MeetingsListProps = {
  meetings: any;
  gis: any;
};

const MeetingsList = ({ meetings, gis }: MeetingsListProps) => {
  //noStore();

  //console.log("Mes meetings:", meetings);
  const form = useForm();

  const reg = form.watch("giId");
  let newMeets = meetings;

  //console.log("INIT REG:", reg);
  //console.log("newMeets avant:", newMeets);
  if (reg != "0" && reg) {
    //console.log("REG;", reg);
    newMeets = meetings.filter((meet: Meeting) => meet.giId == reg);
    //console.log("newMeets:", newMeets);
    //console.log("meetings after:", meetings);
  }

  /*   useEffect(() => {
    console.log("REG;", reg);
    console.log("meetings;", meetings);

    let newMeets = meetings.filter((meet: Meeting) => meet.giId === reg);
    console.log("newMeets:", newMeets);
    console.log("meetings after:", meetings);
  }, [reg]); */

  return (
    <Card className="w-full col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="max-md:text-xl text-4xl text-blue-600">
            {"Nos réunions ("}
            {newMeets.length}
            {")"}
          </CardTitle>
          <AddMeetingForm />
        </div>
        <CardDescription className="text-neutral-600">
          {
            "Cette transaction affiche la liste de toutes les réunions d'un groupe d'impact"
          }
        </CardDescription>
      </CardHeader>
      {/*       <CardContent>
       */}{" "}
      <>
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
        <div className="grid w-full items-center">
          <Table className="px-1">
            {/*                   <TableCaption>A list of your recent invoices.</TableCaption>
             */}{" "}
            <TableHeader>
              <TableRow className="px-2">
                <TableHead className="max-md:text-xs text-blue-600 w-[60px]">
                  Date
                </TableHead>
                <TableHead className="max-md:hidden text-blue-600">
                  {"Participants"}
                </TableHead>
                <TableHead className="md:hidden max-md:text-xs text-blue-600">
                  {"Part/Conn"}
                </TableHead>
                <TableHead className="max-md:hidden text-blue-600">
                  {"Connexions"}
                </TableHead>

                <TableHead className="max-md:hidden text-blue-600">
                  {"Membre ICC"}
                </TableHead>
                <TableHead className="max-md:hidden text-blue-600">
                  {"Membre Non ICC"}
                </TableHead>

                <TableHead className="md:hidden max-md:text-xs text-blue-600">
                  {"Icc/NIcc."}
                </TableHead>

                <TableHead className="max-md:hidden text-blue-600">
                  {"Star"}
                </TableHead>
                <TableHead className="md:hidden max-md:text-xs text-blue-600">
                  {"Star/Inv."}
                </TableHead>

                <TableHead className="max-md:hidden text-blue-600">
                  {"Invités"}
                </TableHead>

                <TableHead className="max-md:text-xs text-right text-blue-600"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newMeets.map((meeting: Meeting) => (
                <MeetingRow key={meeting.id} meeting={meeting} />
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    </Card>
  );
};

export default MeetingsList;
