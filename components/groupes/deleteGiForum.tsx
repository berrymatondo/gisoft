"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  MdDelete,
  MdDeleteForever,
  MdDeleteOutline,
  MdEdit,
} from "react-icons/md";
import { Gi } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { giFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { deleteGi } from "@/lib/gis";

const refLis = [
  { id: 1, name: "Roston" },
  { id: 2, name: "Djedou" },
  { id: 3, name: "Donny" },
  { id: 4, name: "Jason" },
  { id: 5, name: "Loïc" },
];

type DeleteGiFormProps = {
  gi: Gi;
};

const DeleteGiForm = ({ gi }: DeleteGiFormProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof giFormSchema>>({
    resolver: zodResolver(giFormSchema),
    defaultValues: {
      name: gi.name,
      id: gi.id.toString(),
    },
  });

  const procesForm = async (values: z.infer<typeof giFormSchema>) => {
    //console.log("Values::", values);

    const res = await deleteGi(values);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    toast.success("Le groupe d'impact a été supprimé avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="max-md:hidden">
          <Button className="text-red-600 bg-white">Supprimer</Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdDeleteForever className="text-red-600 md:hidden" size={25} />{" "}
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1b4c48] text-white">
          <DialogHeader>
            <DialogTitle>{"Supprimer un groupe d'impact"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <Label className="text-center">
                  {`Etes-vous sûr de vouloir supprimer le groupe d'impact `}{" "}
                  <strong className="text-yellow-400">{gi.name}</strong> {`?`}
                </Label>
              </div>
              <DialogFooter className="md:flex md:justify-between md:items-center">
                <Button className="max-md:mt-4" type="submit">
                  Confirmer
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-red-600 max-md:mt-4"
                  >
                    Annuler
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
          {/*           <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value={secteur.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Référent
                  </Label>
                  <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
              </div> 
              <DialogFooter className="max-md:grid max-md:grid-cols-3 max-md:gap-2  max-md:">
                <Button onClick={() => setOpen(false)} className="bg-white">
                  Annuler
                </Button>
                <Button className="bg-white text-red-600">Supprimer</Button>
                <Button type="submit">Sauvegarder</Button>
              </DialogFooter>*/}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteGiForm;
