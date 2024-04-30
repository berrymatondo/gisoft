import Image from "next/image";
import React from "react";
import im from "../../public/loo.jpg";
import { Button } from "@/components/ui/button";
import { MdDirectionsRun } from "react-icons/md";
import Link from "next/link";

const LookPage = () => {
  return (
    <div className="grid sm:grid-cols-6 sm:h-full">
      <div className="max-sm:hidden h-screen"></div>
      <div className="sm:col-span-4  flex flex-col justify-center">
        <div className="relative sm:h-[500px] w-full grid sm:grid-cols-5">
          <div className="max-sm:hidden col-span-2 ">
            <div className=" absolute left-8 top-12  w-[650px] h-[400px]  flex flex-col justify-around bg-white/60 rounded-lg p-4">
              <h1 className="font-bold text-6xl text-purple-700">
                {"Sers Dieu à travers les groupes d'Impact"}
              </h1>
              <p className="text-xl">
                {
                  "Cette platforme te permet de <strong>trouver</strong> un groupe d'impact à proximité de chez toi, de le "
                }
                <strong>rejoindre</strong> et de <strong>servir</strong>{" "}
                {"Dieu à travers ce groupe d'Impact."}
              </p>
              <div className="flex items-end gap-2">
                <Button className="text-2xl p-8 bg-gradient-to-tr from-blue-800 to-purple-800 hover:bg-yellow-600">
                  {"Rejoins un groupe d'Impact!"}
                </Button>
                <Button variant="outline">{"Plus d'informations"}</Button>
              </div>
            </div>
          </div>
          <div className="sm:col-span-3  overflow-hidden rounded-lg m-1">
            <Image
              alt="logo"
              src={im}
              //fill
              //sizes="50vw"
              //style={{ objectFit: "contain" }}
            />
          </div>

          <div className="sm:hidden  flex flex-col">
            <h1 className="text-center font-bold text-3xl text-purple-800 border bg-white  my-2 mx-1 p-2 rounded-lg">
              {"Sers Dieu à travers les cellules d'Impact"}
            </h1>
            <p className="p-3 text-center">
              Cette platforme te permet de <strong>trouver</strong> une cellule
              {"d'impact à proximité de chez toi,"} de la{" "}
              <strong>rejoindre</strong> et à travers elle de{" "}
              <strong>servir</strong> Dieu avec Impact.
            </p>
            <div className="flex flex-col items-center p-4 gap-4">
              <Link
                href="/groupes"
                className="w-full py-2 bg-gradient-to-tr from-yellow-600 to-purple-800 hover:bg-yellow-600 rounded-full"
              >
                <div className="text-2xl font-semibold text-gray-100">
                  <p className="flex justify-center items-center text-center">
                    <span className=" text-yellow-400">
                      <MdDirectionsRun size={30} />
                    </span>
                    <span>Rejoins vite</span>
                  </p>
                  <p className="text-center"> {"une cellule d'Impact!"}</p>
                </div>
              </Link>
              <Button
                className="bg-neutral-100/30 text-purple-800"
                variant="link"
              >
                {"Plus d'informations"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/*       <div className="bg-neutral-100 h-screen">y</div>
      <div className="bg-neutral-200 h-screen">y</div>
      <div className="bg-neutral-100 h-screen">y</div> */}
      <div className="max-sm:hidden h-screen"></div>
    </div>
  );
};

export default LookPage;
