"use client";
import { currentPage } from "@/atoms/atom";
import React from "react";
import { useRecoilState } from "recoil";
import { navLinks } from "../../objects/navLinks";

function NavLinks() {
  const [page, setPage] = useRecoilState(currentPage);
  return (
    <div className="flex gap-4">
      {navLinks.map((n) => {
        return (
          <button key={n.id} onClick={() => setPage(n.id)}>
            {n.id == page ? (
              <h1 className="underline">{n.name}</h1>
            ) : (
              <h1>{n.name}</h1>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default NavLinks;
