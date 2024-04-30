import MembersList from "@/components/members/membersList";
import { prisma } from "@/lib/prisma";
import React from "react";

const MembersPage = async () => {
  const members = await prisma.person.findMany({
    include: {
      gi: true,
      secteurs: true,
    },

    orderBy: {
      lastname: "asc",
    },
  });

  const gis = await prisma.gi.findMany({
    include: {
      secteur: true,
      // secteurs: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="h-full py-8 px-32 w-full">
      <MembersList members={members} gis={gis} />
    </div>
  );
};

export default MembersPage;
