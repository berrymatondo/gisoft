import { prisma } from "@/lib/prisma";
import React from "react";

const AllSecteurs = async () => {
  const secteurs = await prisma.secteur.findMany({
    include: {
      gis: true,
    },
  });

  //console.log("SEC:", secteurs);

  return <div>Secteurs</div>;
};

export default AllSecteurs;
