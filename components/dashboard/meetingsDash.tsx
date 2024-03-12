"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { MdPeopleOutline } from "react-icons/md";
import { getGis } from "@/lib/gis";
import { getGiMeetings, getMeeting, getMeetings } from "@/lib/meetings";
import { FaPeopleGroup } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type MeetingsDashProps = {
  reg: any;
};

const MeetingsDash = ({ reg }: MeetingsDashProps) => {
  const [totalMeetings, setTotalMeetings] = useState(0);
  const router = useRouter();
  useEffect(() => {
    //console.log("REG:", reg);

    if (reg != "0" && reg) {
      const fetchMeetings = async () => {
        const data: any = await getGiMeetings(reg);
        setTotalMeetings(data.length);
      };
      fetchMeetings();
    } else {
      const fetchMeetings = async () => {
        const data: any = await getMeetings();
        setTotalMeetings(data.length);
      };
      fetchMeetings();
    }
  }, [reg]);

  return (
    <Card
      onClick={() => router.push("/meetings")}
      className="hover:cursor-pointer hover:bg-green-800 px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white max-md:w-[100px] md:w-[250px] border-none"
    >
      <CardHeader>
        <CardTitle className="md:text-5xl max-md:flex max-md:gap-4">
          {totalMeetings}
          <span className="md:hidden text-purple-400">
            <FaPeopleGroup size={30} />
          </span>
        </CardTitle>
        <CardDescription className="max-md:hidden text-yellow-400 text-sm">
          {"Réunions"}
        </CardDescription>
        <CardDescription className="md:hidden text-yellow-400 text-sm">
          {"Réunions"}
        </CardDescription>
      </CardHeader>
      <span className="max-md:hidden text-purple-400">
        <FaPeopleGroup size={75} />
      </span>
    </Card>
  );
};

export default MeetingsDash;
