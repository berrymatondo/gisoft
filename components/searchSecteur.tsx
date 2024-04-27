"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchSecteur = ({ search }: { search?: string }) => {
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);
  const router = useRouter();

  const initialRender = useRef(true);
  //console.log("Query:", query);
  //console.log("initialRender.current", initialRender.current);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) router.push(`/secteurs`);
    else router.push(`/secteurs?search=${query}`);
  }, [router, query]);

  return (
    <div>
      <Input
        placeholder="Rechercher ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
export default SearchSecteur;
