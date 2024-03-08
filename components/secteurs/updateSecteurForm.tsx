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
import { Secteur } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { secteurFormSchema } from "@/lib/schema";
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
import { updateSecteur } from "@/app/_actionsSecteur";
import { toast } from "sonner";

const refLis = [
  { id: 1, name: "Roston" },
  { id: 2, name: "Djedou" },
  { id: 3, name: "Donny" },
  { id: 4, name: "Jason" },
  { id: 5, name: "Loïc" },
];

type EditSecteurProps = {
  secteur: Secteur;
};

const UpdateSecteurForm = ({ secteur }: EditSecteurProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof secteurFormSchema>>({
    resolver: zodResolver(secteurFormSchema),
    defaultValues: {
      name: secteur.name,
      referent: "",
      id: secteur.id.toString(),
    },
  });

  const procesForm = async (values: z.infer<typeof secteurFormSchema>) => {
    //console.log("Values::", values);

    const res = await updateSecteur(values);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    toast.success("Secteur modifié avec succes.", {
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
          <Button className="bg-orange-400 text-white">Editer</Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdEdit className="text-orange-400 md:hidden" size={20} />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1b4c48] text-white">
          <DialogHeader>
            <DialogTitle>Modifier un secteur</DialogTitle>
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
                        <FormLabel>Nom du secteur</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer le nom du secteur"
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
                  name="referent"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Référent du secteur </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un référent" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {refLis.map((ref) => (
                              <SelectItem key={ref.id} value={ref.name}>
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

export default UpdateSecteurForm;
