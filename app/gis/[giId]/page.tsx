"use client";
import React, { useEffect, useState } from "react";

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

import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Gi, Secteur } from "@prisma/client";
import { giFormSchema } from "@/lib/schema";
import { getGi, updateGi } from "@/lib/gis";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getSecteurs } from "@/lib/secteurs";
import { useRouter } from "next/navigation";

type GiProps = {
  params: {
    giId: number;
  };
};

const GiPage = ({ params }: GiProps) => {
  //console.log("DANS update:", secteurs);
  //console.log("{params.giId}: ", params.giId);

  const [open, setOpen] = useState(true);
  const [foundGi, setFoundGi] = useState<any>();
  const [secteurs, setSecteurs] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchGi = async () => {
      const data: any = await getGi(params.giId.toString());
      // const data = res.json();

      //console.log("actions:", data);

      setFoundGi(data);

      if (data && form) {
        //console.log("OK----------------------");
        form.setValue("id", data?.id.toString());
        form.setValue("name", data?.name);
        form.setValue("secteurId", data?.secteurId?.toString());
      }
    };
    fetchGi();

    const fetchSecteurs = async () => {
      const data = await getSecteurs();
      // const data = res.json();

      //console.log("fetchSecteurs: ", data);

      setSecteurs(data);
    };
    fetchSecteurs();
  }, [params.giId]);

  const form = useForm<z.infer<typeof giFormSchema>>({
    resolver: zodResolver(giFormSchema),
    defaultValues: {
      id: foundGi?.id.toString(),
      name: foundGi?.name,
      secteurId: foundGi?.secteurId?.toString(),
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
      //console.log(res!.error);
      return;
    }

    toast.success("Groupe d'impact modifié avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    //console.log("RES:", res!.data);
    setOpen(false);
  };

  return (
    <div className="bg-red-400">
      <Dialog open={true} onOpenChange={setOpen}>
        <DialogTrigger asChild className="max-md:hidden">
          <Button className="bg-orange-400 text-white">Editer</Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdEdit className="text-orange-400 md:hidden" size={20} />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1b4c48] text-white">
          <DialogHeader>
            <DialogTitle>{"Modifier un groupe d'impact"}</DialogTitle>
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
                          value={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un secteur" />
                            {/*                             <SelectValue placeholder="Selectionner un secteur" />
                             */}
                            {/*                             <SelectValue value={"uccle"} />
                             */}{" "}
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem className="text-red-600" value="00">
                              {"Aucun secteur pour ce GI"}
                            </SelectItem>
                            {secteurs?.map((ref: Secteur) => (
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
              </div>
              <DialogFooter className="md:flex md:justify-between md:items-center">
                {/*                 <DialogClose asChild>
                 */}{" "}
                <Button
                  type="button"
                  variant="secondary"
                  className="text-red-600 max-md:mt-4"
                  onClick={() => router.push("/gis")}
                >
                  Annuler
                </Button>
                {/*                 </DialogClose>
                 */}{" "}
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

export default GiPage;
