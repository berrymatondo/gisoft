"use client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { addGiAction, getSecteursAction } from "@/app/_actions";
import { Secteur } from "@prisma/client";
import { useForm } from "react-hook-form";
import { giFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const AddGroupForm = () => {
  const [secteurs, setSecteurs] = useState<any>();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof giFormSchema>>({
    resolver: zodResolver(giFormSchema),
    defaultValues: {
      name: "",
      secteurId: "",
    },
  });

  useEffect(() => {
    const fetchSecteurs = async () => {
      const data = await getSecteursAction();
      //const data = res.json();

      // console.log("actions: ", data);

      setSecteurs(data);
    };
    fetchSecteurs();
  }, []);

  const procesForm = async (values: z.infer<typeof giFormSchema>) => {
    //console.log("Value:", values);

    const res = await addGiAction(values);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    toast.success("Groupe d'impact créé avec succès.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-black bg-yellow-400">Nouveau</Button>
      </DialogTrigger>
      <DialogContent className=" bg-[#1b4c48] text-white">
        <DialogHeader>
          <DialogTitle>{"Ajouter un groupe d'impact"}</DialogTitle>
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
                      <FormLabel>Référent du secteur </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {secteurs.map((secteur: Secteur) => (
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
            </div>
            <DialogFooter className="md:flex md:justify-between md:items-center  max-md:mt-8">
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
        {/*         <div className="grid gap-4 py-4">
          <form onSubmit={form.handleSubmit(procesForm)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{"Nom du groupe d'impact"}</Label>
                <Input
                  id="name"
                  placeholder="Entrer le nom du groupe d'impact"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Secteur</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Selectionner un secteur" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {secteurs?.map((secteur: Secteur) => (
                      <SelectItem key={secteur.id} value={secteur.name}>
                        {secteur.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="md:flex md:justify-between md:items-center max-md:mt-8">
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
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupForm;
