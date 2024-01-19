import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import bgImage from "../public/azert.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex-1 px-1 flex flex-col justify-center items-center mb-1">
      {/*       <div className="inset-0 absolute -z-10 h-1/2 mx-1 rounded-md overflow-hidden">
       */}{" "}
      <div className="inset-0 absolute -z-10 h-1/3 mx-1 rounded-md overflow-hidden">
        <Image
          src={bgImage}
          alt="background"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-1 max-h-[170px] ">xxx</div>
      <Card className="w-full bg-transparent text-white text-center border-none">
        <Label className="text-5xl text-white bg-opacity-90 bg-teal-700 p-1 rounded-md">
          Mon<strong className="text-yellow-400">GI</strong>
        </Label>
        <CardHeader>
          <CardTitle className="bg-black bg-opacity-65 rounded-md p-1 text-yellow-200 text-xl">
            {"Outil pour une gestion efficace d'un groupe d'impact"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="font-semibold text-white  ">
            {
              "Cet outil a pour but d'aider les pilotes des groupes d'impact à pouvoir suivre de prêt l'évolution du groupe d'impact qui lui a été confié, dans le but d'aumenter on efficacité."
            }
          </Label>
        </CardContent>
        <CardFooter className="flex justify-center pt-10">
          <Link href="/gis">
            <Button className="w-full text-xl font-bold  text-green-900">
              Démarrer
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
