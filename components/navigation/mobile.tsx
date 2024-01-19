import Link from "next/link";
import React from "react";
import {
  MdDashboard,
  MdEditDocument,
  MdHouse,
  MdOutlinePerson,
  MdPeopleOutline,
} from "react-icons/md";
import { Label } from "../ui/label";

const navList = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: <MdDashboard size={40} />,
    color: "text-orange-400",
  },
  {
    id: 2,
    name: "Groupes",
    href: "/gis",
    icon: <MdHouse size={40} />,
    color: "text-green-400",
  },
  {
    id: 3,
    name: "Réunions",
    href: "/reports",
    icon: <MdEditDocument size={40} />,
    color: "text-blue-400",
  },
  {
    id: 4,
    name: "Membres",
    href: "/members",
    icon: <MdPeopleOutline size={40} />,
    color: "text-purple-400",
  },
  {
    id: 5,
    name: "Utilisateurs",
    href: "/users",
    icon: <MdOutlinePerson size={40} />,
    color: "text-cyan-400",
  },
];

const MobileNav = () => {
  return (
    <div className="flex justify-between items-center p-2 my-2 mx-1 text-white bg-[#1b4c48] rounded-md">
      {navList.map((nav) => (
        <Link key={nav.id} href={nav.href}>
          <span className={`flex flex-col items-center ${nav.color}`}>
            {nav.icon}
          </span>
          <Label className="text-xs">{nav.name}</Label>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
