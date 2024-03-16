import LineCharts from "@/components/charts/lineCharts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getGis } from "@/lib/gis";
import { getMembers } from "@/lib/members";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import React from "react";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const meetings = await prisma.meeting.findMany({
    orderBy: {
      date: "asc",
    },
  });

  const ms = meetings.map(({ id, nPar, nNew, giId, date }) => ({
    id,
    nPar,
    nNew,
    giId,
    date: format(new Date(date), "dd/MM/yyyy"),
  }));

  const gis = await getGis();
  const members = await getMembers();

  //console.log("Meetings:", meetings);
  //console.log("ms:", ms);

  /*   useEffect(() => {
    const fetchGis = async () => {
      const data = await getGis();
      //const data = res.json();

      // console.log("actions: ", data);

      setGis(data);
    };
    fetchGis();
  }, []); */

  return (
    <div className="flex justify-start px-2">
      <LineCharts meetings={ms} members={members} gis={gis} />
    </div>
  );
};

export default DashboardPage;
