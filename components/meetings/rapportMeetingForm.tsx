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
import { useEffect, useState } from "react";
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
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";

type DeleteMeetingProps = {
  meeting: any;
};

const RapportMeetingForm = ({ meeting }: DeleteMeetingProps) => {
  const [open, setOpen] = useState(false);
  const backdrop =
    "top-0 left-0 z-10 w-full h-full absolute flex justify-center items-center";
  const wind = " w-96 flex flex-col rounded-lg overflow-hidden";
  const container =
    "border-b text-white py-4 flex justify-between items-center";
  const title = "text-yellow-400 text-xl inline cursor-pointer";
  const subTitle = "font-bold";
  const content = "p-4 text-white my-1 rounded";
  const btn = "bg-[#3e3278] text-white py-2";
  const [copied, setCopied] = useState(false);
  const [val, setVal] = useState("");
  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      date: meeting.date.toString(),
      id: meeting.id.toString(),
    },
  });

  useEffect(() => {
    setVal(
      `Bonsoir Pasteur Dominique,\nBonsoir à tous, \n \nRapport *${
        meeting.gi.name
      }* du *${format(
        new Date(meeting.date),
        "dd-MM-yyyy"
      )}* \nNbre de connexions: *${meeting.nCon}*\nNbre de participants: *${
        meeting.nPar
      }*\nNbre membres ICC: *${meeting.nIcc}* \nNbre non ICC: *${
        meeting.nNIcc
      }*\nNbre de nouveaux : *${meeting.nNew}*\nNbre de stars: *${
        meeting.nStar
      }* \n \nBlessings,\nBerry\n`
    );
  }, [meeting]);

  const copyHandler = () => {
    navigator.clipboard.writeText(val);
    setCopied(true);
  };

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
          <Button className="" variant="secondary">
            Rapport
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild className="md:hidden">
          <span>
            <HiOutlineDocumentReport
              className="text-yellow-500 md:hidden"
              size={25}
            />{" "}
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          {/*           <DialogHeader>
            <DialogTitle>{"Supprimer un rapport"}</DialogTitle>
          </DialogHeader> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(procesForm)}>
              <div className="grid gap-4 py-4">
                <div className={wind}>
                  <CopyToClipboard text={val} onCopy={() => setCopied(true)}>
                    <div className={container}>
                      <h1 className="text-blue-600 text-xl">
                        Rapport du GI{" "}
                        <span className={subTitle}>{meeting.gi.name}</span>
                      </h1>
                      {copied ? (
                        <div className="text-blue-600 text-sm">{"Copié"}</div>
                      ) : (
                        ""
                      )}

                      <span className="text-blue-600">
                        <MdOutlineContentCopy
                          onClick={() => copyHandler()}
                          className="cursor-pointer "
                        />
                      </span>
                    </div>
                  </CopyToClipboard>

                  <div className="">
                    <p>Bonsoir Pasteur Dominique, </p>
                    <p>Bonsoir à tous, </p>
                    <br />
                    <p>
                      Rapport GI *{meeting.gi.name}* du *
                      {format(new Date(meeting.date), "dd-MM-yyyy")}*
                    </p>
                    <br />
                    <p>Nbre de connexions: *{meeting.nCon}*</p>
                    <p>Nbre de participants: *{meeting.nPar}*</p>
                    <p>Nbre membres ICC: *{meeting.nIcc}* </p>
                    <p>Nbre non ICC: *{meeting.nNIcc}*</p>
                    <p>Nbre de nouveaux : *{meeting.nNew}*</p>
                    <p>Nbre de stars: *{meeting.nStar}*</p>
                    <br />
                    <p>Blessings 🔥,</p>
                    {/*                     <p>Berry</p>
                     */}{" "}
                  </div>
                  {/*                   <button className={btn} onClick={() => console.log("end")}>
                    Fermer
                  </button> */}
                </div>
              </div>
              <DialogFooter className="md:flex md:justify-between md:items-center">
                {/*                 <Button
                  className="max-md:mt-4"
                  type="button"
                  onClick={procesForm}
                >
                  Confirmer
                </Button> */}
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="max-md:mt-4 w-full text-red-600"
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

export default RapportMeetingForm;
