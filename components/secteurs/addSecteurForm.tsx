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

const AddSecteurForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-black bg-yellow-400">Nouveau</Button>
      </DialogTrigger>
      <DialogContent className=" bg-[#1b4c48] text-white">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau secteur</DialogTitle>
          {/*  */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{"Nom du secteur"}</Label>
                <Input id="name" placeholder="Entrer le nom du secteur" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">{"Référent"}</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Roston</SelectItem>
                    <SelectItem value="sveltekit">{"Loïc"}</SelectItem>
                    <SelectItem value="astro">Berry</SelectItem>
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

export default AddSecteurForm;
