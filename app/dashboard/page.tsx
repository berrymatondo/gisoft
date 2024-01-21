import { prisma } from "@/lib/prisma";
import React from "react";

const DashboardPage = async () => {
  const sec = await prisma.secteur.findFirst({
    where: {
      name: "forest",
    },
  });
  return <div>DashboardPage : {sec?.name}</div>;
};

export default DashboardPage;
