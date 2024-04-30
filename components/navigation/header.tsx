"use client";
import React from "react";
import { ModeToggle } from "../modeToggle";
import Image from "next/image";
import { Label } from "../ui/label";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import logo from "../../public/ggo.png";

const links = [
  { link: "/dashboard", name: "Dashboard" },
  { link: "/meetings", name: "Réunions" },
  { link: "/members", name: "Membres" },
  { link: "/addresses", name: "Adresses" },
  { link: "/gis", name: "Groupes/Secteurs" },
  { link: "/map", name: "map" },
  { link: "/users", name: "Utilisateurs" },
];

const Header = () => {
  const pathName = usePathname();

  return (
    <div className="sticky top-0 border-b  z-20 border-opacity-20 w-full bg-white/90 ">
      <div className="w-full bg-gradient-to-tr from-purple-600/10 to-blue-600/20">
        <nav className="flex justify-between items-center  ">
          {/*           <Link href="/" className="flex gap-2 items-baseline">

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
          <div className="max-md:hidden flex gap-4 text-xl text-neutral-500">
            {links.map((lk) => (
              <Link
                className={
                  pathName === lk.link
                    ? "hover:text-blue-400 text-blue-600 font-semibold"
                    : "hover:text-blue-400 "
                }
                key={lk.name}
                href={lk.link}
              >
                {lk.name}
              </Link>
            ))}
          </div> */}
          {/*         <div className="flex gap-2">
          <div className="flex flex-col justify-center items-center">
            <Label className=" ">Djedou</Label>
            <Label className=" text-xs text-blue-600">GI Forest 7</Label>
          </div>
          <Button className="p-1 bg-red-600 text-white font-normal">
            Déconnexion
          </Button>
        </div> */}
        </nav>
      </div>
    </div>
  );
};

export default Header;
