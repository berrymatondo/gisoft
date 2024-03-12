"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";
import { Meeting } from "@prisma/client";
import DeleteMemberForm from "./deleteMemberForm";
import UpdateMemberForm from "./updateMemberForm";

type MemberRowProps = {
  member: any;
};

const MemberRow = ({ member }: MemberRowProps) => {
  //noStore();

  //console.log("MON MEET:", meeting);

  const router = useRouter();

  return (
    <TableRow
      key={member.id}
      className={!member.giId || member.giId == "0" ? `text-red-400` : ""}
    >
      {/*       <TableCell className="max-md:text-xs font-semibold">
        {format(new Date(meeting.date), "dd/MM/yyyy")}
        <p className="font-light">{meeting?.gi?.name}</p>
      </TableCell> */}

      <TableCell className="">
        <p>
          {member.firstname} <strong>{member.lastname}</strong>
          {member.isPilote && <span className="text-xl">👨‍✈️</span>}
        </p>
        <p className="md:hidden text-xs">{member.mobile}</p>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>{member.mobile}</p>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>{member.city}</p>
      </TableCell>
      <TableCell className="">
        <p>{member.gi ? member.gi.name : ""}</p>
      </TableCell>
      {/*       <TableCell className="max-md:hidden">
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
      </TableCell> */}
      <TableCell className="flex justify-end items-center gap-4 ">
        {/*         <Button onClick={() => router.push(`/gis/${gi.id}`)}>Consulter</Button>
         */}{" "}
        <DeleteMemberForm member={member} />
        <UpdateMemberForm inMember={member} />
      </TableCell>
    </TableRow>
  );
};

export default MemberRow;
