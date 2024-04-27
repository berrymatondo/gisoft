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
  console.log("mapId", params.mapId);

  const [gis, setGis] = useState<any>();
  const [addresses, setAddresses] = useState<any>();

  useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();

      setGis(data);

      console.log("data fetchGis: ", data);
    };
    fetchGis();

    const fetchAddresses = async () => {
      const data = await getAddresses();

      setAddresses(data);

      console.log("data addresses: ", data);
    };
    fetchAddresses();
  }, []);

  return (
    <div className="sm:col-span-3 w-full border-none bg-neutral-300/20 ">
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
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
