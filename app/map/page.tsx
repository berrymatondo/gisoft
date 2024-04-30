"use client";

import dynamic from "next/dynamic";
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
import Image from "next/image";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import bgImage from "../../public/mappy.png";

const LazyMap = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MaPPage = () => {
  const [gis, setGis] = useState<any>();
  const [addresses, setAddresses] = useState<any>();

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();

      setGis(data);

      // console.log("data fetchGis: ", data);
    };
    fetchGis();

    const fetchAddresses = async () => {
      const data = await getAddresses();

      setAddresses(data);

      //   console.log("data addresses: ", data);
    };
    fetchAddresses();
  }, []);

  return (
    <div className="h-full sm:py-8 sm:px-32 w-full">
      <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
        <CardHeader className="bg-gradient-to-br  from-black/60 to-black/10 h-[150px] relative max-sm:p-2  m-1 rounded-md overflow-hidden">
          <div className=" absolute top-0 left-0 -z-10">
            <Image
              src={bgImage}
              alt="background"
              placeholder="blur"
              quality={100}
            />
          </div>
          <div className="flex justify-between items-center ">
            <CardTitle className="text-white text-4xl md:text-5xl">
              {"Les cellules d'Impact"}
            </CardTitle>
          </div>
          <CardDescription className="text-yellow-200 md:text-lg">
            {"Toutes les cellules d'impact sur carte"}
          </CardDescription>
        </CardHeader>
        <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
          <div className="p-2 text-xl">
            <SecteurBreadcrumb name={"Les cellules d'Impact"} />
          </div>
          <LazyMap addresses={addresses} gis={gis} secteurId={""} />
        </div>
      </div>
    </div>
  );
};

export default MaPPage;

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
