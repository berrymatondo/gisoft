"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import DeleteAddressForm from "./deleteAddressForm";
import UpdateAddressForm from "./updateAddressForm";

type AddressRowProps = {
  address: any;
};

const AddressRow = ({ address }: AddressRowProps) => {
  //noStore();

  //console.log("MON MEET:", meeting);

  const router = useRouter();

  return (
    <TableRow key={address.id}>
      {/*       <TableCell className="max-md:text-xs font-semibold">
        {format(new Date(meeting.date), "dd/MM/yyyy")}
        <p className="font-light">{meeting?.gi?.name}</p>
      </TableCell> */}

      <TableCell className="">
        <>
          <p>
            {address.street}, <strong>{address.number}</strong>{" "}
            {address.box ? "boîte" : ""} {address.box ? address.box : ""}
            {/*           {member.isPilote && <span className="text-xl">👨‍✈️</span>}
             */}{" "}
          </p>
          <p>
            {address.postalCode} {address.city}
          </p>
          {/*         <p className="md:hidden text-xs">{member.mobile}</p>
           */}{" "}
        </>
      </TableCell>

      <TableCell className="max-md:hidden">
        <p>{address.municipality}</p>
      </TableCell>
      <TableCell className="max-md:hidden">
        <p>
          {"["}
          {address.longitude}
          {" ; "}
          {address.latitude}
          {"]"}
        </p>
      </TableCell>

      <TableCell className="flex justify-end items-center gap-4 ">
        <DeleteAddressForm address={address} />
        <UpdateAddressForm addressIn={address} />
      </TableCell>
    </TableRow>
  );
};

export default AddressRow;
