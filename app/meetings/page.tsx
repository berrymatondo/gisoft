import MeetingsList from "@/components/meetings/meetingsList";
import { prisma } from "@/lib/prisma";
import React from "react";

const MeetingsPage = async () => {
  const meetings = await prisma.meeting.findMany({
    include: {
      gi: true,
      // secteurs: true,
    },
    orderBy: { date: "desc" },
  });

  const gis = await prisma.gi.findMany({
    include: {
      secteur: true,
      // secteurs: true,
    },
    orderBy: { name: "asc" },
  });

  //console.log("Meetings", meetings);

  return (
    <div className="h-full flex-1 px-1 w-full">
      <MeetingsList meetings={meetings} gis={gis} />
    </div>
  );
};

export default MeetingsPage;
