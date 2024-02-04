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

export default async function GisPage() {
  const secteurs = await prisma.secteur.findMany({
    include: {
      gis: true,
    },
  });
  // Get groupes
  const gis = await getGisAction();
  // const gis = await prisma.gi.findMany();
  // console.log("GISS LE:", giss);
  //console.log("GIS LE:", gis);
  // console.log("SECTEUR LE:", secteurs);

  return (
    <div className="h-full flex-1 px-1 w-full">
      <Tabs defaultValue="group" className="w-full ">
        <TabsList className="grid w-full grid-cols-2 bg-[#36625f] text-teal-200 ">
          <TabsTrigger value="group">Groupes</TabsTrigger>
          <TabsTrigger value="secteur">Secteurs</TabsTrigger>
        </TabsList>

        <TabsContent value="group">
          <GroupesList gis={gis} secteurs={secteurs} />
        </TabsContent>
        <TabsContent value="secteur">
          <SecteursList secteurs={secteurs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
