"use client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddGroupForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-black bg-yellow-400">Nouveau</Button>
      </DialogTrigger>
      <DialogContent className=" bg-[#1b4c48] text-white">
        <DialogHeader>
          <DialogTitle>{"Ajouter un groupe d'impact"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{"Nom du groupe d'impact"}</Label>
                <Input
                  id="name"
                  placeholder="Entrer le nom du groupe d'impact"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Secteur</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Forest</SelectItem>
                    <SelectItem value="sveltekit">Anderlecht</SelectItem>
                    <SelectItem value="astro">Koekelberg</SelectItem>
                    <SelectItem value="nuxt">Ganshoren</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupForm;
