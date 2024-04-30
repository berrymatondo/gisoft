"use client";
import React from "react";
import { ModeToggle } from "../modeToggle";
import Image from "next/image";
import { Label } from "../ui/label";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import logo from "../../public/ggo.png";
import { MdDashboard } from "react-icons/md";

const links = [
  { link: "/dashboard", name: "Dashboard", color: "text-green-400" },
  { link: "/meetings", name: "Réunions", color: "text-purple-400" },
  { link: "/members", name: "Membres", color: "text-yellow-400" },
  { link: "/addresses", name: "Adresses", color: "text-orange-400" },
  { link: "/gis", name: "Groupes/Secteurs", color: "text-teal-600" },
  { link: "/map", name: "map", color: "text-neutral-400" },
  { link: "/users", name: "Utilisateurs", color: "text-red-400" },
];

const HeaderVert = () => {
  const pathName = usePathname();

  if (pathName == "/") return <div></div>;

  return (
    <div className=" md:col-span-1 max-md:hidden flex flex-col gap-8 rounded-lg items-center text-xl text-neutral-500 mt-8 ml-12 sticky top-0 w-full ">
      {pathName != "/" && (
        <Link
          href="/"
          className="flex gap-2 items-baseline border-2 border-gray-300 p-4 rounded-lg"
        >
          {/*           <div className="relative uppercase text-xl md:text-4xl p-2 rounded-lg hover:cursor-pointer flex  items-end">
            <strong className="text-xl md:text-lg">Groupes</strong>
            <strong className=" top-5 text-xl md:text-3xl text-blue-600">
              {"D'Impact"}
            </strong>
          </div> */}
          <div className="h-8 w-8">
            <Image src={logo} alt="logo" />
          </div>
          <span className="text-xl font-semibold ">
            {"Cellules d'"}
            <strong className="text-2xl text-purple-700 uppercase">
              Impact
            </strong>
          </span>
        </Link>
      )}

      {pathName != "/" &&
        links.map((lk) => (
          <Link
            className={
              pathName === lk.link
                ? "border rounded-lg hover:bg-blue-400 bg-primary text-white font-semibold  w-full "
                : "border rounded-lg hover:bg-blue-400  w-full "
            }
            key={lk.name}
            href={lk.link}
          >
            <p className="flex items-center text-xl gap-2 p-1">
              <MdDashboard size={30} className={lk.color} />
              <span>{lk.name} </span>
            </p>
          </Link>
        ))}
    </div>
  );
};

export default HeaderVert;
