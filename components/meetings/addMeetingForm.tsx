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
//import { addPerson } from "@/app/_actionsMember";
import { meetingFormSchema } from "@/lib/schema";
import { addMeeting } from "@/app/_actionsMeeting";
import { Gi } from "@prisma/client";
import { getGis } from "@/lib/gis";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

const AddMeetingForm = () => {
  const [open, setOpen] = useState(false);
  const [gis, setGis] = useState<any>();
  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      //date: "",
      nPar: "0",
      nCon: "0",
      nIcc: "0",
      nNIcc: "0",
      nNew: "0",
      nStar: "0",
      giId: "0",
      onLine: false,
      notes: "",
      /* mobile: "", */
      /* isPilote: false, */
    },
  });

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();
      //const data = res.json();

      // console.log("actions: ", data);

      setGis(data);
    };
    fetchGis();
  }, []);

  const procesForm = async (values: z.infer<typeof meetingFormSchema>) => {
    //  console.log("Values XXX:", values);

    //console.log("Avant");

    const res = await addMeeting(values);

    //console.log("Apres");

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      //console.log(res!.error);
      toast.error(
        `Un rapport pour ce groupe d'impact existe déjà à la date du (${form.getValues(
          "date"
        )})`,
        {
          description: "",
        }
      );
      return;
    }

    form.reset();

    toast.success("Le rapport du GI a été enregistré avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-black bg-yellow-400">Nouveau</Button>
        </DialogTrigger>
        <DialogContent className=" bg-[#1b4c48] text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">
              Ajouter nouveau rapport
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="giId"
                  render={({ field }) => {
                    return (
                      <FormItem>
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
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Date"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer la date"
                            type="date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="grid grid-rows-2 gap-2">
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="nPar"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Participants"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                //placeholder="Entrer le nbr de participants"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="nCon"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Connexions"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                // placeholder="Entrer le numéro de téléphone"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="nStar"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Star"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                //placeholder="Entrer l'adresse mail"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="nIcc"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Membres Icc"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                //  placeholder="Entrer le nbr de participants"
                                type="number"
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

                    {/*                     <FormField
                      control={form.control}
                      name="nNIcc"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Non Icc"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                // placeholder="Entrer le numéro de téléphone"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    /> */}

                    <FormField
                      control={form.control}
                      name="nNew"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Nouveaux"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                // placeholder="Entrer l'adresse mail"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="onLine"
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
                              {"La réunion était en présentiel ?"}
                              <span className="text-yellow-400 pl-2">
                                {form.watch("onLine") ? "OUI" : "NON"}
                              </span>
                            </Label>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>{"Notes"}</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="text-black"
                                rows={4}
                                placeholder="Des notes sur la réunion ..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
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

export default AddMeetingForm;
