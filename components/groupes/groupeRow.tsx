"use client";
import { useRouter } from "next/navigation";
import React from "react";

type GroupeRowProps = {
  groupeId: number;
  gi: any;
};

const GroupeRow = ({ groupeId, gi }: GroupeRowProps) => {
  const router = useRouter();
  return (
    <div
      className=" border border-white m-1 p-2 rounded-lg"
      onClick={() => router.push(`/groupes/${groupeId}`)}
    >
      {groupeId} - {gi.name}
    </div>
  );
};

export default GroupeRow;
