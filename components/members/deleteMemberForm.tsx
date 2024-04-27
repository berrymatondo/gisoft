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
import {
  MdDelete,
  MdDeleteForever,
  MdDeleteOutline,
  MdEdit,
} from "react-icons/md";
import { Meeting, Person } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { personFormSchema } from "@/lib/schema";
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
import { format } from "date-fns";
import { deleteMeeting } from "@/lib/meetings";
import { deletePerson } from "@/app/_actionsMember";

type DeleteMemberFormProps = {
  member: Person;
};

const DeleteMemberForm = ({ member }: DeleteMemberFormProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      firstname: member.firstname as string,
      lastname: member.lastname as string,
    },
  });

  const procesForm = async () => {
    const res = await deletePerson(member.id);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    toast.success(
      `Le membre ${member.firstname} ${member.lastname} a été supprimé avec succes.`,
      {
        description: new Date().toISOString().split("T")[0],
      }
    );
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="max-md:hidden">
          <Button className="text-red-600" variant="link">
            Supprimer
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdDeleteForever className="text-red-600 md:hidden" size={25} />{" "}
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-4xl">
              {"Supprimer un membre"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <Label className="text-center">
                  {`Etes-vous sûr de vouloir supprimer le membre`}{" "}
                  <strong className="text-blue-600">
                    {member.firstname} {member.lastname}
                  </strong>{" "}
                  {`?`}
                </Label>
              </div>
              <DialogFooter className="md:flex md:justify-between md:items-center">
                <Button
                  className="max-md:mt-4"
                  type="button"
                  onClick={procesForm}
                >
                  Confirmer
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-red-600 max-md:mt-4"
                  >
                    Annuler
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteMemberForm;
