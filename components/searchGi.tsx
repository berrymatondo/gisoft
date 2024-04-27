"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchGi = ({ search }: { search?: string }) => {
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

    if (!query) router.push(`/groupes`);
    else router.push(`/groupes?search=${query}`);
  }, [router, query]);

  return (
    <div>
      <Input
        placeholder="Rechercher"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
export default SearchGi;
