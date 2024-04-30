import React from "react";
import { getGisAction } from "../_actions";
import { Gi, Secteur } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SearchGi from "@/components/searchGi";
import { getGisPages } from "@/lib/gis";
import Link from "next/link";
import GroupeRow from "@/components/groupes/groupeRow";
import SecteurRow from "@/components/secteurs/secteurRow";
import SearchSecteur from "@/components/searchSecteur";
import bgImage from "../../public/loo.jpg";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { HiMapPin } from "react-icons/hi2";

const SecteursPage = async ({
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

  const userCount = await prisma.secteur.count();

  //console.log("userCount", userCount);
  //console.log("search", search);

  const secteurs = await prisma.secteur.findMany({
    take: take,
    skip: skip,
    include: {
      gis: true,
      _count: {
        select: { gis: true },
      },
    },
    where: {
      name: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="h-full sm:py-8 sm:px-32 w-full">
      <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
        <CardHeader className="bg-gradient-to-br  from-black/60 to-black/10 h-[200px] relative max-sm:p-2  m-1 rounded-md overflow-hidden">
          <div className=" absolute top-0 left-0 -z-10">
            <Image
              src={bgImage}
              alt="background"
              placeholder="blur"
              quality={100}
              /*           style={{
            width: "100px",
          }} */
              /*           className="absolute right-0 rounded-lg"
               */
            />
          </div>

          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-4xl md:text-5xl">
              {"Trouver une cellule d'impact"}
            </CardTitle>
          </div>
          <CardDescription className="text-yellow-200 md:text-lg">
            {
              "Cette transaction permet de trouver une cellule d'impact sur base de son secteur (commune, ville, ...)"
            }
          </CardDescription>
        </CardHeader>
        <div className="flex justify-between my-2 mx-1 gap-2  ">
          <SearchSecteur search={search} />

          <div className=" flex gap-2 text-black text-sm">
            <Link
              href={{
                pathname: "/secteurs",
                query: {
                  ...(search ? { search } : {}),
                  skip: skip > 0 ? skip - take : 0,
                },
              }}
              className={
                skip == 0
                  ? "pointer-events-none bg-neutral-300 rounded-full p-2 text-neutral-500"
                  : "bg-[#317375] text-primary-foreground hover:bg-[#1b3738] rounded-full p-2   text-sm"
              }
            >
              {"Précédent"}
            </Link>

            <Link
              href={{
                pathname: "/secteurs",
                query: {
                  ...(search ? { search } : {}),
                  skip: skip + take,
                },
              }}
              className={
                skip + secteurs.length >= userCount
                  ? " text-sm pointer-events-none bg-neutral-300 rounded-full p-2 text-neutral-500"
                  : " text-sm  p-2 bg-[#317375] text-primary-foreground hover:bg-[#1b3738] rounded-full"
              }
            >
              {"Suivant"}
            </Link>
          </div>
        </div>
        <div className="p-2 text-xl flex justify-between gap-8 items-center">
          <div className="flex justify-between gap-2 items-center">
            <SecteurBreadcrumb name="xxx" />
            {/*             <span className="text-sm font-bold bg-[#317375] text-primary-foreground p-1 px-1.5 rounded-full">
              {secteurs.length}
            </span> */}
          </div>
          <Link
            href="/map"
            className="max-sm:text-xs flex items-center gap-1 bg-white rounded-full p-2"
          >
            <HiMapPin className="text-red-600" size={25} />
            {"Toutes les cellules"}
          </Link>
        </div>
        <div className="bg-white">
          {secteurs?.map((sec: Secteur, index: number) => (
            <SecteurRow
              secteurId={sec.id}
              key={sec.id}
              secteur={sec}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecteursPage;

const SecteurBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">Secteurs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
