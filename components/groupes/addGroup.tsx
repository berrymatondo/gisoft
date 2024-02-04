import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { prisma } from "@/lib/prisma";

const AddGroup = async () => {
  const secteurs = await prisma.secteur.findMany({
    include: {
      gis: true,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-black bg-yellow-400">Nouveau</Button>
      </DialogTrigger>
      <DialogContent className=" bg-[#1b4c48] text-white">
        <DialogHeader>
          <DialogTitle>{"Ajouter un groupe d'impact"}</DialogTitle>
        </DialogHeader>
        xxx
      </DialogContent>
    </Dialog>
  );
};

export default AddGroup;
