"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MdOutlineMapsHomeWork, MdPeopleOutline } from "react-icons/md";
import { getGis } from "@/lib/gis";
import { getSecteurs } from "@/lib/secteurs";

type GisDashProps = {
  reg: any;
};

const SecteursDash = ({ reg }: GisDashProps) => {
  const [totalSecteurs, setTotalSecteurs] = useState(0);
  useEffect(() => {
    //console.log("REG:", reg);

    if (reg != "0" && reg) {
      console.log("OK");
    } else {
      const fetchSecteurs = async () => {
        const data: any = await getSecteurs();
        setTotalSecteurs(data.length);
      };
      fetchSecteurs();
    }
  }, [reg]);

  return (
    <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white max-md:w-[100px] md:w-[250px] border-none">
      <CardHeader>
        <CardTitle className="md:text-5xl max-md:flex max-md:gap-4">
          {totalSecteurs}{" "}
          <span className="md:hidden text-orange-400">
            <MdOutlineMapsHomeWork size={30} />
          </span>
        </CardTitle>
        <CardDescription className="max-md:hidden text-yellow-400 text-sm">
          Secteurs
        </CardDescription>
        <CardDescription className="md:hidden text-yellow-400 text-sm">
          Secteurs
        </CardDescription>
      </CardHeader>
      <span className="max-md:hidden text-orange-400">
        <MdOutlineMapsHomeWork size={75} />
      </span>
    </Card>
  );
};

export default SecteursDash;
