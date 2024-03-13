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
import { Gi, Meeting, Person, Secteur } from "@prisma/client";
import { personFormSchema } from "@/lib/schema";
import { getGi, getGis, updateGi } from "@/lib/gis";
import { getMeeting } from "@/lib/meetings";

import { format } from "date-fns";
import { updateMeeting } from "@/app/_actionsMeeting";
import { useRouter } from "next/navigation";
import { getPerson, updatePerson } from "@/app/_actionsMember";
import { Checkbox } from "../ui/checkbox";
//import { unstable_noStore as noStore } from "next/cache";

type UpdateMemberFormProps = {
  inMember: Person;
};

const UpdateMemberForm = ({ inMember }: UpdateMemberFormProps) => {
  //noStore();
  //console.log("DANS update:", meeting);

  const [open, setOpen] = useState(false);
  const [member, setFoundMember] = useState<any>(inMember);
  const router = useRouter();
  const [gis, setGis] = useState<any>();

  //console.log("OPENNNN", open);

  const form = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      id: member.id.toString(),
      // date: format(new Date(meeting.date), "yyyy-MM-dd"),
      firstname: member.firstname.toString(),
      lastname: member.lastname.toString(),
      mobile: member.mobile.toString(),
      city: member.city ? member.city.toString() : "",
      isIcc: member.isIcc,
      isStar: member.isStar,
      isPilote: member.isPilote,
      giId: member.giId ? member.giId.toString() : "0",
      //       name: gi.name,
      //secteurId: gi.secteurId?.toString(),
    },
  });

  useEffect(() => {
    const fetchGi = async () => {
      // console.log("READ:", meeting.id.toString());

      const data: any = await getPerson(member.id.toString());
      // const data = res.json();

      //console.log("actions SSS: ", data);
      //console.log("actions FORM: ", form.getValues());

      //form.setValue("date", format(new Date(data?.date), "yyyy-MM-dd"));
      form.setValue("firstname", data?.firstname.toString());
      form.setValue("lastname", data?.lastname.toString());
      form.setValue("mobile", data?.mobile.toString());
      form.setValue("city", data.city ? data.city.toString() : "");
      form.setValue("isIcc", data?.isIcc);
      form.setValue("isStar", data?.isStar);
      form.setValue("isPilote", data?.isPilote);
      form.setValue("giId", data.giId ? data.giId.toString() : "0");

      //console.log("actions FORM AFTER :", form.getValues());

      setFoundMember(data);
    };
    fetchGi();
  }, [open, member.id, form]);

  const icc = form.watch("isIcc");

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();
      //const data = res.json();

      // console.log("actions: ", data);

      setGis(data);
    };
    fetchGis();
  }, [form, member.id]);

  const procesForm = async (values: z.infer<typeof personFormSchema>) => {
    //console.log("Values xxx:", values);

    const res = await updatePerson(values);

    //console.log("Apres");

    if (!res) {
      console.log("Une erreur est sub...", res);
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    form.reset();

    toast.success("Le membre du GI a été modifié avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
    router.push("/members");
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
                {icc && (
                  <div className="flex max-md:flex-col justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="isPilote"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Label className="ml-2" htmlFor="isPilote">
                              Etes-vous pilote ?
                            </Label>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                )}

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

                {/*                 <FormField
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
 */}
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => {
                    return (
                      <FormItem hidden={true}>
                        <FormLabel>{"Prénom"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            //placeholder="Entrer le nbr de participants"
                            type="text"
                          />
                        </FormControl>
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

export default UpdateMemberForm;
