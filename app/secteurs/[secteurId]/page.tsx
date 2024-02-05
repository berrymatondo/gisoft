import React from "react";

type SecteurProps = {
  params: {
    secteurId: number;
  };
};

const SecteurPage = ({ params }: SecteurProps) => {
  return <div>SecteurPage: {params.secteurId}</div>;
};

export default SecteurPage;
