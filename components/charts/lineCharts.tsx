"use client";
import { getGis } from "@/lib/gis";
import { getMeeting } from "@/lib/meetings";
import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
} from "recharts";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Gi, Meeting, Person } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MdHouse,
  MdOutlineMapsHomeWork,
  MdPeopleOutline,
  MdPhone,
} from "react-icons/md";
import MembersDash from "../dashboard/membersDash";
import MeetingsDash from "../dashboard/meetingsDash";
import SecteursDash from "../dashboard/secteursDash";
import GisDash from "../dashboard/gisDash";

type LineChartsProps = {
  meetings: any;
  members: any;
  gis: any;
};

const LineCharts = ({ meetings, members, gis }: LineChartsProps) => {
  const [gisState, setGisState] = useState<any>();

  const form = useForm();

  const reg = form.watch("giId");
  let newMeets = meetings;
  let pilotes = [];

  console.log("INIT REG: ", reg);
  //console.log("newMeets avant:", newMeets);
  if (reg != "0" && reg) {
    //console.log("REG;", reg);
    //console.log("meetingggggg;", meetings);
    newMeets = meetings.filter((meet: Meeting) => meet.giId == reg);
    pilotes = members.filter(
      (meet: Person) => meet.giId == reg && meet.isPilote == true
    );
    //console.log("newMeets:", newMeets);
    //  console.log("meetings after:", meetings);
  }

  //console.log("newMeets:", newMeets);

  let sum: any = [];
  newMeets.reduce(function (res: any, value: any) {
    if (!res[value.date]) {
      res[value.date] = { date: value.date, nPar: 0, nNew: 0 };
      sum.push(res[value.date]);
    }
    res[value.date].nPar += value.nPar;
    res[value.date].nNew += value.nNew;
    return res;
  }, {});

  //console.log("SUM", sum);

  newMeets = sum;

  //console.log("my meets", meetings);

  /*   useEffect(() => {
    const fetchGis = async () => {
      const res = await getMee;
      //const data = res.json();

      console.log("actions: ", res);

      setGis(res);
    };
    fetchGis();
  }, []); */

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="max-w-[200px]  mt-2">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="giId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-white">
                      {"Choisir un groupe d'impact "}
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Choisir un groupe d'impact" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {reg != 0 && (
                          <SelectItem key={0} value={"0"}>
                            {"Effacer filtre"}
                          </SelectItem>
                        )}
                        {gis.map((gi: Gi) => (
                          <SelectItem key={gi.id} value={gi.id.toString()}>
                            {gi.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </div>
      {reg != "0" && reg && (
        <div className="md:hidden border rounded-lg px-4 py-2">
          <h1 className="text-lg font-bold text-yellow-400">Pilote(s)</h1>

          {pilotes.map((pil: Person) => (
            <div className="text-white flex items-center">
              {pil.firstname} {pil.lastname}{" "}
              <span className="flex items-center pl-2 text-yellow-500">
                <MdPhone />
                {pil.mobile}{" "}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className=" w-full md:mt-10 flex justify-between items-center ">
        {reg != "0" && reg && (
          <div className="max-md:hidden border rounded-lg px-4 py-2">
            <h1 className="text-lg font-bold text-yellow-400">Pilote(s)</h1>

            {pilotes.map((pil: Person) => (
              <div className="text-white flex items-center">
                {pil.firstname} {pil.lastname}{" "}
                <span className="flex items-center pl-2 text-yellow-500">
                  <MdPhone />
                  {pil.mobile}{" "}
                </span>
              </div>
            ))}
          </div>
        )}
        <MembersDash reg={reg} />
        {(reg == "0" || !reg) && <GisDash reg={reg} />}
        {(reg == "0" || !reg) && <SecteursDash reg={reg} />}
        {reg != "0" && reg && <MeetingsDash reg={reg} />}

        {/*         <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">36</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              {"Groupes d'impact"}
            </CardDescription>
          </CardHeader>
          <span className="text-green-400">
            <MdHouse size={75} />
          </span>
        </Card> */}
        {/*         <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">10</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              Secteurs
            </CardDescription>
          </CardHeader>
          <span className="text-orange-400">
            <MdOutlineMapsHomeWork size={75} />
          </span>
        </Card> */}
      </div>

      <div className="w-full h-full bg-white rounded-lg p-2">
        <ResponsiveContainer height={300}>
          <ComposedChart
            width={500}
            height={100}
            data={newMeets}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nNew" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="nPar" stroke="#ff7300" />
            {/*             <Line type="monotone" dataKey="nNew" stroke="#ff7300" />
             */}{" "}
            {/*         <Area
              type="monotone"
              dataKey="nPar"
              fill="#8884d8"
              stroke="#8884d8"
            /> */}
            {/*             <Line
              type="monotone"
              dataKey="nPar"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="nNew" stroke="#82ca9d" /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineCharts;
