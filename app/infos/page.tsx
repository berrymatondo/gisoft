import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { getAddresses } from "@/lib/addresses";
import { getGis } from "@/lib/gis";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import bgTitle from "../../public/loo.jpg";

const raisons = [
  { id: 1, lib: "Pour mieux comprendre la parole de Dieu" },
  { id: 2, lib: "Pour apprendre à prier avec et pour les autres" },
  { id: 3, lib: "Pour apprendre à évangéliser les voisins" },
  { id: 4, lib: "Pour apprendre à paître les brebis du Seigneur" },
  { id: 5, lib: "Pour apprendre à exhorter" },
  {
    id: 6,
    lib: "Pour contribuer à la croissance de l'église en invitant les voisins à l'église",
  },
  { id: 7, lib: "Pour devenir un véritable disciple de Jésus-Christ" },
];

const InfosPage = () => {
  return (
    <div className="sm:col-span-3 w-full border-none bg-neutral-100/20 ">
      <CardHeader className="bg-gradient-to-br  from-black/80 to-black/20 h-[200px] relative max-sm:p-2  m-1 rounded-md overflow-hidden">
        <div className=" absolute top-0 left-0 -z-10">
          <Image
            src={bgTitle}
            alt="background"
            placeholder="blur"
            quality={100}
          />
        </div>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-2xl  w-full">
            <p className=" ">
              {"Pourquoi dois-je fréquenter une cellule d'impact ?"}
            </p>
          </CardTitle>
        </div>
      </CardHeader>
      <div className="p-2 text-xl">
        <SecteurBreadcrumb name={"Informations"} />
      </div>
      <section className="flex flex-col items-center font-semibold text-2xl  m-2 p-2 rounded-lg bg-gradient-to-r from-red-800/80 to-orange-500 text-white">
        <h1>
          <span className="text-[#93dde0] font-bold text-4xl">7</span>
          {" bonnes raisons de fréquenter"}
        </h1>
        <h1>{"une cellule d'impact"}</h1>
      </section>
      <div>
        {raisons.map((raison) => (
          <p key={raison.id} className="m-2 bg-[#CFE9EA] p-2 rounded-lg">
            <span className="bg-[#376b6d] px-2.5 py-1 rounded-full text-yellow-400 font-semibold">
              {raison.id}
            </span>{" "}
            {raison.lib}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfosPage;

const SecteurBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
