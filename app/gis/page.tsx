"use client";

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

export default function GisPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className=" h-full flex-1 px-1">
      <Tabs defaultValue="group" className="w-full ">
        <TabsList className="grid w-full grid-cols-2 bg-[#1b4c48]">
          <TabsTrigger value="group">Groupes</TabsTrigger>
          <TabsTrigger value="secteur">Secteurs</TabsTrigger>
        </TabsList>

        <TabsContent value="group">
          <GroupesList />
        </TabsContent>
        <TabsContent value="secteur">
          <SecteursList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
