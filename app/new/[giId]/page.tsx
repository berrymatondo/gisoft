"use client";
import AddMemberForm from "@/components/members/addMemberForm";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addPerson } from "../../_actionsMember";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getGi, getGis } from "@/lib/gis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gi } from "@prisma/client";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const NewPublicMemberNew = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [gis, setGis] = useState<any>();
  const [gi, setGi] = useState("");
  const [id, setId] = useState(params.giId);
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
      giId: id.toString(),
      /* mobile: "", */
      /* isPilote: false, */
    },
  });

  const icc = form.watch("isIcc");
  const sel = form.watch("giId");

  useEffect(() => {
    const fetchGi = async () => {
      const data: any = await getGi(sel as string);

      // console.log("DARA:", data);

      setGi(data?.name);
      setName(form.getValues("firstname"));
    };
    fetchGi();
  }, [sel, form]);

  //console.log("sel", sel);

  const procesForm = async (values: z.infer<typeof personFormSchema>) => {
    // console.log("Values PERSON:", values);

    const res = await addPerson(values);

    setName(form.getValues("firstname"));

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
    //setOpen(false);

    //window.location.reload();
    setRecSuccess(true);
  };

  if (recSuccess) {
    return (
      <div className="w-full px-1">
        <Card className="w-full  flex justify-center mt-32">
          <CardHeader className="flex justify-center">
            {/*             <div className="flex justify-between items-center">
              <CardTitle className="flex justify-between items-center">
                {"Inscription réussie !!!"}
              </CardTitle>
            </div> */}
            <CardDescription className="">
              <p className="text-xl text-center ">
                Bonjour <strong className="uppercase">{name}</strong>,
              </p>
              <p className="text-center text-lg">
                {
                  "🔥 Votre demande d'enregistrement a été bien prise en compte !🔥"
                }
              </p>
              <p className="text-center text-lg pt-4">
                {"Le pilote de la cellue d'impact "}{" "}
                <span className="text-blue-600 text-xl">{gi}</span>
                {" vous contactera très rapidement!"}{" "}
              </p>
              <p className="text-center underline text-md pt-4">
                <Link href="/">{"Revenir à la page d'accueil"}</Link>
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full   md:p-8 grid sm:grid-cols-5">
      <div></div>
      <div className="sm:hidden p-2 text-xl">
        <SecteurBreadcrumb name="Inscription" />
      </div>
      <Card className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
        <CardHeader className="max-sm:p-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-blue-600 text-4xl">
              {"Inscription au groupe d'impact"}
            </CardTitle>
          </div>
          <CardDescription className="text-neutral-600">
            {"Cette transaction permet de s'enregistrer à un groupe d'impact"}
          </CardDescription>
        </CardHeader>

        <CardContent className="max-sm:p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4 ">
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Selectionner un groupe d'Impact" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem className="text-red-600" value="00">
                              {"Aucun secteur pour ce GI"}
                            </SelectItem>
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
              <div className="flex md:justify-end md:items-center  max-md:flex-col">
                {/*                 <Button
                  type="button"
                  variant="secondary"
                  className="text-red-600 max-md:mt-4"
                  onClick={() => form.reset()}
                >
                  Tout effacer
                </Button> */}
                <Button variant="impact" className="max-md:mt-4" type="submit">
                  Enregistrer
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div></div>
    </div>
  );
};

export default NewPublicMemberNew;

const SecteurBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/secteurs">Secteurs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
