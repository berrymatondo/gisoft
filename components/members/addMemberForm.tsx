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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { personFormSchema } from "@/lib/schema";
import { addPerson } from "@/app/_actionsMember";
import { Checkbox } from "../ui/checkbox";
import { getGis } from "@/lib/gis";
import { Gi } from "@prisma/client";

type AddMemberFormProps = {
  openDialog: boolean;
  giId?: number;
};

const AddMemberForm = ({ openDialog, giId }: AddMemberFormProps) => {
  const [open, setOpen] = useState(openDialog);
  const [gis, setGis] = useState<any>();
  const [gi, setGi] = useState("");
  const [name, setName] = useState("");
  const [recSuccess, setRecSuccess] = useState(false);

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();

      setGis(data);
    };
    fetchGis();
  }, []);

  const form = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      city: "",
      isIcc: false,
      isStar: false,
      giId: "0",
      /* mobile: "", */
      /* isPilote: false, */
    },
  });

  const icc = form.watch("isIcc");
  const sel = form.watch("giId");

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
    form.reset();
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
                <div className="flex max-md:flex-col justify-between gap-4 max-md:gap-2">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Prénom"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer votre prénom"
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
                        <FormItem className="w-full">
                          <FormLabel>{"Nom"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer votre nom"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="flex max-md:flex-col justify-between gap-4  max-md:gap-2">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Téléphone"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer votre numéro de téléphone"
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
                    name="city"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Ville de résidence"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer votre ville de résidence"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="flex max-md:flex-col justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="isIcc"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label className="ml-2" htmlFor="isIcc">
                            Etes-vous un membre des églises ICC ?
                          </Label>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {icc && (
                    <FormField
                      control={form.control}
                      name="isStar"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Label className="ml-2" htmlFor="isStar">
                              Etes-vous un(e) S.T.A.R ?
                            </Label>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="giId"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/2">
                        <FormLabel>{"Groupe d'Impact"} </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un groupe d'Impact" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {gis &&
                              gis.map((gi: Gi) => (
                                <SelectItem
                                  key={gi.id}
                                  value={gi.id.toString()}
                                >
                                  {gi.name}
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
              <div className="flex md:justify-between md:items-center  max-md:flex-col">
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
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMemberForm;
