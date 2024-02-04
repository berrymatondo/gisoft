import MembersList from "@/components/members/membersList";
import { prisma } from "@/lib/prisma";
import React from "react";

const MembersPage = async () => {
  const members = await prisma.person.findMany({
    include: {
      gi: true,
      secteurs: true,
    },
  });

  return (
    <div className="h-full flex-1 px-1 w-full">
      <MembersList members={members} />
    </div>
  );
};

export default MembersPage;
