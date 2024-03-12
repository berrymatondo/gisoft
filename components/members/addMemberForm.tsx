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

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { addSecteur } from "@/app/_actionsSecteur";
import { useState } from "react";
import { toast } from "sonner";
import { personFormSchema } from "@/lib/schema";
import { addPerson } from "@/app/_actionsMember";

type AddMemberFormProps = {
  openDialog: boolean;
  giId?: number;
};

const AddMemberForm = ({ openDialog, giId }: AddMemberFormProps) => {
  const [open, setOpen] = useState(openDialog);
  const form = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      // email: "",
      /* mobile: "", */
      /* isPilote: false, */
    },
  });

  const procesForm = async (values: z.infer<typeof personFormSchema>) => {
    //console.log("Values XXX:", values);

    const res = await addPerson(values);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    toast.success("Secteur créé avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
  };

  //console.log("AJOUT PERSON ");

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-black bg-yellow-400">Nouveau</Button>
        </DialogTrigger>
        <DialogContent className=" bg-[#1b4c48] text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">
              Ajouter un nouveau membre
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Prénom"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer le prénom"
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
                  name="lastname"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Nom"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer le nom"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/*               <FormField
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
              /> */}

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Téléphone"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer le numéro de téléphone"
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
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Email"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer l'adresse mail"
                            type="text"
                          />
                        </FormControl>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMemberForm;
