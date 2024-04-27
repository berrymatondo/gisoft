"use client";
import React from "react";
import { useParams } from "next/navigation";

type GroupeDetailPageProps = {
  groupeId: number;
};

const GroupeDetailPage = () => {
  const params = useParams<{ groupeId: string }>();

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log("params", params);

  return <div>GroupeDetailPagez - {params.groupeId}</div>;
};

export default GroupeDetailPage;
