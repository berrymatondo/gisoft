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
import {
  MdHouse,
  MdOutlineMapsHomeWork,
  MdPeopleOutline,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="relative flex-1 px-1 flex flex-col justify-center md:justify-start items-center mb-1 w-full">
      {/*       <div className="inset-0 absolute -z-10 h-1/2 mx-1 rounded-md overflow-hidden">
       */}{" "}
      <div className="inset-0 absolute -z-10 h-1/3 mx-1 rounded-md overflow-hidden md:hidden">
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
      <div className="flex-1 max-h-[200px] md:hidden"></div>
      <Card className="w-full bg-transparent text-white text-center border-none md:mt-24">
        <Label className="md:hidden text-5xl text-white bg-opacity-90 bg-teal-700 p-1 rounded-md">
          Mon<strong className="text-yellow-400">GI</strong>
        </Label>
        <div className="md:flex md:justify-between">
          <div className="md:flex md:flex-col md:w-1/2 ">
            <CardHeader>
              <CardTitle className="font-bold bg-opacity-65 rounded-md p-1 text-yellow-300 text-2xl md:text-5xl">
                {"Gérez votre groupe d'impact de manière efficace"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label className=" text-white md:text-md md:text-lg font-normal md:text-end ">
                {
                  "Cet outil offre au Pilote du Groupe d'Impact une possibilité de stocker les informations utiles sur la gestion d'un GI. Il permet une traçabilité des activités entreprises au sein du GI semaine après semaine ( dans le suivi et accompagnement de membres, sur la présence ou pas aux réunions, et autres données statistiques en rapport avec le soin des âmes qui lui sont confiées)."
                }
              </Label>
            </CardContent>
            <CardFooter className="flex justify-center pt-10">
              <Link href="/gis">
                <Button className="w-full text-xl font-bold  text-green-900 md:text-3xl md:p-8">
                  Démarrez ici!
                </Button>
              </Link>
            </CardFooter>
          </div>
          <div className="max-md:hidden w-[400px] h-[400px] mx-1 rounded-md overflow-hidden mt-10">
            <Image
              src={bgImage}
              alt="background"
              placeholder="blur"
              quality={100}
              //fill
              sizes="400px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </Card>
      <div className="max-md:hidden w-full mt-10 flex justify-between items-center ">
        <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">250</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              Membres au total
            </CardDescription>
          </CardHeader>
          <span className="text-purple-400">
            <MdPeopleOutline size={75} />
          </span>
        </Card>
        <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">36</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              {"Groupes d'impact"}
            </CardDescription>
          </CardHeader>
          <span className="text-green-400">
            <MdHouse size={75} />
          </span>
        </Card>
        <Card className="px-2 flex items-center justify-between bg-green-100 bg-opacity-5 text-white w-[250px] border-none">
          <CardHeader>
            <CardTitle className="text-5xl">10</CardTitle>
            <CardDescription className="text-yellow-400 text-sm">
              Secteurs
            </CardDescription>
          </CardHeader>
          <span className="text-orange-400">
            <MdOutlineMapsHomeWork size={75} />
          </span>
        </Card>
      </div>
    </div>
  );
}
