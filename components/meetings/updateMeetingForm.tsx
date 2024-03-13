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
import { Gi, Meeting, Secteur } from "@prisma/client";
import { meetingFormSchema } from "@/lib/schema";
import { getGi, getGis, updateGi } from "@/lib/gis";
import { getMeeting } from "@/lib/meetings";

import { format } from "date-fns";
import { updateMeeting } from "@/app/_actionsMeeting";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
//import { unstable_noStore as noStore } from "next/cache";

type UpdateMeetingFormProps = {
  inMeeting: Meeting;
};

const UpdateMeetingForm = ({ inMeeting }: UpdateMeetingFormProps) => {
  //noStore();
  //console.log("DANS update:", meeting);

  const [open, setOpen] = useState(false);
  const [meeting, setFoundMeeting] = useState<any>(inMeeting);
  const router = useRouter();
  const [gis, setGis] = useState<any>();

  //console.log("OPENNNN", open);

  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      id: meeting.id.toString(),
      date: format(new Date(meeting.date), "yyyy-MM-dd"),
      nPar: meeting.nPar.toString(),
      nCon: meeting.nCon.toString(),
      nIcc: meeting.nIcc.toString(),
      nNIcc: meeting.nNIcc.toString(),
      nNew: meeting.nNew.toString(),
      nStar: meeting.nStar.toString(),
      giId: meeting.giId.toString(),
      onLine: !meeting.onLine,
      notes: meeting.notes ? meeting.notes.toString() : "",
      //       name: gi.name,
      //secteurId: gi.secteurId?.toString(),
    },
  });

  useEffect(() => {
    const fetchGi = async () => {
      // console.log("READ:", meeting.id.toString());

      const data: any = await getMeeting(meeting.id.toString());
      // const data = res.json();

      //console.log("actions SSS: ", data);
      //console.log("actions FORM: ", form.getValues());

      form.setValue("date", format(new Date(data?.date), "yyyy-MM-dd"));
      form.setValue("nPar", data?.nPar.toString());
      form.setValue("nCon", data?.nCon.toString());
      form.setValue("nIcc", data?.nIcc.toString());
      // form.setValue("nNIcc", data?.nNIcc);
      form.setValue("nStar", data?.nStar.toString());
      form.setValue("nNew", data?.nNew.toString());
      form.setValue("giId", data?.giId.toString());
      form.setValue("onLine", !data?.onLine);
      form.setValue("notes", data.notes ? data.notes.toString() : "");

      //console.log("actions FORM AFTER :", form.getValues());

      setFoundMeeting(data);
    };
    fetchGi();
  }, [open, meeting.id, form]);

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();
      //const data = res.json();

      // console.log("actions: ", data);

      setGis(data);
    };
    fetchGis();
  }, [form, meeting.id]);

  const procesForm = async (values: z.infer<typeof meetingFormSchema>) => {
    // console.log("Values xxrx:", values);

    const res = await updateMeeting(values);

    //console.log("Apres");

    if (!res) {
      console.log("Une erreur est sub...", res);
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    form.reset();

    toast.success("Le rapport du GI a été modifié avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
    router.push("/meetings");
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
            <DialogTitle>{"Modifier le rapport d'un GI"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                {/*                 <FormField
                  control={form.control}
                  name="giId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Groupe d'Impact </FormLabel>
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
                /> */}

                <FormField
                  control={form.control}
                  name="giId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Groupe d'impact"} </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un groupe d'impact" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {/*                             <SelectItem className="text-red-600" value="00">
                              {"Aucun secteur pour ce GI"}
                            </SelectItem> */}
                            {gis.map((gi: Gi) => (
                              <SelectItem key={gi.id} value={gi.id.toString()}>
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
                        <FormLabel>{"Dater"}</FormLabel>
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

                <FormField
                  control={form.control}
                  name="giId"
                  render={({ field }) => {
                    return (
                      <FormItem hidden={true}>
                        <FormLabel>{"Particitpants"}</FormLabel>
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

                {/*                 <FormField
                  control={form.control}
                  name="nPar"
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
                /> */}

                {/*                 <FormField
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
                /> */}
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

export default UpdateMeetingForm;
