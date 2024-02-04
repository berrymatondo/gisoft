"use client";
import React from "react";
import { ModeToggle } from "../modeToggle";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Label } from "../ui/label";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
const links = [
  { link: "/dashboard", name: "Dashboard" },
  { link: "/meetings", name: "Réunions" },
  { link: "/members", name: "Membres" },
  { link: "/gis", name: "Groupes/Secteurs" },
  { link: "/users", name: "Utilisateurs" },
];

const Header = () => {
  const pathName = usePathname();

  return (
    <div className="border-b border-white border-opacity-20 pb-4 w-full">
      <nav className="flex justify-between items-center p-2 md:p-4 bg-[#1b4c48] md:rounded-lg">
        <Link href="/">
          <Label className="text-xl md:text-4xl text-white bg-teal-700 p-1 rounded-md hover:cursor-pointer">
            Mon<strong className="text-yellow-400">GI</strong>
          </Label>
        </Link>
        <div className="max-md:hidden text-white flex gap-4">
          {links.map((lk) => (
            <Link
              className={
                pathName === lk.link
                  ? "hover:text-yellow-400 text-lg text-yellow-400"
                  : "hover:text-yellow-400 text-lg"
              }
              key={lk.name}
              href={lk.link}
            >
              {lk.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-center items-center">
            <Label className=" text-white">Djedou</Label>
            <Label className=" text-xs text-yellow-400">GI Forest 7</Label>
          </div>
          <Button className="p-1 bg-red-600 text-white font-normal">
            Déconnexion
          </Button>
        </div>
        {/*         <div
          className="
         bg-red-400"
        >
          <Image src={logo} alt="logo" className="bg-green-400" />
        </div> 
        <ModeToggle />*/}
      </nav>
    </div>
  );
};

export default Header;
