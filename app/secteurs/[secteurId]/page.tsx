import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import React from "react";
import {
  MdOutlineCalendarMonth,
  MdOutlineLocationOn,
  MdOutlinePerson,
  MdPeople,
} from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LuClock7 } from "react-icons/lu";
import Image from "next/image";
import bgTitle from "../../../public/loo.jpg";
import { HiMapPin } from "react-icons/hi2";
import { Gi } from "@prisma/client";

type SecteurProps = {
  params: {
    secteurId: number;
  };
};

const SecteurPage = async ({ params }: SecteurProps) => {
  const secteur = await prisma.secteur.findUnique({
    include: {
      gis: {
        include: { persons: true, address: true },
      },
      _count: {
        select: { gis: true },
      },
    },
    where: {
      id: +params.secteurId,
    },
  });

  console.log("secteur:", secteur);

  return (
    <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
      <CardHeader className="bg-gradient-to-br  from-black/80 to-black/20 h-[200px] relative max-sm:p-2  m-1 rounded-md overflow-hidden">
        <div className=" absolute top-0 left-0 -z-10">
          <Image
            src={bgTitle}
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
          <CardTitle className="text-white text-2xl">
            {"Résultats de la recherche"}
          </CardTitle>
        </div>
        <CardDescription className="text-yellow-200">
          {
            "Voici la liste de toutes les cellules correspondant à votre recherche"
          }
        </CardDescription>
      </CardHeader>

      <div className="p-2 text-xl">
        <SecteurBreadcrumb name={secteur?.name as string} />
      </div>
      <CardHeader className="max-sm:p-2">
        <div className="flex flex-col justify-center items-start">
          <CardTitle className="text-blue-600 text-lg">
            <strong className="pl-2 text-purple-800">
              {secteur?.gis.filter((gii: Gi) => gii.statut == "ACTIF").length}
            </strong>{" "}
            {" cellule(s) d'Impact trouvée(s) à "}{" "}
            <strong className="uppercase text-purple-800">
              {secteur?.name}
            </strong>
          </CardTitle>
        </div>
        <Link
          href={`/map/${params.secteurId}`}
          className=" flex justify-center items-center gap-2 p-1 text-sm border bg-white shadow-xl rounded-full"
        >
          Voir sur la carte <HiMapPin className="text-red-600" size={30} />
        </Link>
        {/*         <CardDescription className="text-neutral-600">
          {
            "Cette transaction permet de trouver une cellule d'impact sur base de son secteur (commune, ville, ...)"
          }
        </CardDescription> */}
      </CardHeader>

      {/*       <strong className="pl-2 text-purple-800">{secteur?.gis.length}</strong>{" "}
      {" cellule(s) d'Impact trouvé(e)s à "}{" "}
      <strong className="uppercase text-purple-800">{secteur?.name}</strong> */}
      {secteur?.gis
        .filter(
          (gii: Gi) =>
            gii.statut == "ACTIF" && gii.secteurId == params.secteurId
        )
        .map((gi) => (
          <div
            key={gi.id}
            className="mb-2 relative border bg-white shadow-lg   rounded-lg m-1 p-4"
          >
            {/*           <Image
            src={bgImage}
            alt="background"
            placeholder="blur"
            quality={100}
            style={{
              width: "100px",
            }}
            className="absolute right-0 rounded-lg"
          /> */}
            <div className="flex justify-between">
              <p className="mb-2">
                <strong className="pl-1 text-lg">{gi.name}</strong>
              </p>
              <p className="flex gap-2 items-center mb-2">
                <span className="italic">
                  <MdPeople />{" "}
                </span>
                <span
                  className={
                    gi.persons.length > 10 ? "text-red-400 font-semibold" : ""
                  }
                >
                  {gi.persons.length} membre(s)
                </span>
              </p>
            </div>
            <div className="flex justify-between gap-4 mb-2">
              <p className="flex gap-2 items-center">
                <span className="">
                  <MdOutlinePerson />{" "}
                </span>
                <span>Djedou Aman</span>
              </p>
              <p className="flex items-center">
                <span className="">
                  <MdOutlineCalendarMonth />
                </span>
                <span>Tous les jeudis</span>
              </p>
            </div>
            <div className="flex justify-between gap-4 mb-2">
              <p className="flex items-center">
                <span className="">
                  <FaMobileAlt />
                </span>
                <span>+32 45 67 89</span>
              </p>
              <p className="flex gap-2 justify-center items-center">
                <span className="">
                  <LuClock7 />{" "}
                </span>
                <span>{"19h à 20h30"}</span>
              </p>
            </div>
            <Link
              href={`/map/${params.secteurId}`}
              className="italic font-semibold flex gap-2 justify-center items-center pt-2"
            >
              <span className="text-orange-500">
                {" "}
                <MdOutlineLocationOn size={25} className="" />{" "}
              </span>
              <span>
                {gi.address?.street} {gi.address?.number} {gi.address?.box},{" "}
                {gi.address?.postalCode} {gi.address?.municipality}
              </span>
            </Link>

            <Link href={`/new/${gi.id}`}>
              <div className="mt-2 text-center text-black font-semibold p-2   w-full bg-[#317375] text-primary-foreground hover:bg-[#1b3738] rounded-full ">
                {"Rejoindre "} {gi.name}
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SecteurPage;

const SecteurBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/secteurs">Secteurs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
