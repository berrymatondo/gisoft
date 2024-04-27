import AddressesList from "@/components/addresses/addressesList";
import MembersList from "@/components/members/membersList";
import { prisma } from "@/lib/prisma";
import React from "react";

const AddressesPage = async () => {
  const addresses = await prisma.address.findMany({
    orderBy: {
      municipality: "asc",
    },
  });

  return (
    <div className="h-full py-8 px-32 w-full">
      <AddressesList addresses={addresses} />
    </div>
  );
};

export default AddressesPage;
