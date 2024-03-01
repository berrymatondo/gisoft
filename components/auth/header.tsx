import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface IHeaderProps {
  label: string;
}

export const Header = ({ label }: IHeaderProps) => {
  return (
    <div
      className={cn("flex flex-col items-center justify-center w-full h-1/2")}
    >
      <h1 className={cn("text-3xl font-bold", font.className)}>{label}</h1>
    </div>
  );
};
