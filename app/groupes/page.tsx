import React from "react";
import { getGisAction } from "../_actions";
import { Gi } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SearchGi from "@/components/searchGi";
import { getGisPages } from "@/lib/gis";
import Link from "next/link";
import GroupeRow from "@/components/groupes/groupeRow";

const GroupesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const userCount = await prisma.gi.count();

  //console.log("userCount", userCount);
  //console.log("search", search);

  const gis = await prisma.gi.findMany({
    take: take,
    skip: skip,
    include: {
      secteur: true,
    },
    where: {
      name: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      name: "asc",
    },
  });

  console.log("gis", gis);

  return (
    <div className="">
      <div className="flex justify-between gap-2">
        <SearchGi search={search} />
        <div className="flex justify-normal gap-2 ">
          {skip == 0 ? null : (
            <Link
              href={{
                pathname: "/groupes",
                query: {
                  ...(search ? { search } : {}),
                  skip: skip > 0 ? skip - take : 0,
                },
              }}
            >
              {"Précédent"}
            </Link>
          )}
          {skip + gis.length >= userCount ? null : (
            <Link
              href={{
                pathname: "/groupes",
                query: {
                  ...(search ? { search } : {}),
                  skip: skip + take,
                },
              }}
            >
              {"Suivant"}
            </Link>
          )}
        </div>
      </div>
      {gis?.map((gi: Gi) => (
        <GroupeRow groupeId={gi.id} key={gi.id} gi={gi} />
      ))}
    </div>
  );
};

export default GroupesPage;
