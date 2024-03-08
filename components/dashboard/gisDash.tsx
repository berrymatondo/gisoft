"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MdHouse, MdPeopleOutline } from "react-icons/md";
import { getGis } from "@/lib/gis";

type GisDashProps = {
  reg: any;
};

const GisDash = ({ reg }: GisDashProps) => {
  const [totalGis, setTotalGis] = useState(0);
  useEffect(() => {
    if (reg != "0" && reg) {
      console.log("OK");
    } else {
      const fetchGis = async () => {
        const data: any = await getGis();
        setTotalGis(data.length);
      };
      fetchGis();
    }
  }, [reg]);

  return (
    <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white max-md:w-[100px] md:w-[250px] border-none">
      <CardHeader>
        <CardTitle className="md:text-5xl max-md:flex max-md:gap-4">
          {totalGis}{" "}
          <span className="md:hidden text-green-400">
            <MdHouse size={30} />
          </span>
        </CardTitle>
        <CardDescription className="max-md:hidden text-yellow-400 text-sm">
          {"Groupes d'Impact"}
        </CardDescription>
        <CardDescription className="md:hidden text-yellow-400 text-sm">
          {"Groupes"}
        </CardDescription>
      </CardHeader>
      <span className="max-md:hidden text-green-400">
        <MdHouse size={75} />
      </span>
    </Card>
  );
};

export default GisDash;
