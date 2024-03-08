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
import { Meeting } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingFormSchema } from "@/lib/schema";
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

type DeleteMeetingProps = {
  meeting: Meeting;
};

const DeleteMeetingForm = ({ meeting }: DeleteMeetingProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      date: meeting.date.toString(),
      id: meeting.id.toString(),
    },
  });

  const procesForm = async () => {
    const res = await deleteMeeting(meeting.id);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    toast.success("Le rapport du groupe d'impact a été supprimé avec succes.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="max-md:hidden">
          <Button className="text-red-600 bg-white">Supprimer</Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <MdDeleteForever className="text-red-600 md:hidden" size={25} />{" "}
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1b4c48] text-white">
          <DialogHeader>
            <DialogTitle>{"Supprimer un rapport"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <Label className="text-center">
                  {`Etes-vous sûr de vouloir supprimer le rapport du `}{" "}
                  <strong className="text-yellow-400">
                    {format(new Date(meeting.date), "dd/MM/yyyy")}
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

export default DeleteMeetingForm;
