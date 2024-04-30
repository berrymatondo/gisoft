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
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import bgTitle from "../../../public/loo.jpg";

const LazyMap = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type MapSecteurPageProps = {
  params: {
    mapId: number;
  };
};

const MapSecteurPage = ({ params }: MapSecteurPageProps) => {
  // console.log("mapId", params.mapId);

  const [gis, setGis] = useState<any>();
  const [addresses, setAddresses] = useState<any>();

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();

      setGis(data);

      //  console.log("data fetchGis: ", data);
    };
    fetchGis();

    const fetchAddresses = async () => {
      const data = await getAddresses();

      setAddresses(data);

      // console.log("data addresses: ", data);
    };
    fetchAddresses();
  }, []);

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
            <p className=" text-center">{"Demande enregistrée !!!"}</p>
          </CardTitle>
        </div>
      </CardHeader>
      <div className="p-2 text-xl">
        <SecteurBreadcrumb name={"xxx"} />
      </div>
      <LazyMap addresses={addresses} gis={gis} secteurId={params.mapId} />
    </div>
  );
};

export default MapSecteurPage;

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
