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
import { Address, Gi, Meeting, Person, Secteur } from "@prisma/client";
import { addressFormSchema } from "@/lib/schema";
import { getGi, getGis, updateGi } from "@/lib/gis";
import { getMeeting } from "@/lib/meetings";

import { format } from "date-fns";
import { updateMeeting } from "@/app/_actionsMeeting";
import { useRouter } from "next/navigation";
import { getPerson, updatePerson } from "@/app/_actionsMember";
import { Checkbox } from "../ui/checkbox";
import { getAddress, setGeoLoc, updateAddress } from "@/lib/addresses";
//import { unstable_noStore as noStore } from "next/cache";

type UpdateAddressFormProps = {
  addressIn: Address;
};

const UpdateAddressForm = ({ addressIn }: UpdateAddressFormProps) => {
  //console.log("addressIn", addressIn);

  //noStore();
  //console.log("DANS update:", meeting);

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<any>(addressIn);
  const router = useRouter();
  const [gis, setGis] = useState<any>();

  //console.log("OPENNNN", open);

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      id: address.id.toString(),
      // date: format(new Date(meeting.date), "yyyy-MM-dd"),
      street: address.street,
      number: address.number,
      box: address.box,
      postalCode: address.postalCode,
      municipality: address.municipality,
      city: address.city,
      country: address.country,
      longitude: address.longitude,
      latitude: address.latitude,
      //       name: gi.name,
      //secteurId: gi.secteurId?.toString(),
    },
  });

  useEffect(() => {
    const fetchGi = async () => {
      // console.log("READ:", meeting.id.toString());

      const data: any = await getAddress(address.id.toString());
      // const data = res.json();

      //console.log("actions SSS: ", data);
      //console.log("actions FORM: ", form.getValues());

      //form.setValue("date", format(new Date(data?.date), "yyyy-MM-dd"));
      form.setValue("street", data?.street.toString());
      form.setValue("number", data?.number.toString());
      form.setValue("box", data?.box.toString());
      form.setValue("postalCode", data.postalCode);
      form.setValue("municipality", data?.municipality);
      form.setValue("city", data?.city);
      form.setValue("country", data?.country);
      form.setValue("longitude", data.longitude ? data.longitude : "");
      form.setValue("latitude", data.latitude ? data.latitude : "");

      //console.log("actions FORM AFTER :", form.getValues());

      setAddress(data);
    };
    fetchGi();
  }, [open, address.id, form]);

  //const icc = form.watch("isIcc");

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();
      //const data = res.json();

      // console.log("actions: ", data);

      setGis(data);
    };
    fetchGis();
  }, [form, address.id]);

  const procesForm = async (values: z.infer<typeof addressFormSchema>) => {
    console.log("Values xxx:", values);

    const res = await updateAddress(values);

    //console.log("Apres");

    if (!res) {
      console.log("Une erreur est sub...", res);
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    // form.reset();

    const geoLoc = await setGeoLoc(res?.data);
    console.log("res?.data ", res?.data);
    console.log("GEOLOC ", geoLoc);

    if (!geoLoc?.error) {
      toast.warning(
        "Aucune géo localisation pour cette adresse, veuillez contacter un administrateur."
      );
    }

    toast.success("L'adresse a été modifiée avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
    router.push("/addresses");
  };

  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="max-md:hidden">
          <Button className="" variant="outline">
            Editer
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdEdit className="text-orange-400 md:hidden" size={20} />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] ">
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-4xl">
              {"Modifier une adresse"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <div className="flex max-md:flex-col justify-between gap-4 max-md:gap-2">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Avenue/Rue"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer l'avenue"
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
                    name="number"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Numéro"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le numéro"
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
                    name="box"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Boîte"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le numéro de la boîte"
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
                    name="postalCode"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Code postal"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer votre code postal"
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
                    name="municipality"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Secteur"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le secteur(commune, ...)"
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
                          <FormLabel>{"Villy"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le nom de la ville"
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
                    name="country"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Pays"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le nom du pays"
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
                    name="longitude"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Longitude"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer la longitude"
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
                    name="latitude"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>{"Latitude"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer la latitude"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/*                 <div className="flex max-md:flex-col justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="municipality"
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
                )} */}

                {/*                 <FormField
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
  
                            <SelectItem value="0">Aucun</SelectItem>
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
                /> */}

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

export default UpdateAddressForm;
