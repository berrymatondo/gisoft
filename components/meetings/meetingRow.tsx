"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import DeleteMeetingForm from "./deleteMeetingForm";
import UpdateMeetingForm from "./updateMeetingForm";

import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";
import { Meeting } from "@prisma/client";

type MeetingRowPops = {
  meeting: any;
};

const MeetingRow = ({ meeting }: MeetingRowPops) => {
  //noStore();

  //console.log("MON MEET:", meeting);

  const router = useRouter();

  return (
    <TableRow key={meeting.id}>
      <TableCell className="max-md:text-xs font-semibold">
        {format(new Date(meeting.date), "dd/MM/yyyy")}
        <p className="font-light">{meeting?.gi?.name}</p>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>{meeting.nPar}</p>
      </TableCell>
      <TableCell className="md:hidden ">
        <p>
          {meeting.nPar} / {meeting.nCon}
        </p>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>{meeting.nCon}</p>
      </TableCell>

      <TableCell className="max-md:hidden">
        <p>{meeting.nIcc}</p>
      </TableCell>
      <TableCell className="md:hidden ">
        <p>
          {meeting.nIcc} / {meeting.nNIcc}
        </p>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>{meeting.nNIcc}</p>
      </TableCell>

      <TableCell className="max-md:hidden">
        <p>{meeting.nStar}</p>
      </TableCell>
      <TableCell className="md:hidden ">
        <span>
          {meeting.nStar} / {meeting.nNew}
        </span>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>{meeting.nNew}</p>
      </TableCell>

      <TableCell className="flex justify-end items-center gap-4 ">
        {/*         <Button onClick={() => router.push(`/gis/${gi.id}`)}>Consulter</Button>
         */}{" "}
        <DeleteMeetingForm meeting={meeting} />
        <UpdateMeetingForm inMeeting={meeting} />
        {/*         <UpdateMeetingForm meeting={meeting} />
         */}{" "}
      </TableCell>
    </TableRow>
  );
};

export default MeetingRow;
