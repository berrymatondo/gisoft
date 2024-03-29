/* eslint-disable react/no-unescaped-entities */
"use client";

import { useForm, Controller } from "react-hook-form";
import { Gi } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"; // Je compte l'utiliser au cas où la connexion est réussie.
import { useTransition, useState, useEffect } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { login } from "@/app/_login-user";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getGisAction } from "@/app/_actions";
import { register } from "@/app/_register-user";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [gis, setGis] = useState<any>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
       // giId : 0,
      // isAdmin: false, // pose probleme avec le checkbox
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  useEffect(() => {
    const fetchGis = async () => {
      const allGis = await getGisAction();
      setGis(allGis);
    };

    fetchGis();
  }, []);

  // const getGis = async () => {
  //   try {
  //     const allGis = await getGisAction();
  //     if (Array.isArray(allGis)) {
  //       setGis(allGis);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <CardWrapper
      headerLabel="Nouveau compte"
      backButtonLabel="Vous avez dejà un compte ?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="djedou"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utilisateur</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="dejdou.armaud@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="giId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Groupe d'Impact</FormLabel>
                    <Select
                      // disabled={form.watch("isAdmin")}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="giId">
                        <SelectValue placeholder="Sélectionner un GI" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {gis?.map((gi: Gi) => (
                          <SelectItem key={gi.id} value={gi.id.toString()}>
                            {gi.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormLabel className="col-span-2 flex items-center text-black">
                  <Checkbox checked={field.value} className="mr-2" />
                  <span>Administrateur ?</span>
                </FormLabel>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Enregistrer
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
