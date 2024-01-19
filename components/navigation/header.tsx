import React from "react";
import { ModeToggle } from "../modeToggle";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Label } from "../ui/label";
import Link from "next/link";

const Header = () => {
  return (
    <div className="">
      <nav className="flex justify-between items-center p-1 bg-[#1b4c48]">
        <Link href="/">
          <Label className="text-xl text-white bg-teal-700 p-1 rounded-md">
            Mon<strong className="text-yellow-400">GI</strong>
          </Label>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <Label className=" text-white">Djedou</Label>
          <Label className=" text-xs text-yellow-400">GI Forest 7</Label>
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
