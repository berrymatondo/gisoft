import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import bgImage from "../../public/logo1.png";
import AddSecteurForm from "@/components/secteurs/addSecteurForm";
import SecteursList from "@/components/secteurs/secteursList";
import GroupesList from "@/components/groupes/groupesList";
import { prisma } from "@/lib/prisma";
import { getGisAction } from "../_actions";
import { getAddresses } from "@/lib/addresses";

export default async function GisPage() {
  const secteurs = await prisma.secteur.findMany({
    include: {
      gis: true,
    },
  });

  const addresses = await getAddresses();
  // Get groupes
  const gis = await getGisAction();
  // const gis = await prisma.gi.findMany();
  // console.log("GISS LE:", giss);
  //console.log("GIS LE:", gis);
  // console.log("SECTEUR LE:", secteurs);

  return (
    <div className="w-full  gap-4 p-8 grid grid-cols-5">
      <div>
        <Input placeholder="Rechercher" />
      </div>
      <Tabs
        defaultValue="group"
        className="col-span-3 w-full border-none bg-neutral-300/20 "
      >
        <TabsList className="grid w-full grid-cols-2  text-gray-400 ">
          <TabsTrigger value="group">Groupes</TabsTrigger>
          <TabsTrigger value="secteur">Secteurs</TabsTrigger>
        </TabsList>

        <TabsContent value="group">
          <GroupesList gis={gis} secteurs={secteurs} addresses={addresses} />
        </TabsContent>
        <TabsContent value="secteur">
          <SecteursList secteurs={secteurs} />
        </TabsContent>
      </Tabs>
      <div></div>
    </div>
  );
}
