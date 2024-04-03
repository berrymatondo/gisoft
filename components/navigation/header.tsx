"use client";
import React, { useState } from "react";
import { ModeToggle } from "../modeToggle";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Label } from "../ui/label";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";

const links = [
  { link: "/dashboard", name: "Dashboard" },
  { link: "/meetings", name: "Réunions" },
  { link: "/members", name: "Membres" },
  { link: "/gis", name: "Groupes/Secteurs" },
  { link: "/users", name: "Utilisateurs" },
];

const Header = () => {
  const pathName = usePathname();
  const user = useCurrentUser();
  const [isLogginOut, setIsLogginOut] = useState(false);

  const handleSignout = () => {
    setIsLogginOut(true);
    setTimeout(() => {
      signOut();
    }, 3000);
  };

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

        {user && (
          <div className="flex gap-2">
            <div className="flex flex-col justify-center items-center">
              <Label className=" text-white"> {user?.name} </Label>
              <Label className=" text-xs text-yellow-400">{user?.email}</Label>
            </div>

            <Button
              className="p-1 bg-red-600 text-white font-normal"
              onClick={handleSignout}
            >
              Déconnexion
            </Button>
          </div>
        )}

        {isLogginOut && (
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="flex items-center text-yellow-400 text-lg">
              <FiLoader className="animate-spin mr-2" />
              <span>Déconnexion en cours...</span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
