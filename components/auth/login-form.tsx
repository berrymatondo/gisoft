"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"; // Je compte l'utiliser au cas où la connexion est réussie.
import { useTransition, useState } from "react";

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
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { login } from "@/app/_login-user";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { FiLoader } from "react-icons/fi";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    setTimeout(async () => {
      try {
        const data = await login(values);
        setError(data?.error);
        setSuccess(data?.success);
      } catch (error) {
        setError("Une erreur s'est produite lors de la connexion.");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  return (
    <CardWrapper
      headerLabel="Connexion"
      backButtonLabel="Vous n'avez pas encore de compte? Inscrivez-vous"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                      placeholder="djedou.armand@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Connexion en cours...
              </>
            ) : (
              "Se Connecter"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
