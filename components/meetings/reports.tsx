"use client";
import React, { useState, useEffect, useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
//import { GiContext } from "../../context/GiContext";

type RapportProps = {
  meeting: any;
};

const Rapport = ({ meeting }: RapportProps) => {
  const backdrop =
    "top-0 left-0 z-10 w-full h-full absolute flex justify-center items-center";
  const wind = "bg-white w-96 flex flex-col rounded-lg overflow-hidden";
  const container =
    "bg-[#3e3278] text-white p-4 flex justify-between items-center";
  const title = "text-xl inline cursor-pointer";
  const subTitle = "font-bold";
  const content = "p-4 border my-1 rounded";
  const btn = "bg-[#3e3278] text-white py-2";
  const [copied, setCopied] = useState(false);
  const [val, setVal] = useState("");

  const giDenom = "Forest 1";
  const datum = "10/10/1023";

  //const { giDenom } = useContext(GiContext);
  // console.log("giDenom", giDenom);

  useEffect(() => {
    setVal(
      `Bonsoir Pasteur Dominique,\nBonsoir à tous, \n \nRapport *${giDenom}* du *${datum}* \nNbre de connexions: *${meeting.nbrCon}*\nNbre de participants: *${meeting.nbrPar}*\nNbre membres ICC: *${meeting.nbrIcc}* \nNbre non ICC: *${meeting.nbrNIcc}*\nNbre de nouveaux : *${meeting.nbrVis}*\nNbre de stars: *${meeting.nbrStar}* \n \nBlessings,\nBerry\n`
    );
  }, [meeting]);

  const copyHandler = () => {
    navigator.clipboard.writeText(val);
    setCopied(true);
  };

  return (
    <div className={backdrop}>
      <div className={wind}>
        <CopyToClipboard text={val} onCopy={() => setCopied(true)}>
          <div className={container}>
            <h1 className={title}>
              Rapport du GI <span className={subTitle}>{giDenom}</span>
            </h1>
            {copied ? (
              <div className="text-green-400 text-sm">Copied!</div>
            ) : (
              ""
            )}

            <MdOutlineContentCopy
              onClick={() => copyHandler()}
              className="cursor-pointer"
            />
          </div>
        </CopyToClipboard>

        <div className={content}>
          <p>Bonsoir Pasteur Dominique, </p>
          <p>Bonsoir à tous, </p>
          <br />
          <p>
            Rapport GI *{giDenom}* du *{meeting.date}*
          </p>
          <br />
          <p>Nbre de connexions: *{meeting.nbrCon}*</p>
          <p>Nbre de participants: *{meeting.nbrPar}*</p>
          <p>Nbre membres ICC: *{meeting.nbrIcc}* </p>
          <p>Nbre non ICC: *{meeting.nbrNIcc}*</p>
          <p>Nbre de nouveaux : *{meeting.nbrVis}*</p>
          <p>Nbre de stars: *{meeting.nbrStar}*</p>
          <br />
          <p>Blessings 🔥,</p>
          <p>Berry</p>
        </div>
        <button className={btn} onClick={() => console.log("end")}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Rapport;
