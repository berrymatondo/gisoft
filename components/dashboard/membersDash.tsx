"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MdPeopleOutline } from "react-icons/md";
import { getGis } from "@/lib/gis";
import { getGiMembers, getMembers } from "@/lib/members";
import { useRouter } from "next/navigation";

type MembersDashProps = {
  reg: any;
};

const MembersDash = ({ reg }: MembersDashProps) => {
  const [totalMembers, setTotalMembers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (reg != "0" && reg) {
      const fetchGiMembers = async () => {
        const data: any = await getGiMembers(reg);
        setTotalMembers(data.length);
      };
      fetchGiMembers();
    } else {
      const fetchMembers = async () => {
        const data: any = await getMembers();
        setTotalMembers(data.length);
      };
      fetchMembers();
    }
  }, [reg]);

  return (
    <Card
      onClick={() => router.push("/members")}
      className="hover:cursor-pointer hover:bg-green-800 px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white max-md:w-[100px] md:w-[250px] border-none"
    >
      <CardHeader>
        <CardTitle className="md:text-5xl max-md:flex max-md:gap-4">
          {totalMembers}{" "}
          <span className="md:hidden text-red-400">
            <MdPeopleOutline size={30} />
          </span>
        </CardTitle>
        <CardDescription className="text-yellow-400 text-sm">
          Membres
        </CardDescription>
      </CardHeader>
      <span className="max-md:hidden text-red-400">
        <MdPeopleOutline size={75} />
      </span>
    </Card>
  );
};

export default MembersDash;
