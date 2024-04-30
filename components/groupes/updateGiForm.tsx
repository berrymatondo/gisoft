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
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Gi, Secteur, GiStatuses, Address } from "@prisma/client";
import { giFormSchema } from "@/lib/schema";
import { getGi, updateGi } from "@/lib/gis";
import GroupesList from "./groupesList";

type EditGiProps = {
  gi: Gi;
  secteurs: any;
  addresses: any;
};

const UpdateGiForm = ({ gi, secteurs, addresses }: EditGiProps) => {
  //console.log("DANS update:", secteurs);

  const [open, setOpen] = useState(false);
  const [foundGi, setFoundGi] = useState<any>();

  useEffect(() => {
    const fetchGi = async () => {
      const data = await getGi(gi.id.toString());
      // const data = res.json();

      //console.log("actions: ", data);

      setFoundGi(data);
    };
    fetchGi();
  }, [gi.id]);

  const form = useForm<z.infer<typeof giFormSchema>>({
    resolver: zodResolver(giFormSchema),
    defaultValues: {
      id: gi.id.toString(),
      name: gi.name,
      statut: gi.statut,
      addressId: gi.addressId?.toString(),
      secteurId: gi.secteurId?.toString(),
    },
  });

  const procesForm = async (values: z.infer<typeof giFormSchema>) => {
    // console.log("Values:", values);

    if (values.secteurId === "00") values.secteurId = "";

    const res = await updateGi(values);

    if (!res) {
      console.log("Une erreur est sub...", res);
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    toast.success("Groupe d'impact modifié avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    //console.log("RES:", res!.data);
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="max-md:hidden">
          <Button variant="outline" className="">
            Editer
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdEdit className="text-orange-400 md:hidden" size={20} />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-4xl">
              {"Modifier un groupe d'impact"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Nom du groupe d'impact"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer le nom du groupe d'impact"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="secteurId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Secteur du groupe d'impact"} </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un secteur" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem className="text-red-600" value="00">
                              {"Aucun secteur pour ce GI"}
                            </SelectItem>
                            {secteurs.map((ref: Secteur) => (
                              <SelectItem
                                key={ref.id}
                                value={ref.id.toString()}
                              >
                                {ref.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="addressId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Adresse de a cellule"} </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner une adresse" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem className="text-red-600" value="00">
                              {"Aucune adresse pour cette cellule"}
                            </SelectItem>
                            {addresses.map((ref: Address) => (
                              <SelectItem
                                key={ref.id}
                                value={ref.id.toString()}
                              >
                                {ref.street}, {ref.number} {ref.municipality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="statut"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          {"Statut de la cellule d'impact"}{" "}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un statut" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem className="text-red-600" value="00">
                              {"Aucun statut"}
                            </SelectItem>
                            {Object.values(GiStatuses)
                              ? Object.values(GiStatuses).map((status: any) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))
                              : null}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <DialogFooter className="md:flex md:justify-between md:items-center">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-red-600 max-md:mt-4"
                  >
                    Annuler
                  </Button>
                </DialogClose>
                <Button className="max-md:mt-4" type="submit">
                  Enregistrer
                </Button>
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

export default UpdateGiForm;
