import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import bgImage from "../public/loic.jpg";
import Link from "next/link";
import { GrTask } from "react-icons/gr";

import {
  MdDirectionsRun,
  MdHouse,
  MdOutlineMapsHomeWork,
  MdOutlinePeople,
  MdPeopleOutline,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2   h-full w-full absolute top-0 left-0 sm:px-2 lg:px-52  sm:flex sm:justify-center sm:items-center">
      <div className="relative -z-10  m-1 rounded-lg h-1/2 overflow-hidden sm:w-1/2">
        <Image
          src={bgImage}
          alt="background"
          placeholder="blur"
          quality={100}
        />
      </div>
      <div className="border h-1/2 sm:w-1/2">
        <div className="flex flex-col justify-center  max-md:bg-white/70 m-1 p-2 rounded-lg">
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-orange-600 flex flex-col justify-center text-3xl font-semibold pb-4">
            <p className="text-center md:text-6xl">{"Servir Dieu à travers"}</p>
            <p className="text-center md:text-6xl">{"les cellules d'Impact"}</p>
          </div>

          <p className="text-center text-sm md:text-lg text-neutral-600">
            {
              "Trouve et rejoins rapidement une cellule de maison à proximité de chez toi et viens y servir le Seigneur avec IMPACT"
            }
          </p>

          <div className="flex flex-col justify-center pt-4 md:mt-8 gap-8">
            <div className="flex flex-col justify-between">
              <Link href="/secteurs" className="text-center p-1">
                <div className="text-lg bg-gradient-to-r from-red-800/80 to-orange-500 text-white p-1 rounded-full">
                  {" "}
                  <p className="flex justify-center">
                    {" "}
                    <span className=" text-yellow-400 md:text-lg">
                      <MdDirectionsRun size={30} />
                    </span>{" "}
                    Rejoins vite
                  </p>
                  <p className="block md:text-lg">
                    {" "}
                    {" une cellule d'impact !"}
                  </p>
                </div>
              </Link>
              <Link
                href="https://forms.gle/Na1owLDgJjXej5fF9"
                target="_blank"
                className="text-center p-1"
              >
                <div className="text-xl bg-gradient-to-r from-blue-200/80 to-purple-200/80 text-black p-1 rounded-lg sm:mt-4">
                  {" "}
                  <p className="font-semibold flex justify-center items-center gap-2 text-sm md:text-lg">
                    {" "}
                    <span className=" text-yellow-600">
                      <MdOutlinePeople size={25} />
                    </span>{" "}
                    <span>Viens servir dans {" une cellule d'impact !"}</span>
                  </p>
                  {/*                   <p className="block"> {" une cellule d'impact !"}</p>
                   */}{" "}
                </div>
              </Link>
            </div>
            <Link href="/gis" className="text-center text-purple-800 text-ms">
              {"Plus d'informations"}
            </Link>

            {/*             <Link href="/gis">
              <Button className="flex flex-col justify-center  hover:bg-gradient-to-r hover:from-red-800 hover:to-orange-800/80 w-full text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-800/80 text-white">
                <p className="flex justify-center">
                  {" "}
                  <span className=" text-yellow-400">
                    <MdDirectionsRun size={30} />
                  </span>{" "}
                  Rejoins vite
                </p>
                <p className="block"> {" une cellule d'impact"}</p>
              </Button>
            </Link>
            <Link href="/gis">
              <Button className=" hover:text-yellow-400 hover:bg-white/20  w-full text-lg text-md bg-white/20 text-white md:p-8">
                Plus d'informations
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
    /*   <div className="bg-gradient-to-r from-black/80  to-transparent px-[10%] relative flex-1 flex flex-col justify-center md:justify-start items-center mb-1 w-full">
      <div className="inset-0 absolute -z-10 h-1/2 mx-1 rounded-md overflow-hidden md:hidden">
        <Image
          src={bgImage}
          alt="background"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 max-h-[200px] md:hidden"></div>
      <Card className="w-full bg-transparent text-center border-none md:mt-24 max-md:mt-60">
        <Label className="md:hidden text-5xl text-white bg-opacity-90 bg-teal-700 p-1 rounded-md">
          Mon<strong className="text-yellow-400">GI</strong>
        </Label>
        <div className="md:flex md:justify-between">
          <div className="md:flex md:flex-col md:w-1/2  rounded-lg">
            <CardHeader>
              <CardTitle className="text-orange-400  font-bold bg-opacity-65 rounded-md p-1  text-3xl md:text-5xl">
                {"Servir Dieu à travers les cellules d'Impact"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label className=" md:text-md md:text-lg font-normal md:text-end ">
                <div className="flex flex-col justify-start pl-10 text-neutral-100">
                  <p className="text-start">Cette platforme te permet:</p>

                  <p className="text-start pl-5">
                    {"* de trouver un groupe d'impact à proximité de chez toi"}
                  </p>
                  <p className="text-start pl-5">{"* de le rejoindre"}</p>
                  <p className="text-start pl-5">
                    {"* de servir Dieu à travers ce groupe d'Impact"}
                  </p>
                </div>
              </Label>
            </CardContent>
            <CardFooter className="flex flex-col justify-center pt-10 gap-4">
              <Link href="/gis">
                <Button className=" hover:bg-gradient-to-r hover:from-red-800 hover:to-orange-800/80 w-full text-xl font-bold bg-gradient-to-r from-orange-500 to-red-800/80 text-white md:text-3xl md:p-8">
                  {"Rejoindre un groupe d'impact"}
                </Button>
              </Link>
              <Link href="/gis">
                <Button className=" hover:text-yellow-400 hover:bg-white/20  w-full text-lg text-md bg-white/20 text-white md:p-8">
                  Plus d'informations
                </Button>
              </Link>
            </CardFooter>
          </div>
          <div className=" -z-10 max-md:hidden w-[600px] h-[200px] mx-1 rounded-md overflow-hidden mt-10">
            <Image
              src={bgImage}
              alt="background"
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </Card>
      <div className="max-md:hidden w-full mt-10 flex justify-between items-center ">
        <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">250</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              Membres au total
            </CardDescription>
          </CardHeader>
          <span className="text-purple-400">
            <MdPeopleOutline size={75} />
          </span>
        </Card>
        <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">36</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              {"Groupes d'impact"}
            </CardDescription>
          </CardHeader>
          <span className="text-green-400">
            <MdHouse size={75} />
          </span>
        </Card>
        <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">10</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              Secteurs
            </CardDescription>
          </CardHeader>
          <span className="text-orange-400">
            <MdOutlineMapsHomeWork size={75} />
          </span>
        </Card>
      </div>
    </div> */
  );
}
