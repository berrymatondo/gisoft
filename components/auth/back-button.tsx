"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface IBackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ label, href }: IBackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
